"use client";

import { useState, useRef, useCallback } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface UserInfo {
  fullName: string;
  phoneNumber: string;
  emailAddress: string;
  photo: File | null;
}

interface EditInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: UserInfo) => Promise<void>;
  initialData?: Partial<UserInfo>;
}

// ─── Icons ────────────────────────────────────────────────────────────────────
const AlertIcon = () => (
  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <circle cx="10" cy="10" r="9" stroke="#D97706" strokeWidth="1.5" />
    <path d="M10 6v4" stroke="#D97706" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="10" cy="13.5" r="0.75" fill="#D97706" />
  </svg>
);

const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const UploadIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
    <path
      d="M10.667 21.333S6.667 21.333 6.667 17.333c0-3.556 2.667-4.889 4-4.889 0-3.555 2.666-6.222 5.333-6.222 2.667 0 5.333 2.667 5.333 6.222 1.333 0 4 1.333 4 4.889 0 4-4 4-4 4"
      stroke="#203D47"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M19.333 21.333L16 18l-3.333 3.333" stroke="#203D47" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M16 18v8" stroke="#203D47" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const UserIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <circle cx="8" cy="5" r="3" stroke="#203D47" strokeWidth="1.25" />
    <path d="M2 14c0-3.314 2.686-5 6-5s6 1.686 6 5" stroke="#203D47" strokeWidth="1.25" strokeLinecap="round" />
  </svg>
);

const PhoneIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path
      d="M3 2h3l1.5 3.5-1.75 1.25C6.95 8.9 7.1 9.05 8.25 10.25L9.5 8.5 13 10v3c0 1-4 3.5-8.5-1S2 3 3 2z"
      stroke="#203D47"
      strokeWidth="1.25"
      strokeLinejoin="round"
    />
  </svg>
);

const MailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <rect x="1.5" y="3.5" width="13" height="9" rx="1.5" stroke="#203D47" strokeWidth="1.25" />
    <path d="M1.5 5l6.5 4.5L14.5 5" stroke="#203D47" strokeWidth="1.25" strokeLinejoin="round" />
  </svg>
);

// ─── Sub-components ───────────────────────────────────────────────────────────
interface InputFieldProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  icon: React.ReactNode;
  error?: string;
  autoComplete?: string;
}

