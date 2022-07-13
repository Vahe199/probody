import mongoose from "mongoose"

const {Schema} = mongoose

const StatsSchema = new Schema({
    salon: {
        type: Schema.Types.ObjectId,
        ref: 'Worker',
        required: true
    },
    counters: {
        views: {
            type: Number,
            default: 0
        },
        actions: {
            socialClicks: {
                type: Number,
                default: 0
            },
            websiteClicks: {
                type: Number,
                default: 0
            },
            messengerClicks: {
                type: Number,
                default: 0
            },
            mapClicks: {
                type: Number,
                default: 0
            },
            phoneClicks: {
                type: Number,
                default: 0
            },
            priceClicks: {
                type: Number,
                default: 0
            },
            reviewClicks: {
                type: Number,
                default: 0
            },
            photoClicks: {
                type: Number,
                default: 0
            },
            shareClicks: {
                type: Number,
                default: 0
            }
        }
    }
}, {
    versionKey: false,
    timestamps: true
});

export default mongoose.model('Stats', StatsSchema, 'stats')
