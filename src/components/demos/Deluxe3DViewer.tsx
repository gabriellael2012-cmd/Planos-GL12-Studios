import React, { useEffect, useRef, useState, useCallback } from 'react';
import { RotateCw, Sparkles, Sun, Moon, Sunset } from 'lucide-react';

export type LightingMode = 'twilight' | 'noon' | 'night';

interface Deluxe3DViewerProps {
  lightingMode: LightingMode;
  onLightingChange: (mode: LightingMode) => void;
}

export const Deluxe3DViewer: React.FC<Deluxe3DViewerProps> = ({
  lightingMode,
  onLightingChange,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [isRotating, setIsRotating] = useState(true);
  const [contextError, setContextError] = useState(false);

  const lightingModeRef = useRef<LightingMode>(lightingMode);
  lightingModeRef.current = lightingMode;

  const isRotatingRef = useRef<boolean>(isRotating);
  isRotatingRef.current = isRotating;

  const isVisibleRef = useRef<boolean>(true);
  const isDirtyRef = useRef<boolean>(true);

  const mouseStateRef = useRef({
    isDown: false,
    lastX: 0,
    lastY: 0,
    rotX: 0.35,
    rotY: 0.8,
  });

  const animFrameIdRef = useRef<number | null>(null);
  const isRunningRef = useRef<boolean>(false);
  const renderFunctionRef = useRef<(() => void) | null>(null);

  // 3D architectural geometry: cantilevered pavilion with glass atrium
  const vertices = useRef<[number, number, number][]>([
    [-1.4, -0.6, -1.2],
    [1.4, -0.6, -1.2],
    [1.4, -0.6, 1.2],
    [-1.4, -0.6, 1.2],
    [-1.0, 0.4, -0.8],
    [1.6, 0.4, -0.8],
    [1.6, 0.4, 0.8],
    [-1.0, 0.4, 0.8],
    [-1.2, 0.9, -1.0],
    [1.8, 0.9, -1.0],
    [1.8, 0.9, 1.0],
    [-1.2, 0.9, 1.0],
    [-0.6, -0.6, -0.6],
    [0.8, -0.6, -0.6],
    [0.8, 0.4, -0.6],
    [-0.6, 0.4, -0.6],
    [-0.6, -0.6, 0.6],
    [0.8, -0.6, 0.6],
    [0.8, 0.4, 0.6],
    [-0.6, 0.4, 0.6],
  ]).current;

  const edges = useRef<[number, number][]>([
    [0, 1], [1, 2], [2, 3], [3, 0],
    [4, 5], [5, 6], [6, 7], [7, 4],
    [8, 9], [9, 10], [10, 11], [11, 8],
    [0, 4], [1, 5], [2, 6], [3, 7],
    [4, 8], [5, 9], [6, 10], [7, 11],
    [12, 13], [13, 14], [14, 15], [15, 12],
    [16, 17], [17, 18], [18, 19], [19, 16],
    [12, 16], [13, 17], [14, 18], [15, 19],
  ]).current;

  // Whenever lighting changes from parent, mark dirty and trigger instant render
  useEffect(() => {
    isDirtyRef.current = true;
    if (renderFunctionRef.current) {
      renderFunctionRef.current();
    }
  }, [lightingMode]);

  // Reduced motion preference
  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      if (mediaQuery.matches) {
        setIsRotating(false);
      }
    }
  }, []);

  // IntersectionObserver to pause rendering when scrolled out of view
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        isVisibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          isDirtyRef.current = true;
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(el);

    const handleVisibilityChange = () => {
      const visible = document.visibilityState === 'visible';
      isVisibleRef.current = visible;
      if (visible) isDirtyRef.current = true;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Main 3D Canvas Rendering Lifecycle
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) {
      setContextError(true);
      return;
    }

    let width = 600;
    let height = 340;

    const resizeCanvas = () => {
      if (!canvas.parentElement) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.parentElement.getBoundingClientRect();
      const newWidth = Math.max(300, Math.floor(rect.width));
      const newHeight = Math.max(220, Math.floor(rect.height || 340));

      if (width !== newWidth || height !== newHeight) {
        width = newWidth;
        height = newHeight;
        canvas.width = Math.floor(newWidth * dpr);
        canvas.height = Math.floor(newHeight * dpr);
        ctx.scale(dpr, dpr);
        isDirtyRef.current = true;
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Fast 3D perspective projection function
    const project = (x: number, y: number, z: number, angleX: number, angleY: number) => {
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);
      const x1 = x * cosY - z * sinY;
      const z1 = z * cosY + x * sinY;

      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const y2 = y * cosX - z1 * sinX;
      const z2 = z1 * cosX + y * sinX;

      const distance = 3.6;
      const fov = 340;
      const scale = fov / (distance + z2);
      const px = width / 2 + x1 * scale;
      const py = height / 2 - y2 * scale;

      return { px, py, z: z2 };
    };

    const render = () => {
      const currentMode = lightingModeRef.current;

      // 1. Ambient architectural gradient background
      const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
      if (currentMode === 'twilight') {
        bgGrad.addColorStop(0, '#0a1428');
        bgGrad.addColorStop(1, '#152238');
      } else if (currentMode === 'noon') {
        bgGrad.addColorStop(0, '#0d2345');
        bgGrad.addColorStop(1, '#1b3b6f');
      } else {
        bgGrad.addColorStop(0, '#030712');
        bgGrad.addColorStop(1, '#090f20');
      }
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      const rotX = mouseStateRef.current.rotX;
      const rotY = mouseStateRef.current.rotY;

      // 2. Ground grid plane
      ctx.strokeStyle =
        currentMode === 'twilight'
          ? 'rgba(56, 189, 248, 0.12)'
          : currentMode === 'noon'
          ? 'rgba(96, 165, 250, 0.15)'
          : 'rgba(34, 211, 238, 0.10)';
      ctx.lineWidth = 1;

      for (let i = -3; i <= 3; i++) {
        const p1 = project(-2.2, -0.6, i * 0.7, rotX, rotY);
        const p2 = project(2.2, -0.6, i * 0.7, rotX, rotY);
        ctx.beginPath();
        ctx.moveTo(p1.px, p1.py);
        ctx.lineTo(p2.px, p2.py);
        ctx.stroke();

        const p3 = project(i * 0.7, -0.6, -2.2, rotX, rotY);
        const p4 = project(i * 0.7, -0.6, 2.2, rotX, rotY);
        ctx.beginPath();
        ctx.moveTo(p3.px, p3.py);
        ctx.lineTo(p4.px, p4.py);
        ctx.stroke();
      }

      // 3. Project vertices
      const projected = vertices.map(([x, y, z]) => project(x, y, z, rotX, rotY));

      // 4. Shaded glass core facet
      const gPoints = [12, 13, 14, 15].map((idx) => projected[idx]);
      ctx.fillStyle =
        currentMode === 'twilight'
          ? 'rgba(56, 189, 248, 0.18)'
          : currentMode === 'noon'
          ? 'rgba(96, 165, 250, 0.22)'
          : 'rgba(34, 211, 238, 0.15)';
      ctx.beginPath();
      ctx.moveTo(gPoints[0].px, gPoints[0].py);
      for (let i = 1; i < gPoints.length; i++) ctx.lineTo(gPoints[i].px, gPoints[i].py);
      ctx.closePath();
      ctx.fill();

      // 5. Draw structural lines (double stroke: halo pass + crisp vector core)
      ctx.lineWidth = 3.5;
      ctx.strokeStyle =
        currentMode === 'twilight'
          ? 'rgba(56, 189, 248, 0.25)'
          : currentMode === 'noon'
          ? 'rgba(96, 165, 250, 0.25)'
          : 'rgba(34, 211, 238, 0.25)';

      ctx.beginPath();
      edges.forEach(([i1, i2]) => {
        ctx.moveTo(projected[i1].px, projected[i1].py);
        ctx.lineTo(projected[i2].px, projected[i2].py);
      });
      ctx.stroke();

      ctx.lineWidth = 1.6;
      ctx.strokeStyle =
        currentMode === 'twilight'
          ? '#38bdf8'
          : currentMode === 'noon'
          ? '#93c5fd'
          : '#22d3ee';

      ctx.beginPath();
      edges.forEach(([i1, i2]) => {
        ctx.moveTo(projected[i1].px, projected[i1].py);
        ctx.lineTo(projected[i2].px, projected[i2].py);
      });
      ctx.stroke();

      // 6. Draw clean vertex joints
      ctx.fillStyle = '#ffffff';
      projected.forEach((p, idx) => {
        ctx.beginPath();
        ctx.arc(p.px, p.py, idx < 8 ? 2.5 : 2, 0, Math.PI * 2);
        ctx.fill();
      });

      isDirtyRef.current = false;
    };

    renderFunctionRef.current = render;
    render(); // Initial immediate paint

    // On-demand throttled loop: only runs while auto-rotating, dragging, or marked dirty
    let lastTime = 0;
    const targetInterval = 1000 / 25; // 25 FPS is silky smooth and leaves CPU completely free
    isRunningRef.current = true;

    const frameLoop = (timestamp: number) => {
      if (!isRunningRef.current) return;

      if (isVisibleRef.current) {
        if (isRotatingRef.current && !mouseStateRef.current.isDown) {
          mouseStateRef.current.rotY += 0.007;
          isDirtyRef.current = true;
        }

        if (isDirtyRef.current) {
          const delta = timestamp - lastTime;
          if (delta >= targetInterval) {
            lastTime = timestamp - (delta % targetInterval);
            render();
          }
        }
      }

      animFrameIdRef.current = requestAnimationFrame(frameLoop);
    };

    animFrameIdRef.current = requestAnimationFrame(frameLoop);

    return () => {
      isRunningRef.current = false;
      window.removeEventListener('resize', resizeCanvas);
      if (animFrameIdRef.current !== null) {
        cancelAnimationFrame(animFrameIdRef.current);
        animFrameIdRef.current = null;
      }
      renderFunctionRef.current = null;
    };
  }, [vertices, edges]);

  // Mouse Handlers
  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    mouseStateRef.current.isDown = true;
    mouseStateRef.current.lastX = e.clientX;
    mouseStateRef.current.lastY = e.clientY;
    isDirtyRef.current = true;
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!mouseStateRef.current.isDown) return;
    const dx = e.clientX - mouseStateRef.current.lastX;
    const dy = e.clientY - mouseStateRef.current.lastY;

    mouseStateRef.current.rotY += dx * 0.007;
    mouseStateRef.current.rotX = Math.max(-0.6, Math.min(0.9, mouseStateRef.current.rotX - dy * 0.007));

    mouseStateRef.current.lastX = e.clientX;
    mouseStateRef.current.lastY = e.clientY;
    isDirtyRef.current = true;
  }, []);

  const handleMouseUp = useCallback(() => {
    mouseStateRef.current.isDown = false;
    isDirtyRef.current = true;
  }, []);

  // Touch Handlers
  const handleTouchStart = useCallback((e: React.TouchEvent<HTMLCanvasElement>) => {
    if (e.touches.length === 1) {
      mouseStateRef.current.isDown = true;
      mouseStateRef.current.lastX = e.touches[0].clientX;
      mouseStateRef.current.lastY = e.touches[0].clientY;
      isDirtyRef.current = true;
    }
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!mouseStateRef.current.isDown || e.touches.length !== 1) return;
    const dx = e.touches[0].clientX - mouseStateRef.current.lastX;
    const dy = e.touches[0].clientY - mouseStateRef.current.lastY;

    if (Math.abs(dx) > Math.abs(dy)) {
      e.stopPropagation();
    }

    mouseStateRef.current.rotY += dx * 0.007;
    mouseStateRef.current.rotX = Math.max(-0.6, Math.min(0.9, mouseStateRef.current.rotX - dy * 0.007));

    mouseStateRef.current.lastX = e.touches[0].clientX;
    mouseStateRef.current.lastY = e.touches[0].clientY;
    isDirtyRef.current = true;
  }, []);

  const toggleRotation = useCallback(() => {
    setIsRotating((prev) => {
      const next = !prev;
      isRotatingRef.current = next;
      isDirtyRef.current = true;
      return next;
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-72 md:h-84 rounded-xl overflow-hidden border border-blue-500/30 bg-slate-950 select-none shadow-2xl"
    >
      {contextError ? (
        <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-slate-950 to-blue-950">
          <Sparkles className="w-8 h-8 text-blue-400 mb-2" />
          <h3 className="text-sm font-semibold text-white">Pavilhão Arquitetônico Aura</h3>
          <p className="text-xs text-slate-400 max-w-sm mt-1">
            Representação tridimensional paramétrica desenvolvida sob medida com estrutura em balanço protendido de 9 metros.
          </p>
        </div>
      ) : (
        <canvas
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleMouseUp}
          onTouchCancel={handleMouseUp}
          className="w-full h-full cursor-grab active:cursor-grabbing block touch-pan-y"
          aria-label="Modelo tridimensional interativo do Pavilhão Arquitetônico Aura"
        />
      )}

      {/* Floating 3D Controls Bar */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
        <div className="pointer-events-auto flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900/90 backdrop-blur-md border border-slate-700/60 text-xs text-slate-300 shadow-md">
          <Sparkles className="w-3.5 h-3.5 text-blue-400" />
          <span className="font-medium hidden sm:inline">Visualizador 3D em Tempo Real</span>
          <span className="font-medium sm:hidden">Visualizador 3D</span>
        </div>

        {/* Lighting Switcher */}
        <div className="pointer-events-auto flex items-center gap-1 p-1 rounded-lg bg-slate-900/90 backdrop-blur-md border border-slate-700/60 shadow-md">
          <button
            type="button"
            onClick={() => onLightingChange('twilight')}
            className={`px-2 py-1 rounded text-xs flex items-center gap-1 transition-colors cursor-pointer ${
              lightingMode === 'twilight'
                ? 'bg-blue-600 text-white font-medium shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
            title="Crepúsculo / Golden Hour"
            aria-pressed={lightingMode === 'twilight'}
          >
            <Sunset className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Crepúsculo</span>
          </button>
          <button
            type="button"
            onClick={() => onLightingChange('noon')}
            className={`px-2 py-1 rounded text-xs flex items-center gap-1 transition-colors cursor-pointer ${
              lightingMode === 'noon'
                ? 'bg-blue-600 text-white font-medium shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
            title="Luz Solar Natural"
            aria-pressed={lightingMode === 'noon'}
          >
            <Sun className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Meio-dia</span>
          </button>
          <button
            type="button"
            onClick={() => onLightingChange('night')}
            className={`px-2 py-1 rounded text-xs flex items-center gap-1 transition-colors cursor-pointer ${
              lightingMode === 'night'
                ? 'bg-blue-600 text-white font-medium shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
            title="Noturno / Iluminação Cênica"
            aria-pressed={lightingMode === 'night'}
          >
            <Moon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Noturno</span>
          </button>
        </div>
      </div>

      {/* Bottom hint & rotation toggle */}
      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] text-slate-400 pointer-events-none z-10">
        <span className="bg-slate-900/80 px-2 py-0.5 rounded backdrop-blur border border-slate-800 text-[10px] sm:text-[11px]">
          Arraste para orbitar em 360°
        </span>
        <button
          type="button"
          onClick={toggleRotation}
          className="pointer-events-auto flex items-center gap-1 px-2 py-1 rounded bg-slate-900/85 backdrop-blur border border-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer text-[10px] sm:text-[11px]"
        >
          <RotateCw
            className={`w-3 h-3 ${isRotating ? 'animate-spin' : ''}`}
            style={{ animationDuration: '6s' }}
          />
          <span>{isRotating ? 'Pausar' : 'Girar'}</span>
        </button>
      </div>
    </div>
  );
};
