import { Request, Response } from 'express'
import BossModel from '../../models/bossModel'
import * as defaultMetas from '../../constants/defaultMetas'
import { ErrorResponse, SuccessResponse } from '../../constants/types'

const getBoss = async (req: Request, res: Response<SuccessResponse | ErrorResponse>) => {
  const pageSize =
    parseInt(req.query.pageSize as string) || defaultMetas.DEFAULT_PAGE_SIZE
  const page = parseInt(req.query.page as string) || defaultMetas.DEFAULT_PAGE
  const sortField = req.query.sortField?.toString() || defaultMetas.DEFAULT_SORT_FIELD
  const sortOrder = req.query.sortOrder?.toString() === 'desc' ? -1 : 1

  try {
    const total = await BossModel.countDocuments()

    const bosses = await BossModel.find()
      .sort({ [sortField]: sortOrder })
      .limit(pageSize)
      .skip((page - 1) * pageSize)

    const shownDataCount = Math.min(pageSize, bosses.length)

    const response: SuccessResponse = {
      data: bosses,
      meta: {
        total,
        page,
        pageSize: shownDataCount,
        totalPages: Math.ceil(total / pageSize),
        timestamp: new Date().toISOString(),
      },
    }

    res.status(200).json(response)
  } catch (error) {
    console.error('Error : ', error)

    res.status(500).json({
      error: {
        message: error instanceof Error ? error.message : 'Bilinmeyen bir hata oluştu.',
      },
    })
  }
}

export { getBoss }
