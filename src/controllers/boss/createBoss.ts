import { Request, Response } from 'express'
import { body, validationResult } from 'express-validator'
import BossModel from '../../models/bossModel'
import { ErrorResponse, SuccessResponse } from '../../constants/types'

const bossValidationRules = () => [
  body('name').notEmpty().withMessage('Name is required'),
]

const createBoss = async (
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

    const existing = await BossModel.findOne({ name })
    if (existing) {
      return res.status(409).json({
        error: {
          message: 'Zaten bu isimde veri mevcut.',
        },
      })
    }

    const newBoss = new BossModel({
      name,
    })

    const savedBoss = await newBoss.save()

    res.status(201).json({
      data: [savedBoss],
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

export { createBoss, bossValidationRules }
