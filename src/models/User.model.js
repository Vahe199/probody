import mongoose from "mongoose"
import ReffCode from "../helpers/ReffCode.js"

const {Schema} = mongoose

const UserSchema = new Schema({
  phone: {
    unique: true,
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    default: ''
  },
  nickName: {
    type: String,
    default: ''
  },
  balance: {
    type: Number,
    default: 0
  },
  role: {
    type: String,
    enum: ['serviceProvider', 'admin'],
    default: 'serviceProvider'
  },
  paymentCode: {
    type: String,
    default: ReffCode.generate
  },
  approvedEmail: {
    type: Boolean,
    default: false
  }
}, {
  versionKey: false,
  timestamps: true
});

export default mongoose.model('User', UserSchema)
