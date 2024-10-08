import mongoose, { Document, Schema } from 'mongoose'
import bcrypt from 'bcrypt'

export interface IUser extends Document {
  _id: string
  name: string
  surname: string
  password: string
  email: string
  phoneNumber?: string
  comparePassword(candidatePassword: string): Promise<boolean>
}
const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      default: undefined,
    },
    surname: {
      type: String,
      required: true,
      default: undefined,
    },
    password: {
      type: String,
      required: true,
      default: undefined,
    },
    email: {
      type: String,
      required: true,
      default: undefined,
    },
    phoneNumber: {
      type: String,
      default: undefined,
    },
  },
  {
    timestamps: true,
  }
)

userSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id
    delete ret._id
    delete ret.__v
    return ret
  },
})

userSchema.set('toObject', {
  transform: (doc, ret) => {
    ret.id = ret._id
    delete ret._id
    delete ret.__v
    return ret
  },
})

userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, this.password)
}

const UserModel = mongoose.model<IUser>('User', userSchema)

export default UserModel
