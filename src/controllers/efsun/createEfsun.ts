import { Request, Response } from 'express'
import { body, validationResult } from 'express-validator'
import EfsunModel from '../../models/efsunModel'
import { ErrorResponse, SuccessResponse } from '@/constants/types'

const efsunValidationRules = () => [
  body('name').notEmpty().withMessage('Name is required'),
]

const createEfsun = async (
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
    const { name, description } = req.body

    const existing = await EfsunModel.findOne({ name })
    if (existing) {
      return res.status(409).json({
        error: {
          message: 'Zaten bu isimde veri mevcut.',
        },
      })
    }

    const newEfsun = new EfsunModel({
      name,
      description,
    })

    const savedEfsun = await newEfsun.save()

    res.status(201).json({
      data: [savedEfsun],
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

export { createEfsun, efsunValidationRules }
