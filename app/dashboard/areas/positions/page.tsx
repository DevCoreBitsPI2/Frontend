"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  ChevronRight,
  ChevronLeft,
  ChevronUp,
  ChevronDown,
  Search,
  SlidersHorizontal,
  MoreVertical,
  AlertTriangle,
  CheckCircle2,
  X,
  Pencil,
  Archive,
  Eye,
  Info,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type PositionStatus = "Active" | "Inactive" | "Drafting";
type ActiveTab = "all" | "open" | "archived";

interface AvatarEntry {
  name: string;
  color: string;
}

interface PositionEntry {
  id: string;
  posCode: string;
  name: string;
  department: string;
  employeeCount: number;
  avatars: AvatarEntry[];
  superiorName: string | null;
  status: PositionStatus;
  hasWarning: boolean;
  location?: string;
  employmentType?: string;
}

// ─── Mock data (connected to org-chart positions) ─────────────────────────────

const COLORS = [
  "#6366f1", "#8b5cf6", "#ec4899", "#f59e0b",
  "#10b981", "#3b82f6", "#ef4444", "#14b8a6",
  "#f97316", "#06b6d4", "#84cc16", "#a855f7",
];
const c = (i: number) => COLORS[i % COLORS.length];

const POSITIONS_MOCK: PositionEntry[] = [
  {
    id: "1", posCode: "POS-0293", name: "Senior Architect", department: "Engineering",
    employeeCount: 5,
    avatars: [{ name: "Maria L.", color: c(0) }, { name: "John D.", color: c(1) }, { name: "Sara K.", color: c(2) }],
    superiorName: "Chief Technology Officer", status: "Inactive", hasWarning: false,
  },
  {
    id: "2", posCode: "POS-0442", name: "Cloud Infrastructure Lead", department: "Engineering",
    employeeCount: 1,
    avatars: [{ name: "Tom W.", color: c(3) }],
    superiorName: "Senior Architect", status: "Active", hasWarning: false,
  },
  {
    id: "3", posCode: "POS-0558", name: "Security Analyst", department: "Security",
    employeeCount: 0,
    avatars: [],
    superiorName: null, status: "Drafting", hasWarning: true,
  },
  {
    id: "4", posCode: "POS-0895", name: "Frontend Developer", department: "Engineering",
    employeeCount: 2,
    avatars: [{ name: "Ana P.", color: c(4) }, { name: "Luis M.", color: c(5) }],
    superiorName: "Engineering Manager", status: "Active", hasWarning: false,
  },
  {
    id: "5", posCode: "POS-1023", name: "Backend Developer", department: "Engineering",
    employeeCount: 3,
    avatars: [{ name: "Carlos R.", color: c(6) }, { name: "Diana F.", color: c(7) }, { name: "Elena V.", color: c(0) }],
    superiorName: "Senior Architect", status: "Active", hasWarning: false,
  },
  {
    id: "6", posCode: "POS-1145", name: "QA Engineer", department: "Quality",
    employeeCount: 2,
    avatars: [{ name: "Felix N.", color: c(1) }, { name: "Grace H.", color: c(2) }],
    superiorName: "Engineering Manager", status: "Active", hasWarning: false,
  },
  {
    id: "7", posCode: "POS-1287", name: "DevOps Engineer", department: "Operations",
    employeeCount: 0,
    avatars: [],
    superiorName: "Cloud Infrastructure Lead", status: "Drafting", hasWarning: true,
  },
  {
    id: "8", posCode: "POS-1334", name: "Product Manager", department: "Product",
    employeeCount: 1,
    avatars: [{ name: "Ivan O.", color: c(3) }],
    superiorName: "Department Director", status: "Active", hasWarning: false,
  },
  {
    id: "9", posCode: "POS-1456", name: "UX Designer", department: "Design",
    employeeCount: 2,
    avatars: [{ name: "Julia S.", color: c(4) }, { name: "Kevin B.", color: c(5) }],
    superiorName: "Product Manager", status: "Active", hasWarning: false,
  },
  {
    id: "10", posCode: "POS-1589", name: "Data Analyst", department: "Analytics",
    employeeCount: 1,
    avatars: [{ name: "Laura C.", color: c(6) }],
    superiorName: "Department Director", status: "Inactive", hasWarning: false,
  },
  {
    id: "11", posCode: "POS-1623", name: "HR Specialist", department: "Human Resources",
    employeeCount: 3,
    avatars: [{ name: "Mike R.", color: c(7) }, { name: "Nina A.", color: c(0) }, { name: "Oscar T.", color: c(1) }],
    superiorName: "HR Manager", status: "Active", hasWarning: false,
  },
  {
    id: "12", posCode: "POS-1744", name: "Financial Analyst", department: "Finance",
    employeeCount: 0,
    avatars: [],
    superiorName: null, status: "Drafting", hasWarning: true,
  },
  {
    id: "13", posCode: "POS-1856", name: "Department Director", department: "Engineering",
    employeeCount: 12,
    avatars: [{ name: "Paula M.", color: c(8) }, { name: "Raul D.", color: c(9) }, { name: "Sofia K.", color: c(10) }],
    superiorName: null, status: "Active", hasWarning: false,
  },
  {
    id: "14", posCode: "POS-1978", name: "Engineering Manager", department: "Engineering",
    employeeCount: 4,
    avatars: [{ name: "Victor H.", color: c(11) }, { name: "Wendy F.", color: c(0) }],
    superiorName: "Department Director", status: "Active", hasWarning: false,
  },
  {
    id: "15", posCode: "POS-2034", name: "HR Manager", department: "Human Resources",
    employeeCount: 2,
    avatars: [{ name: "Xander L.", color: c(2) }, { name: "Yara N.", color: c(3) }],
    superiorName: "Department Director", status: "Inactive", hasWarning: false,
  },
];

