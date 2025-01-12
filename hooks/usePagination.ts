import { useState, useMemo } from 'react'

interface UsePaginationProps {
  totalItems: number
  itemsPerPage: number
  initialPage?: number
}

interface UsePaginationReturn {
  currentPage: number
  totalPages: number
  nextPage: () => void
  prevPage: () => void
  goToPage: (page: number) => void
  paginatedItems: number[]
}

export function usePagination({ totalItems, itemsPerPage, initialPage = 1 }: UsePaginationProps): UsePaginationReturn {
  const [currentPage, setCurrentPage] = useState(initialPage)

  const totalPages = Math.ceil(totalItems / itemsPerPage)

  const nextPage = () => {
    setCurrentPage(page => Math.min(page + 1, totalPages))
  }

  const prevPage = () => {
    setCurrentPage(page => Math.max(page - 1, 1))
  }

  const goToPage = (page: number) => {
    const pageNumber = Math.max(1, Math.min(page, totalPages))
    setCurrentPage(pageNumber)
  }

  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return Array.from({ length: totalItems }, (_, i) => i).slice(startIndex, endIndex)
  }, [currentPage, itemsPerPage, totalItems])

  return { currentPage, totalPages, nextPage, prevPage, goToPage, paginatedItems }
}

