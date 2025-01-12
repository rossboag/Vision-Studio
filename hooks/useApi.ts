import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

interface CacheItem<T> {
  data: T
  expiry: number
}

const cache: { [key: string]: CacheItem<any> } = {}

export function useApi<T>(url: string, options?: RequestInit, cacheTime = 5 * 60 * 1000) {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      if (cache[url] && cache[url].expiry > Date.now()) {
        setData(cache[url].data)
        setLoading(false)
        return
      }

      try {
        const response = await fetch(url, options)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const result = await response.json()
        setData(result)
        cache[url] = { data: result, expiry: Date.now() + cacheTime }
      } catch (e) {
        setError(e instanceof Error ? e : new Error('An unknown error occurred'))
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [url, router.asPath])

  return { data, error, loading }
}

