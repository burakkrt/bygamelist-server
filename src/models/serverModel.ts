import mongoose, { Schema } from 'mongoose'

const teamSchema = new mongoose.Schema({
  owners: {
    type: [String],
  },
  comas: {
    type: [String],
  },
  teamLeaders: {
    type: [String],
  },
  gameAdmins: {
    type: [String],
  },
  gameMasters: {
    type: [String],
  },
})

const serverSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    level: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Level',
      required: true,
    },
    openingDate: {
      type: Date,
      required: true,
    },
    autoHunt: {
      type: Boolean,
      required: true,
    },
    autoBoss: {
      type: Boolean,
    },
    battlepass: {
      type: Boolean,
    },
    dropClient: {
      type: Number,
      required: true,
    },
    legalSale: {
      type: Boolean,
    },
    dolunayKdp: {
      type: Boolean,
    },
    simya: {
      type: Boolean,
    },
    kuleFarm: {
      type: Boolean,
    },
    team: {
      type: [teamSchema],
    },
    efsunlar: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Efsun',
      },
    ],
    bosses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Boss',
      },
    ],
  },

  {
    timestamps: true,
  }
)

const ServerModel = mongoose.model('Server', serverSchema)
export default ServerModel
