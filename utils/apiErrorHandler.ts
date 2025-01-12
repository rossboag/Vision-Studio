import { NextApiResponse } from 'next'

export function apiErrorHandler(res: NextApiResponse, error: unknown) {
  console.error('API Error:', error)
  
  if (error instanceof Error) {
    return res.status(500).json({ error: error.message })
  }
  
  return res.status(500).json({ error: 'An unexpected error occurred' })
}

