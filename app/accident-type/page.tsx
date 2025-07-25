"use client"

import { useState } from "react"
import { ChevronDownIcon, RouteIcon as Road, LayersIcon as Lanes, ArrowLeftRight, X } from "lucide-react"

const accidentSections = [
  {
    id: 1,
    title: "Sección I",
    description: "Vehículos transitando en la misma dirección y en el mismo carril",
    icon: <Road className="w-6 h-6" />,
    color: "bg-red-100 text-red-600",
  },
  {
    id: 2,
    title: "Sección II",
    description: "Vehículos transitando en la misma dirección pero por carriles distintos",
    icon: <Lanes className="w-6 h-6" />,
    color: "bg-blue-100 text-blue-600",
  },
  {
    id: 3,
    title: "Sección III",
    description: "Vehículos transitando por carriles de direcciones opuestas",
    icon: <ArrowLeftRight className="w-6 h-6" />,
    color: "bg-orange-100 text-orange-600",
  },
  {
    id: 4,
    title: "Sección IV",
    description: "Accidentes en intersecciones, con o sin señales de tránsito",
    icon: "🚦",
    color: "bg-green-100 text-green-600",
  },
  {
    id: 5,
    title: "Sección V",
    description: "Accidentes en áreas de estacionamiento o al salir de ellas",
    icon: "🅿️",
    color: "bg-blue-100 text-blue-600",
  },
  {
    id: 6,
    title: "Sección VI",
    description: 'Virajes en "U" y accidentes por apertura de puertas',
    icon: "🔄",
    color: "bg-gray-100 text-gray-600",
  },
  {
    id: 7,
    title: "Sección VII",
    description: "Otros tipos de accidentes de tránsito",
    icon: "⚠️",
    color: "bg-yellow-100 text-yellow-600",
  },
]

