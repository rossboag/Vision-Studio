import { NextApiRequest, NextApiResponse } from 'next'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'

const securityMiddleware = (req: NextApiRequest, res: NextApiResponse, next: () => void) => {
  // Use Helmet to set various HTTP headers for security
  helmet()(req, res, () => {})

  // Set up rate limiting
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
  })

  limiter(req, res, next)
}

export default securityMiddleware

