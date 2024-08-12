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

efsunSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.__v
    return ret
  },
})

efsunSchema.set('toObject', {
  transform: (doc, ret) => {
    delete ret.__v
    return ret
  },
})

const Efsun = mongoose.model('Efsun', efsunSchema)
export default Efsun
