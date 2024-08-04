import { Router } from 'express'
import { createUser, userValidationRules } from '../controllers/user/createUser'
import { loginUser, loginValidationRules } from '../controllers/user/loginUser'

const userRoute = Router()

userRoute.post('/', userValidationRules(), createUser)
userRoute.post('/login', loginValidationRules(), loginUser)

export default userRoute
