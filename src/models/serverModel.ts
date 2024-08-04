import mongoose, { Schema } from 'mongoose'

const serverModel = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title must be mandatory.'],
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model('Server', serverModel)
