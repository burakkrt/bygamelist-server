import { Router } from 'express'
import getServer from '../controllers/server/getServer'
import createServer from '../controllers/server/createServer'

const serverRoute = Router()

serverRoute.get('/', getServer)
serverRoute.post('/', createServer)

export default serverRoute
