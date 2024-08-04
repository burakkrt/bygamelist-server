import { Request, Response } from 'express'
import ServerModel from '../../models/serverModel'

const createServer = async (req: Request, res: Response) => {
  const { title } = req.body

  if (!title) {
    return res.status(400).json({ message: 'The title field cannot be left blank.' })
  }

  try {
    const server = await ServerModel.create({ title })
    res.status(201).json(server)
  } catch (error) {
    // Hata durumunda hata yanıtı döndür
    console.error(error)
    res.status(500).json({ message: 'Server error', error })
  }
}

export default createServer
