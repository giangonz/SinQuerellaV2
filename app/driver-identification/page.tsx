"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { User, Car, Mail, AlertTriangle, Check, Upload, Camera } from "lucide-react"

interface DiagramInfo {
  diagramId: string
  sectionId: number
  sectionTitle: string
  infractionResponse?: string
  timestamp: string
}

interface DriverData {
  licenseNumber: string
  birthDate: string
  socialSecurityLast4: string
  isValidated: boolean
  personalInfo?: {
    name: string
    lastName: string
    address: string
  }
}

interface Vehicle {
  id: string
  make: string
  model: string
  year: string
  color: string
  licensePlate: string
  marbete: string
  insurance: {
    company: string
    coverage: string
    policyNumber: string
  }
}

export default function DriverIdentificationPage() {
  const router = useRouter()
  const [diagramInfo, setDiagramInfo] = useState<DiagramInfo | null>(null)
  const [selectedRole, setSelectedRole] = useState<"A" | "B" | null>(null)
  const [inputMethod, setInputMethod] = useState<"manual" | "photo">("manual")
  const [step, setStep] = useState<"role" | "identification" | "validation" | "vehicle" | "contact">("role")

  // Driver identification
  const [driverData, setDriverData] = useState<DriverData>({
    licenseNumber: "",
    birthDate: "",
    socialSecurityLast4: "",
    isValidated: false,
  })

  // Vehicle selection
  const [availableVehicles, setAvailableVehicles] = useState<Vehicle[]>([])
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null)
  const [isOtherVehicle, setIsOtherVehicle] = useState(false)

  // Contact information
  const [otherPartyContact, setOtherPartyContact] = useState({
    email: "",
    phone: "",
  })

  const [isValidating, setIsValidating] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  useEffect(() => {
    const storedReport = sessionStorage.getItem("accidentReport")
    if (storedReport) {
      const report = JSON.parse(storedReport)
      setDiagramInfo(report.diagram)
    } else {
      router.push("/accident-type")
    }
  }, [router])

  const validateWithCESCO = async () => {
    setIsValidating(true)
    setErrors({})

    // Validate required fields
    if (!driverData.licenseNumber || !driverData.birthDate || !driverData.socialSecurityLast4) {
      setErrors({ validation: "Todos los campos son obligatorios" })
      setIsValidating(false)
      return
    }

    if (driverData.socialSecurityLast4.length !== 4) {
      setErrors({ validation: "Debe ingresar exactamente 4 dígitos del seguro social" })
      setIsValidating(false)
      return
    }

    // Simulate CESCO validation
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Mock successful validation
    setDriverData((prev) => ({
      ...prev,
      isValidated: true,
      personalInfo: {
        name: "Juan Carlos",
        lastName: "Rodríguez Pérez",
        address: "123 Calle Principal, San Juan, PR 00901",
      },
    }))

    // Mock vehicle data from CESCO
    setAvailableVehicles([
      {
        id: "1",
        make: "Toyota",
        model: "Camry",
        year: "2020",
        color: "Blanco",
        licensePlate: "GJD-433",
        marbete: "Nov 2024",
        insurance: {
          company: "Triple-S",
          coverage: "Responsabilidad Civil",
          policyNumber: "TS-123456789",
        },
      },
      {
        id: "2",
        make: "Honda",
        model: "Civic",
        year: "2018",
        color: "Azul",
        licensePlate: "ABC-789",
        marbete: "Dic 2024",
        insurance: {
          company: "MAPFRE",
          coverage: "Comprensiva",
          policyNumber: "MP-987654321",
        },
      },
    ])

    setIsValidating(false)
    setStep("validation")
  }

  const confirmValidation = () => {
    setStep("vehicle")
  }

  const handleVehicleSelection = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle)
    setIsOtherVehicle(false)
  }

  const handleOtherVehicle = () => {
    setIsOtherVehicle(true)
    setSelectedVehicle(null)
  }

  const proceedToContact = () => {
    if (!selectedVehicle && !isOtherVehicle) {
      setErrors({ vehicle: "Debe seleccionar un vehículo" })
      return
    }
    setStep("contact")
  }

  const handleFinalSubmit = () => {
    if (!otherPartyContact.email || !otherPartyContact.phone) {
      setErrors({ contact: "Email y teléfono son obligatorios" })
      return
    }

    // Store all driver information
    const driverInfo = {
      role: selectedRole,
      driver: driverData,
      vehicle: selectedVehicle,
      isOtherVehicle,
      otherPartyContact,
      timestamp: new Date().toISOString(),
    }

    sessionStorage.setItem("driverInfo", JSON.stringify(driverInfo))

    // In real app, send email to other party here
    console.log("Sending invitation to:", otherPartyContact.email)

    router.push("/invitation-sent")
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
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Identificación del Conductor</h1>
          <p className="text-gray-600">
            Diagrama: <span className="font-semibold">{diagramInfo.diagramId}</span>
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            <div
              className={`flex items-center ${step === "role" ? "text-purple-600" : step !== "role" ? "text-green-600" : "text-gray-400"}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${step === "role" ? "bg-purple-600 text-white" : step !== "role" ? "bg-green-600 text-white" : "bg-gray-200"}`}
              >
                1
              </div>
              <span className="ml-2 text-sm font-medium">Rol</span>
            </div>
            <div className="w-8 h-0.5 bg-gray-300"></div>
            <div
              className={`flex items-center ${step === "identification" ? "text-purple-600" : ["validation", "vehicle", "contact"].includes(step) ? "text-green-600" : "text-gray-400"}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${step === "identification" ? "bg-purple-600 text-white" : ["validation", "vehicle", "contact"].includes(step) ? "bg-green-600 text-white" : "bg-gray-200"}`}
              >
                2
              </div>
              <span className="ml-2 text-sm font-medium">ID</span>
            </div>
            <div className="w-8 h-0.5 bg-gray-300"></div>
            <div
              className={`flex items-center ${step === "vehicle" ? "text-purple-600" : step === "contact" ? "text-green-600" : "text-gray-400"}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${step === "vehicle" ? "bg-purple-600 text-white" : step === "contact" ? "bg-green-600 text-white" : "bg-gray-200"}`}
              >
                3
              </div>
              <span className="ml-2 text-sm font-medium">Vehículo</span>
            </div>
            <div className="w-8 h-0.5 bg-gray-300"></div>
            <div className={`flex items-center ${step === "contact" ? "text-purple-600" : "text-gray-400"}`}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${step === "contact" ? "bg-purple-600 text-white" : "bg-gray-200"}`}
              >
                4
              </div>
              <span className="ml-2 text-sm font-medium">Contacto</span>
            </div>
          </div>
        </div>

        {/* Step 1: Role Selection */}
        {step === "role" && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <User className="w-5 h-5 mr-2" />
              Selecciona tu rol en el diagrama
            </h2>

            {/* Diagram Display */}
            <div className="mb-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-3">Diagrama de referencia:</h3>
                <div className="flex justify-center">
                  <img
                    src={`/diagrams/${diagramInfo?.diagramId}.png`}
                    alt={`Diagrama ${diagramInfo?.diagramId}`}
                    className="max-w-md w-full h-auto rounded border"
                  />
                </div>
                <p className="text-center text-sm text-gray-600 mt-2">
                  {diagramInfo?.sectionTitle} - {diagramInfo?.diagramId}
                </p>
              </div>
            </div>

            <p className="text-gray-600 mb-6">¿Eres el vehículo A o el vehículo B según el diagrama mostrado arriba?</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <button
                onClick={() => setSelectedRole("A")}
                className={`p-6 border-2 rounded-lg transition-colors ${
                  selectedRole === "A"
                    ? "border-purple-500 bg-purple-50 text-purple-700"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl font-bold text-red-600">A</span>
                  </div>
                  <h3 className="font-semibold text-lg">Vehículo A</h3>
                  <p className="text-sm text-gray-600 mt-1">Soy el conductor del vehículo A</p>
                </div>
              </button>

              <button
                onClick={() => setSelectedRole("B")}
                className={`p-6 border-2 rounded-lg transition-colors ${
                  selectedRole === "B"
                    ? "border-purple-500 bg-purple-50 text-purple-700"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl font-bold text-blue-600">B</span>
                  </div>
                  <h3 className="font-semibold text-lg">Vehículo B</h3>
                  <p className="text-sm text-gray-600 mt-1">Soy el conductor del vehículo B</p>
                </div>
              </button>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setStep("identification")}
                disabled={!selectedRole}
                className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-400 transition-colors"
              >
                Continuar
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Driver Identification */}
        {step === "identification" && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Información del Conductor {selectedRole}</h2>

            {/* Input Method Selection */}
            <div className="mb-6">
              <p className="text-gray-700 mb-4">Seleccione método de entrada:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={() => setInputMethod("photo")}
                  className={`p-4 border-2 rounded-lg transition-colors ${
                    inputMethod === "photo" ? "border-purple-500 bg-purple-50" : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center justify-center">
                    <Upload className="w-5 h-5 mr-2" />
                    Subir Foto Licencia
                  </div>
                </button>

                <button
                  onClick={() => setInputMethod("manual")}
                  className={`p-4 border-2 rounded-lg transition-colors ${
                    inputMethod === "manual"
                      ? "border-purple-500 bg-purple-50 text-purple-700"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center justify-center">
                    <Camera className="w-5 h-5 mr-2" />
                    Ingresar Núm. Licencia
                  </div>
                </button>
              </div>
            </div>

            {inputMethod === "manual" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Número de Licencia</label>
                  <input
                    type="text"
                    value={driverData.licenseNumber}
                    onChange={(e) => setDriverData((prev) => ({ ...prev, licenseNumber: e.target.value }))}
                    placeholder="Ej: 123456789"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Fecha de Nacimiento</label>
                  <input
                    type="date"
                    value={driverData.birthDate}
                    onChange={(e) => setDriverData((prev) => ({ ...prev, birthDate: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Últimos 4 dígitos del Seguro Social
                  </label>
                  <input
                    type="text"
                    maxLength={4}
                    value={driverData.socialSecurityLast4}
                    onChange={(e) =>
                      setDriverData((prev) => ({ ...prev, socialSecurityLast4: e.target.value.replace(/\D/g, "") }))
                    }
                    placeholder="1234"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                {errors.validation && <div className="text-red-600 text-sm">{errors.validation}</div>}

                <button
                  onClick={validateWithCESCO}
                  disabled={isValidating}
                  className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 transition-colors font-medium"
                >
                  {isValidating ? "Validando con CESCO..." : "Validar con CESCO"}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Step 3: Validation Confirmation */}
        {step === "validation" && driverData.isValidated && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Check className="w-5 h-5 mr-2 text-green-600" />
              Información Validada
            </h2>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <div className="flex items-start">
                <Check className="w-5 h-5 text-green-600 mt-0.5 mr-3" />
                <div>
                  <h3 className="font-medium text-green-800">Validación Exitosa</h3>
                  <p className="text-green-700 mt-1">La información ha sido verificada con CESCO Digital</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div>
                  <span className="text-sm text-gray-600">Nombre:</span>
                  <p className="font-medium">
                    {driverData.personalInfo?.name} {driverData.personalInfo?.lastName}
                  </p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Licencia:</span>
                  <p className="font-medium">{driverData.licenseNumber}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Dirección:</span>
                  <p className="font-medium">{driverData.personalInfo?.address}</p>
                </div>
              </div>

              {/* License Photo */}
              <div>
                <span className="text-sm text-gray-600">Foto de Licencia:</span>
                <div className="mt-2">
                  <img
                    src="/sample-license.png"
                    alt="Licencia de Conducir"
                    className="w-full max-w-sm h-auto rounded-lg border shadow-sm"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={confirmValidation}
                className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Confirmar Información
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Vehicle Selection */}
        {step === "vehicle" && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Car className="w-5 h-5 mr-2" />
              Selecciona tu Vehículo
            </h2>

            <p className="text-gray-600 mb-6">Vehículos registrados a tu nombre en CESCO:</p>

            <div className="space-y-4 mb-6">
              {availableVehicles.map((vehicle) => (
                <div
                  key={vehicle.id}
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                    selectedVehicle?.id === vehicle.id
                      ? "border-purple-500 bg-purple-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => handleVehicleSelection(vehicle)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg">
                        {vehicle.year} {vehicle.make} {vehicle.model}
                      </h3>
                      <div className="grid grid-cols-3 gap-4 mt-2 text-sm">
                        <div>
                          <span className="text-gray-600">TABLILLA</span>
                          <p className="font-medium text-purple-600">{vehicle.licensePlate}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">COLOR</span>
                          <p className="font-medium">{vehicle.color}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">EXP. MARBETE</span>
                          <p className="font-medium text-purple-600">{vehicle.marbete}</p>
                        </div>
                      </div>
                      <div className="mt-3 p-3 bg-gray-50 rounded">
                        <p className="text-sm font-medium text-gray-700">Seguro:</p>
                        <p className="text-sm">
                          {vehicle.insurance.company} - {vehicle.insurance.coverage}
                        </p>
                        <p className="text-xs text-gray-600">Póliza: {vehicle.insurance.policyNumber}</p>
                      </div>
                    </div>
                    {selectedVehicle?.id === vehicle.id && <Check className="w-6 h-6 text-purple-600" />}
                  </div>
                </div>
              ))}
            </div>

            {/* Other Vehicle Option */}
            <div className="border-t pt-4">
              <button
                onClick={handleOtherVehicle}
                className={`w-full p-4 border-2 rounded-lg transition-colors ${
                  isOtherVehicle ? "border-red-500 bg-red-50" : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 mr-2 text-red-600" />
                  <span className="font-medium">El accidente involucra otro vehículo (no mío)</span>
                </div>
              </button>

              {isOtherVehicle && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-start">
                    <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 mr-3" />
                    <div>
                      <h3 className="font-medium text-red-800">Accidente con Terceros</h3>
                      <p className="text-red-700 mt-1 mb-3">
                        Si el accidente involucra un vehículo que no es tuyo, no es posible someter un informe digital
                        en este momento.
                      </p>
                      <p className="text-red-700 font-medium">Debes llamar para hacer una querella:</p>
                      <p className="text-red-800 font-bold text-lg">Policía de Puerto Rico: 787.343.2020</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {errors.vehicle && <div className="text-red-600 text-sm mt-2">{errors.vehicle}</div>}

            <div className="flex justify-between mt-6">
              <button
                onClick={() => setStep("identification")}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Volver
              </button>
              <button
                onClick={proceedToContact}
                disabled={isOtherVehicle}
                className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-400 transition-colors"
              >
                Continuar
              </button>
            </div>
          </div>
        )}

        {/* Step 5: Contact Information */}
        {step === "contact" && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Mail className="w-5 h-5 mr-2" />
              Información de Contacto - Conductor {selectedRole === "A" ? "B" : "A"}
            </h2>

            <p className="text-gray-600 mb-6">
              Proporciona la información de contacto del otro conductor para enviarle el reporte y que complete su
              parte.
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email del Conductor {selectedRole === "A" ? "B" : "A"}
                </label>
                <input
                  type="email"
                  value={otherPartyContact.email}
                  onChange={(e) => setOtherPartyContact((prev) => ({ ...prev, email: e.target.value }))}
                  placeholder="ejemplo@email.com"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Teléfono del Conductor {selectedRole === "A" ? "B" : "A"}
                </label>
                <input
                  type="tel"
                  value={otherPartyContact.phone}
                  onChange={(e) => setOtherPartyContact((prev) => ({ ...prev, phone: e.target.value }))}
                  placeholder="787-123-4567"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>

            {errors.contact && <div className="text-red-600 text-sm mt-2">{errors.contact}</div>}

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
              <div className="flex items-start">
                <Mail className="w-5 h-5 text-blue-600 mt-0.5 mr-3" />
                <div>
                  <h3 className="font-medium text-blue-800">¿Qué sucede después?</h3>
                  <p className="text-blue-700 mt-1">
                    Se enviará un email al otro conductor con un enlace para revisar y validar la información del
                    accidente, y completar sus datos personales y del vehículo.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-between mt-6">
              <button
                onClick={() => setStep("vehicle")}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Volver
              </button>
              <button
                onClick={handleFinalSubmit}
                className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Enviar Invitación
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
