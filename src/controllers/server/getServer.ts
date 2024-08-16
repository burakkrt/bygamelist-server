import { Request, Response } from 'express'
import ServerModel from '../../models/serverModel'
import * as defaultMetas from '../../constants/defaultMetas'
import { ErrorResponse, SuccessResponse } from '../../constants/types'

const getServer = async (
  req: Request,
  res: Response<SuccessResponse | ErrorResponse>
) => {
  const pageSize =
    parseInt(req.query.pageSize as string) || defaultMetas.DEFAULT_PAGE_SIZE
  const page = parseInt(req.query.page as string) || defaultMetas.DEFAULT_PAGE
  const sortField = req.query.sortField?.toString() || defaultMetas.DEFAULT_SORT_FIELD
  const sortOrder = req.query.sortOrder?.toString() === 'desc' ? -1 : 1

  try {
    const total = await ServerModel.countDocuments()

    const servers = await ServerModel.find()
      .sort({ [sortField]: sortOrder })
      .limit(pageSize)
      .skip((page - 1) * pageSize)
      .populate([
        {
          path: 'level',
        },
        {
          path: 'bosses',
        },
        {
          path: 'efsunlar',
        },
      ])

      .exec()

    const shownDataCount = Math.min(pageSize, servers.length)

    const response: SuccessResponse = {
      data: servers,
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

export { getServer }
