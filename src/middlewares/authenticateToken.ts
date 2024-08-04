import { SuccessResponse, ErrorResponse } from '../constants/types'
import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

interface CustomJwtPayload extends jwt.JwtPayload {
  userId: string
  role: string
}

const authenticateToken = (
  req: Request,
  res: Response<SuccessResponse | ErrorResponse>,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) {
    return res.status(401).json({
      success: false,
      error: {
        message: 'You are not authorized to perform this action.',
      },
    })
  }

  jwt.verify(token, process.env.JWT_SECRET!, (err, decoded) => {
    if (err) {
      return res.status(403).json({
        success: false,
        error: {
          message: 'The token may have expired or be inaccurate.',
        },
      })
    }

    if (decoded && typeof decoded !== 'string') {
      const customPayload = decoded as CustomJwtPayload
      ;(req as any).user = {
        _id: customPayload.userId,
      }
    }

    next()
  })
}

export { authenticateToken }