export default function AccidentTypePage() {
  const [expandedSection, setExpandedSection] = useState<number | null>(null)
  const [showInfractionModal, setShowInfractionModal] = useState(false)

  const toggleSection = (sectionId: number) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId)
  }

  const handleDiagramIV2Selection = () => {
    setShowInfractionModal(true)
  }

  const handleInfractionResponse = (response: string) => {
    // Here you would handle the responsibility change based on the response
    console.log("Infraction response:", response)
    setShowInfractionModal(false)
    // You could update responsibility percentages based on the response
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Selecciona el tipo de accidente</h1>
        </div>

        {/* Accident Sections */}
        <div className="space-y-4">
          {accidentSections.map((section) => (
            <div key={section.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl ${section.color}`}>
                    {typeof section.icon === "string" ? section.icon : section.icon}
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg font-semibold text-gray-900">{section.title}</h3>
                    <p className="text-gray-600 text-sm">{section.description}</p>
                  </div>
                </div>
                <ChevronDownIcon
                  className={`w-5 h-5 text-gray-400 transition-transform ${
                    expandedSection === section.id ? "rotate-180" : ""
                  }`}
                />
              </button>

              {expandedSection === section.id && (
                <div className="px-6 pb-4 border-t border-gray-100">
                  <div className="pt-4">
                    {section.id === 4 ? (
                      <>
                        <p className="text-gray-700 mb-6">
                          Se consideran los derechos de paso, semáforos, "stop signs" y maniobras incorrectas al entrar
                          o cruzar una intersección.
                        </p>
                        <div className="space-y-4 mb-6">
                          {/* Diagrama IV-1 */}
                          <div className="border rounded-lg p-4 hover:border-purple-300 cursor-pointer transition-colors">
                            <div className="flex flex-col md:flex-row gap-4">
                              <div className="md:w-1/2">
                                <img src="/diagrams/IV-1.png" alt="Diagrama IV-1" className="w-full h-auto rounded" />
                              </div>
                              <div className="md:w-1/2">
                                <h4 className="font-semibold text-lg mb-2">Diagrama IV-1</h4>
                                <p className="text-gray-700 mb-3">
                                  El vehículo "A" y el vehículo "B" sufren un impacto en intersección sin señales de
                                  tránsito.
                                </p>
                                <div className="bg-gray-50 p-3 rounded">
                                  <p className="font-medium text-sm mb-1">Responsabilidad (inicial):</p>
                                  <p className="text-sm">A: 50%</p>
                                  <p className="text-sm">B: 50%</p>
                                </div>
                                <button className="mt-3 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors">
                                  Seleccionar este diagrama
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* Diagrama IV-2 - Special case with popup */}
                          <div className="border rounded-lg p-4 hover:border-purple-300 cursor-pointer transition-colors">
                            <div className="flex flex-col md:flex-row gap-4">
                              <div className="md:w-1/2">
                                <img src="/diagrams/IV-2.png" alt="Diagrama IV-2" className="w-full h-auto rounded" />
                              </div>
                              <div className="md:w-1/2">
                                <h4 className="font-semibold text-lg mb-2">Diagrama IV-2</h4>
                                <p className="text-gray-700 mb-3">
                                  El vehículo "A" y el vehículo "B" sufren un impacto en intersección controlada por
                                  señales de tránsito.
                                </p>
                                <div className="bg-gray-50 p-3 rounded">
                                  <p className="font-medium text-sm mb-1">Responsabilidad (inicial):</p>
                                  <p className="text-sm">A: 50%</p>
                                  <p className="text-sm">B: 50%</p>
                                </div>
                                <button
                                  onClick={handleDiagramIV2Selection}
                                  className="mt-3 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
                                >
                                  Seleccionar este diagrama
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* Diagrama IV-3 */}
                          <div className="border rounded-lg p-4 hover:border-purple-300 cursor-pointer transition-colors">
                            <div className="flex flex-col md:flex-row gap-4">
                              <div className="md:w-1/2">
                                <img src="/diagrams/IV-3.png" alt="Diagrama IV-3" className="w-full h-auto rounded" />
                              </div>
                              <div className="md:w-1/2">
                                <h4 className="font-semibold text-lg mb-2">Diagrama IV-3</h4>
                                <p className="text-gray-700 mb-3">
                                  El vehículo "A" y el vehículo "B" sufren un impacto en intersección en forma de "T" no
                                  controlada por señales de tránsito.
                                </p>
                                <div className="bg-gray-50 p-3 rounded">
                                  <p className="font-medium text-sm mb-1">Responsabilidad (inicial):</p>
                                  <p className="text-sm">A: 50%</p>
                                  <p className="text-sm">B: 50%</p>
                                </div>
                                <button className="mt-3 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors">
                                  Seleccionar este diagrama
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* Diagrama IV-4 */}
                          <div className="border rounded-lg p-4 hover:border-purple-300 cursor-pointer transition-colors">
                            <div className="flex flex-col md:flex-row gap-4">
                              <div className="md:w-1/2">
                                <img src="/diagrams/IV-4.png" alt="Diagrama IV-4" className="w-full h-auto rounded" />
                              </div>
                              <div className="md:w-1/2">
                                <h4 className="font-semibold text-lg mb-2">Diagrama IV-4</h4>
                                <p className="text-gray-700 mb-3">
                                  El vehículo "A" y el vehículo "B" sufren un impacto en intersección en forma de "T" no
                                  controlada por señales de tránsito.
                                </p>
                                <div className="bg-gray-50 p-3 rounded">
                                  <p className="font-medium text-sm mb-1">Responsabilidad (inicial):</p>
                                  <p className="text-sm">A: 50%</p>
                                  <p className="text-sm">B: 50%</p>
                                </div>
                                <button className="mt-3 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors">
                                  Seleccionar este diagrama
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* Diagrama IV-5 */}
                          <div className="border rounded-lg p-4 hover:border-purple-300 cursor-pointer transition-colors">
                            <div className="flex flex-col md:flex-row gap-4">
                              <div className="md:w-1/2">
                                <img src="/diagrams/IV-5.png" alt="Diagrama IV-5" className="w-full h-auto rounded" />
                              </div>
                              <div className="md:w-1/2">
                                <h4 className="font-semibold text-lg mb-2">Diagrama IV-5</h4>
                                <p className="text-gray-700 mb-3">
                                  El vehículo "B" que tránsito por su carril, impacta a, o es impactado por, el vehículo
                                  "A" que transita por una salida de autopista de peaje, o vía pública.
                                </p>
                                <div className="bg-gray-50 p-3 rounded">
                                  <p className="font-medium text-sm mb-1">Responsabilidad (inicial):</p>
                                  <p className="text-sm">A: 100%</p>
                                  <p className="text-sm">B: 0%</p>
                                </div>
                                <button className="mt-3 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors">
                                  Seleccionar este diagrama
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : section.id === 2 ? (
                      <>
                        <p className="text-gray-700 mb-6">
                          Incluye cambios de carril, adelantamientos y colisiones laterales entre vehículos que viajan
                          paralelamente.
                        </p>
                        <div className="space-y-4 mb-6">
                          {/* Diagrama II-1 */}
                          <div className="border rounded-lg p-4 hover:border-purple-300 cursor-pointer transition-colors">
                            <div className="flex flex-col md:flex-row gap-4">
                              <div className="md:w-1/2">
                                <img src="/diagrams/II-1.png" alt="Diagrama II-1" className="w-full h-auto rounded" />
                              </div>
                              <div className="md:w-1/2">
                                <h4 className="font-semibold text-lg mb-2">Diagrama II-1</h4>
                                <p className="text-gray-700 mb-3">
                                  El vehículo "A" u el vehículo "B" chocan sin cambiar de carril.
                                </p>
                                <div className="bg-gray-50 p-3 rounded">
                                  <p className="font-medium text-sm mb-1">Responsabilidad (inicial):</p>
                                  <p className="text-sm">A: 50%</p>
                                  <p className="text-sm">B: 50%</p>
                                </div>
                                <button className="mt-3 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors">
                                  Seleccionar este diagrama
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* Diagrama II-2 */}
                          <div className="border rounded-lg p-4 hover:border-purple-300 cursor-pointer transition-colors">
                            <div className="flex flex-col md:flex-row gap-4">
                              <div className="md:w-1/2">
                                <img src="/diagrams/II-2.png" alt="Diagrama II-2" className="w-full h-auto rounded" />
                              </div>
                              <div className="md:w-1/2">
                                <h4 className="font-semibold text-lg mb-2">Diagrama II-2</h4>
                                <p className="text-gray-700 mb-3">
                                  El vehículo "A" invade carril del vehículo "B", para virar o rebasarle e impacta a, o
                                  es impactado por, el vehículo "A".
                                </p>
                                <div className="bg-gray-50 p-3 rounded">
                                  <p className="font-medium text-sm mb-1">Responsabilidad (inicial):</p>
                                  <p className="text-sm">A: 100%</p>
                                  <p className="text-sm">B: 0%</p>
                                </div>
                                <button className="mt-3 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors">
                                  Seleccionar este diagrama
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* Diagrama II-3 */}
                          <div className="border rounded-lg p-4 hover:border-purple-300 cursor-pointer transition-colors">
                            <div className="flex flex-col md:flex-row gap-4">
                              <div className="md:w-1/2">
                                <img src="/diagrams/II-3.png" alt="Diagrama II-3" className="w-full h-auto rounded" />
                              </div>
                              <div className="md:w-1/2">
                                <h4 className="font-semibold text-lg mb-2">Diagrama II-3</h4>
                                <p className="text-gray-700 mb-3">
                                  El vehículo "A" está estacionado, trata de ingresar a la vía pública e impacta a, o es
                                  impactado por, el vehículo "B".
                                </p>
                                <div className="bg-gray-50 p-3 rounded">
                                  <p className="font-medium text-sm mb-1">Responsabilidad (inicial):</p>
                                  <p className="text-sm">A: 100%</p>
                                  <p className="text-sm">B: 0%</p>
                                </div>
                                <button className="mt-3 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors">
                                  Seleccionar este diagrama
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : section.id === 1 ? (
                      <>
                        <p className="text-gray-700 mb-6">
                          Incluye alcances, frenazos y colisiones por seguir muy cerca.
                        </p>
                        <div className="space-y-4 mb-6">
                          {/* Diagrama I-1 */}
                          <div className="border rounded-lg p-4 hover:border-purple-300 cursor-pointer transition-colors">
                            <div className="flex flex-col md:flex-row gap-4">
                              <div className="md:w-1/2">
                                <img src="/diagrams/I-1.png" alt="Diagrama I-1" className="w-full h-auto rounded" />
                              </div>
                              <div className="md:w-1/2">
                                <h4 className="font-semibold text-lg mb-2">Diagrama I-1</h4>
                                <p className="text-gray-700 mb-3">
                                  El vehículo "A" impacta al vehículo "B" por la parte posterior.
                                </p>
                                <div className="bg-gray-50 p-3 rounded">
                                  <p className="font-medium text-sm mb-1">Responsabilidad (inicial):</p>
                                  <p className="text-sm">A: 100%</p>
                                  <p className="text-sm">B: 0%</p>
                                </div>
                                <button className="mt-3 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors">
                                  Seleccionar este diagrama
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* Diagrama I-2 */}
                          <div className="border rounded-lg p-4 hover:border-purple-300 cursor-pointer transition-colors">
                            <div className="flex flex-col md:flex-row gap-4">
                              <div className="md:w-1/2">
                                <img src="/diagrams/I-2.png" alt="Diagrama I-2" className="w-full h-auto rounded" />
                              </div>
                              <div className="md:w-1/2">
                                <h4 className="font-semibold text-lg mb-2">Diagrama I-2</h4>
                                <p className="text-gray-700 mb-3">
                                  El vehículo "A" retrocede e impacta al vehículo "B".
                                </p>
                                <div className="bg-gray-50 p-3 rounded">
                                  <p className="font-medium text-sm mb-1">Responsabilidad (inicial):</p>
                                  <p className="text-sm">A: 100%</p>
                                  <p className="text-sm">B: 0%</p>
                                </div>
                                <button className="mt-3 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors">
                                  Seleccionar este diagrama
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* Diagrama I-3 */}
                          <div className="border rounded-lg p-4 hover:border-purple-300 cursor-pointer transition-colors">
                            <div className="flex flex-col md:flex-row gap-4">
                              <div className="md:w-1/2">
                                <img src="/diagrams/I-3.png" alt="Diagrama I-3" className="w-full h-auto rounded" />
                              </div>
                              <div className="md:w-1/2">
                                <h4 className="font-semibold text-lg mb-2">Diagrama I-3</h4>
                                <p className="text-gray-700 mb-3">
                                  El vehículo "A" impacta al vehículo "B" cuando el vehículo "B" hace un viraje hacia la
                                  izquierda o hacia la derecha.
                                </p>
                                <div className="bg-gray-50 p-3 rounded">
                                  <p className="font-medium text-sm mb-1">Responsabilidad (inicial):</p>
                                  <p className="text-sm">A: 100%</p>
                                  <p className="text-sm">B: 0%</p>
                                </div>
                                <button className="mt-3 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors">
                                  Seleccionar este diagrama
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* Diagrama I-4 */}
                          <div className="border rounded-lg p-4 hover:border-purple-300 cursor-pointer transition-colors">
                            <div className="flex flex-col md:flex-row gap-4">
                              <div className="md:w-1/2">
                                <img src="/diagrams/I-4.png" alt="Diagrama I-4" className="w-full h-auto rounded" />
                              </div>
                              <div className="md:w-1/2">
                                <h4 className="font-semibold text-lg mb-2">Diagrama I-4</h4>
                                <p className="text-gray-700 mb-3">
                                  El vehículo "A" impacta al vehículo "B" por la parte posterior cuando el vehículo "B"
                                  trata de estacionarse en la vía pública.
                                </p>
                                <div className="bg-gray-50 p-3 rounded">
                                  <p className="font-medium text-sm mb-1">Responsabilidad (inicial):</p>
                                  <p className="text-sm">A: 100%</p>
                                  <p className="text-sm">B: 0%</p>
                                </div>
                                <button className="mt-3 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors">
                                  Seleccionar este diagrama
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : section.id === 3 ? (
                      <>
                        <p className="text-gray-700 mb-6">
                          Se analiza responsabilidad en choques frontales, invasión de carril o giros indebidos que
                          cruzan el tránsito contrario.
                        </p>
                        <div className="space-y-4 mb-6">
                          {/* Diagrama III-1 */}
                          <div className="border rounded-lg p-4 hover:border-purple-300 cursor-pointer transition-colors">
                            <div className="flex flex-col md:flex-row gap-4">
                              <div className="md:w-1/2">
                                <img src="/diagrams/III-1.png" alt="Diagrama III-1" className="w-full h-auto rounded" />
                              </div>
                              <div className="md:w-1/2">
                                <h4 className="font-semibold text-lg mb-2">Diagrama III-1</h4>
                                <p className="text-gray-700 mb-3">
                                  El vehículo "A" invade carril contrario e impacta a, o es impactado por, el vehículo
                                  "B".
                                </p>
                                <div className="bg-gray-50 p-3 rounded">
                                  <p className="font-medium text-sm mb-1">Responsabilidad (inicial):</p>
                                  <p className="text-sm">A: 100%</p>
                                  <p className="text-sm">B: 0%</p>
                                </div>
                                <button className="mt-3 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors">
                                  Seleccionar este diagrama
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* Diagrama III-2 */}
                          <div className="border rounded-lg p-4 hover:border-purple-300 cursor-pointer transition-colors">
                            <div className="flex flex-col md:flex-row gap-4">
                              <div className="md:w-1/2">
                                <img src="/diagrams/III-2.png" alt="Diagrama III-2" className="w-full h-auto rounded" />
                              </div>
                              <div className="md:w-1/2">
                                <h4 className="font-semibold text-lg mb-2">Diagrama III-2</h4>
                                <p className="text-gray-700 mb-3">
                                  El vehículo "A" invade carril contrario para virar e impacta a, o es impactado por, el
                                  vehículo "B".
                                </p>
                                <div className="bg-gray-50 p-3 rounded">
                                  <p className="font-medium text-sm mb-1">Responsabilidad (inicial):</p>
                                  <p className="text-sm">A: 100%</p>
                                  <p className="text-sm">B: 0%</p>
                                </div>
                                <button className="mt-3 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors">
                                  Seleccionar este diagrama
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* Diagrama III-3 */}
                          <div className="border rounded-lg p-4 hover:border-purple-300 cursor-pointer transition-colors">
                            <div className="flex flex-col md:flex-row gap-4">
                              <div className="md:w-1/2">
                                <img src="/diagrams/III-3.png" alt="Diagrama III-3" className="w-full h-auto rounded" />
                              </div>
                              <div className="md:w-1/2">
                                <h4 className="font-semibold text-lg mb-2">Diagrama III-3</h4>
                                <p className="text-gray-700 mb-3">
                                  El vehículo "A" y el vehículo "B" cruzan ambos la línea de centro y chocan.
                                </p>
                                <div className="bg-gray-50 p-3 rounded">
                                  <p className="font-medium text-sm mb-1">Responsabilidad (inicial):</p>
                                  <p className="text-sm">A: 50%</p>
                                  <p className="text-sm">B: 50%</p>
                                </div>
                                <button className="mt-3 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors">
                                  Seleccionar este diagrama
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* Diagrama III-4 */}
                          <div className="border rounded-lg p-4 hover:border-purple-300 cursor-pointer transition-colors">
                            <div className="flex flex-col md:flex-row gap-4">
                              <div className="md:w-1/2">
                                <img src="/diagrams/III-4.png" alt="Diagrama III-4" className="w-full h-auto rounded" />
                              </div>
                              <div className="md:w-1/2">
                                <h4 className="font-semibold text-lg mb-2">Diagrama III-4</h4>
                                <p className="text-gray-700 mb-3">
                                  El vehículo "A" y el vehículo "B" chocan al transitar por zona de ancho reducido.
                                </p>
                                <div className="bg-gray-50 p-3 rounded">
                                  <p className="font-medium text-sm mb-1">Responsabilidad (inicial):</p>
                                  <p className="text-sm">A: 50%</p>
                                  <p className="text-sm">B: 50%</p>
                                </div>
                                <button className="mt-3 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors">
                                  Seleccionar este diagrama
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* Diagrama III-5 */}
                          <div className="border rounded-lg p-4 hover:border-purple-300 cursor-pointer transition-colors">
                            <div className="flex flex-col md:flex-row gap-4">
                              <div className="md:w-1/2">
                                <img src="/diagrams/III-5.png" alt="Diagrama III-5" className="w-full h-auto rounded" />
                              </div>
                              <div className="md:w-1/2">
                                <h4 className="font-semibold text-lg mb-2">Diagrama III-5</h4>
                                <p className="text-gray-700 mb-3">
                                  El vehículo "A" y el vehículo "B" cruzan ambos línea de centro y chocan.
                                </p>
                                <div className="bg-gray-50 p-3 rounded">
                                  <p className="font-medium text-sm mb-1">Responsabilidad (inicial):</p>
                                  <p className="text-sm">A: 50%</p>
                                  <p className="text-sm">B: 50%</p>
                                </div>
                                <button className="mt-3 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors">
                                  Seleccionar este diagrama
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : section.id === 5 ? (
                      <>
                        <p className="text-gray-700 mb-6">
                          Aplica cuando un vehículo está estacionado o saliendo de una zona privada o pública, o circula
                          en áreas de poco control vehicular.
                        </p>
                        <div className="space-y-4 mb-6">
                          {/* Diagrama V-1 */}
                          <div className="border rounded-lg p-4 hover:border-purple-300 cursor-pointer transition-colors">
                            <div className="flex flex-col md:flex-row gap-4">
                              <div className="md:w-1/2">
                                <img src="/diagrams/V-1.png" alt="Diagrama V-1" className="w-full h-auto rounded" />
                              </div>
                              <div className="md:w-1/2">
                                <h4 className="font-semibold text-lg mb-2">Diagrama V-1</h4>
                                <p className="text-gray-700 mb-3">
                                  El vehículo "B" está estacionado en vía pública y el vehículo "A" lo impacta.
                                </p>
                                <div className="bg-gray-50 p-3 rounded">
                                  <p className="font-medium text-sm mb-1">Responsabilidad (inicial):</p>
                                  <p className="text-sm">A: 100%</p>
                                  <p className="text-sm">B: 0%</p>
                                </div>
                                <button className="mt-3 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors">
                                  Seleccionar este diagrama
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* Diagrama V-2 */}
                          <div className="border rounded-lg p-4 hover:border-purple-300 cursor-pointer transition-colors">
                            <div className="flex flex-col md:flex-row gap-4">
                              <div className="md:w-1/2">
                                <img src="/diagrams/V-2.png" alt="Diagrama V-2" className="w-full h-auto rounded" />
                              </div>
                              <div className="md:w-1/2">
                                <h4 className="font-semibold text-lg mb-2">Diagrama V-2</h4>
                                <p className="text-gray-700 mb-3">
                                  El vehículo "B" está estacionado en área de estacionamiento y el vehículo "A" lo
                                  impacta.
                                </p>
                                <div className="bg-gray-50 p-3 rounded">
                                  <p className="font-medium text-sm mb-1">Responsabilidad (inicial):</p>
                                  <p className="text-sm">A: 100%</p>
                                  <p className="text-sm">B: 0%</p>
                                </div>
                                <button className="mt-3 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors">
                                  Seleccionar este diagrama
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* Diagram V-3 */}
                          <div className="border rounded-lg p-4 hover:border-purple-300 cursor-pointer transition-colors">
                            <div className="flex flex-col md:flex-row gap-4">
                              <div className="md:w-1/2">
                                <img src="/diagrams/V-3.png" alt="Diagrama V-3" className="w-full h-auto rounded" />
                              </div>
                              <div className="md:w-1/2">
                                <h4 className="font-semibold text-lg mb-2">Diagrama V-3</h4>
                                <p className="text-gray-700 mb-3">
                                  El vehículo "B" está estacionado en vía de rodaje utilizando señales o avisos de
                                  precaución y es impactado por el vehículo "A".
                                </p>
                                <div className="bg-gray-50 p-3 rounded">
                                  <p className="font-medium text-sm mb-1">Responsabilidad (inicial):</p>
                                  <p className="text-sm">A: 100%</p>
                                  <p className="text-sm">B: 0%</p>
                                </div>
                                <button className="mt-3 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors">
                                  Seleccionar este diagrama
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* Diagrama V-4 */}
                          <div className="border rounded-lg p-4 hover:border-purple-300 cursor-pointer transition-colors">
                            <div className="flex flex-col md:flex-row gap-4">
                              <div className="md:w-1/2">
                                <img src="/diagrams/V-4.png" alt="Diagrama V-4" className="w-full h-auto rounded" />
                              </div>
                              <div className="md:w-1/2">
                                <h4 className="font-semibold text-lg mb-2">Diagrama V-4</h4>
                                <p className="text-gray-700 mb-3">
                                  El vehículo "B" está estacionado en vía pública sin señales o avisos de precaución y
                                  es impactado por el vehículo "A".
                                </p>
                                <div className="bg-gray-50 p-3 rounded">
                                  <p className="font-medium text-sm mb-1">Responsabilidad (inicial):</p>
                                  <p className="text-sm">A: 50%</p>
                                  <p className="text-sm">B: 50%</p>
                                </div>
                                <button className="mt-3 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors">
                                  Seleccionar este diagrama
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* Diagrama V-5 */}
                          <div className="border rounded-lg p-4 hover:border-purple-300 cursor-pointer transition-colors">
                            <div className="flex flex-col md:flex-row gap-4">
                              <div className="md:w-1/2">
                                <img src="/diagrams/V-5.png" alt="Diagrama V-5" className="w-full h-auto rounded" />
                              </div>
                              <div className="md:w-1/2">
                                <h4 className="font-semibold text-lg mb-2">Diagrama V-5</h4>
                                <p className="text-gray-700 mb-3">
                                  El vehículo "B" va saliendo de un espacio de estacionamiento e impacta a, o es
                                  impactado por, el vehículo "A" que también está en movimiento.
                                </p>
                                <div className="bg-gray-50 p-3 rounded">
                                  <p className="font-medium text-sm mb-1">Responsabilidad (inicial):</p>
                                  <p className="text-sm">A: 50%</p>
                                  <p className="text-sm">B: 50%</p>
                                </div>
                                <button className="mt-3 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors">
                                  Seleccionar este diagrama
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* Diagrama V-6 */}
                          <div className="border rounded-lg p-4 hover:border-purple-300 cursor-pointer transition-colors">
                            <div className="flex flex-col md:flex-row gap-4">
                              <div className="md:w-1/2">
                                <img src="/diagrams/V-6.png" alt="Diagrama V-6" className="w-full h-auto rounded" />
                              </div>
                              <div className="md:w-1/2">
                                <h4 className="font-semibold text-lg mb-2">Diagrama V-6</h4>
                                <p className="text-gray-700 mb-3">
                                  El vehículo "A" y el vehículo "B" sufren un impacto mientras transitan en un área de
                                  estacionamiento.
                                </p>
                                <div className="bg-gray-50 p-3 rounded">
                                  <p className="font-medium text-sm mb-1">Responsabilidad (inicial):</p>
                                  <p className="text-sm">A: 50%</p>
                                  <p className="text-sm">B: 50%</p>
                                </div>
                                <button className="mt-3 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors">
                                  Seleccionar este diagrama
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* Diagrama V-7 */}
                          <div className="border rounded-lg p-4 hover:border-purple-300 cursor-pointer transition-colors">
                            <div className="flex flex-col md:flex-row gap-4">
                              <div className="md:w-1/2">
                                <img src="/diagrams/V-7.png" alt="Diagrama V-7" className="w-full h-auto rounded" />
                              </div>
                              <div className="md:w-1/2">
                                <h4 className="font-semibold text-lg mb-2">Diagrama V-7</h4>
                                <p className="text-gray-700 mb-3">
                                  El vehículo "A", que sale de un área de estacionamiento o camino privado, hacia la vía
                                  pública, impacta a, o es impactado por, el vehículo "B" que invade carril contrario,
                                  con la intención o no de entrar al área de estacionamiento o camino privado.
                                </p>
                                <div className="bg-gray-50 p-3 rounded">
                                  <p className="font-medium text-sm mb-1">Responsabilidad (inicial):</p>
                                  <p className="text-sm">A: 50%</p>
                                  <p className="text-sm">B: 50%</p>
                                </div>
                                <button className="mt-3 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors">
                                  Seleccionar este diagrama
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* Diagrama V-8 */}
                          <div className="border rounded-lg p-4 hover:border-purple-300 cursor-pointer transition-colors">
                            <div className="flex flex-col md:flex-row gap-4">
                              <div className="md:w-1/2">
                                <img src="/diagrams/V-8.png" alt="Diagrama V-8" className="w-full h-auto rounded" />
                              </div>
                              <div className="md:w-1/2">
                                <h4 className="font-semibold text-lg mb-2">Diagrama V-8</h4>
                                <p className="text-gray-700 mb-3">
                                  El vehículo "A", que sale de un área de estacionamiento o camino privado, hacia la vía
                                  pública, impacta a, o es impactado por, el vehículo "B" que transita por su carril.
                                </p>
                                <div className="bg-gray-50 p-3 rounded">
                                  <p className="font-medium text-sm mb-1">Responsabilidad (inicial):</p>
                                  <p className="text-sm">A: 100%</p>
                                  <p className="text-sm">B: 0%</p>
                                </div>
                                <button className="mt-3 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors">
                                  Seleccionar este diagrama
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : section.id === 6 ? (
                      <>
                        <p className="text-gray-700 mb-6">
                          Situaciones donde se realizan maniobras prohibidas o imprudentes, como virajes en U o abrir
                          una puerta sin precaución.
                        </p>
                        <div className="space-y-4 mb-6">
                          {/* Diagrama VI-1 */}
                          <div className="border rounded-lg p-4 hover:border-purple-300 cursor-pointer transition-colors">
                            <div className="flex flex-col md:flex-row gap-4">
                              <div className="md:w-1/2">
                                <img src="/diagrams/VI-1.png" alt="Diagrama VI-1" className="w-full h-auto rounded" />
                              </div>
                              <div className="md:w-1/2">
                                <h4 className="font-semibold text-lg mb-2">Diagrama VI-1</h4>
                                <p className="text-gray-700 mb-3">
                                  El vehículo "A" vira en "U" y es impactado por el vehículo "B".
                                </p>
                                <div className="bg-gray-50 p-3 rounded">
                                  <p className="font-medium text-sm mb-1">Responsabilidad (inicial):</p>
                                  <p className="text-sm">A: 100%</p>
                                  <p className="text-sm">B: 0%</p>
                                </div>
                                <button className="mt-3 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors">
                                  Seleccionar este diagrama
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* Diagrama VI-2 */}
                          <div className="border rounded-lg p-4 hover:border-purple-300 cursor-pointer transition-colors">
                            <div className="flex flex-col md:flex-row gap-4">
                              <div className="md:w-1/2">
                                <img src="/diagrams/VI-2.png" alt="Diagrama VI-2" className="w-full h-auto rounded" />
                              </div>
                              <div className="md:w-1/2">
                                <h4 className="font-semibold text-lg mb-2">Diagrama VI-2</h4>
                                <p className="text-gray-700 mb-3">
                                  El vehículo "A" vira en "U" e impacta al vehículo "B".
                                </p>
                                <div className="bg-gray-50 p-3 rounded">
                                  <p className="font-medium text-sm mb-1">Responsabilidad (inicial):</p>
                                  <p className="text-sm">A: 100%</p>
                                  <p className="text-sm">B: 0%</p>
                                </div>
                                <button className="mt-3 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors">
                                  Seleccionar este diagrama
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* Diagrama VI-3 */}
                          <div className="border rounded-lg p-4 hover:border-purple-300 cursor-pointer transition-colors">
                            <div className="flex flex-col md:flex-row gap-4">
                              <div className="md:w-1/2">
                                <img src="/diagrams/VI-3.png" alt="Diagrama VI-3" className="w-full h-auto rounded" />
                              </div>
                              <div className="md:w-1/2">
                                <h4 className="font-semibold text-lg mb-2">Diagrama VI-3</h4>
                                <p className="text-gray-700 mb-3">
                                  El vehículo "B" impacta a, o es impactado por, el vehículo "A" cuando se abre la
                                  puerta del vehículo "A".
                                </p>
                                <div className="bg-gray-50 p-3 rounded">
                                  <p className="font-medium text-sm mb-1">Responsabilidad (inicial):</p>
                                  <p className="text-sm">A: 100%</p>
                                  <p className="text-sm">B: 0%</p>
                                </div>
                                <button className="mt-3 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors">
                                  Seleccionar este diagrama
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* Diagrama VI-4 */}
                          <div className="border rounded-lg p-4 hover:border-purple-300 cursor-pointer transition-colors">
                            <div className="flex flex-col md:flex-row gap-4">
                              <div className="md:w-1/2">
                                <img src="/diagrams/VI-4.png" alt="Diagrama VI-4" className="w-full h-auto rounded" />
                              </div>
                              <div className="md:w-1/2">
                                <h4 className="font-semibold text-lg mb-2">Diagrama VI-4</h4>
                                <p className="text-gray-700 mb-3">
                                  El vehículo "B" impacta a, o es impactado por, el vehículo "A" mientras el vehículo
                                  "B" hace un viraje.
                                </p>
                                <div className="bg-gray-50 p-3 rounded">
                                  <p className="font-medium text-sm mb-1">Responsabilidad (inicial):</p>
                                  <p className="text-sm">A: 100%</p>
                                  <p className="text-sm">B: 0%</p>
                                </div>
                                <button className="mt-3 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors">
                                  Seleccionar este diagrama
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* Diagrama VI-5 */}
                          <div className="border rounded-lg p-4 hover:border-purple-300 cursor-pointer transition-colors">
                            <div className="flex flex-col md:flex-row gap-4">
                              <div className="md:w-1/2">
                                <img src="/diagrams/VI-5.png" alt="Diagrama VI-5" className="w-full h-auto rounded" />
                              </div>
                              <div className="md:w-1/2">
                                <h4 className="font-semibold text-lg mb-2">Diagrama VI-5</h4>
                                <p className="text-gray-700 mb-3">
                                  El vehículo "A" vira hacia la izquierda con luz verde sin flecha e impacta a, o es
                                  impactado por, el vehículo "B" que tiene luz verde a su favor.
                                </p>
                                <div className="bg-gray-50 p-3 rounded">
                                  <p className="font-medium text-sm mb-1">Responsabilidad (inicial):</p>
                                  <p className="text-sm">A: 100%</p>
                                  <p className="text-sm">B: 0%</p>
                                </div>
                                <button className="mt-3 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors">
                                  Seleccionar este diagrama
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* Diagrama VI-6 */}
                          <div className="border rounded-lg p-4 hover:border-purple-300 cursor-pointer transition-colors">
                            <div className="flex flex-col md:flex-row gap-4">
                              <div className="md:w-1/2">
                                <img src="/diagrams/VI-6.png" alt="Diagrama VI-6" className="w-full h-auto rounded" />
                              </div>
                              <div className="md:w-1/2">
                                <h4 className="font-semibold text-lg mb-2">Diagrama VI-6</h4>
                                <p className="text-gray-700 mb-3">
                                  El vehículo "B" vira hacia la izquierda con flecha verde a su favor e impacta a, o es
                                  impactado por, el vehículo "A".
                                </p>
                                <div className="bg-gray-50 p-3 rounded">
                                  <p className="font-medium text-sm mb-1">Responsabilidad (inicial):</p>
                                  <p className="text-sm">A: 100%</p>
                                  <p className="text-sm">B: 0%</p>
                                </div>
                                <button className="mt-3 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors">
                                  Seleccionar este diagrama
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <p className="text-gray-700 mb-4">Detalles adicionales para {section.title.toLowerCase()}:</p>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-sm text-gray-600">
                            Aquí puedes agregar información específica sobre este tipo de accidente, formularios
                            adicionales, o pasos específicos para reportar este caso.
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Back Button */}
        <div className="mt-8 text-center">
          <a href="/" className="inline-flex items-center text-purple-600 hover:text-purple-700 font-medium">
            <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Volver al inicio
          </a>
        </div>
      </div>

      {/* Infraction Confirmation Modal for IV-2 */}
      {showInfractionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Confirmación de Infracción</h2>
              <button onClick={() => setShowInfractionModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>

            <p className="text-gray-600 text-center mb-6">
              Para el Diagrama IV-2 (intersección controlada por semáforo):
            </p>

            <div className="mb-8">
              <p className="text-lg font-medium text-gray-900 text-center mb-6">
                ¿El vehículo 'A' o el vehículo 'B' cometieron una infracción al no respetar la luz del semáforo?
              </p>

              <div className="space-y-3">
                <button
                  onClick={() => handleInfractionResponse("vehicle-a")}
                  className="w-full p-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
                >
                  Sí, Vehículo 'A' cometió la infracción
                </button>

                <button
                  onClick={() => handleInfractionResponse("vehicle-b")}
                  className="w-full p-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
                >
                  Sí, Vehículo 'B' cometió la infracción
                </button>

                <button
                  onClick={() => handleInfractionResponse("none")}
                  className="w-full p-4 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-gray-400 transition-colors font-medium"
                >
                  No, ninguno cometió infracción / No aplica
                </button>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={() => setShowInfractionModal(false)}
                className="text-purple-600 hover:text-purple-700 font-medium"
              >
                Volver a seleccionar diagrama
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
