import { Router } from 'express'
import { createUser, userValidationRules } from '../controllers/user/createUser'
import { loginUser, loginValidationRules } from '../controllers/user/loginUser'

const userRoute = Router()

userRoute.post('/user', userValidationRules(), createUser)
userRoute.post('/user/login', loginValidationRules(), loginUser)

export default userRoute
