import { Router } from 'express'
import { getLevel } from '../controllers/level/getLevel'
import { createLevel, levelValidationRules } from '../controllers/level/createLevel'

const levelRoute = Router()

levelRoute.get('/', getLevel)
levelRoute.post('/', levelValidationRules(), createLevel)

export default levelRoute
