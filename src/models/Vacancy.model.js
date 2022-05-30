import mongoose from "mongoose"
import Point from "./Point.schema.js";
import CyrillicToTranslit from "cyrillic-to-translit-js";
import Numbers from "../helpers/Numbers.js";

const {Schema} = mongoose

const VacancySchema = new Schema({
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
    title: {
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
    phone: {
        type: String,
        required: true
    },
    whatsapp: {
        type: String,
    },
    workDays: {
        type: [String],
        enum: ["mon", "tue", "wed", "thu", "fri", "sat", "sun"],
        default: ["mon", "tue", "wed", "thu", "fri", "sat", "sun"]
    },
    salonTitle: {
        type: String,
        required: true
    },
    salonAddress: {
        type: String,
        required: true
    },
    photo: {
      type: [String],
      required: true
    },
    salonLocation: {
        type: Point,
        required: true
    },
    slug: {
        type: String,
        default() {// Привет, мир! => privet-mir-25
            return (new CyrillicToTranslit).transform(this.salonTitle.replace(/[&\/\\#,!+()$~%.'":*?<>{}]/g, '').trim(), '-') + Numbers.random(1, 1000)
        }
    },
    region: {
        type: Schema.Types.ObjectId,
        ref: "Region"
    }
}, {
    versionKey: false,
    timestamps: true
});

export default mongoose.model('Vacancy', VacancySchema)
