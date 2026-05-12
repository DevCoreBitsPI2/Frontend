// app/dashboard/contratos/page.tsx
"use client";

import React, { useEffect, useState, useMemo } from "react";

import Header from "@/components/Header";
import LoadingSpinner from "@/components/LoadingSpinner";
import ContractStatsBar from "@/components/contracts/ContractStatsBar";
import ContractFilters from "@/components/contracts/ContractFilters";
import ContractsTable from "@/components/contracts/ContractsTable";

import {
  obtenerContratos,
  obtenerEstadisticasContratos,
} from "@/services/contractsService";

import { ContratoUI, EstadisticasContratos, FiltrosContratos } from "@/types/contract";

const FILTROS_INICIALES: FiltrosContratos = {
  estado: "Todos",
  tipo: "Todos",
  area: "Todas",
  rango: "",
};

const POR_PAGINA = 8;

export default function PaginaContratos() {
  const [contratos, setContratos] = useState<ContratoUI[]>([]);
  const [estadisticas, setEstadisticas] = useState<EstadisticasContratos | null>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filtros, setFiltros] = useState<FiltrosContratos>(FILTROS_INICIALES);
  const [busqueda, setBusqueda] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);

  useEffect(() => {
    Promise.all([obtenerContratos(), obtenerEstadisticasContratos()])
      .then(([contratosData, statsData]) => {
        setContratos(contratosData);
        setEstadisticas(statsData);
      })
      .catch(() => setError("No se pudieron cargar los contratos."))
      .finally(() => setCargando(false));
  }, []);

  const contratosFiltrados = useMemo(() => {
    return contratos.filter((c) => {
      const coincideEstado = filtros.estado === "Todos" || c.estadoUI === filtros.estado;
      const coincideTipo = filtros.tipo === "Todos" || c.tipoUI === filtros.tipo;
      const coincideArea = filtros.area === "Todas" || c.area === filtros.area;
      const coincideBusqueda =
        busqueda === "" ||
        c.funcionario.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        c.funcionario.idContrato.toLowerCase().includes(busqueda.toLowerCase()) ||
        c.area.toLowerCase().includes(busqueda.toLowerCase());
      return coincideEstado && coincideTipo && coincideArea && coincideBusqueda;
    });
  }, [contratos, filtros, busqueda]);

  const handleFiltroChange = (key: keyof FiltrosContratos, value: string) => {
    setFiltros((prev) => ({ ...prev, [key]: value }));
    setPaginaActual(1);
  };

  const handleLimpiar = () => {
    setFiltros(FILTROS_INICIALES);
    setBusqueda("");
    setPaginaActual(1);
  };

  const contratosPaginados = contratosFiltrados.slice(
    (paginaActual - 1) * POR_PAGINA,
    paginaActual * POR_PAGINA
  );

  return (
    <div className="flex flex-col h-full w-full bg-[#f4f7f8]">
      {/* Header reutilizable */}
      <Header user={null} />

      <main className="flex-1 px-6 py-6 overflow-auto">
        <div className="mb-6">
          <h1 className="text-xl font-bold text-[#0F1819]">Contratos</h1>
          <p className="text-sm text-[#8aa3ad] mt-0.5">
            Registro completo de todos los contratos laborales institucionales.
          </p>
        </div>

        {cargando && <LoadingSpinner mensaje="Cargando contratos..." />}

        {error && (
          <div className="bg-white rounded-xl px-6 py-4 border border-rose-200 text-sm text-rose-500">
            {error}
          </div>
        )}

        {!cargando && !error && estadisticas && (
          <>
            <ContractStatsBar estadisticas={estadisticas} />

            <ContractFilters
              filtros={filtros}
              busqueda={busqueda}
              onFiltroChange={handleFiltroChange}
              onBusquedaChange={(v) => { setBusqueda(v); setPaginaActual(1); }}
              onLimpiar={handleLimpiar}
            />

            <ContractsTable
              contratos={contratosPaginados}
              totalEntradas={contratosFiltrados.length}
              paginaActual={paginaActual}
              porPagina={POR_PAGINA}
              onVer={(c) => alert(`Ver: ${c.funcionario.nombre}`)}
              onEditar={(c) => alert(`Editar: ${c.funcionario.nombre}`)}
              onRenovar={(c) => alert(`Renovar: ${c.funcionario.nombre}`)}
              onPagina={setPaginaActual}
            />
          </>
        )}
      </main>
    </div>
  );
}