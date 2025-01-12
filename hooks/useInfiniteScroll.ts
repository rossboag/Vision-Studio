import { useState, useEffect, useCallback } from 'react'

interface UseInfiniteScrollProps {
  fetchMore: () => Promise<any>
  hasMore: boolean
}

export function useInfiniteScroll({ fetchMore, hasMore }: UseInfiniteScrollProps) {
  const [loading, setLoading] = useState(false)

  const handleScroll = useCallback(() => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || loading || !hasMore) return
    setLoading(true)
  }, [loading, hasMore])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  useEffect(() => {
    if (!loading) return
    fetchMore().finally(() => setLoading(false))
  }, [loading, fetchMore])

  return { loading }
}

