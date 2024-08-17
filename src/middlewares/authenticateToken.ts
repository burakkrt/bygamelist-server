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
      error: {
        message: 'Bu işlemi gerçekleştirmek için yetkiniz yok.',
      },
    })
  }

  jwt.verify(token, process.env.JWT_SECRET!, (err, decoded) => {
    if (err) {
      return res.status(403).json({
        error: {
          message: "Token ' in süresi dolmuş veya hatalı olabilir.",
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
