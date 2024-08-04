import mongoose from 'mongoose'

const levelSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
})

const Level = mongoose.model('Level', levelSchema)
export default Level
