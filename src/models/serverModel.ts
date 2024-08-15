import mongoose, { Schema } from 'mongoose'

const teamSchema = new mongoose.Schema({
  owners: {
    type: [String],
    default: undefined,
  },
  comas: {
    type: [String],
    default: undefined,
  },
  teamLeaders: {
    type: [String],
    default: undefined,
  },
  gameAdmins: {
    type: [String],
    default: undefined,
  },
  gameMasters: {
    type: [String],
    default: undefined,
  },
})

const serverSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      default: undefined,
    },
    level: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Level',
      required: true,
      default: undefined,
    },
    openingDate: {
      type: Date,
      required: true,
      default: undefined,
    },
    autoHunt: {
      type: Boolean,
      required: true,
      default: undefined,
    },
    autoBoss: {
      type: Boolean,
      default: undefined,
    },
    battlepass: {
      type: Boolean,
      default: undefined,
    },
    dropClient: {
      type: Number,
      required: true,
      default: undefined,
    },
    legalSale: {
      type: Boolean,
      default: undefined,
    },
    dolunayKdp: {
      type: Boolean,
      default: undefined,
    },
    simya: {
      type: Boolean,
      default: undefined,
    },
    kuleFarm: {
      type: Boolean,
      default: undefined,
    },
    team: {
      type: [teamSchema],
      default: undefined,
    },
    efsunlar: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Efsun',
        default: undefined,
      },
    ],
    bosses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Boss',
        default: undefined,
      },
    ],
  },

  {
    timestamps: true,
  }
)

serverSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id
    delete ret._id
    delete ret.__v
    return ret
  },
})

serverSchema.set('toObject', {
  transform: (doc, ret) => {
    ret.id = ret._id
    delete ret._id
    delete ret.__v
    return ret
  },
})

const ServerModel = mongoose.model('Server', serverSchema)
export default ServerModel
