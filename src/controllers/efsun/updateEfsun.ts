import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import EfsunModel from '../../models/efsunModel'
import { ErrorResponse, SuccessResponse } from '../../constants/types'

const updateEfsun = async (
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
  const { name, description } = req.body

  try {
    const updatedEfsun = await EfsunModel.findByIdAndUpdate(
      id,
      {
        name,
        description,
      },
      { new: true }
    )

    if (!updatedEfsun) {
      return res.status(404).json({
        success: false,
        error: {
          message: 'Efsun not found',
        },
      })
    }

    res.status(200).json({
      success: true,
      data: [updatedEfsun],
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

export { updateEfsun }
