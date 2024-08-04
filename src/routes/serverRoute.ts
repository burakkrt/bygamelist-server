import { Router } from 'express'
import { getServer } from '../controllers/server/getServer'
import { createServer, serverValidationRules } from '../controllers/server/createServer'

const serverRoute = Router()

serverRoute.get('/', getServer)
serverRoute.post('/', serverValidationRules(), createServer)

export default serverRoute
