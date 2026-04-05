"use client";

// components/org-chart/OrgTree.tsx

import React, { useRef, useState, useCallback } from "react";
import { NodoOrg } from "@/services/orgChartService";
import OrgNode from "./OrgNode";
import { ZoomIn, ZoomOut, Maximize2, Download } from "lucide-react";

interface NodoArbol extends NodoOrg {
  hijos: NodoArbol[];
}

interface OrgTreeProps {
  arbol: NodoArbol;
  idSeleccionado: string | null;
  alSeleccionar: (nodo: NodoOrg) => void;
}

function NivelArbol({
  nodos,
  idSeleccionado,
  alSeleccionar,
  esRaiz = false,
}: {
  nodos: NodoArbol[];
  idSeleccionado: string | null;
  alSeleccionar: (nodo: NodoOrg) => void;
  esRaiz?: boolean;
}) {
  return (
    <div className="flex flex-col items-center gap-0">
      {nodos.map((nodo) => (
        <div key={nodo.id} className="flex flex-col items-center">
          <OrgNode
            nodo={nodo}
            estaSeleccionado={idSeleccionado === nodo.id}
            alHacerClic={alSeleccionar}
            esRaiz={esRaiz}
          />

          {nodo.hijos && nodo.hijos.length > 0 && (
            <div className="flex flex-col items-center">
              {/* Línea vertical hacia abajo */}
              <div className="w-px h-8 bg-[#203D47]" />

              {/* Hijos en fila */}
              <div className="flex items-start gap-8">
                {nodo.hijos.map((hijo) => (
                  <div key={hijo.id} className="flex flex-col items-center">
                    <div className="w-px h-8 bg-[#203D47]" />
                    <NivelArbol
                      nodos={[hijo]}
                      idSeleccionado={idSeleccionado}
                      alSeleccionar={alSeleccionar}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default function OrgTree({ arbol, idSeleccionado, alSeleccionar }: OrgTreeProps) {
  const [escala, setEscala] = useState(1);
  const [traslado, setTraslado] = useState({ x: 0, y: 0 });
  const [arrastrandose, setArrastrandose] = useState(false);
  const inicioArrastre = useRef<{ x: number; y: number; tx: number; ty: number } | null>(null);

  const alPresionarMouse = useCallback(
    (e: React.MouseEvent) => {
      if ((e.target as HTMLElement).closest("button")) return;
      setArrastrandose(true);
      inicioArrastre.current = { x: e.clientX, y: e.clientY, tx: traslado.x, ty: traslado.y };
    },
    [traslado]
  );

  const alMoverMouse = useCallback(
    (e: React.MouseEvent) => {
      if (!arrastrandose || !inicioArrastre.current) return;
      setTraslado({
        x: inicioArrastre.current.tx + (e.clientX - inicioArrastre.current.x),
        y: inicioArrastre.current.ty + (e.clientY - inicioArrastre.current.y),
      });
    },
    [arrastrandose]
  );

  const alSoltarMouse = useCallback(() => {
    setArrastrandose(false);
    inicioArrastre.current = null;
  }, []);

  const alRueda = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    setEscala((s) => Math.min(2, Math.max(0.3, s - e.deltaY * 0.001)));
  }, []);

  const acercar = () => setEscala((s) => Math.min(2, s + 0.15));
  const alejar = () => setEscala((s) => Math.max(0.3, s - 0.15));
  const ajustarVista = () => { setEscala(0.85); setTraslado({ x: 0, y: 0 }); };
  const descargar = () => alert("Descarga del organigrama — integrar html2canvas en implementación final");

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#ECEFF1]">
      {/* Lienzo interactivo */}
      <div
        className={`w-full h-full flex items-center justify-center ${arrastrandose ? "cursor-grabbing" : "cursor-grab"}`}
        onMouseDown={alPresionarMouse}
        onMouseMove={alMoverMouse}
        onMouseUp={alSoltarMouse}
        onMouseLeave={alSoltarMouse}
        onWheel={alRueda}
      >
        <div
          style={{
            transform: `translate(${traslado.x}px, ${traslado.y}px) scale(${escala})`,
            transformOrigin: "center center",
            transition: arrastrandose ? "none" : "transform 0.1s ease-out",
          }}
          className="flex flex-col items-center py-12 px-16"
        >
          {/* Nodo raíz */}
          <div className="flex flex-col items-center">
            <OrgNode
              nodo={arbol}
              estaSeleccionado={idSeleccionado === arbol.id}
              alHacerClic={alSeleccionar}
              esRaiz
            />

            {arbol.hijos && arbol.hijos.length > 0 && (
              <div className="flex flex-col items-center">
                <div className="w-px h-10 bg-[#203D47]" />
                <div className="flex items-start gap-12">
                  {arbol.hijos.map((hijo) => (
                    <div key={hijo.id} className="flex flex-col items-center">
                      <div className="w-px h-10 bg-[#203D47]" />
                      <NivelArbol
                        nodos={[hijo]}
                        idSeleccionado={idSeleccionado}
                        alSeleccionar={alSeleccionar}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Controles de zoom — esquina inferior izquierda */}
      <div className="absolute bottom-5 left-5 flex items-center gap-1 bg-white rounded-xl shadow-md px-2 py-1.5 border border-[#d1dde2]">
        <BtnControl onClick={alejar} titulo="Alejar"><ZoomOut size={14} /></BtnControl>
        <BtnControl onClick={acercar} titulo="Acercar"><ZoomIn size={14} /></BtnControl>
        <div className="w-px h-4 bg-[#d1dde2] mx-0.5" />
        <BtnControl onClick={ajustarVista} titulo="Ajustar vista"><Maximize2 size={14} /></BtnControl>
        <BtnControl onClick={descargar} titulo="Descargar"><Download size={14} /></BtnControl>
      </div>

      {/* Indicador de escala */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-[10px] text-[#8aa3ad] bg-white rounded-lg px-2 py-1 border border-[#d1dde2]">
        {Math.round(escala * 100)}%
      </div>
    </div>
  );
}

function BtnControl({ onClick, titulo, children }: { onClick: () => void; titulo: string; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      title={titulo}
      className="p-1.5 text-[#203D47] hover:text-[#0F1819] hover:bg-[#ECEFF1] rounded-lg transition-colors"
    >
      {children}
    </button>
  );
}