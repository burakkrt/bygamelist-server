import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { body, validationResult } from 'express-validator'
import UserModel from '../../models/userModel'
import { ErrorResponse, SuccessResponse } from '../../constants/types'

const userValidationRules = () => [
  body('name').notEmpty().withMessage('Name is required'),
  body('surname').notEmpty().withMessage('Surname is required'),
  body('password').notEmpty().withMessage('Password is required'),
  body('email').notEmpty().withMessage('Email is required'),
  body('role').notEmpty().withMessage('Role is required'),
]

const createUser = async (
  req: Request,
  res: Response<SuccessResponse | ErrorResponse>
) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      error: {
        message: 'Validation error',
        details: errors.array(),
      },
    })
  }

  try {
    const { name, surname, password, email, phoneNumber, role } = req.body

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = new UserModel({
      name,
      surname,
      password: hashedPassword,
      email,
      phoneNumber,
    })

    const savedUser = await newUser.save()

    const token = jwt.sign({ userId: savedUser._id }, process.env.JWT_SECRET!, {
      expiresIn: process.env.TOKEN_VALIDITY_PERIOD || '2h',
    })

    res.status(201).json({
      success: true,
      data: [{ user: savedUser, token: token }],
    })
  } catch (error) {
    console.error('Error : ', error)

    res.status(500).json({
      success: false,
      error: {
        message: error instanceof Error ? error.message : 'An unknown error occurred',
      },
    })
  }
}

export { createUser, userValidationRules }
