import { Request, Response } from 'express'
import ServerModel from '../../models/serverModel'
import * as defaultMetas from '../../constants/defaultMetas'

const getServer = async (req: Request, res: Response) => {
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

    res.status(200).json({
      success: true,
      data: servers,
      meta: {
        total,
        page,
        pageSize,
        totalPages: Math.ceil(total / pageSize),
        timestamp: new Date().toISOString(),
      },
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

export { getServer }
