import express  from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import bodyParser from 'body-parser'

import useRouter from './routes/user'
import authRouter from './routes/auth'

dotenv.config()

const app = express()


app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

app.use('/api/user/', useRouter)
app.use('/api/auth/', authRouter)

app.listen(process.env.PORT)

