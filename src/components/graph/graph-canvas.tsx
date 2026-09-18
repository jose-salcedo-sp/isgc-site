"use client";

import { useEffect, useRef } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";

import type { GraphKind, GraphText } from "./graph-model";
import {
  clampK,
  focusOn,
  paintGraph,
  playFocus,
  readPalette,
  zoomAt,
} from "./graph-paint";
import type { Palette, Transform } from "./graph-paint";
import { pickSlice } from "./graph-radial";
import type { RadialLayout, RadialNode } from "./graph-radial";
import { TIP_RADIUS } from "./graph-theme";
import { GraphTip } from "./graph-tip";
import { moveTip } from "./tip-content";

const ARC_DRAW_MS = 500;

const reduced = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const GraphCanvas = ({
  activeKinds,
  layout,
  onSelect,
  searchIds,
  selectedId,
  text,
}: {
  activeKinds: ReadonlySet<GraphKind>;
  layout: RadialLayout;
  onSelect: (id: string | null) => void;
  searchIds: ReadonlySet<string> | null;
  selectedId: string | null;
  text: GraphText;
}) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tipRef = useRef<HTMLDivElement>(null);
  const transformRef = useRef<Transform>({ k: 0.45, x: 0, y: 0 });
  const hoverRef = useRef<string | null>(null);
  const sizeRef = useRef({ dpr: 1, h: 600, w: 800 });
  const pathsRef = useRef<Path2D[]>([]);
  const paletteRef = useRef<Palette | null>(null);
  const rafRef = useRef(0);
  const fitted = useRef(false);
  const arcStart = useRef(0);
  const cancelFocus = useRef(() => {
    /* filled when a focus tween starts */
  });
  const kickDraw = useRef(() => {
    /* filled after canvas mount */
  });
  const sceneRef = useRef({
    kinds: activeKinds,
    layout,
    matches: searchIds,
    selectedId,
  });
  const dragRef = useRef<{
    lastX: number;
    lastY: number;
    moved: boolean;
    pointer: number;
  } | null>(null);

  const startArcs = () => {
    arcStart.current = performance.now();
  };

  const animateTo = (to: Transform) => {
    cancelFocus.current();
    cancelFocus.current = playFocus(transformRef.current, to, reduced(), () => {
      kickDraw.current();
    });
  };

  useEffect(() => {
    sceneRef.current = {
      kinds: activeKinds,
      layout,
      matches: searchIds,
      selectedId,
    };
    pathsRef.current = layout.edges.map((edge) => new Path2D(edge.path));
    kickDraw.current();
  }, [activeKinds, layout, searchIds, selectedId]);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) {
      return;
    }
    const draw = () => {
      const palette = paletteRef.current;
      if (!palette) {
        return;
      }
      const scene = sceneRef.current;
      const elapsed = performance.now() - arcStart.current;
      const arcProgress = reduced()
        ? 1
        : Math.min(1, Math.max(0, elapsed / ARC_DRAW_MS));
      paintGraph({
        arcProgress,
        canvas,
        hoveredId: hoverRef.current,
        kinds: scene.kinds,
        layout: scene.layout,
        matches: scene.matches,
        palette,
        paths: pathsRef.current,
        selectedId: scene.selectedId,
        size: sizeRef.current,
        transform: transformRef.current,
      });
      if (arcProgress < 1) {
        kickDraw.current();
      }
    };
    const requestDraw = () => {
      if (rafRef.current) {
        return;
      }
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = 0;
        draw();
      });
    };
    kickDraw.current = requestDraw;
    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      sizeRef.current = { dpr, h: rect.height, w: rect.width };
      if (!fitted.current && rect.width > 0 && rect.height > 0) {
        fitted.current = true;
        transformRef.current.k = clampK(
          (Math.min(rect.width, rect.height) * 0.96) /
            ((TIP_RADIUS.at(-1) ?? 1) * 2)
        );
      }
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      paletteRef.current = readPalette(wrap);
      draw();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    const onTheme = () => {
      paletteRef.current = readPalette(wrap);
      requestDraw();
    };
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    media.addEventListener("change", onTheme);
    const onNativeWheel = (event: WheelEvent) => {
      event.preventDefault();
      cancelFocus.current();
      const rect = canvas.getBoundingClientRect();
      zoomAt(
        transformRef.current,
        event.clientX - rect.left,
        event.clientY - rect.top,
        sizeRef.current,
        event.deltaY
      );
      requestDraw();
    };
    canvas.addEventListener("wheel", onNativeWheel, { passive: false });
    return () => {
      ro.disconnect();
      media.removeEventListener("change", onTheme);
      canvas.removeEventListener("wheel", onNativeWheel);
      cancelFocus.current();
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = 0;
      }
    };
  }, []);

  const requestDraw = () => {
    kickDraw.current();
  };

  const worldPoint = (clientX: number, clientY: number): [number, number] => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return [0, 0];
    }
    const rect = canvas.getBoundingClientRect();
    const t = transformRef.current;
    const { h, w } = sizeRef.current;
    return [
      (clientX - rect.left - w / 2 - t.x) / t.k,
      (clientY - rect.top - h / 2 - t.y) / t.k,
    ];
  };

  const hitAt = (clientX: number, clientY: number): RadialNode | null => {
    const [wx, wy] = worldPoint(clientX, clientY);
    return pickSlice(sceneRef.current.layout.nodes, wx, wy);
  };

  const onPointerDown = (event: ReactPointerEvent<HTMLCanvasElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = {
      lastX: event.clientX,
      lastY: event.clientY,
      moved: false,
      pointer: event.pointerId,
    };
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLCanvasElement>) => {
    const drag = dragRef.current;
    if (drag && drag.pointer === event.pointerId) {
      const dx = event.clientX - drag.lastX;
      const dy = event.clientY - drag.lastY;
      if (Math.abs(dx) > 2 || Math.abs(dy) > 2) {
        drag.moved = true;
        cancelFocus.current();
      }
      drag.lastX = event.clientX;
      drag.lastY = event.clientY;
      transformRef.current.x += dx;
      transformRef.current.y += dy;
      requestDraw();
      return;
    }
    const hit = hitAt(event.clientX, event.clientY);
    const id = hit?.id ?? null;
    if (hoverRef.current !== id) {
      hoverRef.current = id;
      startArcs();
      requestDraw();
    }
    moveTip(tipRef.current, event, hit, text);
  };

  const releaseDrag = (event: ReactPointerEvent<HTMLCanvasElement>) => {
    const drag = dragRef.current;
    if (drag?.pointer !== event.pointerId) {
      return null;
    }
    dragRef.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    return drag;
  };

  const onPointerUp = (event: ReactPointerEvent<HTMLCanvasElement>) => {
    const drag = releaseDrag(event);
    if (drag?.moved) {
      return;
    }
    const hit = hitAt(event.clientX, event.clientY);
    startArcs();
    onSelect(hit ? hit.id : null);
    if (hit) {
      animateTo(focusOn(hit.x, hit.y, transformRef.current.k, sizeRef.current));
    }
  };

  const onPointerCancel = (event: ReactPointerEvent<HTMLCanvasElement>) => {
    releaseDrag(event);
  };

  const onLostPointerCapture = () => {
    dragRef.current = null;
  };

  const onPointerLeave = () => {
    hoverRef.current = null;
    if (tipRef.current) {
      tipRef.current.hidden = true;
    }
    requestDraw();
  };

  return (
    <div className="h-full w-full" ref={wrapRef}>
      <canvas
        aria-hidden="true"
        className="block h-full w-full cursor-grab touch-none active:cursor-grabbing"
        ref={canvasRef}
        onLostPointerCapture={onLostPointerCapture}
        onPointerCancel={onPointerCancel}
        onPointerDown={onPointerDown}
        onPointerLeave={onPointerLeave}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      />
      <GraphTip tipRef={tipRef} />
    </div>
  );
};

export default GraphCanvas;
