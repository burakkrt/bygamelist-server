import { Router } from 'express'
import { getEfsun } from '../controllers/efsun/getEfsun'
import { createEfsun, efsunValidationRules } from '../controllers/efsun/createEfsun'
import { updateEfsun } from '../controllers/efsun/updateEfsun'
import { getEfsunById } from '../controllers/efsun/getEfsunById'
import { authenticateToken } from '../middlewares/authenticateToken'

const efsunRoute = Router()

efsunRoute.get('/', getEfsun)
efsunRoute.post('/', authenticateToken, efsunValidationRules(), createEfsun)
efsunRoute.patch('/:id', authenticateToken, efsunValidationRules(), updateEfsun)
efsunRoute.get('/:id', authenticateToken, getEfsunById)

export default efsunRoute
