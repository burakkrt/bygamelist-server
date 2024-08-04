import mongoose, { Schema } from 'mongoose'

const roleEventSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
})

const RoleEvent = mongoose.model('RoleEvent', roleEventSchema)
export default RoleEvent
