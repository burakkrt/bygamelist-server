import { Request, Response } from 'express'
import { body, validationResult } from 'express-validator'
import ServerModel from '../../models/serverModel'

const serverValidationRules = () => [
  body('name').notEmpty().withMessage('Name is required'),
  body('level').notEmpty().withMessage('Level is required'),
  body('openingDate').notEmpty().withMessage('openingDate is required'),
  body('autoHunt').notEmpty().withMessage('autoHunt is required'),
  body('dropClient').notEmpty().withMessage('dropClient is required'),
]

const createServer = async (req: Request, res: Response) => {
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
      success: true,
      data: [savedServer],
    })
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        success: false,
        error: {
          message: error.message,
        },
        data: [],
      })
    } else {
      res.status(500).json({
        success: false,
        error: {
          message: 'An unknown error occurred',
        },
        data: [],
      })
    }
  }
}

export { createServer, serverValidationRules }
