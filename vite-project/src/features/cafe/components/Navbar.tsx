import { useEffect, useState } from 'react'
import WeatherWidget from './WeatherWidget'

const navLinks = ['Home', 'Menu', 'About', 'Contact']

function formatDateTime(date: Date) {
  return new Intl.DateTimeFormat('vi-VN', {
    weekday: 'short',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(date)
}

function getClockValue() {
  const now = new Date()
  return {
    display: formatDateTime(now),
    iso: now.toISOString(),
  }
}

export default function Navbar() {
  const [currentTime, setCurrentTime] = useState(getClockValue)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrentTime(getClockValue())
    }, 1000)

    return () => window.clearInterval(timer)
  }, [])

  return (
    <header className="sticky top-0 z-30 border-b border-stone-900/10 bg-[#fbf7ef]/90 backdrop-blur">
      <nav
        className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8"
        aria-label="Primary navigation"
      >
        <a className="flex items-center gap-3 font-serif text-xl font-bold" href="#home">
          <span className="grid size-10 place-items-center rounded-md bg-stone-950 text-lg text-amber-200">
            C
          </span>
          Hearth & Bean
        </a>

        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <a
              className="text-sm font-semibold text-stone-700 transition hover:text-stone-950"
              href={`#${link.toLowerCase()}`}
              key={link}
            >
              {link}
            </a>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-end gap-3">
          <time
            dateTime={currentTime.iso}
            className="rounded-md border border-stone-200 bg-white/75 px-3 py-2 text-sm font-semibold text-stone-700 shadow-sm"
          >
            {currentTime.display}
          </time>
          <WeatherWidget />
        </div>
      </nav>
    </header>
  )
}
