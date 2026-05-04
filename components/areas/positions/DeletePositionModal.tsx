"use client";

import { useState } from "react";
import { eliminarPosicion } from "@/services/positionsService";

interface DeletePositionModalProps {
  isOpen: boolean;
  positionId: string | null;
  positionName: string | null;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function DeletePositionModal({
  isOpen,
  positionId,
  positionName,
  onClose,
  onSuccess,
}: DeletePositionModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    setError("");
    setLoading(true);

    try {
      if (!positionId) throw new Error("No position selected");

      await eliminarPosicion(positionId);
      onSuccess?.();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error deleting position");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !positionId) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded shadow-xl p-8 max-w-md w-full mx-4">
        <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full mb-4">
          <svg
            className="w-6 h-6 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </div>

        <h2 className="text-2xl font-bold text-[#0F1819] mb-2 text-center">
          Delete Position
        </h2>
        <p className="text-[#8aa3ad] text-center mb-6">
          Are you sure you want to delete <span className="font-semibold">{positionName}</span>?
          This action cannot be undone.
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-600 text-sm">
            {error}
          </div>
        )}

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="flex-1 px-4 py-2 border border-[#BDD5EA] text-[#203D47] rounded font-medium hover:bg-[#ECEFF1] disabled:opacity-50 transition-colors text-sm"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={loading}
            className="flex-1 px-4 py-2 bg-red-600 text-white rounded font-semibold hover:bg-red-700 disabled:opacity-50 transition-colors text-sm"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
