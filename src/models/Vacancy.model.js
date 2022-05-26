import mongoose from "mongoose"

const {Schema} = mongoose

const AuthorizedTokensSchema = new Schema({
    host: {
        type: Schema.Types.ObjectId, ref: 'User'
    },
    salary: {
        type: Number,
        required: true
    },
    employment: {
        type: [String],
        enum: ['full', 'part', 'secondary'],
    },
    experience: {
        type: [String],
        enum: ['none', '1-3mon', '3-6mon', '6-12mon', 'more']
    },
    description: {
        type: String,
        required: true
    },
    workHours: {
        from: {
            type: Number
        },
        to: {
            type: Number
        },
        isOther: {
            type: Boolean
        }
    },
    salonTitle: {
        type: String,
        required: true
    },
    salonAddress: {
        type: String,
        required: true
    },
    region: {
        type: Schema.Types.ObjectId,
        ref: "Region"
    }
}, {
    versionKey: false,
    timestamps: false
});

export default mongoose.model('AuthorizedTokens', AuthorizedTokensSchema)
