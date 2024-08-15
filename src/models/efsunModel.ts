import mongoose from 'mongoose'

const efsunSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      default: undefined,
    },
    description: {
      type: String,
      default: undefined,
    },
  },
  {
    timestamps: true,
  }
)

efsunSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id
    delete ret._id
    delete ret.__v
    return ret
  },
})

efsunSchema.set('toObject', {
  transform: (doc, ret) => {
    ret.id = ret._id
    delete ret._id
    delete ret.__v
    return ret
  },
})

const Efsun = mongoose.model('Efsun', efsunSchema)
export default Efsun
