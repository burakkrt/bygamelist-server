import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import mongoose from 'mongoose'
import ServerModel from '../../models/serverModel'
import { ErrorResponse, SuccessResponse } from '../../constants/types'

const updateServer = async (
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

  const { id } = req.params
  const updateData = req.body

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      error: {
        message: "Geçersiz sunucu ID'si.",
      },
    })
  }

  try {
    const updatedServer = await ServerModel.findByIdAndUpdate(id, updateData, {
      new: true,
    })

    if (!updatedServer) {
      return res.status(404).json({
        error: {
          message: 'Sunucu bulunamadı.',
        },
      })
    }

    res.status(200).json({
      data: [updatedServer],
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

export { updateServer }
