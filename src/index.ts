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
// kullanıcı adı ve şifredeki özel karakteri çözümlemeyi sağlar
const mongoUsername = encodeURIComponent(process.env.MONGO_USERNAME || '')
const mongoPassword = encodeURIComponent(process.env.MONGO_PASSWORD || '')
const mongoCluster = process.env.MONGO_CLUSTER || ''
const dbName = process.env.DB_NAME || ''
const mongoUrl = `mongodb+srv://${mongoUsername}:${mongoPassword}@${mongoCluster}/${dbName}?retryWrites=true&w=majority`

app.use(express.json()) // JSON formatındaki gövde verilerini işlemek için
app.use(express.urlencoded({ extended: true })) // URL encoded verileri işlemek için

MongoClient.connect(mongoUrl)
  .then((client) => {
    const db = client.db(dbName)
    console.log(`Connected to database: ${dbName}`)

    // Yönlendirmeler
    app.use('/v1/server', serverRouter)

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`)
    })
  })
  .catch((error) => console.error(error))
