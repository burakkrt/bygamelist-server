import { Request, Response } from 'express'
import { body, validationResult } from 'express-validator'
import ServerModel from '../../models/serverModel'
import { ErrorResponse, SuccessResponse } from '../../constants/types'

const serverValidationRules = () => [
  body('name').notEmpty().withMessage('Name is required'),
  body('level').notEmpty().withMessage('Level is required'),
  body('openingDate').notEmpty().withMessage('openingDate is required'),
  body('autoHunt').notEmpty().withMessage('autoHunt is required'),
  body('dropClient').notEmpty().withMessage('dropClient is required'),
]

const createServer = async (
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
    const {
      name,
      level,
      openingDate,
      autoHunt,
      autoBoss,
      battlepass,
      dropClient,
      legalSale,
      dolunayKdp,
      simya,
      kuleFarm,
      team,
      efsunlar,
      bosses,
    } = req.body

    const newServer = new ServerModel({
      name,
      level,
      openingDate,
      autoHunt,
      autoBoss,
      battlepass,
      dropClient,
      legalSale,
      dolunayKdp,
      simya,
      kuleFarm,
      team,
      efsunlar,
      bosses,
    })

    const savedServer = await newServer.save()

    res.status(201).json({
      data: [savedServer],
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

export { createServer, serverValidationRules }
