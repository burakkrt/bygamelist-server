import { Request, Response } from 'express'
import ServerModel from '../../models/serverModel'

const createServer = async (req: Request, res: Response) => {
  const { title } = req.body

  if (title) {
    return res.status(400).json({ message: 'Title is required' })
  }

  try {
    res.send({ title })
  } catch (error) {
    // Hata durumunda hata yanıtı döndür
    console.error(error)
    res.status(500).json({ message: 'Server error', error })
  }
}

export default createServer
