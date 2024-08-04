import { Router } from 'express'
import { getEfsun } from '../controllers/efsun/getEfsun'
import { createEfsun, efsunValidationRules } from '../controllers/efsun/createEfsun'
import { authenticateToken } from '../middlewares/authenticateToken'

const efsunRoute = Router()

efsunRoute.get('/', getEfsun)
efsunRoute.post('/', authenticateToken, efsunValidationRules(), createEfsun)

export default efsunRoute
