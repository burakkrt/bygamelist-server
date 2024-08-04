import mongoose from 'mongoose'

const efsunSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

const Efsun = mongoose.model('Efsun', efsunSchema)
export default Efsun
