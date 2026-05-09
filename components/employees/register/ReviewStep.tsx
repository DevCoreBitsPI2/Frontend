"use client";
import React from "react";

interface Props {
  data: any;
  employeeId?: string;
}

const ReviewStep: React.FC<Props> = ({ data, employeeId }) => {
  return (
    <div className="grid grid-cols-3 gap-8">
      {/* Left Column - Employee Summary */}
      <div className="col-span-2 space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-5 h-5 bg-[#2ECC71] rounded flex items-center justify-center text-white text-xs">
            ✓
          </div>
          <h2 className="text-lg font-semibold text-[#203D47]">Employee Summary</h2>
        </div>

        {/* Data Grid */}
        <div className="grid grid-cols-2 gap-y-5 gap-x-6">
          {/* Full Name */}
          <div>
            <div className="text-xs font-semibold text-[#8aa3ad] uppercase mb-1">Full Name</div>
            <div className="text-sm text-[#203D47] font-medium">{data.fullName || "—"}</div>
          </div>

          {/* Employee ID */}
          <div>
            <div className="text-xs font-semibold text-[#8aa3ad] uppercase mb-1">Employee ID</div>
            <div className="text-sm text-[#203D47] font-medium font-mono">
              {employeeId || "EMP-2024-XXX"}
            </div>
          </div>

          {/* Email Address */}
          <div>
            <div className="text-xs font-semibold text-[#8aa3ad] uppercase mb-1">Email Address</div>
            <div className="text-sm text-[#203D47]">{data.email || "—"}</div>
          </div>

          {/* Phone Number */}
          <div>
            <div className="text-xs font-semibold text-[#8aa3ad] uppercase mb-1">Phone Number</div>
            <div className="text-sm text-[#203D47]">{data.phone || "—"}</div>
          </div>

          {/* Job Role */}
          <div>
            <div className="text-xs font-semibold text-[#8aa3ad] uppercase mb-1">Job Role</div>
            <div className="text-sm text-[#203D47]">{data.positionName || "—"}</div>
          </div>

          {/* Department */}
          <div>
            <div className="text-xs font-semibold text-[#8aa3ad] uppercase mb-1">Department</div>
            <div className="text-sm text-[#203D47]">{data.areaName || "—"}</div>
          </div>

          {/* Start Date */}
          <div>
            <div className="text-xs font-semibold text-[#8aa3ad] uppercase mb-1">Start Date</div>
            <div className="text-sm text-[#203D47]">{data.hireDate || "—"}</div>
          </div>

          {/* Office Location */}
          <div>
            <div className="text-xs font-semibold text-[#8aa3ad] uppercase mb-1">Office Location</div>
            <div className="text-sm text-[#203D47]">Main HQ</div>
          </div>

          {/* Reports To */}
          <div className="col-span-2">
            <div className="text-xs font-semibold text-[#8aa3ad] uppercase mb-1">Reports To</div>
            <div className="text-sm text-[#203D47]">Department Manager</div>
          </div>
        </div>

        {/* Ready for Onboarding Banner */}
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
          <div className="flex gap-3">
            <div className="text-2xl">ℹ️</div>
            <div>
              <div className="font-semibold text-sm text-[#203D47]">Ready for Onboarding</div>
              <div className="text-xs text-[#203D47] mt-1">
                Please confirm the details above. Once submitted, an automated welcome email with login
                credentials will be sent to the employee's email address.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Digital ID Preview */}
      <div className="col-span-1">
        <div className="bg-gradient-to-b from-[#1E333A] to-[#0F1819] rounded-lg p-6 text-white text-center">
          <div className="mb-4">
            <div className="text-xs font-semibold uppercase text-[#8aa3ad] mb-3">Digital ID</div>
          </div>

          {/* Profile Photo */}
          <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-4 border-4 border-[#2ECC71]">
            {data.photo ? (
              <img src={data.photo} alt="profile" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gray-400 flex items-center justify-center">👤</div>
            )}
          </div>

          {/* Name */}
          <div className="font-bold text-sm mb-1">{data.fullName || "Name"}</div>

          {/* Position */}
          <div className="text-xs text-[#2ECC71] uppercase font-semibold mb-4">{data.positionName || "Position"}</div>

          {/* Divider */}
          <div className="h-px bg-gray-600 my-4" />



          {/* Employee ID */}
          <div className="text-xs font-mono text-gray-300">{employeeId || "EMP-2024-001"}</div>

          {/* Note */}
          <div className="mt-4 pt-4 border-t border-gray-600">
            <div className="text-xs text-[#8aa3ad]">
              Digital ID will be accessible via the employee mobile app after confirmation.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewStep;
