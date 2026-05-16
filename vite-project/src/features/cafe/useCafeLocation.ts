import { useContext } from 'react'
import { CafeLocationContext } from './cafeLocation'

export function useCafeLocation() {
  const context = useContext(CafeLocationContext)

  if (!context) {
    throw new Error('useCafeLocation phải được dùng bên trong CafeLocationProvider.')
  }

  return context
}
