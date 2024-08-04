import { Router } from 'express'
import { getUser } from '../controllers/user/getUser'
import { createUser, userValidationRules } from '../controllers/user/createUser'

const userRoute = Router()

userRoute.get('/', getUser)
userRoute.post('/', userValidationRules(), createUser)

export default userRoute
