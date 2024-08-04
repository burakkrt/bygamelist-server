import { Request, Response } from 'express'
import { body, validationResult } from 'express-validator'
import UserModel from '../../models/userModel'

const userValidationRules = () => [
  body('name').notEmpty().withMessage('Name is required'),
  body('surname').notEmpty().withMessage('Surname is required'),
  body('email').notEmpty().withMessage('Email is required'),
  body('role').notEmpty().withMessage('Role is required'),
]

const createUser = async (req: Request, res: Response) => {
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
    const { name, surname, email, phoneNumber, role } = req.body

    const newUser = new UserModel({
      name,
      email,
      phoneNumber,
      role,
      surname,
    })

    const savedUser = await newUser.save()

    res.status(201).json({
      success: true,
      data: [savedUser],
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
