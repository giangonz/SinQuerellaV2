"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Check, MapPin, Camera, FileText, Download, Share2 } from "lucide-react"

interface DiagramInfo {
  diagramId: string
  sectionId: number
  sectionTitle: string
  infractionResponse?: string
  timestamp: string
}

interface LocationData {
  latitude: number
  longitude: number
  address?: string
}

interface ReportData {
  diagram: DiagramInfo
  images: string[]
  description: string
  location: LocationData
  timestamp: string
}

export default function ReportSummaryPage() {
  const router = useRouter()
  const [reportData, setReportData] = useState<ReportData | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const storedReport = sessionStorage.getItem("accidentReport")
    if (storedReport) {
      setReportData(JSON.parse(storedReport))
    } else {
      router.push("/accident-type")
    }
  }, [router])

  const handleFinalSubmit = async () => {
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    console.log("Report submitted, proceeding to driver identification:", reportData)

    setIsSubmitting(false)

    // Navigate to driver identification instead of home
    router.push("/driver-identification")
  }

  if (!reportData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando resumen...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Resumen del Reporte</h1>
          <p className="text-gray-600">Revisa la información antes de enviar tu reporte</p>
        </div>

        <div className="space-y-6">
          {/* Diagram Info */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Diagrama Seleccionado</h2>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/2">
                <img
                  src={`/diagrams/${reportData.diagram.diagramId}.png`}
                  alt={`Diagrama ${reportData.diagram.diagramId}`}
                  className="w-full h-auto rounded-lg border"
                />
              </div>
              <div className="md:w-1/2 flex flex-col justify-center">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-20 h-20 bg-purple-100 rounded-lg flex items-center justify-center">
                    <span className="text-purple-600 font-bold text-lg">{reportData.diagram.diagramId}</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{reportData.diagram.sectionTitle}</p>
                    <p className="text-gray-600">Diagrama {reportData.diagram.diagramId}</p>
                    {reportData.diagram.infractionResponse && (
                      <p className="text-sm text-orange-600 mt-1">
                        Infracción reportada: {reportData.diagram.infractionResponse}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Images */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Camera className="w-5 h-5 mr-2" />
              Fotos del Accidente
            </h2>
            <p className="text-gray-600 mb-4">{reportData.images.length} imagen(es) adjunta(s)</p>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600">
                Las imágenes se han guardado correctamente y serán incluidas en el reporte final.
              </p>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <FileText className="w-5 h-5 mr-2" />
              Descripción
            </h2>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-800">{reportData.description}</p>
            </div>
          </div>

          {/* Location */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <MapPin className="w-5 h-5 mr-2" />
              Ubicación
            </h2>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-800 font-medium">{reportData.location.address}</p>
              {reportData.location.latitude !== 0 && reportData.location.longitude !== 0 && (
                <p className="text-sm text-gray-600 mt-1">
                  Coordenadas GPS: {reportData.location.latitude.toFixed(6)}, {reportData.location.longitude.toFixed(6)}
                </p>
              )}
            </div>
          </div>

          {/* Timestamp */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Información del Reporte</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Fecha de creación:</p>
                <p className="font-medium">{new Date(reportData.timestamp).toLocaleString("es-ES")}</p>
              </div>
              <div>
                <p className="text-gray-600">ID de referencia:</p>
                <p className="font-medium font-mono">SQ-{reportData.timestamp.slice(-8)}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between pt-6">
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Editar Reporte
              </button>

              <button
                type="button"
                className="inline-flex items-center px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Download className="w-4 h-4 mr-2" />
                Descargar PDF
              </button>
            </div>

            <button
              onClick={handleFinalSubmit}
              disabled={isSubmitting}
              className="px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-purple-400 transition-colors font-semibold inline-flex items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Enviando...
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4 mr-2" />
                  Continuar con reporte amistoso
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
