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
  },
  nickName: {
    type: String,
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
  }
}, {
  versionKey: false,
  timestamps: true
});

export default mongoose.model('User', UserSchema)
