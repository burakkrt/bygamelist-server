import express from 'express'
import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'

// Ortam değişkenini kontrol et ve doğru .env dosyasını yükle
const envFile =
  process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development'
dotenv.config({ path: envFile })
// Hangi .env dosyasını kullandığını yazdır
console.log(`Using environment file: ${envFile}`)

const app = express()
const port = process.env.PORT || 3000
const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017'
const dbName = process.env.DB_NAME || 'mydatabase'

MongoClient.connect(mongoUrl)
  .then((client) => {
    const db = client.db(dbName)
    console.log(`Connected to database: ${dbName}`)

    app.get('/', (req, res) => {
      res.send('Hello, world!')
    })

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`)
    })
  })
  .catch((error) => console.error(error))
