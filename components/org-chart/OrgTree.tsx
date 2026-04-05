"use client";

// components/org-chart/OrgTree.tsx

import React, { useRef, useState, useCallback } from "react";
import { NodoOrg, NodoArbol } from "@/types/orgChart";
import OrgNode from "./OrgNode";
import { ZoomIn, ZoomOut, Maximize2, Download } from "lucide-react";

interface OrgTreeProps {
  arbol: NodoArbol;
  idSeleccionado: string | null;
  alSeleccionar: (nodo: NodoOrg) => void;
}

const COLOR_LINEA = "#203D47";

function NodoConHijos({
  nodo,
  idSeleccionado,
  alSeleccionar,
  esRaiz = false,
}: {
  nodo: NodoArbol;
  idSeleccionado: string | null;
  alSeleccionar: (nodo: NodoOrg) => void;
  esRaiz?: boolean;
}) {
  const tieneHijos = nodo.hijos && nodo.hijos.length > 0;
  const hijoUnico = nodo.hijos?.length === 1;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <OrgNode
        nodo={nodo}
        estaSeleccionado={idSeleccionado === nodo.id}
        alHacerClic={alSeleccionar}
        esRaiz={esRaiz}
      />

      {tieneHijos && (
        <>
          {/* Línea vertical desde el padre hacia abajo */}
          <div style={{ width: 1, height: 32, background: COLOR_LINEA }} />

          {hijoUnico ? (
            // Hijo único: línea recta
            <NodoConHijos
              nodo={nodo.hijos[0]}
              idSeleccionado={idSeleccionado}
              alSeleccionar={alSeleccionar}
            />
          ) : (
            // Múltiples hijos: usar tabla de conectores
            <div style={{ display: "flex", alignItems: "flex-start" }}>
              {nodo.hijos.map((hijo, idx) => {
                const esPrimero = idx === 0;
                const esUltimo = idx === nodo.hijos.length - 1;

                return (
                  <div
                    key={hijo.id}
                    style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "0 16px" }}
                  >
                    {/* Conector en T: dos mitades */}
                    <div style={{ display: "flex", width: "100%", height: 32 }}>
                      {/* Mitad izquierda */}
                      <div
                        style={{
                          flex: 1,
                          borderTop: esPrimero ? "none" : `1px solid ${COLOR_LINEA}`,
                          borderRight: `1px solid ${COLOR_LINEA}`,
                        }}
                      />
                      {/* Mitad derecha */}
                      <div
                        style={{
                          flex: 1,
                          borderTop: esUltimo ? "none" : `1px solid ${COLOR_LINEA}`,
                          borderLeft: `1px solid ${COLOR_LINEA}`,
                        }}
                      />
                    </div>

                    <NodoConHijos
                      nodo={hijo}
                      idSeleccionado={idSeleccionado}
                      alSeleccionar={alSeleccionar}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default function OrgTree({ arbol, idSeleccionado, alSeleccionar }: OrgTreeProps) {
  const [escala, setEscala] = useState(0.9);
  const [traslado, setTraslado] = useState({ x: 0, y: 0 });
  const [arrastrandose, setArrastrandose] = useState(false);
  const inicioArrastre = useRef<{ x: number; y: number; tx: number; ty: number } | null>(null);

  const alPresionarMouse = useCallback((e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("button")) return;
    setArrastrandose(true);
    inicioArrastre.current = { x: e.clientX, y: e.clientY, tx: traslado.x, ty: traslado.y };
  }, [traslado]);

  const alMoverMouse = useCallback((e: React.MouseEvent) => {
    if (!arrastrandose || !inicioArrastre.current) return;
    setTraslado({
      x: inicioArrastre.current.tx + (e.clientX - inicioArrastre.current.x),
      y: inicioArrastre.current.ty + (e.clientY - inicioArrastre.current.y),
    });
  }, [arrastrandose]);

  const alSoltarMouse = useCallback(() => {
    setArrastrandose(false);
    inicioArrastre.current = null;
  }, []);

  const alRueda = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    setEscala((s) => Math.min(2, Math.max(0.3, s - e.deltaY * 0.001)));
  }, []);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden", background: "#ECEFF1" }}>
      <div
        style={{ width: "100%", height: "100%", display: "flex", alignItems: "flex-start", justifyContent: "center", paddingTop: 48, cursor: arrastrandose ? "grabbing" : "grab" }}
        onMouseDown={alPresionarMouse}
        onMouseMove={alMoverMouse}
        onMouseUp={alSoltarMouse}
        onMouseLeave={alSoltarMouse}
        onWheel={alRueda}
      >
        <div
          style={{
            transform: `translate(${traslado.x}px, ${traslado.y}px) scale(${escala})`,
            transformOrigin: "top center",
            transition: arrastrandose ? "none" : "transform 0.1s ease-out",
            paddingBottom: 64,
          }}
        >
          <NodoConHijos
            nodo={arbol}
            idSeleccionado={idSeleccionado}
            alSeleccionar={alSeleccionar}
            esRaiz
          />
        </div>
      </div>

      {/* Controles de zoom */}
      <div className="absolute bottom-5 left-5 flex items-center gap-1 bg-white rounded-xl shadow-md px-2 py-1.5 border border-[#d1dde2]">
        <BtnControl onClick={() => setEscala(s => Math.max(0.3, s - 0.15))} titulo="Alejar"><ZoomOut size={14} /></BtnControl>
        <BtnControl onClick={() => setEscala(s => Math.min(2, s + 0.15))} titulo="Acercar"><ZoomIn size={14} /></BtnControl>
        <div className="w-px h-4 bg-[#d1dde2] mx-0.5" />
        <BtnControl onClick={() => { setEscala(0.9); setTraslado({ x: 0, y: 0 }); }} titulo="Ajustar vista"><Maximize2 size={14} /></BtnControl>
        <BtnControl onClick={() => alert("Integrar html2canvas para descarga")} titulo="Descargar"><Download size={14} /></BtnControl>
      </div>

      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-[10px] text-[#8aa3ad] bg-white rounded-lg px-2 py-1 border border-[#d1dde2]">
        {Math.round(escala * 100)}%
      </div>
    </div>
  );
}

function BtnControl({ onClick, titulo, children }: { onClick: () => void; titulo: string; children: React.ReactNode }) {
  return (
    <button onClick={onClick} title={titulo} className="p-1.5 text-[#203D47] hover:text-[#0F1819] hover:bg-[#ECEFF1] rounded-lg transition-colors">
      {children}
    </button>
  );
}