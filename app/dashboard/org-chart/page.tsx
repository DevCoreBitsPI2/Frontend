"use client";

import { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";
import { getPositions, buildPositionTree } from "@/services/orgChartService";
import { Position, PositionTree } from "@/types/orgChart";
import OrgTree from "@/components/org-chart/OrgTree";
import PositionDetailPanel from "@/components/org-chart/AreaDetailsPanel";
import { ChevronRight, ChevronDown, Filter, Clock, Save } from "lucide-react";

const DEPARTMENTS = ["Department of Engineering", "Department of Marketing", "Department of Operations"];

export default function PositionHierarchyPage() {
  const [tree, setTree] = useState<PositionTree | null>(null);
  const [allPositions, setAllPositions] = useState<Position[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<Position | null>(null);
  const [department, setDepartment] = useState(DEPARTMENTS[0]);
  const [showDeptDropdown, setShowDeptDropdown] = useState(false);
  const [scale, setScale] = useState(0.9);
  const [lastSaved, setLastSaved] = useState("Today at 10:42 AM");

  // Estado editable del panel — vive aquí para que Save/Discard lo controlen
  const [editSuperior, setEditSuperior] = useState("");
  const [editReports, setEditReports] = useState<string[]>([]);

  useEffect(() => {
    getPositions()
      .then((positions) => {
        setAllPositions(positions);
        setTree(buildPositionTree(positions));
      })
      .catch(() => setError("Could not load the hierarchy."))
      .finally(() => setLoading(false));
  }, []);

  const handleSelect = useCallback((pos: Position) => {
    setSelected((prev) => {
      if (prev?.id === pos.id) {
        setEditSuperior("");
        setEditReports([]);
        return null;
      }
      // Buscar siempre la versión más reciente desde allPositions (puede estar guardada)
      setAllPositions((current) => {
        const saved = current.find((p) => p.id === pos.id) ?? pos;
        setEditSuperior(saved.superiorName ?? "");
        setEditReports(saved.directReportNames);
        return current; // sin cambios, solo leemos
      });
      return pos;
    });
  }, []);

  const handleClose = useCallback(() => {
    setSelected(null);
    setEditSuperior("");
    setEditReports([]);
  }, []);

  const handleDiscard = () => {
    if (selected) {
      setEditSuperior(selected.superiorName ?? "");
      setEditReports(selected.directReportNames);
    }
    handleClose();
  };

  const handleSave = () => {
    if (selected) {
      // Persistir los cambios en allPositions y en selected
      const updatedPos: Position = {
        ...selected,
        superiorName: editSuperior,
        directReportNames: editReports,
      };
      setAllPositions((prev) =>
        prev.map((p) => (p.id === selected.id ? updatedPos : p))
      );
      setSelected(updatedPos);
    }

    const now = new Date();
    const h = now.getHours();
    const m = now.getMinutes().toString().padStart(2, "0");
    const ampm = h >= 12 ? "PM" : "AM";
    setLastSaved(`Today at ${h % 12 || 12}:${m} ${ampm}`);
    toast.success("Changes saved successfully", {
      duration: 3500,
      style: {
        background: "#0F1819",
        color: "#fff",
        fontSize: "13px",
        fontWeight: "600",
        borderRadius: "12px",
        border: "1px solid #203D47",
      },
      iconTheme: { primary: "#34d399", secondary: "#0F1819" },
    });
  };

  return (
    <div className="flex flex-col h-full w-full bg-[#f4f7f8]">
      {/* Breadcrumb */}
      <header className="flex items-center px-6 py-3.5 bg-white border-b border-[#d1dde2] shrink-0">
        <nav className="flex items-center gap-1.5 text-xs text-[#8aa3ad]">
          <span className="hover:text-[#203D47] cursor-pointer transition-colors">Dashboard</span>
          <ChevronRight size={12} className="text-[#c5d5db]" />
          <span className="hover:text-[#203D47] cursor-pointer transition-colors">Organizational Structure</span>
          <ChevronRight size={12} className="text-[#c5d5db]" />
          <span className="hover:text-[#203D47] cursor-pointer transition-colors">Positions</span>
          <ChevronRight size={12} className="text-[#c5d5db]" />
          <span className="text-[#0F1819] font-semibold">Hierarchy</span>
        </nav>
      </header>

      {/* Contenido principal */}
      <main className="flex-1 px-6 py-5 flex flex-col gap-4 overflow-hidden">
        {/* Título */}
        <div>
          <h1 className="text-xl font-bold text-[#0F1819]">Position Hierarchy</h1>
          <p className="text-sm text-[#8aa3ad] mt-0.5">
            Define and manage reporting relationships and organizational structure across your departments.
          </p>
        </div>

        {/* Barra de filtros */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <button
              onClick={() => setShowDeptDropdown((v) => !v)}
              className="flex items-center gap-2 bg-white border border-[#d1dde2] rounded-xl px-4 py-2.5 text-sm text-[#0F1819] font-medium hover:border-[#b0c4cc] transition-colors"
            >
              <span>{department}</span>
              <ChevronDown size={14} className="text-[#8aa3ad]" />
            </button>

            {showDeptDropdown && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setShowDeptDropdown(false)} />
                <div className="absolute left-0 top-full mt-1.5 z-20 bg-white border border-[#d1dde2] rounded-xl shadow-lg overflow-hidden min-w-full">
                  {DEPARTMENTS.map((d) => (
                    <button
                      key={d}
                      onClick={() => { setDepartment(d); setShowDeptDropdown(false); }}
                      className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                        d === department
                          ? "bg-emerald-50 text-emerald-700 font-semibold"
                          : "text-[#0F1819] hover:bg-[#f4f7f8]"
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          <button className="flex items-center gap-2 border border-[#d1dde2] bg-white text-[#4a7880] text-sm font-medium px-4 py-2.5 rounded-xl hover:border-[#b0c4cc] hover:bg-[#f4f7f8] transition-colors">
            <Filter size={14} />
            Advanced Filters
          </button>
        </div>

        {/* Card árbol + panel */}
        <div className="flex-1 bg-white rounded-2xl border border-[#d1dde2] shadow-sm overflow-hidden flex min-h-0">
          {loading && (
            <div className="flex-1 flex items-center justify-center">
              <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-8 rounded-full border-2 border-[#203D47] border-t-emerald-400 animate-spin" />
                <span className="text-xs text-[#8aa3ad]">Loading hierarchy…</span>
              </div>
            </div>
          )}

          {error && (
            <div className="flex-1 flex items-center justify-center">
              <div className="bg-rose-50 border border-rose-200 rounded-xl px-6 py-4 text-sm text-rose-500">
                {error}
              </div>
            </div>
          )}

          {!loading && !error && tree && (
            <>
              <OrgTree
                tree={tree}
                selectedId={selected?.id ?? null}
                onSelect={handleSelect}
                onAddChild={() => {}}
                scale={scale}
                onZoomIn={() => setScale((s) => Math.min(2, s + 0.15))}
                onZoomOut={() => setScale((s) => Math.max(0.3, s - 0.15))}
                onReset={() => setScale(0.9)}
              />
              <PositionDetailPanel
                position={selected}
                allPositions={allPositions}
                superior={editSuperior}
                reports={editReports}
                onSuperiorChange={setEditSuperior}
                onReportsChange={setEditReports}
                onClose={handleClose}
              />
            </>
          )}
        </div>
      </main>

      {/* Barra inferior — solo visible con panel abierto */}
      <footer
        className={`flex items-center justify-between px-6 bg-white border-t border-[#d1dde2] shrink-0 transition-all duration-200 ease-out overflow-hidden ${
          selected ? "py-3.5 opacity-100 pointer-events-auto max-h-20" : "py-0 opacity-0 pointer-events-none max-h-0"
        }`}
      >
        <div className="flex items-center gap-2 text-xs text-[#8aa3ad]">
          <Clock size={13} />
          <span>Last saved: {lastSaved}</span>
        </div>
        <div className="flex items-center gap-2.5">
          <button
            onClick={handleDiscard}
            className="px-5 py-2.5 border border-[#d1dde2] text-[#4a7880] text-sm font-semibold rounded-xl hover:border-[#b0c4cc] hover:bg-[#f4f7f8] transition-colors"
          >
            Discard Changes
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
          >
            <Save size={14} />
            Save Changes
          </button>
        </div>
      </footer>
    </div>
  );
}
