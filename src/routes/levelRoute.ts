import { Router } from 'express'
import { getLevel } from '../controllers/level/getLevel'
import { createLevel, levelValidationRules } from '../controllers/level/createLevel'
import { authenticateToken } from '../middlewares/authenticateToken'

const levelRoute = Router()

levelRoute.get('/', getLevel)
levelRoute.post('/', authenticateToken, levelValidationRules(), createLevel)

export default levelRoute
