import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center">
      <div className="text-center text-white">
        <div className="flex items-center justify-center mb-8">
          <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mr-3">
            <span className="text-purple-600 font-bold text-xl">SQ</span>
          </div>
          <h1 className="text-4xl font-bold">Sin Querella</h1>
        </div>
        <p className="text-xl mb-8 opacity-90">Sistema de Gestión de Reclamaciones de Seguros</p>
        <Link href="/admin">
          <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
            Acceder al Panel de Administración
          </Button>
        </Link>
      </div>
    </div>
  )
}
