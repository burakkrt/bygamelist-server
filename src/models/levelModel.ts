import mongoose from 'mongoose'

const levelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
)

levelSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.__v
    return ret
  },
})

levelSchema.set('toObject', {
  transform: (doc, ret) => {
    delete ret.__v
    return ret
  },
})

const Level = mongoose.model('Level', levelSchema)
export default Level
