import { Router } from 'express'
import { getLevel } from '../controllers/level/getLevel'
import { createLevel, levelValidationRules } from '../controllers/level/createLevel'
import { updateLevel } from '../controllers/level/updateLevel'
import { getLevelById } from '../controllers/level/getLevelById'
import { authenticateToken } from '../middlewares/authenticateToken'

const levelRoute = Router()

levelRoute.get('/', getLevel)
levelRoute.post('/', authenticateToken, levelValidationRules(), createLevel)
levelRoute.patch('/:id', authenticateToken, levelValidationRules(), updateLevel)
levelRoute.get('/:id', authenticateToken, getLevelById)

export default levelRoute
