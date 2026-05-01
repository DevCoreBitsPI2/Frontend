'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

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
  type = 'text',
  value,
  onChange,
  placeholder,
  icon,
  error,
  autoComplete,
}: InputFieldProps) => (
  <div className="flex flex-col gap-1.5">
    <label htmlFor={id} className="text-xs font-semibold uppercase tracking-[0.06em] text-[#1E333A]">
      {label}
    </label>
    <div className="relative">
      <span className="pointer-events-none absolute left-3.5 top-1/2 flex -translate-y-1/2 items-center opacity-70">
        {icon}
      </span>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={`w-full rounded-xl border bg-[#ECEFF1] py-2.5 pl-10 pr-3 text-sm text-[#0F1819] outline-none transition focus:ring-4 focus:ring-[#203D47]/10 ${
          error ? 'border-red-500 focus:border-red-500' : 'border-[#BDD5EA] focus:border-[#203D47]'
        }`}
      />
    </div>
    {error && <span className="text-[11.5px] text-red-500">{error}</span>}
  </div>
);

export default function EditInfoModal({
  isOpen,
  onClose,
  onSave,
  initialData = {},
}: EditInfoModalProps) {
  const [fullName, setFullName] = useState(initialData.fullName ?? '');
  const [phoneNumber, setPhoneNumber] = useState(initialData.phoneNumber ?? '');
  const [emailAddress, setEmailAddress] = useState(initialData.emailAddress ?? '');
  const [photo, setPhoto] = useState<File | null>(initialData.photo ?? null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    setFullName(initialData.fullName ?? '');
    setPhoneNumber(initialData.phoneNumber ?? '');
    setEmailAddress(initialData.emailAddress ?? '');
    setPhoto(initialData.photo ?? null);
    setErrors({});
  }, [isOpen, initialData.fullName, initialData.phoneNumber, initialData.emailAddress, initialData.photo]);

  useEffect(() => {
    return () => {
      if (photoPreview) {
        URL.revokeObjectURL(photoPreview);
      }
    };
  }, [photoPreview]);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!fullName.trim()) newErrors.fullName = 'El nombre completo es requerido.';
    if (!phoneNumber.trim()) newErrors.phoneNumber = 'El número de teléfono es requerido.';
    else if (!/^\+?[\d\s\-().]{7,20}$/.test(phoneNumber)) {
      newErrors.phoneNumber = 'Ingresa un número de teléfono válido.';
    }
    if (!emailAddress.trim()) newErrors.emailAddress = 'El correo electrónico es requerido.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddress)) {
      newErrors.emailAddress = 'Ingresa un correo electrónico válido.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFile = useCallback(
    (file: File) => {
      if (!file.type.startsWith('image/')) return;

      const maxSizeBytes = 5 * 1024 * 1024;
      if (file.size > maxSizeBytes) {
        setErrors((prev) => ({
          ...prev,
          photo: 'El archivo no puede superar 5MB',
        }));
        return;
      }

      setErrors((prev) => {
        const nextErrors = { ...prev };
        delete nextErrors.photo;
        return nextErrors;
      });

      if (photoPreview) {
        URL.revokeObjectURL(photoPreview);
      }

      setPhoto(file);
      setPhotoPreview(URL.createObjectURL(file));
    },
    [photoPreview],
  );

  const handleDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      setIsDragging(false);
      const file = event.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile],
  );

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
      <div
        role="presentation"
        onClick={onClose}
        className="fixed inset-0 z-40 bg-[#0F1819]/70 backdrop-blur-sm"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <div className="w-full max-w-[460px] overflow-hidden rounded-[18px] bg-white shadow-[0_24px_64px_rgba(15,24,25,0.28),0_4px_16px_rgba(15,24,25,0.12)]">
          <div className="flex items-center justify-between bg-gradient-to-r from-[#1E333A] to-[#203D47] px-6 py-5">
            <div>
              <h2 id="modal-title" className="m-0 text-[17px] font-bold tracking-[-0.01em] text-[#ECEFF1]">
                Editar información
              </h2>
              <p className="mt-0.5 text-xs text-[#BDD5EA]/80">Actualiza tus datos personales</p>
            </div>
            <button
              onClick={onClose}
              aria-label="Cerrar modal"
              className="flex items-center rounded-lg border-0 bg-[#BDD5EA]/10 p-[7px] text-[#BDD5EA] transition-colors hover:bg-[#BDD5EA]/20"
            >
              <CloseIcon />
            </button>
          </div>

          <div className="mx-6 mt-5 flex items-start gap-2.5 rounded-xl border border-amber-200 bg-amber-50 px-3.5 py-3">
            <span className="mt-px flex-shrink-0">
              <AlertIcon />
            </span>
            <div>
              <p className="m-0 text-[13px] font-semibold text-amber-800">Formulario de edición</p>
              <p className="mt-0.5 text-xs text-amber-700">Solo puedes modificar los campos habilitados en este formulario.</p>
            </div>
          </div>

          <div className="flex flex-col gap-4 px-6 pb-6 pt-5">
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

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-[0.06em] text-[#1E333A]">
                Foto de perfil
              </label>
              <div
                role="button"
                tabIndex={0}
                aria-label="Subir foto de perfil"
                onClick={() => fileInputRef.current?.click()}
                onKeyDown={(event) => event.key === 'Enter' && fileInputRef.current?.click()}
                onDragOver={(event) => {
                  event.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                className={`relative flex min-h-[110px] cursor-pointer flex-col items-center justify-center gap-2.5 overflow-hidden rounded-2xl border-2 border-dashed px-4 py-6 transition-colors ${
                  isDragging ? 'border-[#203D47] bg-[#203D47]/5' : 'border-[#BDD5EA] bg-[#F8FAFB]'
                }`}
              >
                {photoPreview ? (
                  <>
                    <img
                      src={photoPreview}
                      alt="Vista previa"
                      className="h-[72px] w-[72px] rounded-full border-[3px] border-[#203D47] object-cover"
                    />
                    <span className="text-xs font-medium text-[#203D47]">{photo?.name}</span>
                    <span className="text-[11px] text-slate-500">Haz clic para cambiar la foto</span>
                  </>
                ) : (
                  <>
                    <UploadIcon />
                    <div className="text-center">
                      <p className="m-0 text-[13px] font-semibold text-[#1E333A]">Arrastra tu foto aquí</p>
                      <p className="mt-0.5 text-[11.5px] text-slate-500">o haz clic para explorar · PNG, JPG, WEBP hasta 5 MB</p>
                    </div>
                  </>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    if (file) handleFile(file);
                  }}
                />
              </div>
            </div>

            <div className="h-px bg-[#ECEFF1]" />

            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className={`flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3.5 text-sm font-bold tracking-[0.02em] text-[#ECEFF1] shadow-[0_4px_14px_rgba(30,51,58,0.35)] transition-opacity ${
                isLoading ? 'cursor-not-allowed bg-[#93C5B5]' : 'bg-gradient-to-r from-[#1E333A] to-[#203D47] hover:opacity-90'
              }`}
            >
              {isLoading ? (
                <>
                  <span className="inline-block h-[15px] w-[15px] animate-spin rounded-full border-2 border-[#ECEFF1]/30 border-t-[#ECEFF1]" />
                  Guardando...
                </>
              ) : (
                'Guardar cambios →'
              )}
            </button>

            <button
              onClick={onClose}
              className="self-center rounded p-1 text-[13.5px] text-slate-500 underline underline-offset-4 transition-colors hover:text-[#1E333A]"
            >
              Cancelar edición
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
