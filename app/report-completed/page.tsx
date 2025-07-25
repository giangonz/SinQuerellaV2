"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Check, Download, Mail, Home, FileText, Users } from "lucide-react"

export default function ReportCompletedPage() {
  const router = useRouter()
  const [reportData, setReportData] = useState<any>(null)
  const [driverInfo, setDriverInfo] = useState<any>(null)

  useEffect(() => {
    const storedReport = sessionStorage.getItem("accidentReport")
    const storedDriverInfo = sessionStorage.getItem("driverInfo")

    if (storedReport && storedDriverInfo) {
      setReportData(JSON.parse(storedReport))
      setDriverInfo(JSON.parse(storedDriverInfo))
    } else {
      router.push("/")
    }
  }, [router])

  const handleDownloadReport = () => {
    // In real app, this would generate and download a PDF
    alert("Descargando reporte completo en PDF...")
  }

  const handleEmailReport = () => {
    // In real app, this would send the report via email
    alert("Enviando reporte por email a ambas partes...")
  }

  if (!reportData || !driverInfo) {
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
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">¡Reporte Completado!</h1>
          <p className="text-gray-600">Ambas partes han validado y completado la información del accidente</p>
        </div>

        {/* Completion Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Driver A Status */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                <Check className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Conductor A</h3>
                <p className="text-sm text-green-600">Completado</p>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <p>
                <span className="text-gray-600">Nombre:</span> {driverInfo.driver.personalInfo?.name}{" "}
                {driverInfo.driver.personalInfo?.lastName}
              </p>
              <p>
                <span className="text-gray-600">Vehículo:</span> {driverInfo.vehicle?.make} {driverInfo.vehicle?.model}
              </p>
              <p>
                <span className="text-gray-600">Tablilla:</span> {driverInfo.vehicle?.licensePlate}
              </p>
            </div>
          </div>

          {/* Driver B Status */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                <Check className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Conductor B</h3>
                <p className="text-sm text-green-600">Completado</p>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <p>
                <span className="text-gray-600">Email:</span> {driverInfo.otherPartyContact.email}
              </p>
              <p>
                <span className="text-gray-600">Teléfono:</span> {driverInfo.otherPartyContact.phone}
              </p>
              <p className="text-green-600 font-medium">✓ Información validada</p>
            </div>
          </div>
        </div>

        {/* Report Summary */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <FileText className="w-5 h-5 mr-2" />
            Resumen del Reporte Amistoso
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Información del Accidente</h3>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="text-gray-600">Diagrama:</span> {reportData.diagram.diagramId}
                </p>
                <p>
                  <span className="text-gray-600">Fecha:</span>{" "}
                  {new Date(reportData.timestamp).toLocaleDateString("es-ES")}
                </p>
                <p>
                  <span className="text-gray-600">Ubicación:</span> {reportData.location.address}
                </p>
                <p>
                  <span className="text-gray-600">Fotos:</span> {reportData.images.length} imagen(es)
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-medium text-gray-900 mb-2">Estado del Reporte</h3>
              <div className="space-y-2 text-sm">
                <p className="flex items-center">
                  <Check className="w-4 h-4 text-green-600 mr-2" />
                  <span>Ambas partes validaron la información</span>
                </p>
                <p className="flex items-center">
                  <Check className="w-4 h-4 text-green-600 mr-2" />
                  <span>Datos de vehículos verificados</span>
                </p>
                <p className="flex items-center">
                  <Check className="w-4 h-4 text-green-600 mr-2" />
                  <span>Información de seguros incluida</span>
                </p>
                <p className="flex items-center">
                  <Check className="w-4 h-4 text-green-600 mr-2" />
                  <span>Reporte listo para aseguradoras</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <div className="flex items-start">
            <Users className="w-5 h-5 text-blue-600 mt-0.5 mr-3" />
            <div>
              <h3 className="font-medium text-blue-800">Próximos Pasos</h3>
              <div className="text-blue-700 mt-2 space-y-1">
                <p>• Ambas partes recibirán una copia del reporte por email</p>
                <p>• Pueden presentar este reporte a sus aseguradoras</p>
                <p>• El reporte tiene validez legal como acuerdo amistoso</p>
                <p>• Conserven una copia para sus registros</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleDownloadReport}
            className="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <Download className="w-4 h-4 mr-2" />
            Descargar Reporte PDF
          </button>

          <button
            onClick={handleEmailReport}
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Mail className="w-4 h-4 mr-2" />
            Enviar por Email
          </button>

          <button
            onClick={() => router.push("/")}
            className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Home className="w-4 h-4 mr-2" />
            Volver al Inicio
          </button>
        </div>

        {/* Reference Number */}
        <div className="text-center mt-8">
          <p className="text-gray-600">Número de referencia del reporte:</p>
          <p className="font-mono font-bold text-lg text-purple-600">SQ-{reportData.timestamp.slice(-8)}</p>
        </div>
      </div>
    </div>
  )
}
