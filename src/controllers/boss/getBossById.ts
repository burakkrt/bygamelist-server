import { Request, Response } from 'express'
import BossModel from '../../models/bossModel'
import { ErrorResponse, SuccessResponse } from '../../constants/types'

const getBossById = async (
  req: Request,
  res: Response<SuccessResponse | ErrorResponse>
) => {
  const { id } = req.params

  try {
    const boss = await BossModel.findById(id)

    if (!boss) {
      return res.status(404).json({
        error: {
          message: 'Boss bulunamadı.',
        },
      })
    }

    res.status(200).json({
      data: [boss],
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

export { getBossById }
