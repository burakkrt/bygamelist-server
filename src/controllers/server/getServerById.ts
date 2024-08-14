import { Request, Response } from 'express'
import ServerModel from '../../models/serverModel'
import { ErrorResponse, SuccessResponse } from '../../constants/types'

const getServerById = async (
  req: Request,
  res: Response<SuccessResponse | ErrorResponse>
) => {
  const { id } = req.params

  try {
    const server = await ServerModel.findById(id)

    if (!server) {
      return res.status(404).json({
        error: {
          message: 'Sunucu bulunamadı.',
        },
      })
    }

    res.status(200).json({
      data: [server],
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

export { getServerById }
