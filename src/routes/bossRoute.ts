import { Router } from 'express'
import { getBoss } from '../controllers/boss/getBoss'
import { createBoss, bossValidationRules } from '../controllers/boss/createBoss'
import { updateBoss } from '../controllers/boss/updateBoss'
import { getBossById } from '../controllers/boss/getBossById'
import { authenticateToken } from '../middlewares/authenticateToken'

const bossRoute = Router()

bossRoute.get('/', getBoss)
bossRoute.post('/', authenticateToken, bossValidationRules(), createBoss)
bossRoute.patch('/:id', authenticateToken, bossValidationRules(), updateBoss)
bossRoute.get('/:id', authenticateToken, getBossById)

export default bossRoute
