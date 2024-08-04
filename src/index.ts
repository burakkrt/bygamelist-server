import express from 'express'
import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'
import serverRouter from './routes/serverRoute'

// Ortam değişkenini kontrol et ve doğru .env dosyasını yükle
const envFile =
  process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development'
dotenv.config({ path: envFile })
// Hangi .env dosyasını kullandığını yazdır
console.log(`Using environment file: ${envFile}`)

const app = express()
const port = process.env.PORT || 9000
const mongoUrl = process.env.MONGO_URL || ''
const dbName = process.env.DB_NAME || ''

MongoClient.connect(mongoUrl)
  .then((client) => {
    const db = client.db(dbName)
    console.log(`Connected to database: ${dbName}`)

    app.use('/v1/server', serverRouter)

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`)
    })
  })
  .catch((error) => console.error(error))
