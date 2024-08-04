import { Request, Response } from 'express'
import { body, validationResult } from 'express-validator'
import BossModel from '../../models/bossModel'

const bossValidationRules = () => [
  body('name').notEmpty().withMessage('Name is required'),
]

const createBoss = async (req: Request, res: Response) => {
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

    const existing = await BossModel.findOne({ name })
    if (existing) {
      return res.status(409).json({
        success: false,
        message: 'A efsun with this name already exists',
      })
    }

    const newBoss = new BossModel({
      name,
    })

    const savedBoss = await newBoss.save()

    res.status(201).json({
      success: true,
      data: [savedBoss],
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

export { createBoss, bossValidationRules }
