import { Router } from 'express'
import { getBoss } from '../controllers/boss/getBoss'
import { createBoss, bossValidationRules } from '../controllers/boss/createBoss'
import { updateBoss } from '../controllers/boss/updateBoss'
import { getBossById } from '../controllers/boss/getBossById'
import { authenticateToken } from '../middlewares/authenticateToken'

const bossRoute = Router()

bossRoute.get('/boss', getBoss)
bossRoute.post('/boss', authenticateToken, bossValidationRules(), createBoss)
bossRoute.patch('/boss/:id', authenticateToken, bossValidationRules(), updateBoss)
bossRoute.get('/boss/:id', authenticateToken, getBossById)

export default bossRoute
