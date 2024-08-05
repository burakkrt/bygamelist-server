import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import ServerModel from '../../models/serverModel'
import { ErrorResponse, SuccessResponse } from '../../constants/types'

const updateServer = async (
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
  const { id } = req.params
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

  try {
    const updatedServer = await ServerModel.findByIdAndUpdate(
      id,
      {
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
      },
      { new: true }
    )

    if (!updatedServer) {
      return res.status(404).json({
        success: false,
        error: {
          message: 'Server not found',
        },
      })
    }

    res.status(200).json({
      success: true,
      data: [updatedServer],
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

export { updateServer }
