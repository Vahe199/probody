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
  }
}, {
  versionKey: false,
  timestamps: true
});

export default mongoose.model('User', UserSchema)
