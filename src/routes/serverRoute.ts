import { Router } from 'express'
import { authenticateToken } from '../middlewares/authenticateToken'
import { getServer } from '../controllers/server/getServer'
import { createServer, serverValidationRules } from '../controllers/server/createServer'
import { updateServer } from '../controllers/server/updateServer'
import { getServerById } from '../controllers/server/getServerById'
import { getServerList } from '../controllers/server/getServerList'
import { getServerListAuth } from '../controllers/server/getServerListAuth'

const serverRoute = Router()

serverRoute.get('/server', getServer)
serverRoute.post('/server', authenticateToken, serverValidationRules(), createServer)
serverRoute.patch('/server/:id', authenticateToken, serverValidationRules(), updateServer)
serverRoute.get('/server/:id', authenticateToken, getServerById)
serverRoute.get('/serverlist', getServerList)
serverRoute.get('/serverlist-auth', authenticateToken, getServerListAuth)

export default serverRoute
