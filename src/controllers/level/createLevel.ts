import { Request, Response } from 'express'
import { body, validationResult } from 'express-validator'
import LevelModel from '../../models/levelModel'
import { ErrorResponse, SuccessResponse } from '../../constants/types'

const levelValidationRules = () => [
  body('name').notEmpty().withMessage('Name is required'),
]

const createLevel = async (
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
    const { name } = req.body

    const existing = await LevelModel.findOne({ name })
    if (existing) {
      return res.status(409).json({
        success: false,
        error: {
          message: 'A level with this name already exists',
        },
      })
    }

    const newLevel = new LevelModel({
      name,
    })

    const savedLevel = await newLevel.save()

    res.status(201).json({
      success: true,
      data: [savedLevel],
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

export { createLevel, levelValidationRules }
