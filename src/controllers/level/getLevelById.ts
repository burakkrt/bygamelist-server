import { Request, Response } from 'express'
import LevelModel from '../../models/levelModel'
import { ErrorResponse, SuccessResponse } from '../../constants/types'

const getLevelById = async (
  req: Request,
  res: Response<SuccessResponse | ErrorResponse>
) => {
  const { id } = req.params

  try {
    const level = await LevelModel.findById(id)

    if (!level) {
      return res.status(404).json({
        success: false,
        error: {
          message: 'Level not found',
        },
      })
    }

    res.status(200).json({
      success: true,
      data: [level],
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

export { getLevelById }
