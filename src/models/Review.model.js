import mongoose from "mongoose"

const {Schema} = mongoose

const ReviewSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    target: {
        type: Schema.Types.ObjectId,
        ref: 'Worker',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    text: {
        type: String
    },
    answer: {
        type: String
    },
    interior: {
        type: Number,
        required: true
    },
    massage: {
        type: Number,
        required: true
    },
    service: {
        type: Number,
        required: true
    },
    avg: {
        type: Number,
        default() {
            return (this.interior + this.massage + this.service) / 3
        }
    }
}, {
    versionKey: false,
    timestamps: true
});

export default mongoose.model('Review', ReviewSchema)
