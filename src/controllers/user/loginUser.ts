import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { body, validationResult } from 'express-validator'
import { ErrorResponse, SuccessResponse } from '../../constants/types'
import UserModel from '../../models/userModel'

const loginValidationRules = () => [
  body('email').isEmail().withMessage('Enter a valid email address'),
  body('password').notEmpty().withMessage('Password is required'),
]

const loginUser = async (
  req: Request,
  res: Response<SuccessResponse | ErrorResponse>
) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: {
        message: 'Girilen bilgiler eksik veya hatalı.',
        detail: errors.array(),
      },
    })
  }

  try {
    const { email, password } = req.body

    const user = await UserModel.findOne({ email })
    if (!user) {
      return res.status(401).json({
        error: {
          message: 'Email veya şifre hatalı.',
        },
      })
    }

    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
      return res.status(401).json({
        error: {
          message: 'Email veya şifre hatalı.',
        },
      })
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
      expiresIn: process.env.TOKEN_VALIDITY_PERIOD || '2h',
    })

    const response: SuccessResponse = {
      data: [
        {
          user: {
            id: user._id,
            name: user.name,
            surname: user.surname,
            email: user.email,
          },
          token: token,
        },
      ],
    }

    res.status(200).json(response)
  } catch (error) {
    console.error('Error : ', error)

    const response: ErrorResponse = {
      error: {
        message: error instanceof Error ? error.message : 'Bilinmeyen bir hata oluştu.',
      },
    }

    res.status(500).json(response)
  }
}

export { loginUser, loginValidationRules }
