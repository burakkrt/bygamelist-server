import mongoose from 'mongoose'

const bossSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      default: undefined,
    },
  },
  {
    timestamps: true,
  }
)

bossSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id
    delete ret._id
    delete ret.__v
    return ret
  },
})

bossSchema.set('toObject', {
  transform: (doc, ret) => {
    ret.id = ret._id
    delete ret._id
    delete ret.__v
    return ret
  },
})

const Boss = mongoose.model('Boss', bossSchema)
export default Boss
