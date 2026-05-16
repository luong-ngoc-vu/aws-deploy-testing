import { createContext } from 'react'

export type CafeLocation = {
  id: string
  label: string
  lat: number
  lon: number
  source: 'detected' | 'preset'
}

export type CafeLocationContextValue = {
  currentLocation: CafeLocation
  setCurrentLocation: (location: CafeLocation) => void
}

export const defaultCafeLocation: CafeLocation = {
  id: 'dn-city',
  label: 'Đà Nẵng',
  lat: 16.0471,
  lon: 108.2068,
  source: 'preset',
}

export const CafeLocationContext = createContext<CafeLocationContextValue | null>(null)
