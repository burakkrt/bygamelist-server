import { Router } from 'express'
import { getServer } from '../controllers/server/getServer'
import { createServer, serverValidationRules } from '../controllers/server/createServer'
import { authenticateToken } from '../middlewares/authenticateToken'

const serverRoute = Router()

serverRoute.get('/', getServer)
serverRoute.post('/', authenticateToken, serverValidationRules(), createServer)

export default serverRoute
