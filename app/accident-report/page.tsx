"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Camera, MapPin, Upload, X, Check, Navigation } from "lucide-react"

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

export default function AccidentReportPage() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [diagramInfo, setDiagramInfo] = useState<DiagramInfo | null>(null)
  const [images, setImages] = useState<File[]>([])
  const [imagePreviews, setImagePreviews] = useState<string[]>([])
  const [description, setDescription] = useState("")
  const [location, setLocation] = useState<LocationData | null>(null)
  const [isLoadingLocation, setIsLoadingLocation] = useState(false)
  const [manualAddress, setManualAddress] = useState("")
  const [useManualAddress, setUseManualAddress] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  useEffect(() => {
    // Get diagram info from sessionStorage
    const storedDiagram = sessionStorage.getItem("selectedDiagram")
    if (storedDiagram) {
      setDiagramInfo(JSON.parse(storedDiagram))
    } else {
      // Redirect back if no diagram selected
      router.push("/accident-type")
    }
  }, [router])

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])

    if (images.length + files.length > 4) {
      setErrors({ ...errors, images: "Máximo 4 imágenes permitidas" })
      return
    }

    // Validate file types and sizes
    const validFiles = files.filter((file) => {
      if (!file.type.startsWith("image/")) {
        setErrors({ ...errors, images: "Solo se permiten archivos de imagen" })
        return false
      }
      if (file.size > 10 * 1024 * 1024) {
        // 10MB limit
        setErrors({ ...errors, images: "Las imágenes deben ser menores a 10MB" })
        return false
      }
      return true
    })

    if (validFiles.length > 0) {
      setImages((prev) => [...prev, ...validFiles])

      // Create previews
      validFiles.forEach((file) => {
        const reader = new FileReader()
        reader.onload = (e) => {
          setImagePreviews((prev) => [...prev, e.target?.result as string])
        }
        reader.readAsDataURL(file)
      })

      // Clear image errors
      const newErrors = { ...errors }
      delete newErrors.images
      setErrors(newErrors)
    }
  }

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
    setImagePreviews((prev) => prev.filter((_, i) => i !== index))
  }

  const getCurrentLocation = () => {
    setIsLoadingLocation(true)

    if (!navigator.geolocation) {
      setErrors({ ...errors, location: "Geolocalización no disponible en este navegador" })
      setIsLoadingLocation(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords

        try {
          // Reverse geocoding to get address (using a free service)
          const response = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=es`,
          )
          const data = await response.json()

          setLocation({
            latitude,
            longitude,
            address: data.display_name || `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`,
          })
        } catch (error) {
          // Fallback to coordinates only
          setLocation({
            latitude,
            longitude,
            address: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`,
          })
        }

        setIsLoadingLocation(false)

        // Clear location errors
        const newErrors = { ...errors }
        delete newErrors.location
        setErrors(newErrors)
      },
      (error) => {
        setIsLoadingLocation(false)
        setErrors({
          ...errors,
          location: "No se pudo obtener la ubicación. Intenta ingresar la dirección manualmente.",
        })
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000,
      },
    )
  }

  const handleManualAddress = () => {
    if (manualAddress.trim()) {
      setLocation({
        latitude: 0,
        longitude: 0,
        address: manualAddress.trim(),
      })

      // Clear location errors
      const newErrors = { ...errors }
      delete newErrors.location
      setErrors(newErrors)
    }
  }

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}

    if (images.length === 0) {
      newErrors.images = "Debes subir al menos 1 imagen del accidente"
    }

    if (!description.trim()) {
      newErrors.description = "La descripción es obligatoria"
    } else if (description.trim().length < 10) {
      newErrors.description = "La descripción debe tener al menos 10 caracteres"
    }

    if (!location) {
      newErrors.location = "Debes proporcionar la ubicación del accidente"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    // Prepare form data
    const reportData = {
      diagram: diagramInfo,
      images: images.map((img) => img.name), // In real app, you'd upload these
      description: description.trim(),
      location,
      timestamp: new Date().toISOString(),
    }

    console.log("Accident Report Data:", reportData)

    // Store report data
    sessionStorage.setItem("accidentReport", JSON.stringify(reportData))

    // Navigate to summary/confirmation page
    router.push("/report-summary")
  }

  if (!diagramInfo) {
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
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Reportar Accidente</h1>
          <p className="text-gray-600">
            Diagrama seleccionado: <span className="font-semibold">{diagramInfo.diagramId}</span> -{" "}
            {diagramInfo.sectionTitle}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Image Upload Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Camera className="w-5 h-5 mr-2" />
              Fotos del Accidente
            </h2>
            <p className="text-gray-600 mb-4">Sube entre 1 y 4 fotos del accidente (obligatorio mínimo 1)</p>

            {/* Upload Button */}
            <div className="mb-4">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={images.length >= 4}
                className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                <Upload className="w-4 h-4 mr-2" />
                {images.length === 0 ? "Subir Fotos" : `Agregar Más (${images.length}/4)`}
              </button>
            </div>

            {/* Image Previews */}
            {imagePreviews.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="relative">
                    <img
                      src={preview || "/placeholder.svg"}
                      alt={`Foto ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg border"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {errors.images && <p className="text-red-600 text-sm mt-2">{errors.images}</p>}
          </div>

          {/* Description Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Descripción del Accidente</h2>
            <p className="text-gray-600 mb-4">Describe brevemente cómo ocurrió el accidente</p>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ej: El vehículo A venía por la calle principal cuando el vehículo B no respetó la señal de alto y se produjo el impacto en el lado derecho..."
              className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
              maxLength={500}
            />

            <div className="flex justify-between items-center mt-2">
              <span className="text-sm text-gray-500">{description.length}/500 caracteres</span>
              {errors.description && <p className="text-red-600 text-sm">{errors.description}</p>}
            </div>
          </div>

          {/* Location Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <MapPin className="w-5 h-5 mr-2" />
              Ubicación del Accidente
            </h2>

            {!location && (
              <div className="space-y-4">
                <p className="text-gray-600">Selecciona cómo quieres proporcionar la ubicación:</p>

                {/* GPS Location Button */}
                <button
                  type="button"
                  onClick={getCurrentLocation}
                  disabled={isLoadingLocation}
                  className="w-full md:w-auto inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 transition-colors"
                >
                  <Navigation className="w-4 h-4 mr-2" />
                  {isLoadingLocation ? "Obteniendo ubicación..." : "Usar mi ubicación actual (GPS)"}
                </button>

                {/* Manual Address Toggle */}
                <div className="border-t pt-4">
                  <button
                    type="button"
                    onClick={() => setUseManualAddress(!useManualAddress)}
                    className="text-purple-600 hover:text-purple-700 font-medium"
                  >
                    O ingresar dirección manualmente
                  </button>

                  {useManualAddress && (
                    <div className="mt-4 space-y-3">
                      <input
                        type="text"
                        value={manualAddress}
                        onChange={(e) => setManualAddress(e.target.value)}
                        placeholder="Ej: Av. Principal 123, Colonia Centro, Ciudad"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                      <button
                        type="button"
                        onClick={handleManualAddress}
                        disabled={!manualAddress.trim()}
                        className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-400 transition-colors"
                      >
                        Confirmar Dirección
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Location Display */}
            {location && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium text-green-800 flex items-center">
                      <Check className="w-4 h-4 mr-2" />
                      Ubicación confirmada
                    </p>
                    <p className="text-green-700 mt-1">{location.address}</p>
                    {location.latitude !== 0 && location.longitude !== 0 && (
                      <p className="text-sm text-green-600 mt-1">
                        Coordenadas: {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}
                      </p>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setLocation(null)
                      setManualAddress("")
                      setUseManualAddress(false)
                    }}
                    className="text-green-600 hover:text-green-700"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}

            {errors.location && <p className="text-red-600 text-sm mt-2">{errors.location}</p>}
          </div>

          {/* Submit Button */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Volver
            </button>

            <button
              type="submit"
              className="px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold"
            >
              Continuar con el Reporte
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
