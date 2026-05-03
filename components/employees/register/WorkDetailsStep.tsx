"use client";
import React, { useEffect, useState } from "react";
import { AREAS_MOCK, POSITIONS_MOCK, CONTRACT_TYPES } from "../../../services/registerEmployeeService";

interface Props {
  data: any;
  onChange: (patch: any) => void;
}

const WorkDetailsStep: React.FC<Props> = ({ data, onChange }) => {
  const [positions, setPositions] = useState(POSITIONS_MOCK);

  useEffect(() => {
    if (data.areaId) {
      setPositions(POSITIONS_MOCK.filter((p) => p.areaId === data.areaId));
    } else {
      setPositions(POSITIONS_MOCK);
    }
  }, [data.areaId]);

  return (
    <div className="grid grid-cols-2 gap-6">
      {/* Area / Department */}
      <div>
        <label className="block text-xs font-semibold text-[#203D47] uppercase mb-2">
          Area / Department
        </label>
        <select
          value={data.areaId || ""}
          onChange={(e) => onChange({ areaId: e.target.value, positionId: "" })}
          className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-[#ECEFF1] focus:outline-none focus:ring-2 focus:ring-[#2ECC71]"
        >
          <option value="">Select Area</option>
          {AREAS_MOCK.map((a) => (
            <option key={a.id} value={a.id}>
              {a.nombre}
            </option>
          ))}
        </select>
      </div>

      {/* Position */}
      <div>
        <label className="block text-xs font-semibold text-[#203D47] uppercase mb-2">
          Position
        </label>
        <select
          value={data.positionId || ""}
          onChange={(e) => onChange({ positionId: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-[#ECEFF1] focus:outline-none focus:ring-2 focus:ring-[#2ECC71]"
        >
          <option value="">Select Position</option>
          {positions.map((p: any) => (
            <option key={p.id} value={p.id}>
              {p.nombre}
            </option>
          ))}
        </select>
      </div>

      {/* Hire Date */}
      <div>
        <label className="block text-xs font-semibold text-[#203D47] uppercase mb-2">
          Hire Date
        </label>
        <input
          type="date"
          value={data.hireDate || ""}
          onChange={(e) => onChange({ hireDate: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-[#ECEFF1] focus:outline-none focus:ring-2 focus:ring-[#2ECC71]"
        />
      </div>

      {/* Contract Type */}
      <div>
        <label className="block text-xs font-semibold text-[#203D47] uppercase mb-2">
          Contract Type
        </label>
        <select
          value={data.contractType || ""}
          onChange={(e) => onChange({ contractType: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-[#ECEFF1] focus:outline-none focus:ring-2 focus:ring-[#2ECC71]"
        >
          <option value="">Select Type</option>
          {CONTRACT_TYPES.map((c) => (
            <option key={c.id} value={c.id}>
              {c.nombre}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default WorkDetailsStep;