const TOTAL_DISPLAY = 42;
const PAGE_SIZE = 4;

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: PositionStatus }) {
  const variants: Record<PositionStatus, string> = {
    Active:   "bg-emerald-50 text-emerald-700 border border-emerald-200",
    Inactive: "bg-gray-100 text-gray-500 border border-gray-200",
    Drafting: "bg-amber-50 text-amber-600 border border-amber-200",
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${variants[status]}`}>
      {status}
    </span>
  );
}

function AvatarStack({ avatars, count }: { avatars: AvatarEntry[]; count: number }) {
  if (count === 0) return <span className="text-sm text-[#8aa3ad]">None</span>;
  const shown = avatars.slice(0, 3);
  const overflow = count - shown.length;
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex -space-x-2">
        {shown.map((av, i) => (
          <div
            key={i}
            className="w-7 h-7 rounded-full border-2 border-white flex items-center justify-center text-white text-[10px] font-bold shrink-0"
            style={{ backgroundColor: av.color }}
            title={av.name}
          >
            {av.name.charAt(0)}
          </div>
        ))}
      </div>
      {overflow > 0 && (
        <span className="text-xs text-[#8aa3ad] font-medium">+{overflow}</span>
      )}
    </div>
  );
}

function SuccessToast({ title, subtitle, onClose }: { title: string; subtitle: string; onClose: () => void }) {
  useEffect(() => {
    const t = setTimeout(onClose, 4000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div
      className="fixed top-5 right-5 z-50 flex items-start gap-3 bg-white rounded-2xl shadow-2xl border border-gray-100 px-4 py-3.5 w-72"
      style={{ animation: "toastIn 0.2s ease-out" }}
    >
      <style>{`@keyframes toastIn { from { opacity:0; transform:translateY(-10px); } to { opacity:1; transform:translateY(0); } }`}</style>
      <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
        <CheckCircle2 size={18} className="text-emerald-500" />
      </div>
      <div className="flex-1 pt-0.5">
        <p className="text-sm font-semibold text-[#0F1819] leading-tight">{title}</p>
        <p className="text-xs text-[#8aa3ad] mt-0.5 leading-tight">{subtitle}</p>
      </div>
      <button onClick={onClose} className="text-[#8aa3ad] hover:text-[#203D47] transition-colors mt-0.5">
        <X size={14} />
      </button>
    </div>
  );
}

const AREAS = [
  "Engineering", "Engineering & Design", "Security", "Quality",
  "Operations", "Product", "Design", "Analytics", "Human Resources", "Finance",
];
const EMPLOYMENT_TYPES = ["Full-time", "Part-time", "Contract", "Temporary", "Intern"];

function EditPositionModal({
  position,
  onClose,
  onSave,
}: {
  position: PositionEntry;
  onClose: () => void;
  onSave: (updates: Pick<PositionEntry, "name" | "status" | "department" | "location" | "employmentType">) => void;
}) {
  const [name, setName] = useState(position.name);
  const [isActive, setIsActive] = useState(position.status === "Active");
  const [area, setArea] = useState(position.department);
  const [location, setLocation] = useState(position.location ?? "New York HQ");
  const [employmentType, setEmploymentType] = useState(position.employmentType ?? "Full-time");

  return (
    <div className="fixed inset-0 z-40 bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-4 p-6">

        {/* Header */}
        <div className="flex items-start justify-between mb-5">
          <div>
            <h2 className="text-xl font-bold text-[#0F1819]">Edit Position</h2>
            <p className="text-sm text-emerald-500 mt-0.5">
              Update the details for the {position.name} role.
            </p>
          </div>
          <button onClick={onClose} className="text-[#8aa3ad] hover:text-[#203D47] transition-colors mt-1">
            <X size={18} />
          </button>
        </div>

        <div className="flex flex-col gap-4">
          {/* Position Title */}
          <div>
            <label className="block text-sm font-medium text-[#0F1819] mb-1.5">Position Title</label>
            <input
              className="w-full border border-[#d1dde2] rounded-xl px-3 py-2.5 text-sm text-[#0F1819] focus:outline-none focus:ring-2 focus:ring-emerald-400"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
            />
          </div>

          {/* Status toggle */}
          <div className={`rounded-xl px-4 py-3 flex items-center justify-between gap-4 transition-colors duration-200 ${isActive ? "bg-emerald-50" : "bg-gray-100"}`}>
            <div>
              <p className="text-sm font-semibold text-[#0F1819]">Status</p>
              <p className="text-xs text-[#8aa3ad] mt-0.5 leading-snug">
                The current position is {isActive ? "active" : "inactive"} and{" "}
                {isActive ? "visible" : "hidden"} in the organization chart.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsActive((v) => !v)}
              className={`relative shrink-0 w-11 h-6 rounded-full transition-colors duration-200 ${
                isActive ? "bg-emerald-500" : "bg-gray-300"
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${
                  isActive ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          {/* Area */}
          <div>
            <label className="block text-sm font-medium text-[#0F1819] mb-1.5">Area</label>
            <div className="relative">
              <select
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className="w-full appearance-none border border-[#d1dde2] rounded-xl px-3 py-2.5 text-sm text-[#0F1819] focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white pr-8"
              >
                {AREAS.map((a) => <option key={a} value={a}>{a}</option>)}
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none flex flex-col -gap-0.5">
                <ChevronUp size={10} className="text-[#8aa3ad]" />
                <ChevronDown size={10} className="text-[#8aa3ad]" />
              </div>
            </div>
            <p className="flex items-center gap-1.5 text-xs text-[#8aa3ad] mt-1.5">
              <Info size={12} className="shrink-0" />
              Changing the area will reset the superior position.
            </p>
          </div>

          {/* Location + Employment Type */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-[#0F1819] mb-1.5">Location</label>
              <input
                className="w-full border border-[#d1dde2] rounded-xl px-3 py-2.5 text-sm text-[#0F1819] focus:outline-none focus:ring-2 focus:ring-emerald-400"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#0F1819] mb-1.5">Employment Type</label>
              <div className="relative">
                <select
                  value={employmentType}
                  onChange={(e) => setEmploymentType(e.target.value)}
                  className="w-full appearance-none border border-[#d1dde2] rounded-xl px-3 py-2.5 text-sm text-[#0F1819] focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white pr-8"
                >
                  {EMPLOYMENT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none flex flex-col -gap-0.5">
                  <ChevronUp size={10} className="text-[#8aa3ad]" />
                  <ChevronDown size={10} className="text-[#8aa3ad]" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-end gap-2 mt-6">
          <button
            onClick={onClose}
            className="px-5 py-2 text-sm text-[#8aa3ad] hover:text-[#203D47] transition-colors"
          >
            Cancel
          </button>
          <button
            disabled={!name.trim()}
            onClick={() => onSave({ name: name.trim(), status: isActive ? "Active" : "Inactive", department: area, location, employmentType })}
            className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-emerald-500 text-white hover:bg-emerald-400 disabled:opacity-40 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function PositionsPage() {
  const [positions, setPositions] = useState<PositionEntry[]>(POSITIONS_MOCK);
  const [activeTab, setActiveTab] = useState<ActiveTab>("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [editTarget, setEditTarget] = useState<PositionEntry | null>(null);
  const [toast, setToast] = useState<{ title: string; subtitle: string } | null>(null);
  const menuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (openMenu) {
        const el = menuRefs.current[openMenu];
        if (el && !el.contains(e.target as Node)) setOpenMenu(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [openMenu]);

  const filtered = positions.filter((p) => {
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      p.name.toLowerCase().includes(q) ||
      p.posCode.toLowerCase().includes(q) ||
      p.department.toLowerCase().includes(q);
    if (activeTab === "open") return matchSearch && p.employeeCount === 0;
    if (activeTab === "archived") return matchSearch && p.status === "Inactive";
    return matchSearch;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const displayTotal = !search && activeTab === "all" ? TOTAL_DISPLAY : filtered.length;

  const handleEdit = useCallback((pos: PositionEntry) => {
    setOpenMenu(null);
    setEditTarget(pos);
  }, []);

  const handleSaveEdit = useCallback(
    (updates: Pick<PositionEntry, "name" | "status" | "department" | "location" | "employmentType">) => {
      if (!editTarget) return;
      setPositions((prev) =>
        prev.map((p) => (p.id === editTarget.id ? { ...p, ...updates } : p))
      );
      setEditTarget(null);
      setToast({
        title: "Position edited successfully",
        subtitle: "The new changes were implemented",
      });
    },
    [editTarget]
  );

  const tabs: { key: ActiveTab; label: string }[] = [
    { key: "all", label: "All Positions" },
    { key: "open", label: "Open Roles" },
    { key: "archived", label: "Archived" },
  ];

  const visiblePages = Array.from({ length: Math.min(totalPages, 3) }, (_, i) => i + 1);

  return (
    <div className="flex flex-col h-full w-full bg-[#f4f7f8]">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-3.5 bg-white border-b border-[#d1dde2] shrink-0">
        <nav className="flex items-center gap-1.5 text-xs text-[#8aa3ad]">
          <span className="hover:text-[#203D47] cursor-pointer transition-colors">Talent Management</span>
          <ChevronRight size={12} className="text-[#c5d5db]" />
          <span className="text-[#0F1819] font-semibold">Positions</span>
        </nav>
      </header>

      {/* Content */}
      <main className="flex-1 px-6 py-6 overflow-auto">
        <div className="mb-5">
          <h1 className="text-2xl font-bold text-[#0F1819]">Positions</h1>
          <p className="text-sm text-[#8aa3ad] mt-0.5">
            Manage and monitor organizational roles and hierarchies.
          </p>
        </div>

        {/* Main card */}
        <div className="bg-white rounded-2xl border border-[#d1dde2] overflow-hidden">
          {/* Tabs */}
          <div className="flex items-center border-b border-[#d1dde2] px-4">
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => { setActiveTab(t.key); setPage(1); }}
                className={`px-4 py-3.5 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === t.key
                    ? "border-emerald-500 text-emerald-600"
                    : "border-transparent text-[#8aa3ad] hover:text-[#203D47]"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Search + Filter */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-[#f0f4f5]">
            <div className="flex-1 relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8aa3ad] pointer-events-none" />
              <input
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                placeholder="Search positions, areas or employees..."
                className="w-full pl-9 pr-4 py-2 text-sm text-[#0F1819] border border-[#d1dde2] rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 placeholder:text-[#8aa3ad]"
              />
            </div>
            <button className="flex items-center gap-2 px-3.5 py-2 text-sm text-[#8aa3ad] border border-[#d1dde2] rounded-xl hover:bg-gray-50 transition-colors shrink-0">
              <SlidersHorizontal size={14} />
              Filter
            </button>
          </div>

          {/* Table header */}
          <div className="grid grid-cols-[2fr_1.2fr_1.5fr_1fr_52px] gap-4 px-6 py-2.5 bg-[#f8fafa] border-b border-[#f0f4f5]">
            {(["POSITION", "EMPLOYEES", "SUPERIOR POSITION", "STATUS", "ACTIONS"] as const).map(
              (col, i) => (
                <span
                  key={col}
                  className={`text-[10px] font-bold tracking-widest text-[#8aa3ad] uppercase ${
                    i === 4 ? "text-right" : ""
                  }`}
                >
                  {col}
                </span>
              )
            )}
          </div>

          {/* Rows */}
          {pageItems.length === 0 ? (
            <div className="py-16 text-center text-sm text-[#8aa3ad]">No positions found</div>
          ) : (
            pageItems.map((pos) => (
              <div
                key={pos.id}
                className="grid grid-cols-[2fr_1.2fr_1.5fr_1fr_52px] gap-4 items-center px-6 py-3.5 border-b border-[#f0f4f5] last:border-b-0 hover:bg-[#fafcfc] transition-colors"
              >
                {/* Position name + code */}
                <div className="flex items-center gap-2 min-w-0">
                  {pos.hasWarning && (
                    <AlertTriangle size={14} className="text-amber-400 shrink-0" />
                  )}
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-[#0F1819] truncate">{pos.name}</p>
                    <p className="text-xs text-[#8aa3ad]">{pos.posCode}</p>
                  </div>
                </div>

                {/* Employees */}
                <div>
                  <AvatarStack avatars={pos.avatars} count={pos.employeeCount} />
                </div>

                {/* Superior */}
                <div>
                  {pos.superiorName ? (
                    <span className="text-sm text-[#203D47]">{pos.superiorName}</span>
                  ) : (
                    <span className="text-sm font-medium text-rose-400">Undefined</span>
                  )}
                </div>

                {/* Status */}
                <div>
                  <StatusBadge status={pos.status} />
                </div>

                {/* Actions */}
                <div
                  className="relative flex justify-end"
                  ref={(el) => { menuRefs.current[pos.id] = el; }}
                >
                  <button
                    onClick={() => setOpenMenu(openMenu === pos.id ? null : pos.id)}
                    className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-100 text-[#8aa3ad] hover:text-[#203D47] transition-colors"
                  >
                    <MoreVertical size={15} />
                  </button>

                  {openMenu === pos.id && (
                    <div className="absolute right-0 top-full mt-1 w-44 bg-white rounded-xl shadow-lg border border-[#d1dde2] z-20 py-1 overflow-hidden">
                      <button
                        onClick={() => handleEdit(pos)}
                        className="flex items-center gap-2.5 w-full px-3.5 py-2 text-sm text-[#203D47] hover:bg-gray-50 transition-colors"
                      >
                        <Pencil size={13} className="text-[#8aa3ad]" />
                        Edit position
                      </button>
                      <button className="flex items-center gap-2.5 w-full px-3.5 py-2 text-sm text-[#203D47] hover:bg-gray-50 transition-colors">
                        <Eye size={13} className="text-[#8aa3ad]" />
                        View details
                      </button>
                      <button className="flex items-center gap-2.5 w-full px-3.5 py-2 text-sm text-rose-500 hover:bg-rose-50 transition-colors">
                        <Archive size={13} className="text-rose-400" />
                        Archive
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}

          {/* Pagination */}
          <div className="flex items-center justify-between px-6 py-3.5 border-t border-[#f0f4f5]">
            <span className="text-xs text-[#8aa3ad]">
              Showing {pageItems.length} of {displayTotal} positions
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-100 text-[#8aa3ad] disabled:opacity-30 transition-colors"
              >
                <ChevronLeft size={14} />
              </button>
              {visiblePages.map((n) => (
                <button
                  key={n}
                  onClick={() => setPage(n)}
                  className={`w-7 h-7 flex items-center justify-center rounded-lg text-xs font-medium transition-colors ${
                    page === n
                      ? "bg-[#203D47] text-white"
                      : "text-[#8aa3ad] hover:bg-gray-100"
                  }`}
                >
                  {n}
                </button>
              ))}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-100 text-[#8aa3ad] disabled:opacity-30 transition-colors"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Edit Modal */}
      {editTarget && (
        <EditPositionModal
          position={editTarget}
          onClose={() => setEditTarget(null)}
          onSave={handleSaveEdit}
        />
      )}

      {/* Toast */}
      {toast && (
        <SuccessToast
          title={toast.title}
          subtitle={toast.subtitle}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