const InputField = ({
  id,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  icon,
  error,
  autoComplete,
}: InputFieldProps) => (
  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
    <label
      htmlFor={id}
      style={{
        fontSize: "12px",
        fontWeight: 600,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        color: "#1E333A",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {label}
    </label>
    <div style={{ position: "relative" }}>
      <span
        style={{
          position: "absolute",
          left: "14px",
          top: "50%",
          transform: "translateY(-50%)",
          display: "flex",
          alignItems: "center",
          pointerEvents: "none",
          opacity: 0.7,
        }}
      >
        {icon}
      </span>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        style={{
          width: "100%",
          boxSizing: "border-box",
          padding: "11px 14px 11px 40px",
          border: error ? "1.5px solid #EF4444" : "1.5px solid #BDD5EA",
          borderRadius: "10px",
          fontSize: "14px",
          fontFamily: "'DM Sans', sans-serif",
          color: "#0F1819",
          background: "#ECEFF1",
          outline: "none",
          transition: "border-color 0.18s, box-shadow 0.18s",
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = "#203D47";
          e.currentTarget.style.boxShadow = "0 0 0 3px rgba(32,61,71,0.12)";
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = error ? "#EF4444" : "#BDD5EA";
          e.currentTarget.style.boxShadow = "none";
        }}
      />
    </div>
    {error && (
      <span style={{ fontSize: "11.5px", color: "#EF4444", fontFamily: "'DM Sans', sans-serif" }}>
        {error}
      </span>
    )}
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────
export default function EditInfoModal({
  isOpen,
  onClose,
  onSave,
  initialData = {},
}: EditInfoModalProps) {
  const [fullName, setFullName] = useState(initialData.fullName ?? "");
  const [phoneNumber, setPhoneNumber] = useState(initialData.phoneNumber ?? "");
  const [emailAddress, setEmailAddress] = useState(initialData.emailAddress ?? "");
  const [photo, setPhoto] = useState<File | null>(initialData.photo ?? null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const fileInputRef = useRef<HTMLInputElement>(null);

  // ── Validation ──────────────────────────────────────────────────────────────
  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!fullName.trim()) newErrors.fullName = "El nombre completo es requerido.";
    if (!phoneNumber.trim()) newErrors.phoneNumber = "El número de teléfono es requerido.";
    else if (!/^\+?[\d\s\-().]{7,20}$/.test(phoneNumber))
      newErrors.phoneNumber = "Ingresa un número de teléfono válido.";
    if (!emailAddress.trim()) newErrors.emailAddress = "El correo electrónico es requerido.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddress))
      newErrors.emailAddress = "Ingresa un correo electrónico válido.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ── Photo handling ──────────────────────────────────────────────────────────
  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) return;
    setPhoto(file);
    const url = URL.createObjectURL(file);
    setPhotoPreview(url);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  // ── Submit ──────────────────────────────────────────────────────────────────
  const handleSubmit = async () => {
    if (!validate()) return;
    setIsLoading(true);
    try {
      await onSave({ fullName, phoneNumber, emailAddress, photo });
      onClose();
    } catch {
      // error handling delegated to caller
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* ── Overlay ── */}
      <div
        role="presentation"
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(15,24,25,0.72)",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
          zIndex: 40,
          animation: "fadeIn 0.2s ease",
        }}
      />

      {/* ── Modal ── */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "16px",
        }}
      >
        <div
          style={{
            background: "#ffffff",
            borderRadius: "18px",
            width: "100%",
            maxWidth: "460px",
            boxShadow: "0 24px 64px rgba(15,24,25,0.28), 0 4px 16px rgba(15,24,25,0.12)",
            overflow: "hidden",
            animation: "slideUp 0.25s cubic-bezier(0.34,1.56,0.64,1)",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          {/* ── Header ── */}
          <div
            style={{
              background: "linear-gradient(135deg, #1E333A 0%, #203D47 100%)",
              padding: "20px 24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <h2
                id="modal-title"
                style={{
                  margin: 0,
                  fontSize: "17px",
                  fontWeight: 700,
                  color: "#ECEFF1",
                  letterSpacing: "-0.01em",
                }}
              >
                Editar información
              </h2>
              <p style={{ margin: "2px 0 0", fontSize: "12px", color: "#BDD5EA", opacity: 0.8 }}>
                Actualiza tus datos personales
              </p>
            </div>
            <button
              onClick={onClose}
              aria-label="Cerrar modal"
              style={{
                background: "rgba(189,213,234,0.12)",
                border: "none",
                borderRadius: "8px",
                padding: "7px",
                cursor: "pointer",
                color: "#BDD5EA",
                display: "flex",
                alignItems: "center",
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "rgba(189,213,234,0.22)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "rgba(189,213,234,0.12)")
              }
            >
              <CloseIcon />
            </button>
          </div>

          {/* ── Notice ── */}
          <div
            style={{
              margin: "20px 24px 0",
              padding: "12px 14px",
              background: "#FFFBEB",
              border: "1px solid #FDE68A",
              borderRadius: "10px",
              display: "flex",
              alignItems: "flex-start",
              gap: "10px",
            }}
          >
            <span style={{ flexShrink: 0, marginTop: "1px" }}>
              <AlertIcon />
            </span>
            <div>
              <p
                style={{
                  margin: 0,
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#92400E",
                }}
              >
                Formulario de edición
              </p>
              <p style={{ margin: "2px 0 0", fontSize: "12px", color: "#B45309" }}>
                Solo puedes modificar los campos habilitados en este formulario.
              </p>
            </div>
          </div>

          {/* ── Body ── */}
          <div style={{ padding: "20px 24px 24px", display: "flex", flexDirection: "column", gap: "16px" }}>

            <InputField
              id="fullName"
              label="Nombre completo"
              value={fullName}
              onChange={setFullName}
              placeholder="Ej. Jonathan Doe"
              icon={<UserIcon />}
              error={errors.fullName}
              autoComplete="name"
            />

            <InputField
              id="phoneNumber"
              label="Número de teléfono"
              type="tel"
              value={phoneNumber}
              onChange={setPhoneNumber}
              placeholder="+57 310 000 0000"
              icon={<PhoneIcon />}
              error={errors.phoneNumber}
              autoComplete="tel"
            />

            <InputField
              id="emailAddress"
              label="Correo electrónico"
              type="email"
              value={emailAddress}
              onChange={setEmailAddress}
              placeholder="usuario@correo.com"
              icon={<MailIcon />}
              error={errors.emailAddress}
              autoComplete="email"
            />

            {/* ── Photo upload ── */}
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label
                style={{
                  fontSize: "12px",
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: "#1E333A",
                }}
              >
                Foto de perfil
              </label>
              <div
                role="button"
                tabIndex={0}
                aria-label="Subir foto de perfil"
                onClick={() => fileInputRef.current?.click()}
                onKeyDown={(e) => e.key === "Enter" && fileInputRef.current?.click()}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                style={{
                  border: `2px dashed ${isDragging ? "#203D47" : "#BDD5EA"}`,
                  borderRadius: "12px",
                  padding: "24px 16px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  cursor: "pointer",
                  background: isDragging ? "rgba(32,61,71,0.05)" : "#F8FAFB",
                  transition: "border-color 0.18s, background 0.18s",
                  minHeight: "110px",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {photoPreview ? (
                  <>
                    <img
                      src={photoPreview}
                      alt="Vista previa"
                      style={{
                        width: "72px",
                        height: "72px",
                        borderRadius: "50%",
                        objectFit: "cover",
                        border: "3px solid #203D47",
                      }}
                    />
                    <span style={{ fontSize: "12px", color: "#203D47", fontWeight: 500 }}>
                      {photo?.name}
                    </span>
                    <span style={{ fontSize: "11px", color: "#6B7280" }}>
                      Haz clic para cambiar la foto
                    </span>
                  </>
                ) : (
                  <>
                    <UploadIcon />
                    <div style={{ textAlign: "center" }}>
                      <p style={{ margin: 0, fontSize: "13px", fontWeight: 600, color: "#1E333A" }}>
                        Arrastra tu foto aquí
                      </p>
                      <p style={{ margin: "3px 0 0", fontSize: "11.5px", color: "#6B7280" }}>
                        o haz clic para explorar · PNG, JPG, WEBP hasta 5 MB
                      </p>
                    </div>
                  </>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
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
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');

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