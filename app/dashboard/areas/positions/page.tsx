"use client";

import { useState } from "react";
import PositionsTabs from "@/components/areas/positions/PositionsTabs";
import PositionsTable from "@/components/areas/positions/PositionsTable";
import NewPositionModal from "@/components/areas/positions/NewPositionModal";
import { Position } from "@/services/positionsService";

export default function PositionsPage() {
  const [activeTab, setActiveTab] = useState<"All" | "Hierarchy" | "Archived">(
    "All"
  );
  const [searchText, setSearchText] = useState("");
  const [showNewModal, setShowNewModal] = useState(false);
  const [statusFilter, setStatusFilter] = useState<"Active" | "Drafting" | "all">(
    "all"
  );

  // Map tabs to status filters
  const getStatusFilter = (tab: string): "Active" | "Drafting" | "all" => {
    if (tab === "Hierarchy") return "Active";
    if (tab === "Archived") return "Drafting";
    return "all";
  };

  const handleTabChange = (tab: "All" | "Hierarchy" | "Archived") => {
    setActiveTab(tab);
    setStatusFilter(getStatusFilter(tab));
  };

  const handlePositionCreated = (position: Position) => {
    // Re-render by changing tab (this would trigger data refetch)
    setActiveTab("All");
    setStatusFilter("all");
  };

  return (
    <div className="min-h-screen bg-[#ECEFF1]">
      {/* Header */}
      <div className="bg-[#203D47] px-8 py-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white">Positions</h1>
            <p className="text-[#8aa3ad] mt-2 text-sm font-normal">
              Manage and monitor organizational roles and hierarchies.
            </p>
          </div>
          <button
            onClick={() => setShowNewModal(true)}
            className="bg-[#2ECC71] text-white px-6 py-2.5 rounded font-semibold hover:bg-emerald-600 transition-colors flex items-center gap-2 h-fit shadow-md"
          >
            + New Position
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8">
        {/* Search and Filter Bar */}
        <div className="mb-6 flex gap-4 items-center">
          <div className="flex-1 relative">
            <svg className="absolute left-3 top-3 w-5 h-5 text-[#8aa3ad]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search positions, areas or employees..."
              className="w-full pl-10 pr-4 py-2.5 border border-[#BDD5EA] rounded bg-white text-[#0F1819] placeholder-[#8aa3ad] focus:outline-none focus:border-[#2ECC71] text-sm"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 border border-[#BDD5EA] rounded bg-white text-[#203D47] hover:bg-[#ECEFF1] transition-colors font-medium text-sm">
            ⚙ Filter
          </button>
        </div>

        {/* Card Container */}
        <div className="bg-white rounded-lg border border-[#BDD5EA] overflow-hidden">
          {/* Tabs */}
          <PositionsTabs activeTab={activeTab} onTabChange={handleTabChange} />

          {/* Table */}
          <div className="p-6">
            <PositionsTable
              searchText={searchText}
              status={statusFilter}
              onEdit={(position) => {
                // TODO: Implement edit modal
                console.log("Edit:", position);
              }}
              onDelete={(positionId) => {
                // TODO: Implement delete functionality
                console.log("Delete:", positionId);
              }}
            />
          </div>
        </div>
      </div>

      {/* New Position Modal */}
      <NewPositionModal
        isOpen={showNewModal}
        onClose={() => setShowNewModal(false)}
        onSuccess={handlePositionCreated}
      />
    </div>
  );
}
