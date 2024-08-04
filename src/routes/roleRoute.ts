import { Router } from 'express'
import { getRole } from '../controllers/role/getRole'
import { createRole, roleValidationRules } from '../controllers/role/createRole'

const roleRoute = Router()

roleRoute.get('/', getRole)
roleRoute.post('/', roleValidationRules(), createRole)

export default roleRoute
