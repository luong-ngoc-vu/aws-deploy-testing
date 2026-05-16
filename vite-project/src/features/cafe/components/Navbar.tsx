import { useEffect, useState } from 'react'
import WeatherWidget from './WeatherWidget'

const navLinks = ['Home', 'Menu', 'About', 'Contact']

type NavbarProps = {
  isDarkMode: boolean
  onToggleTheme: () => void
}

function formatDateTime(date: Date) {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  }).format(date)
}

function getClockValue() {
  const now = new Date()
  return {
    display: formatDateTime(now),
    iso: now.toISOString(),
  }
}

export default function Navbar({ isDarkMode, onToggleTheme }: NavbarProps) {
  const [currentTime, setCurrentTime] = useState(getClockValue)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrentTime(getClockValue())
    }, 1000)

    return () => window.clearInterval(timer)
  }, [])

  return (
    <header className="sticky top-0 z-30 border-b border-stone-900/10 bg-[#fbf7ef]/90 backdrop-blur transition-colors dark:border-white/10 dark:bg-stone-950/90">
      <nav
        className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8"
        aria-label="Primary navigation"
      >
        <a
          className="flex items-center gap-3 font-serif text-xl font-bold text-stone-950 dark:text-stone-100"
          href="#home"
        >
          <span className="grid size-10 place-items-center rounded-md bg-stone-950 text-lg text-amber-200 dark:bg-amber-300 dark:text-stone-950">
            C
          </span>
          Hearth & Bean
        </a>

        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <a
              className="text-sm font-semibold text-stone-700 transition hover:text-stone-950 dark:text-stone-300 dark:hover:text-white"
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
            className="min-w-[240px] rounded-md border border-stone-200 bg-white/75 px-3 py-2 text-center text-sm font-semibold tabular-nums text-stone-700 shadow-sm dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100"
          >
            {currentTime.display}
          </time>
          <WeatherWidget />
          <button
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            className="grid size-10 place-items-center rounded-md border border-stone-200 bg-white/75 text-stone-700 shadow-sm transition hover:bg-white dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100 dark:hover:bg-stone-800"
            onClick={onToggleTheme}
            title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            type="button"
          >
            {isDarkMode ? (
              <svg
                aria-hidden="true"
                className="size-5"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2" />
                <path d="M12 20v2" />
                <path d="m4.93 4.93 1.41 1.41" />
                <path d="m17.66 17.66 1.41 1.41" />
                <path d="M2 12h2" />
                <path d="M20 12h2" />
                <path d="m6.34 17.66-1.41 1.41" />
                <path d="m19.07 4.93-1.41 1.41" />
              </svg>
            ) : (
              <svg
                aria-hidden="true"
                className="size-5"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M20.99 12.79A9 9 0 1 1 11.21 3.01 7 7 0 0 0 20.99 12.79Z" />
              </svg>
            )}
          </button>
        </div>
      </nav>
    </header>
  )
}
