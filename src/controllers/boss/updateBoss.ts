import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import BossModel from '../../models/bossModel'
import { ErrorResponse, SuccessResponse } from '../../constants/types'

const updateBoss = async (
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
  const { name } = req.body

  try {
    const updatedBoss = await BossModel.findByIdAndUpdate(
      id,
      {
        name,
      },
      { new: true }
    )

    if (!updatedBoss) {
      return res.status(404).json({
        success: false,
        error: {
          message: 'Boss not found',
        },
      })
    }

    res.status(200).json({
      success: true,
      data: [updatedBoss],
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

export { updateBoss }
