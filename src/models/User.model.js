import mongoose from "mongoose"

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
  }
}, {
  versionKey: false,
  timestamps: true
});

export default mongoose.model('User', UserSchema)
