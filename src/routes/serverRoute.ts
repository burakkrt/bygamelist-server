import { Router } from 'express'
import { getServer } from '../controllers/server/getServer'
import { createServer, serverValidationRules } from '../controllers/server/createServer'
import { updateServer } from '../controllers/server/updateServer'
import { getServerById } from '../controllers/server/getServerById'
import { authenticateToken } from '../middlewares/authenticateToken'

const serverRoute = Router()

serverRoute.get('/', getServer)
serverRoute.post('/', authenticateToken, serverValidationRules(), createServer)
serverRoute.patch('/:id', authenticateToken, serverValidationRules(), updateServer)
serverRoute.get('/:id', authenticateToken, getServerById)

export default serverRoute
