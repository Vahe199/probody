import mongoose from "mongoose"
import Numbers from "../helpers/Numbers.js"
import CyrillicToTranslit from 'cyrillic-to-translit-js'

const {Schema} = mongoose

const ProgramSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    descr: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    duration: {
        type: Number,
        enum: [15, 36],
        required: true
    }
}, {
    versionKey: false,
    timestamps: false
});

export default mongoose.model('Program', ProgramSchema)
