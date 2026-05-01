export { default } from "./perfil/EditInfoModal";
                    if (file) handleFile(file);
                  }}
                />
              </div>
            </div>

            {/* ── Divider ── */}
            <div style={{ height: "1px", background: "#ECEFF1", margin: "4px 0" }} />

            {/* ── Actions ── */}
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              style={{
                width: "100%",
                padding: "13px",
                background: isLoading
                  ? "#93C5B5"
                  : "linear-gradient(135deg, #1E333A 0%, #203D47 100%)",
                color: "#ECEFF1",
                border: "none",
                borderRadius: "12px",
                fontSize: "14px",
                fontWeight: 700,
                fontFamily: "'DM Sans', sans-serif",
                cursor: isLoading ? "not-allowed" : "pointer",
                letterSpacing: "0.02em",
                transition: "opacity 0.18s, transform 0.15s",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                boxShadow: isLoading ? "none" : "0 4px 14px rgba(30,51,58,0.35)",
              }}
              onMouseEnter={(e) => {
                if (!isLoading) e.currentTarget.style.opacity = "0.9";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = "1";
              }}
            >
              {isLoading ? (
                <>
                  <span
                    style={{
                      width: "15px",
                      height: "15px",
                      border: "2px solid rgba(236,239,241,0.3)",
                      borderTopColor: "#ECEFF1",
                      borderRadius: "50%",
                      animation: "spin 0.7s linear infinite",
                      display: "inline-block",
                    }}
                  />
                  Guardando...
                </>
              ) : (
                "Guardar cambios →"
              )}
            </button>

            <button
              onClick={onClose}
              style={{
                background: "none",
                border: "none",
                color: "#6B7280",
                fontSize: "13.5px",
                fontFamily: "'DM Sans', sans-serif",
                cursor: "pointer",
                textAlign: "center",
                padding: "4px",
                textDecoration: "underline",
                textUnderlineOffset: "3px",
                transition: "color 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#1E333A")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#6B7280")}
            >
              Cancelar edición
            </button>
          </div>
        </div>
      </div>

      {/* ── Keyframes ── */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
}