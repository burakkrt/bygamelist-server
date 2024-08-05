import { Request, Response } from 'express'
import EfsunModel from '../../models/efsunModel'
import { ErrorResponse, SuccessResponse } from '../../constants/types'

const getEfsunById = async (
  req: Request,
  res: Response<SuccessResponse | ErrorResponse>
) => {
  const { id } = req.params

  try {
    const efsun = await EfsunModel.findById(id)

    if (!efsun) {
      return res.status(404).json({
        success: false,
        error: {
          message: 'Efsun not found',
        },
      })
    }

    res.status(200).json({
      success: true,
      data: [efsun],
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

export { getEfsunById }
