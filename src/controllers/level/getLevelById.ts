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
        error: {
          message: 'Level bulunamadı.',
        },
      })
    }

    res.status(200).json({
      data: [level],
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

export { getLevelById }
