import { Request, Response } from 'express'
import { body, validationResult } from 'express-validator'
import ServerModel from '../../models/serverModel'
import { ErrorResponse, IServerModel, SuccessResponse } from '../../constants/types'

const serverValidationRules = () => [
  body('name').notEmpty().withMessage('Name is required'),
  body('level').notEmpty().withMessage('Level is required'),
  body('openingDate').notEmpty().withMessage('openingDate is required'),
  body('autoHunt').notEmpty().withMessage('autoHunt is required'),
  body('dropClient').notEmpty().withMessage('dropClient is required'),
  body('status').notEmpty().withMessage('status is required'),
  body('userId').notEmpty().withMessage('userId is required'),
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
        detail: errors.array(),
      },
    })
  }

  try {
    const {
      userId,
      status,
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
      discord,
      website,
      singleStoreyDungeon,
      ownSalesSystem,
    } = req.body as IServerModel

    const newServer = new ServerModel<IServerModel>({
      userId,
      status,
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
      discord,
      website,
      singleStoreyDungeon,
      ownSalesSystem,
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
