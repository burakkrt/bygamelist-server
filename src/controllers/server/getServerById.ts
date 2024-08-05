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
        success: false,
        error: {
          message: 'Server not found',
        },
      })
    }

    res.status(200).json({
      success: true,
      data: [server],
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

export { getServerById }
