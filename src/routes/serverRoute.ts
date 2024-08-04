import { Router } from 'express'
import { getServer } from '../controllers/serverController'

const serverRoute = Router()

serverRoute.get('/', getServer)

export default serverRoute
