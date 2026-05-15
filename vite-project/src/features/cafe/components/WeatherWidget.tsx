import axios from 'axios'
import { useEffect, useState } from 'react'

const DEFAULT_CITY = 'Da Nang,VN'
const DISPLAY_LOCATION = 'Da Nang, VN'
const WEATHER_API_URL =
  (import.meta.env.VITE_WEATHER_API_URL as string | undefined) ||
  'https://api.openweathermap.org/data/2.5/weather'
const FORECAST_API_URL = WEATHER_API_URL.replace('/weather', '/forecast')
const openWeatherApiKey = import.meta.env.VITE_OPENWEATHER_API_KEY as string | undefined

type WeatherData = {
  main: {
    temp: number
  }
  weather: Array<{
    description: string
  }>
}

type ForecastItem = {
  dt: number
  dt_txt: string
  main: {
    temp: number
  }
  weather: Array<{
    description: string
    icon: string
  }>
}

type ForecastResponse = {
  list: ForecastItem[]
  city: {
    timezone: number
  }
}

type DailyForecast = {
  date: string
  label: string
  temp: number
  description: string
  icon: string
}

type WeatherState =
  | { status: 'loading' }
  | { status: 'success'; current: WeatherData; forecast: ForecastResponse; fetchedAt: number }
  | { status: 'error'; message: string }

function toLocalTimestamp(dt: number, timezone: number) {
  return (dt + timezone) * 1000
}

function formatForecastLabel(dateString: string) {
  const [year, month, day] = dateString.split('-').map(Number)
  return new Date(Date.UTC(year, month - 1, day)).toLocaleDateString('vi-VN', {
    weekday: 'short',
    day: '2-digit',
    month: '2-digit',
  })
}

function getDailyForecasts(forecast: ForecastResponse, fetchedAt: number): DailyForecast[] {
  const todayKey = new Date(toLocalTimestamp(fetchedAt, forecast.city.timezone))
    .toISOString()
    .slice(0, 10)
  const grouped = forecast.list.reduce<Record<string, ForecastItem[]>>((acc, item) => {
    const dateKey = new Date(toLocalTimestamp(item.dt, forecast.city.timezone))
      .toISOString()
      .slice(0, 10)

    if (dateKey <= todayKey) {
      return acc
    }

    if (!acc[dateKey]) {
      acc[dateKey] = []
    }

    acc[dateKey].push(item)
    return acc
  }, {})

  return Object.entries(grouped)
    .slice(0, 4)
    .map(([date, items]) => {
      const forecastItem = items.find((item) => item.dt_txt.includes('12:00:00')) || items[0]

      return {
        date,
        label: formatForecastLabel(date),
        temp: Math.round(forecastItem.main.temp),
        description: forecastItem.weather[0].description,
        icon: forecastItem.weather[0].icon,
      }
    })
}

export default function WeatherWidget() {
  const [weatherState, setWeatherState] = useState<WeatherState>(
    openWeatherApiKey
      ? { status: 'loading' }
      : {
          status: 'error',
          message: 'Missing weather API key',
        },
  )
  const [isForecastOpen, setIsForecastOpen] = useState(false)

  useEffect(() => {
    const controller = new AbortController()

    if (!openWeatherApiKey || !WEATHER_API_URL) {
      return
    }

    const fetchWeather = async () => {
      try {
        const [current, forecast] = await Promise.all([
          axios.get<WeatherData>(WEATHER_API_URL, {
            params: {
              appid: openWeatherApiKey,
              q: DEFAULT_CITY,
              units: 'metric',
            },
            signal: controller.signal,
          }),
          axios.get<ForecastResponse>(FORECAST_API_URL, {
            params: {
              appid: openWeatherApiKey,
              q: DEFAULT_CITY,
              units: 'metric',
            },
            signal: controller.signal,
          }),
        ])

        setWeatherState({
          status: 'success',
          current: current.data,
          forecast: forecast.data,
          fetchedAt: Math.floor(Date.now() / 1000),
        })
      } catch (error) {
        if (axios.isCancel(error)) return

        setWeatherState({
          status: 'error',
          message: 'Weather unavailable',
        })
      }
    }

    void fetchWeather()

    return () => controller.abort()
  }, [])

  if (weatherState.status === 'loading') {
    return (
      <div className="flex items-center gap-3 rounded-md border border-white/40 bg-white/75 px-3 py-2 text-sm font-medium text-stone-700 shadow-sm">
        <span>Weather loading...</span>
      </div>
    )
  }

  if (weatherState.status === 'error') {
    return (
      <div className="flex items-center gap-3 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-sm font-medium text-amber-900 shadow-sm">
        <span>{weatherState.message}</span>
      </div>
    )
  }

  const currentWeather = weatherState.current.weather[0]
  const dailyForecasts = getDailyForecasts(weatherState.forecast, weatherState.fetchedAt)

  return (
    <>
      <button
        type="button"
        onClick={() => setIsForecastOpen(true)}
        className="flex flex-wrap items-center gap-x-4 gap-y-1 rounded-md border border-white/40 bg-white/80 px-3 py-2 text-left text-sm shadow-sm transition hover:border-amber-300 hover:bg-white"
        aria-haspopup="dialog"
      >
        <span className="font-semibold text-stone-900">{DISPLAY_LOCATION}</span>
        <span className="font-bold text-stone-950">
          {Math.round(weatherState.current.main.temp)}°C
        </span>
        <span className="capitalize text-stone-600">{currentWeather.description}</span>
      </button>

      {isForecastOpen && (
        <div
          className="modal-backdrop-enter fixed inset-0 z-[100] flex min-h-svh items-center justify-center bg-stone-950/35 px-4 py-6 backdrop-blur-2xl"
          role="dialog"
          aria-modal="true"
          aria-labelledby="forecast-title"
          onClick={() => setIsForecastOpen(false)}
        >
          <div
            className="modal-panel-enter relative z-[101] w-full max-w-md rounded-md border border-white/80 bg-[#fbf7ef] p-5 shadow-[0_34px_110px_rgba(28,25,23,0.45)] ring-1 ring-stone-950/10"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="font-serif text-2xl font-bold text-stone-950" id="forecast-title">
                  Forecast
                </h2>
                <p className="mt-1 text-sm text-stone-600">{DISPLAY_LOCATION}</p>
              </div>
              <button
                type="button"
                onClick={() => setIsForecastOpen(false)}
                className="rounded-md border border-stone-200 bg-white px-3 py-1 text-sm font-semibold text-stone-700 transition hover:bg-stone-100"
              >
                Close
              </button>
            </div>

            <div className="mt-5 space-y-3">
              {dailyForecasts.length > 0 ? (
                dailyForecasts.map((day) => (
                  <div
                    className="flex items-center justify-between gap-3 rounded-md border border-stone-200 bg-white/75 p-3"
                    key={day.date}
                  >
                    <div>
                      <p className="font-semibold text-stone-950">{day.label}</p>
                      <p className="text-sm capitalize text-stone-600">{day.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <img
                        className="size-10"
                        src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
                        alt={day.description}
                      />
                      <span className="text-lg font-bold text-stone-950">{day.temp}°C</span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="rounded-md border border-stone-200 bg-white/75 p-3 text-sm text-stone-600">
                  Forecast data is not available right now.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
