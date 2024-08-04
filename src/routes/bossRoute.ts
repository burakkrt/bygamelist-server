import { Router } from 'express'
import { getBoss } from '../controllers/boss/getBoss'
import { createBoss, bossValidationRules } from '../controllers/boss/createBoss'
import { authenticateToken } from '../middlewares/authenticateToken'

const bossRoute = Router()

bossRoute.get('/', getBoss)
bossRoute.post('/', authenticateToken, bossValidationRules(), createBoss)

export default bossRoute
