import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import serverRouter from './routes/serverRoute'
import levelRoute from './routes/levelRoute'
import userRoute from './routes/userRoute'
import roleRoute from './routes/roleRoute'
import roleEventRoute from './routes/roleEventRoute'

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

mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log(`Connected to database: ${dbName}`)

    // Yönlendirmeler
    app.use('/v1/server', serverRouter)
    app.use('/v1/level', levelRoute)
    app.use('/v1/user', userRoute)
    app.use('/v1/role', roleRoute)
    app.use('/v1/roleEvent', roleEventRoute)

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`)
    })
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error)
    process.exit(1) // Bağlantı hatası durumunda uygulamayı durdur
  })
