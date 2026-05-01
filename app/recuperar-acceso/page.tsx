// app/recuperar-acceso/page.tsx
import RecoveryForm from "@/components/RecoveryForm";

export default function RecuperarAcceso() {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">

      {/* Panel izquierdo*/}
      <div className="bg-[#0f2235] text-white flex flex-col justify-between p-10">
        <div className="flex items-center gap-2 font-semibold">
          <p>Portal de Talento Humano</p>
        </div>

        <div>
          <h1 className="text-2xl font-bold mb-2">
            Recupera el acceso a tu cuenta de forma segura
          </h1>
          <p className="text-sm text-gray-400">
            Te enviaremos un enlace para restablecer tus credenciales y restaurar el acceso al portal.
          </p>
        </div>
      </div>

      {/* Panel derecho*/}
      <div className="bg-gray-100 flex items-center justify-center">
        <RecoveryForm />
      </div>
    </div>
  );
}