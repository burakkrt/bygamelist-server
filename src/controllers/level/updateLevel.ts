import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import LevelModel from '../../models/levelModel'
import { ErrorResponse, SuccessResponse } from '../../constants/types'

const updateLevel = async (
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

  const { id } = req.params
  const { name } = req.body

  try {
    const updatedLevel = await LevelModel.findByIdAndUpdate(
      id,
      {
        name,
      },
      { new: true }
    )

    if (!updatedLevel) {
      return res.status(404).json({
        error: {
          message: 'Level bulunamadı.',
        },
      })
    }

    res.status(200).json({
      data: [updatedLevel],
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

export { updateLevel }
