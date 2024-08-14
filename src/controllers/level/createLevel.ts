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
      error: {
        message: 'Girilen bilgiler eksik veya hatalı.',
      },
    })
  }

  try {
    const { name } = req.body

    const existing = await LevelModel.findOne({ name })
    if (existing) {
      return res.status(409).json({
        error: {
          message: 'Zaten bu isimde veri mevcut.',
        },
      })
    }

    const newLevel = new LevelModel({
      name,
    })

    const savedLevel = await newLevel.save()

    res.status(201).json({
      data: [savedLevel],
    })
  } catch (error) {
    console.error('Error : ', error)

    res.status(500).json({
      error: {
        message: error instanceof Error ? error.message : 'Bilinmeyen bir hata oluştu.',
      },
    })
  }
}

export { createLevel, levelValidationRules }
