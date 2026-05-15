import axios from 'axios'
import { useEffect, useState } from 'react'

const DEFAULT_CITY = 'Da Nang,VN'
const DISPLAY_LOCATION = 'Da Nang, VN'
const WEATHER_API_URL =
  (import.meta.env.VITE_WEATHER_API_URL as string | undefined) ||
  'https://api.openweathermap.org/data/2.5/weather'
const openWeatherApiKey = import.meta.env.VITE_OPENWEATHER_API_KEY as string | undefined

type WeatherData = {
  sys: {
    country: string
  }
  main: {
    temp: number
  }
  weather: Array<{
    description: string
  }>
}

type WeatherState =
  | { status: 'loading' }
  | { status: 'success'; data: WeatherData }
  | { status: 'error'; message: string }

export default function WeatherWidget() {
  const [weatherState, setWeatherState] = useState<WeatherState>(
    openWeatherApiKey
      ? { status: 'loading' }
      : {
          status: 'error',
          message: 'Missing weather API key',
        },
  )

  useEffect(() => {
    const controller = new AbortController()

    if (!openWeatherApiKey || !WEATHER_API_URL) {
      return
    }

    const fetchWeather = async () => {
      try {
        const response = await axios.get<WeatherData>(WEATHER_API_URL, {
          params: {
            appid: openWeatherApiKey,
            q: DEFAULT_CITY,
            units: 'metric',
          },
          signal: controller.signal,
        })

        setWeatherState({ status: 'success', data: response.data })
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

  const currentWeather = weatherState.data.weather[0]

  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 rounded-md border border-white/40 bg-white/80 px-3 py-2 text-sm shadow-sm">
      <span className="font-semibold text-stone-900">{DISPLAY_LOCATION}</span>
      <span className="font-bold text-stone-950">{Math.round(weatherState.data.main.temp)}°C</span>
      <span className="capitalize text-stone-600">{currentWeather.description}</span>
    </div>
  )
}
