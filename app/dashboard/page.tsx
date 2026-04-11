// app/dashboard/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { Users, PauseCircle, PersonStanding } from "lucide-react";

import Header from "@/components/Header";
import LoadingSpinner from "@/components/LoadingSpinner";
import StatsCard from "@/components/dashboard/StatsCard";
import CriticalContractAlerts from "@/components/dashboard/CriticalContractAlerts";
import DepartmentalHierarchy from "@/components/dashboard/DepartmentalHierarchy";

import {
  obtenerEstadisticas,
  obtenerAlertasContratos,
  obtenerJerarquiaDepartamental,
  EstadisticaDashboard,
  AlertaContrato,
} from "@/services/dashboardService";

import { NodoOrg } from "@/types/orgChart";

export default function DashboardPage() {
  const [estadisticas, setEstadisticas] = useState<EstadisticaDashboard | null>(null);
  const [alertas, setAlertas] = useState<AlertaContrato[]>([]);
  const [departamentos, setDepartamentos] = useState<NodoOrg[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([
      obtenerEstadisticas(),
      obtenerAlertasContratos(),
      obtenerJerarquiaDepartamental(),
    ])
      .then(([stats, alertasData, depsData]) => {
        setEstadisticas(stats);
        setAlertas(alertasData);
        setDepartamentos(depsData);
      })
      .catch(() => setError("No se pudieron cargar los datos del dashboard."))
      .finally(() => setCargando(false));
  }, []);

  return (
    <div className="flex flex-col h-full w-full bg-[#f4f7f8]">
      {/* Header común reutilizable */}
      <Header user={null} />

      {/* Contenido principal */}
      <main className="flex-1 px-6 py-6 overflow-auto">
        {/* Título */}
        <div className="mb-6">
          <h1 className="text-xl font-bold text-[#0F1819]">Pulso Organizacional</h1>
          <p className="text-sm text-[#8aa3ad] mt-0.5">
            Supervision en tiempo real del capital humano y contratos estrategicos.
          </p>
        </div>

        {cargando && <LoadingSpinner mensaje="Cargando panel principal..." />}

        {error && (
          <div className="bg-white rounded-xl px-6 py-4 border border-rose-200 text-sm text-rose-500">
            {error}
          </div>
        )}

        {!cargando && !error && estadisticas && (
          <>
            {/* Tarjetas de estadísticas */}
            <div className="flex gap-4 mb-6">
              <StatsCard
                icono={Users}
                etiqueta="Personal Activo"
                valor={estadisticas.personalActivo}
                variacion={estadisticas.variacionPersonalActivo}
              />
              <StatsCard
                icono={PauseCircle}
                etiqueta="Suspendidos"
                valor={estadisticas.suspendidos}
                etiquetaVariacion={estadisticas.estadoSuspendidos}
              />
              <StatsCard
                icono={PersonStanding}
                etiqueta="Retirados (año actual)"
                valor={estadisticas.retiradosYTD}
                variacion={estadisticas.variacionRetirados}
              />
            </div>

            {/* Secciones inferiores */}
            <div className="grid grid-cols-2 gap-4">
              <CriticalContractAlerts alertas={alertas} />
              <DepartmentalHierarchy departamentos={departamentos} />
            </div>
          </>
        )}
      </main>

      {/* Botón flotante */}
      <button className="fixed bottom-6 right-6 bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-bold px-6 py-3.5 rounded-2xl shadow-lg transition-colors z-50">
        Evaluaciones
      </button>
    </div>
  );
}