import { Router } from 'express'
import { getRoleEvent } from '../controllers/roleEvent/getRoleEvent'
import {
  createRoleEvent,
  roleEventValidationRules,
} from '../controllers/roleEvent/createRoleEvent'

const roleEventRoute = Router()

roleEventRoute.get('/', getRoleEvent)
roleEventRoute.post('/', roleEventValidationRules(), createRoleEvent)

export default roleEventRoute
