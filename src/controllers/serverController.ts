import { Request, Response } from 'express'
import ServerModel from '../models/serverModel'

export const getServer = async (req: Request, res: Response) => {
  try {
    // Tüm serverleri bul
    const servers = await ServerModel.find()

    // Serverler varsa başarılı bir yanıt döndür
    if (servers.length > 0) {
      res.status(200).json(servers)
    } else {
      res.status(404).json({ message: 'No servers found' })
    }
  } catch (error) {
    // Hata durumunda hata yanıtı döndür
    console.error(error)
    res.status(500).json({ message: 'Server error', error })
  }
}
