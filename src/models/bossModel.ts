import mongoose from 'mongoose'

const bossSchema = new mongoose.Schema(
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

const Boss = mongoose.model('Boss', bossSchema)
export default Boss
