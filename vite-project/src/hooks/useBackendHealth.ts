import { useQuery } from '@tanstack/react-query'

const API_BASE_URL = 'https://d1qcsdbpz6o0bc.cloudfront.net'
const HEALTH_QUERY_KEY = 'backend-health'

type HealthResponse = {
  status: string
}

const checkBackendHealth = async (): Promise<HealthResponse> => {
  const res = await fetch(`${API_BASE_URL}/health`)

  if (!res.ok) {
    throw new Error('Backend health check failed.')
  }

  return res.json()
}

export const useBackendHealth = () =>
  useQuery({
    queryKey: [HEALTH_QUERY_KEY],
    queryFn: checkBackendHealth,
    retry: false,
    refetchOnWindowFocus: true,
  })
