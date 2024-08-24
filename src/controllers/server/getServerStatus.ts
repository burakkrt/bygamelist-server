import { Request, Response } from 'express'
import ServerModel from '../../models/serverModel'
import * as defaultMetas from '../../constants/defaultMetas'
import { ErrorResponse, SuccessResponse } from '../../constants/types'
import { isValidObjectId } from 'mongoose'

const getServerStatusAuth = async (
  req: Request,
  res: Response<SuccessResponse | ErrorResponse>
) => {
  const query: { [key: string]: any } = {}
  const { name, id, status } = req.query

  const pageSize =
    parseInt(req.query.pageSize as string) || defaultMetas.DEFAULT_PAGE_SIZE
  const page = parseInt(req.query.page as string) || defaultMetas.DEFAULT_PAGE
  const sortField = req.query.sortField?.toString() || defaultMetas.DEFAULT_SORT_FIELD
  const sortOrder = req.query.sortOrder?.toString() === 'desc' ? -1 : 1

  if (name) {
    query.name = { $regex: name, $options: 'i' }
  }

  // eğer gelen id değeri objectid türünde değilse hatayı önlemek için
  // direk boş response döndürüyorum.
  if (id && !isValidObjectId(id)) {
    return res.status(200).json({
      data: [],
      meta: {
        total: 0,
        page: 1,
        pageSize: 0,
        totalPages: 0,
        timestamp: new Date().toISOString(),
      },
    })
  } else if (id) {
    query._id = id
  }

  if (status) {
    if (status !== 'all') {
      query.status = status === 'true'
    }
  }

  try {
    const total = await ServerModel.countDocuments(query)

    const servers = await ServerModel.find(query)
      .select('_id name openingDate status')
      .sort({ [sortField]: sortOrder })
      .limit(pageSize)
      .skip((page - 1) * pageSize)
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

export { getServerStatusAuth }
