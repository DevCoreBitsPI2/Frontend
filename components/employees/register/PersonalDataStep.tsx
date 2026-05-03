"use client";
import React, { useRef, useState } from "react";
import { DOCUMENT_TYPES } from "../../../services/registerEmployeeService";

interface Props {
  data: any;
  onChange: (patch: any) => void;
}

const PersonalDataStep: React.FC<Props> = ({ data, onChange }) => {
  const [photoPreview, setPhotoPreview] = useState<string | undefined>(data.photo);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const docsInputRef = useRef<HTMLInputElement | null>(null);

  const handlePhoto = (file?: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const res = reader.result as string;
      setPhotoPreview(res);
      onChange({ photo: res });
    };
    reader.readAsDataURL(file);
  };

  const handleDocs = (files: FileList | null) => {
    if (!files) return;
    const arr = Array.from(files).map((f) => ({ name: f.name, size: f.size, type: f.type }));
    onChange({ files: [...(data.files || []), ...arr] });
  };

  const removeDoc = (i: number) => {
    const next = (data.files || []).filter((_: any, idx: number) => idx !== i);
    onChange({ files: next });
  };

  const bytesToKb = (n: number) => `${Math.round(n / 1024)} KB`;

  return (
    <div className="grid grid-cols-3 gap-8">
      {/* Left Column - Personal Info */}
      <div className="col-span-2 space-y-6">
        {/* Full Name */}
        <div>
          <label className="block text-xs font-semibold text-[#203D47] uppercase mb-2">
            Full Name
          </label>
          <input
            type="text"
            value={data.fullName || ""}
            onChange={(e) => onChange({ fullName: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-[#ECEFF1] focus:outline-none focus:ring-2 focus:ring-[#2ECC71]"
            placeholder="Jonathan Doe"
          />
        </div>

        {/* Document Type & Number */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#203D47] uppercase mb-2">
              Document Type
            </label>
            <select
              value={data.documentType || ""}
              onChange={(e) => onChange({ documentType: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-[#ECEFF1] focus:outline-none focus:ring-2 focus:ring-[#2ECC71]"
            >
              <option value="">Select Type</option>
              {DOCUMENT_TYPES.map((d: any) => (
                <option key={d.id} value={d.id}>
                  {d.nombre}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#203D47] uppercase mb-2">
              Document Number
            </label>
            <input
              type="text"
              value={data.documentNumber || ""}
              onChange={(e) => onChange({ documentNumber: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-[#ECEFF1] focus:outline-none focus:ring-2 focus:ring-[#2ECC71]"
            />
          </div>
        </div>

        {/* Email & Phone */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#203D47] uppercase mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={data.email || ""}
              onChange={(e) => onChange({ email: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-[#ECEFF1] focus:outline-none focus:ring-2 focus:ring-[#2ECC71]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#203D47] uppercase mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              value={data.phone || ""}
              onChange={(e) => onChange({ phone: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-[#ECEFF1] focus:outline-none focus:ring-2 focus:ring-[#2ECC71]"
            />
          </div>
        </div>

        {/* Documents */}
        <div>
          <label className="block text-xs font-semibold text-[#203D47] uppercase mb-3">
            Upload Employee Documents
          </label>
          <div
            onClick={() => docsInputRef.current?.click()}
            className="p-8 border-2 border-dashed border-[#8aa3ad] rounded-md cursor-pointer hover:bg-[#ECEFF1] transition text-center"
          >
            <div className="text-sm text-[#8aa3ad] mb-2">
              Drag & drop files here or click to browse
            </div>
            <div className="text-xs text-[#8aa3ad]">
              PDF, DOCX, PNG, JPG — max 10MB each
            </div>
            <input
              ref={docsInputRef}
              type="file"
              className="hidden"
              multiple
              accept=".pdf,.docx,image/png,image/jpeg"
              onChange={(e) => handleDocs(e.target.files)}
            />
          </div>

          {/* Files List */}
          {(data.files || []).length > 0 && (
            <div className="mt-4 space-y-2">
              {(data.files || []).map((f: any, idx: number) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 bg-[#ECEFF1] rounded border border-gray-200"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-8 h-8 bg-white rounded flex items-center justify-center text-xs font-bold text-[#203D47]">
                      {f.name.split(".").pop()?.toUpperCase()}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-[#203D47] font-medium">{f.name}</div>
                      <div className="text-xs text-[#8aa3ad]">
                        {bytesToKb(f.size)} • Ready to upload
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => removeDoc(idx)}
                    className="ml-2 text-[#8aa3ad] hover:text-red-500 text-lg font-bold"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right Column - Photo */}
      <div className="col-span-1">
        <label className="block text-xs font-semibold text-[#203D47] uppercase mb-3">
          Profile Photo
        </label>
        <div
          onClick={() => fileInputRef.current?.click()}
          className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-[#8aa3ad] rounded-md bg-white cursor-pointer hover:bg-[#ECEFF1] transition"
        >
          {photoPreview ? (
            <img
              src={photoPreview}
              alt="preview"
              className="w-24 h-24 rounded-full object-cover mb-3"
            />
          ) : (
            <div className="text-center">
              <div className="text-3xl text-[#8aa3ad] mb-2">📷</div>
              <div className="text-xs text-[#8aa3ad]">
                Click to upload
              </div>
              <div className="text-xs text-[#8aa3ad] mt-1">
                PNG, JPG — max 5MB
              </div>
            </div>
          )}
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept="image/png,image/jpeg"
            onChange={(e) => {
              if (e.target.files) handlePhoto(e.target.files[0]);
            }}
          />
          <button className="mt-3 px-3 py-1 bg-[#2ECC71] text-white rounded text-xs font-semibold hover:bg-green-600">
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default PersonalDataStep;
