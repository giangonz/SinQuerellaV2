import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Logo */}
        <div className="mb-12">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-purple-600 rounded-2xl mb-4">
            <div className="text-white text-2xl font-bold">SQ</div>
          </div>
          <div className="text-purple-600 text-xl font-semibold">Sin Querella</div>
        </div>

        {/* Main Content */}
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">Reporta tu accidente</h1>

        <p className="text-xl md:text-2xl text-gray-600 mb-8">de forma fácil, digital y sin policía</p>

        <p className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto">
          Simplifica el proceso de reportar accidentes menores. Ahorra tiempo y evita trámites innecesarios.
        </p>

        {/* CTA Button */}
        <Link
          href="/accident-type"
          className="inline-flex items-center px-8 py-4 bg-purple-600 text-white text-lg font-semibold rounded-full hover:bg-purple-700 transition-colors mb-16"
        >
          Ver cómo funciona
          <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>

        {/* Bottom Text */}
        <p className="text-gray-500 text-lg">Proceso 100% digital</p>
      </div>
    </div>
  )
}
