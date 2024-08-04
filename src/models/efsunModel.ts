import mongoose from 'mongoose'

const efsunSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
})

const Efsun = mongoose.model('Efsun', efsunSchema)
export default Efsun
