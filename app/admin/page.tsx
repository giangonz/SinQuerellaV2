"use client"

import { useState } from "react"
import { ChevronDown, ChevronRight, Calendar, Trash2, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Dummy data for insurance claims
const claimsData = [
  {
    id: "1026200455V",
    date: "26 OCT 2023",
    name: "Hermenegildo M. Rodríguez Quinones",
    vehicle: "2016 Mitsubishi Outlander",
    insurer: "Universal",
    status: "Procesado",
    accidentDetails: {
      type: "Sección IV - Accidente en intersección",
      location: "Ave. Roosevelt con Calle Domenech, San Juan",
      plate: "WBE357",
    },
    otherParty: {
      name: "Juan del Pueblo",
      vehicle: "Toyota Corolla 2018",
      plate: "ABC123",
    },
    policyNumber: "POL-2023-001",
    coverage: "$50,000",
  },
  {
    id: "0525200327V",
    date: "15 MAY 2023",
    name: "María Rodríguez González",
    vehicle: "2019 Honda Civic",
    insurer: "Guardian",
    status: "Pendiente",
    accidentDetails: {
      type: "Sección II - Colisión trasera",
      location: "Autopista Luis A. Ferré, Bayamón",
      plate: "DEF456",
    },
    otherParty: {
      name: "Carlos Méndez",
      vehicle: "Ford F-150 2020",
      plate: "GHI789",
    },
    policyNumber: "POL-2023-002",
    coverage: "$75,000",
  },
  {
    id: "0603202345V",
    date: "03 JUN 2023",
    name: "Carlos Vega Martínez",
    vehicle: "2017 Ford Escape",
    insurer: "Seguros Múltiples",
    status: "Procesado",
    accidentDetails: {
      type: "Sección I - Accidente de estacionamiento",
      location: "Plaza Las Américas, San Juan",
      plate: "JKL012",
    },
    otherParty: {
      name: "Ana López",
      vehicle: "Nissan Sentra 2019",
      plate: "MNO345",
    },
    policyNumber: "POL-2023-003",
    coverage: "$30,000",
  },
  {
    id: "0722202378V",
    date: "22 JUL 2023",
    name: "Ana Rivera Colón",
    vehicle: "2020 Toyota RAV4",
    insurer: "Multinational",
    status: "Procesado",
    accidentDetails: {
      type: "Sección III - Accidente en carretera",
      location: "PR-52, Caguas",
      plate: "PQR678",
    },
    otherParty: {
      name: "Luis Morales",
      vehicle: "Chevrolet Malibu 2021",
      plate: "STU901",
    },
    policyNumber: "POL-2023-004",
    coverage: "$100,000",
  },
  {
    id: "0810202312V",
    date: "10 AGO 2023",
    name: "José Pérez Torres",
    vehicle: "2021 Jeep Wrangler",
    insurer: "Premier",
    status: "Pendiente",
    accidentDetails: {
      type: "Sección IV - Accidente en intersección",
      location: "Ave. Ponce de León con Ave. Muñoz Rivera, San Juan",
      plate: "VWX234",
    },
    otherParty: {
      name: "Carmen Silva",
      vehicle: "Hyundai Elantra 2022",
      plate: "YZA567",
    },
    policyNumber: "POL-2023-005",
    coverage: "$60,000",
  },
  {
    id: "0915202389V",
    date: "15 SEP 2023",
    name: "Roberto Sánchez Díaz",
    vehicle: "2018 Volkswagen Jetta",
    insurer: "SSS",
    status: "Procesado",
    accidentDetails: {
      type: "Sección II - Colisión lateral",
      location: "Ave. 65 de Infantería, Carolina",
      plate: "BCD890",
    },
    otherParty: {
      name: "Elena Vargas",
      vehicle: "Kia Forte 2020",
      plate: "EFG123",
    },
    policyNumber: "POL-2023-006",
    coverage: "$45,000",
  },
  {
    id: "1012202401V",
    date: "12 OCT 2023",
    name: "Isabella Cruz Moreno",
    vehicle: "2022 Subaru Forester",
    insurer: "Mapfre",
    status: "Pendiente",
    accidentDetails: {
      type: "Sección I - Accidente de estacionamiento",
      location: "Centro Comercial Plaza del Caribe, Ponce",
      plate: "HIJ456",
    },
    otherParty: {
      name: "Miguel Torres",
      vehicle: "Mazda CX-5 2019",
      plate: "KLM789",
    },
    policyNumber: "POL-2023-007",
    coverage: "$80,000",
  },
]

const insuranceCompanies = [
  "Todas",
  "Universal",
  "Guardian",
  "Seguros Múltiples",
  "Multinational",
  "Premier",
  "SSS",
  "Mapfre",
]

export default function AdminPage() {
  const [selectedInsurer, setSelectedInsurer] = useState("Todas")
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set())

  const filteredClaims =
    selectedInsurer === "Todas" ? claimsData : claimsData.filter((claim) => claim.insurer === selectedInsurer)

  const toggleRow = (id: string) => {
    const newExpanded = new Set(expandedRows)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedRows(newExpanded)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <span className="text-sm font-bold">SQ</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold">Sin Querella</h1>
                </div>
              </div>
            </div>
            <nav className="flex items-center space-x-8">
              <span className="text-sm font-medium">Universal Group</span>
              <span className="text-sm font-medium border-b-2 border-white/50 pb-1">Reclamaciones</span>
              <span className="text-sm font-medium">Filtros</span>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 uppercase tracking-wide">
                {selectedInsurer === "Todas" ? "UNIVERSAL" : selectedInsurer.toUpperCase()}
              </h2>
              <p className="text-gray-600 mt-1">Reclamaciones accesibles mediante API por aseguradora</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" className="flex items-center space-x-2 bg-transparent">
                <Calendar className="w-4 h-4" />
                <span>Filtrar por fecha</span>
              </Button>
              <Select value={selectedInsurer} onValueChange={setSelectedInsurer}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Aseguradora" />
                </SelectTrigger>
                <SelectContent>
                  {insuranceCompanies.map((company) => (
                    <SelectItem key={company} value={company}>
                      {company}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Claims Table */}
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fecha
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Núm. Conf.
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nombre
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Vehículo
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Aseguradora
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Estado
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredClaims.map((claim) => (
                    <>
                      <tr
                        key={claim.id}
                        className="hover:bg-gray-50 cursor-pointer"
                        onClick={() => toggleRow(claim.id)}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {expandedRows.has(claim.id) ? (
                              <ChevronDown className="w-4 h-4 mr-2 text-gray-400" />
                            ) : (
                              <ChevronRight className="w-4 h-4 mr-2 text-gray-400" />
                            )}
                            <span className="text-sm text-gray-900">{claim.date}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{claim.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{claim.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{claim.vehicle}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{claim.insurer}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge
                            variant={claim.status === "Procesado" ? "default" : "secondary"}
                            className={
                              claim.status === "Procesado"
                                ? "bg-purple-100 text-purple-800 hover:bg-purple-200"
                                : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                            }
                          >
                            {claim.status}
                          </Badge>
                        </td>
                      </tr>
                      {expandedRows.has(claim.id) && (
                        <tr>
                          <td colSpan={6} className="px-6 py-6 bg-gray-50">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                              {/* Accident Details */}
                              <div>
                                <h4 className="font-semibold text-gray-900 mb-4">Detalles del Accidente</h4>
                                <div className="space-y-2 text-sm">
                                  <div>
                                    <span className="font-medium">Tipo:</span> {claim.accidentDetails.type}
                                  </div>
                                  <div>
                                    <span className="font-medium">Ubicación:</span> {claim.accidentDetails.location}
                                  </div>
                                  <div>
                                    <span className="font-medium">Tablilla:</span> {claim.accidentDetails.plate}
                                  </div>
                                  <div>
                                    <span className="font-medium">Póliza:</span> {claim.policyNumber}
                                  </div>
                                  <div>
                                    <span className="font-medium">Cobertura:</span> {claim.coverage}
                                  </div>
                                </div>
                              </div>

                              {/* Other Party Details */}
                              <div>
                                <h4 className="font-semibold text-gray-900 mb-4">Otra Parte Involucrada</h4>
                                <div className="space-y-2 text-sm">
                                  <div>
                                    <span className="font-medium">Nombre:</span> {claim.otherParty.name}
                                  </div>
                                  <div>
                                    <span className="font-medium">Vehículo:</span> {claim.otherParty.vehicle}
                                  </div>
                                  <div>
                                    <span className="font-medium">Tablilla:</span> {claim.otherParty.plate}
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
                              <Button variant="outline" className="flex items-center space-x-2 bg-transparent">
                                <FileText className="w-4 h-4" />
                                <span>Ver reporte completo</span>
                              </Button>
                              <Button variant="destructive" className="flex items-center space-x-2">
                                <Trash2 className="w-4 h-4" />
                                <span>Eliminar</span>
                              </Button>
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}
