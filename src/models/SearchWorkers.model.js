import mongoose from "mongoose"

const {Schema} = mongoose

const SearchWorkersSchema = new Schema({
  worker: {
    type: Schema.Types.ObjectId,
    ref: "Worker"
  },
  fullText: {
    type: String,
    required: true
  }
}, {
  versionKey: false,
  timestamps: false
});

export default mongoose.model('SearchWorkers', SearchWorkersSchema)
