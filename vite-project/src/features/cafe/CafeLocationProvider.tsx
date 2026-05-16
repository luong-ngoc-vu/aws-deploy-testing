import { type ReactNode, useMemo, useState } from 'react'
import { CafeLocationContext, defaultCafeLocation } from './cafeLocation'

export function CafeLocationProvider({ children }: { children: ReactNode }) {
  const [currentLocation, setCurrentLocation] = useState(defaultCafeLocation)
  const value = useMemo(
    () => ({
      currentLocation,
      setCurrentLocation,
    }),
    [currentLocation],
  )

  return <CafeLocationContext.Provider value={value}>{children}</CafeLocationContext.Provider>
}
