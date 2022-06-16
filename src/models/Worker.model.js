import mongoose from "mongoose"
import PointSchema from "./Point.schema.js";
import CyrillicToTranslit from "cyrillic-to-translit-js";
import Numbers from "../helpers/Numbers.js";

const {Schema} = mongoose

const WorkerSchema = new Schema({
    kind: {
        type: String,
        enum: ["master", "salon"],
        required: true
    },
    name: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    address: {
        type: String,
        required: true
    },
    location: {
        type: PointSchema,
        index: '2dsphere'
    },
    parent: {
        type: Schema.Types.ObjectId,
        ref: "Worker"
    },
    slaves: {
        type: [Schema.Types.ObjectId],
        ref: "Worker"
    },
    lastRaise: {
        type: Date,
        default: new Date(0)
    },
    raises: {
        type: [Date],
        default: []
    },
    messengers: {
        tg: {
            type: String
        },
        wa: {
            type: String
        }
    },
    social: {
        inst: {
            type: String
        },
        vk: {
            type: String
        },
        ws: {
            type: String
        },
        tgCh: {
            type: String
        }
    },
    host: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    description: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    characteristics: {
        height: {
            type: Number,
            min: 70,
            max: 250,
            required: true
        },
        weight: {
            type: Number,
            min: 30,
            max: 150,
            required: true
        },
        hair: {
            type: String,
            enum: ["брюнетка", "блондинка", "седая", "русая", "рыжая", "шатенка", "другой"],
            required: true
        },
        eyes: {
            type: String,
            enum: ["голубой", "синий", "зеленый", "карий", "серый", "черный", "желтый", "другой"],
            required: true
        },
        age: {
            type: Number,
            min: 18,
            max: 99,
            required: true
        },
        bust: {
            type: Number,
            enum: [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5],
            required: true
        },
        show: {
            type: Boolean,
            default: true
        }
    },
    region: {
        type: Schema.Types.ObjectId,
        ref: "Region",
        required: true
    },
    services: {
        type: [Schema.Types.ObjectId],
        ref: "Service",
        required: true
    },
    programs: [{
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        duration: {
            type: Number,
            enum: [15, 30, 60, 90],
            required: true
        },
        classicCnt: {
            type: Number,
            min: 1,
            max: 3,
            required: true
        },
        eroticCnt: {
            type: Number,
            min: 1,
            max: 3,
            required: true
        },
        relaxCnt: {
            type: Number,
            min: 1,
            max: 3,
            required: true
        },
        cost: {
            type: Number,
            required: true
        }
    }],
    avgCost: {
        type: Number,
        default() {
            return Math.round(this.programs.reduce((acc, cur) => acc + (cur.cost / cur.duration * 60), 0) / this.programs.length)
        }
    },
    rooms: {
        type: Number,
        default: 1,
        min: 1,
        max: 20,
        required: true
    },
    leads: {
        type: [Schema.Types.ObjectId],
        ref: "Lead",
        required: true
    },
    photos: {
        type: [String],
        required: true
    },
    slug: {
        type: String,
        default() {// Привет, мир! => privet-mir-25
            return (new CyrillicToTranslit).transform(this.name.replace(/[&\/\\#,!+()$~%.'":*?<>{}]/g, '').trim(), '-') + Numbers.random(1, 1000)
        }
    },
    workHours: {
        from: {
            type: String
        },
        to: {
            type: String
        },
        roundclock: {
            type: Boolean,
            default: false
        }
    },
    workDays: {
        type: [String],
        enum: ["mon", "tue", "wed", "thu", "fri", "sat", "sun"],
        required: true
    }
}, {
    versionKey: false,
    timestamps: true
});

export default mongoose.model('Worker', WorkerSchema)
