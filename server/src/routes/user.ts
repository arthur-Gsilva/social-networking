import express, {Request, Response}  from 'express'
import { getUsers } from '../controllers/users'

const router = express.Router()

router.get('/teste', getUsers)

export default router