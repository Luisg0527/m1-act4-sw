import { useEffect, useMemo, useState } from 'react'
import './App.css'

type FilmProperties = {
  title: string
  episode_id: number
  director: string
  release_date: string
  opening_crawl: string
}

const romanByEpisode: Record<number, string> = {
  1: 'I',
  2: 'II',
  3: 'III',
  4: 'IV',
  5: 'V',
  6: 'VI',
}

function App() {
  const [filmId, setFilmId] = useState(1)
  const [film, setFilm] = useState<FilmProperties | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchFilm = async () => {
      try {
        setLoading(true)
        setError('')

        const response = await fetch(`https://www.swapi.tech/api/films/${filmId}`)
        if (!response.ok) {
          throw new Error('No se pudo consultar la pelicula.')
        }

        const data = await response.json()
        setFilm(data.result.properties)
      } catch {
        setError('Ocurrio un error al consultar la API.')
        setFilm(null)
      } finally {
        setLoading(false)
      }
    }

    void fetchFilm()
  }, [filmId])

  const handleNextFilm = () => {
    setFilmId((currentId) => (currentId === 6 ? 1 : currentId + 1))
  }

  const formattedReleaseDate = useMemo(() => {
    if (!film?.release_date) return 'Sin datos'
    return new Date(film.release_date).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })
  }, [film?.release_date])

  const productionBudget = import.meta.env.VITE_PROD_BUDGET ?? 'Sin datos'
  const globalGross = import.meta.env.VITE_PROD_GROSS ?? 'Sin datos'
  const originalFormat = import.meta.env.VITE_PROD_FORMAT ?? 'Sin datos'
  const flightDuration = import.meta.env.VITE_PROD_DURATION ?? 'Sin datos'
  const envNote = import.meta.env.VITE_ENV_NOTE ?? 'Sin datos'

  return (
    <>
      <header className="fixed top-0 z-50 flex w-full items-center justify-between bg-[#131313]/90 px-6 py-4 backdrop-blur-xl">
        <div className="flex items-center gap-8">
          <span className="font-headline text-2xl font-bold tracking-widest text-[#fbe419] uppercase">
            ARCHIVO GALACTICO
          </span>
        </div>
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="material-symbols-outlined cursor-default text-[#e5e2e1]/60 transition-colors hover:text-[#fbe419]"
          >
            settings
          </button>
          <button
            type="button"
            className="material-symbols-outlined cursor-default text-[#e5e2e1]/60 transition-colors hover:text-[#fbe419]"
          >
            account_circle
          </button>
        </div>
      </header>

      <main className="min-h-screen w-full bg-surface-container-lowest px-6 pt-24 pb-32 font-body text-on-surface selection:bg-primary-fixed selection:text-on-primary-fixed">
        <div className="relative mb-24 grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
          <div className="order-2 space-y-8 lg:order-1 lg:col-span-4">
            <div className="border-primary-fixed bg-surface-container-low border-l-4 p-8">
              <label className="font-label text-on-surface-variant mb-2 block text-xs tracking-[0.2rem] uppercase">
                Director del Proyecto
              </label>
              <p className="font-headline text-on-surface text-2xl font-bold">{film?.director ?? 'Sin datos'}</p>
            </div>
            <div className="bg-surface-container-low p-8">
              <label className="font-label text-on-surface-variant mb-2 block text-xs tracking-[0.2rem] uppercase">
                Fecha de Estreno Estelar
              </label>
              <p className="font-headline text-on-surface text-2xl font-bold">{formattedReleaseDate}</p>
            </div>
            <div className="bg-surface-container-low flex flex-col gap-6 p-8">
              <div>
                <label className="font-label text-on-surface-variant mb-2 block text-xs tracking-[0.2rem] uppercase">
                  Identificador de Archivo
                </label>
                <div className="flex items-baseline gap-2">
                  <span className="font-headline text-primary-fixed text-4xl font-black">
                    EP. {romanByEpisode[film?.episode_id ?? 1] ?? film?.episode_id}
                  </span>
                  <span className="font-label text-on-surface-variant text-xs uppercase">
                    Transmision Activa
                  </span>
                </div>
              </div>
              <button
                type="button"
                className="kyber-gradient text-on-primary-fixed group flex items-center justify-center gap-3 rounded-sm px-8 py-4 text-sm font-bold tracking-widest uppercase transition-all hover:shadow-[0_0_20px_rgba(251,228,25,0.3)] active:scale-95"
                onClick={handleNextFilm}
              >
                Siguiente Pelicula
                <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">
                  arrow_forward
                </span>
              </button>
            </div>
          </div>

          <div className="order-1 lg:order-2 lg:col-span-8">
            <div className="group relative overflow-hidden">
              <img
                className="void-fade aspect-video w-full object-cover grayscale opacity-60 transition-all duration-700 hover:grayscale-0"
                alt="Cinematic shot of deep space with a distant glowing yellow star and subtle interstellar dust particles"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB_m-bafqawCLoiSIUF8kGJQ_WSH1GVX6-VCbvl4fba2nSUhSE9PGgC59vffeedMRJysAl_dQjBfdoOngJQjy-LBRpqhGIKTWpz3kvRBxO4Ul4twCRNjeslvd7J70qZoM-nPEYH9IzwoQvRHI0SjDGbENF4LU6kntrrs83a-KnYTo6YGpKjkd-hnC5gB4wz1jurXBSHUWDhapg-GK05--ZAUqFaUpEhaWEP1ItDqtnE8GJ2zrge5jJshIY8FGE2ur8r-F3p7K9g1sAe"
              />
              <div className="absolute bottom-0 left-0 p-8 lg:p-12">
                <h1 className="font-headline text-primary-fixed text-4xl leading-none font-black tracking-tighter uppercase drop-shadow-2xl md:text-8xl">
                  {loading ? 'CARGANDO...' : film?.title ?? 'SIN DATOS'}
                </h1>
              </div>
            </div>
          </div>
        </div>

        <section className="mx-auto mt-32 max-w-4xl px-2 md:px-6">
          <div className="flex flex-col items-center space-y-12 text-center">
            <div className="inline-block rounded-full border border-outline-variant/20 px-8 py-4 md:px-14">
              <span className="font-label text-tertiary-fixed text-[10px] tracking-[0.3rem] uppercase">
                Transmision de Datos de Apertura
              </span>
            </div>
            <div className="perspective-text flex h-[500px] w-full items-center justify-center overflow-hidden">
              <div className="crawl-container font-headline text-primary-fixed/90 max-w-2xl text-justify text-xl leading-relaxed font-bold tracking-wide uppercase md:text-3xl">
                {error ? (
                  <p className="error">{error}</p>
                ) : (
                  <p>{loading ? 'Cargando transmision...' : film?.opening_crawl ?? 'Sin datos disponibles.'}</p>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-32 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="bg-surface-container col-span-1 p-8 md:col-span-2">
            <h3 className="font-headline text-on-surface-variant mb-6 text-xs tracking-[0.4rem] uppercase">
              Resumen Tecnico de Produccion
            </h3>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <span className="mb-1 block text-[10px] text-[#e5e2e1]/40 uppercase">Presupuesto</span>
                <p className="font-headline text-xl">{productionBudget}</p>
              </div>
              <div>
                <span className="mb-1 block text-[10px] text-[#e5e2e1]/40 uppercase">Recaudacion Global</span>
                <p className="font-headline text-primary-fixed text-xl">{globalGross}</p>
              </div>
              <div>
                <span className="mb-1 block text-[10px] text-[#e5e2e1]/40 uppercase">Formato Original</span>
                <p className="font-headline text-xl">{originalFormat}</p>
              </div>
              <div>
                <span className="mb-1 block text-[10px] text-[#e5e2e1]/40 uppercase">Duracion del Vuelo</span>
                <p className="font-headline text-xl">{flightDuration}</p>
              </div>
            </div>
          </div>
          <div className="bg-primary-fixed flex flex-col justify-between p-8">
            <span className="material-symbols-outlined text-on-primary-fixed text-4xl">rocket_launch</span>
            <div>
              <h4 className="font-headline text-on-primary-fixed text-2xl leading-tight font-black uppercase">
                Datos dummy de .env
              </h4>
              <p className="mt-2 text-sm text-on-primary-fixed/70">{envNote}</p>
            </div>
          </div>
        </section>
      </main>

      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="bg-primary-fixed/5 absolute top-0 right-0 h-[800px] w-[800px] translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]" />
        <div className="bg-tertiary-fixed/5 absolute bottom-0 left-0 h-[600px] w-[600px] -translate-x-1/2 translate-y-1/2 rounded-full blur-[100px]" />
      </div>
    </>
  )
}

export default App
