import mongoose, { Schema } from 'mongoose'

const roleSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  roles: [
    {
      type: Schema.Types.ObjectId,
      ref: 'RoleEvent',
      required: true,
      unique: true,
    },
  ],
})

const roleModel = mongoose.model('Role', roleSchema)
export default roleModel
