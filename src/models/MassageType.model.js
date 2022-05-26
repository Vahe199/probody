import mongoose from "mongoose"

const {Schema} = mongoose

const MassageTypeSchema = new Schema({
  name: {
    type: String
  }
}, {
  versionKey: false,
  timestamps: false
});

export default mongoose.model('MassageType', MassageTypeSchema)
