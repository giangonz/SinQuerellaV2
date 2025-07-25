"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Mail, Check, Clock, Phone, Home } from "lucide-react"

export default function InvitationSentPage() {
  const router = useRouter()
  const [driverInfo, setDriverInfo] = useState<any>(null)

  useEffect(() => {
    const storedDriverInfo = sessionStorage.getItem("driverInfo")
    if (storedDriverInfo) {
      setDriverInfo(JSON.parse(storedDriverInfo))
    } else {
      router.push("/")
    }
  }, [router])

  if (!driverInfo) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <Check className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">¡Invitación Enviada!</h1>
          <p className="text-gray-600">Se ha enviado una invitación al otro conductor para completar el reporte</p>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Your Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                <Check className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Tu Información</h3>
                <p className="text-sm text-green-600">Completada</p>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <p>
                <span className="text-gray-600">Rol:</span> Conductor {driverInfo.role}
              </p>
              <p>
                <span className="text-gray-600">Licencia:</span> {driverInfo.driver.licenseNumber}
              </p>
              <p>
                <span className="text-gray-600">Vehículo:</span> {driverInfo.vehicle?.make} {driverInfo.vehicle?.model}
              </p>
              <p>
                <span className="text-gray-600">Tablilla:</span> {driverInfo.vehicle?.licensePlate}
              </p>
            </div>
          </div>

          {/* Other Party Status */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
                <Clock className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Conductor {driverInfo.role === "A" ? "B" : "A"}</h3>
                <p className="text-sm text-yellow-600">Pendiente</p>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <p>
                <span className="text-gray-600">Email:</span> {driverInfo.otherPartyContact.email}
              </p>
              <p>
                <span className="text-gray-600">Teléfono:</span> {driverInfo.otherPartyContact.phone}
              </p>
              <button
                onClick={() => {
                  // Simulate other party completion
                  alert("Simulando que la otra persona completó su parte del reporte...")
                  setTimeout(() => {
                    router.push("/report-completed")
                  }, 1000)
                }}
                className="text-yellow-600 font-medium hover:text-yellow-700 underline cursor-pointer"
              >
                Esperando respuesta... (Click para simular)
              </button>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <Mail className="w-5 h-5 mr-2" />
            Próximos Pasos
          </h2>

          <div className="space-y-4">
            <div className="flex items-start">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                <span className="text-xs font-bold text-blue-600">1</span>
              </div>
              <div>
                <p className="font-medium text-gray-900">Email enviado</p>
                <p className="text-gray-600 text-sm">
                  Se ha enviado un email a <strong>{driverInfo.otherPartyContact.email}</strong> con un enlace para
                  revisar y completar el reporte.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                <span className="text-xs font-bold text-yellow-600">2</span>
              </div>
              <div>
                <p className="font-medium text-gray-900">Validación pendiente</p>
                <p className="text-gray-600 text-sm">
                  El otro conductor debe revisar la información del accidente, validar que es correcta, y completar sus
                  datos personales y del vehículo.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                <span className="text-xs font-bold text-green-600">3</span>
              </div>
              <div>
                <p className="font-medium text-gray-900">Reporte final</p>
                <p className="text-gray-600 text-sm">
                  Una vez completado por ambas partes, recibirás el reporte final por email y podrás descargarlo desde
                  tu cuenta.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <div className="flex items-start">
            <Phone className="w-5 h-5 text-blue-600 mt-0.5 mr-3" />
            <div>
              <h3 className="font-medium text-blue-800">¿Necesitas ayuda?</h3>
              <p className="text-blue-700 mt-1">
                Si el otro conductor no responde en 48 horas o tienes algún problema, puedes contactarnos o llamar a la
                Policía de Puerto Rico.
              </p>
              <p className="text-blue-800 font-medium mt-2">Policía de Puerto Rico: 787.343.2020</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => router.push("/")}
            className="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <Home className="w-4 h-4 mr-2" />
            Volver al Inicio
          </button>

          <button
            onClick={() => {
              // In real app, this would go to a dashboard or tracking page
              alert("Función de seguimiento en desarrollo")
            }}
            className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Clock className="w-4 h-4 mr-2" />
            Seguir Estado del Reporte
          </button>
        </div>
      </div>
    </div>
  )
}
