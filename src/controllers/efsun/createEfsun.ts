import { Request, Response } from 'express'
import { body, validationResult } from 'express-validator'
import EfsunModel from '../../models/efsunModel'

const efsunValidationRules = () => [
  body('name').notEmpty().withMessage('Name is required'),
]

const createEfsun = async (req: Request, res: Response) => {
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
    const { name, description } = req.body

    const existing = await EfsunModel.findOne({ name })
    if (existing) {
      return res.status(409).json({
        success: false,
        message: 'A efsun with this name already exists',
      })
    }

    const newEfsun = new EfsunModel({
      name,
      description,
    })

    const savedEfsun = await newEfsun.save()

    res.status(201).json({
      success: true,
      data: [savedEfsun],
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

export { createEfsun, efsunValidationRules }
