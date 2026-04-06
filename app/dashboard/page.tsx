"use client";

import { useState } from "react";
import EditInfoModal from "@/components/EditInfoModal";

// ─── Mock del usuario autenticado ─────────────────────────────────────────────
// Reemplaza esto con tu contexto de sesión real (useSession, useAuth, etc.)
const MOCK_USER_ID = "mock-user-001";

export default function DashboardPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* ── Layout principal del dashboard ── */}
      <div style={{ padding: "32px 40px", maxWidth: "800px", margin: "0 auto" }}>

        {/* ── Tarjeta de perfil ── */}
        <div style={{
          background: "#fff",
          border: "1px solid #E2E8F0",
          borderRadius: "16px",
          padding: "24px",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: "20px",
          fontFamily: "'DM Sans', sans-serif",
        }}>

          {/* Avatar + info */}
          <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
            <div style={{ position: "relative", flexShrink: 0 }}>
              <div style={{
                width: "72px", height: "72px", borderRadius: "12px",
                background: "#203D47", display: "flex", alignItems: "center",
                justifyContent: "center", fontSize: "26px", color: "#BDD5EA",
                fontFamily: "'DM Sans', sans-serif", fontWeight: 700,
              }}>
                JD
              </div>
              <span style={{
                position: "absolute", bottom: "-6px", left: "50%",
                transform: "translateX(-50%)", background: "#22C55E",
                color: "#fff", fontSize: "9px", fontWeight: 700,
                padding: "2px 7px", borderRadius: "20px", letterSpacing: "0.06em",
                whiteSpace: "nowrap",
              }}>
                ACTIVE
              </span>
            </div>

            <div>
              <h1 style={{ margin: 0, fontSize: "20px", fontWeight: 700, color: "#0F1819" }}>
                Jonathan Doe
              </h1>
              <p style={{ margin: "3px 0 0", fontSize: "13px", color: "#64748B" }}>
                Senior Software Architect &nbsp;•&nbsp; Engineering Department
              </p>
              <div style={{ display: "flex", gap: "14px", marginTop: "8px" }}>
                {[
                  { icon: "🪪", text: "EMP-9982-A" },
                  { icon: "📅", text: "Joined March 2019" },
                  { icon: "📍", text: "Austin, TX Office" },
                ].map(({ icon, text }) => (
                  <span key={text} style={{ fontSize: "12px", color: "#94A3B8" }}>
                    {icon} {text}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* ── Botón que abre el modal ── */}
          <button
            onClick={() => setIsModalOpen(true)}
            style={{
              flexShrink: 0,
              padding: "9px 18px",
              background: "#1E333A",
              color: "#ECEFF1",
              border: "none",
              borderRadius: "20px",
              fontSize: "13px",
              fontWeight: 600,
              fontFamily: "'DM Sans', sans-serif",
              cursor: "pointer",
              letterSpacing: "0.01em",
              transition: "background 0.18s, transform 0.15s",
              boxShadow: "0 2px 8px rgba(30,51,58,0.25)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#203D47";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#1E333A";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            Edit Information
          </button>
        </div>

        {/* ── Personal Info ── */}
        <div style={{
          marginTop: "20px",
          background: "#fff",
          border: "1px solid #E2E8F0",
          borderRadius: "16px",
          padding: "24px",
          fontFamily: "'DM Sans', sans-serif",
        }}>
          <h2 style={{ margin: "0 0 18px", fontSize: "14px", fontWeight: 700, color: "#0F1819", display: "flex", alignItems: "center", gap: "7px" }}>
            📄 Personal Info
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "18px 32px" }}>
            {[
              { label: "Email Address",   value: "john.doe@company.com"          },
              { label: "Phone Number",    value: "+1 (555) 000-1234"             },
              { label: "Job Role",        value: "Senior Software Engineer"      },
              { label: "Department",      value: "Engineering / Product"         },
              { label: "Birth Date",      value: "October 24, 2024"              },
              { label: "Office Location", value: "New York Headquarters"         },
              { label: "Reports To",      value: "Sarah Jenkins (Eng. Manager)"  },
            ].map(({ label, value }) => (
              <div key={label}>
                <p style={{ margin: 0, fontSize: "10.5px", fontWeight: 600, letterSpacing: "0.07em", textTransform: "uppercase", color: "#94A3B8" }}>{label}</p>
                <p style={{ margin: "4px 0 0", fontSize: "13.5px", color: "#1E333A", fontWeight: 500 }}>{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Modal ── */}
      <EditInfoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        userId={MOCK_USER_ID}
        onSuccess={(updatedData) => {
          // Aquí puedes refrescar el estado del perfil cuando tengas el backend real
          console.log("Perfil actualizado:", updatedData);
        }}
      />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
      `}</style>
    </>
  );
}