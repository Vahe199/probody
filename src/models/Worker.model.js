import mongoose from "mongoose"

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
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point'
        },
        coordinates: {
            type: [Number],
            required: true
        }
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
        fb: {
            type: String
        },
        tgCh: {
            type: String
        }
    },
    host: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    description: {
        type: String
    },
    phone: {
        type: String,
        required: true
    },
    characteristics: {
        height: {
            type: Number,
            min: 70,
            max: 250
        },
        weight: {
            type: Number,
            min: 30,
            max: 150
        },
        hair: {
            type: String,
            enum: ["brunette", "blonde", "grey", "redhead", "fair", "brown", "other"]
        },
        eyes: {
            type: String,
            enum: ["blue", "lightblue", "green", "hazel", "grey", "black", "yellow", "other"]
        },
        age: {
            type: Number,
            min: 18,
            max: 99
        },
        bust: {
            type: Number,
            enum: [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5]
        }
    },
    region: {
        type: Schema.Types.ObjectId,
        ref: "Region"
    },
    services: {
        type: [Schema.Types.ObjectId],
        ref: "Service"
    },
    massageTypes: {
        type: [Schema.Types.ObjectId],
        ref: "MassageType"
    },
    avgCost: {
        type: Number,
        default: 0
    },
    rooms: {
        type: Number,
        default: 1,
        min: 1,
        max: 20
    },
    leads: {
        type: [Schema.Types.ObjectId],
        ref: "Lead"
    },
    photos: {
        type: [String],
        required: true
    },
    workHours: {
        from: {
            type: Number,
            required: true,
            min: 0,
            max: 23
        },
        to: {
            type: Number,
            required: true,
            min: 1,
            max: 24
        }
    },
    workDays: {
        type: [String],
        enum: ["mon", "tue", "wed", "thu", "fri", "sat", "sun"],
        default: ["mon", "tue", "wed", "thu", "fri", "sat", "sun"]
    }
}, {
    versionKey: false,
    timestamps: true
});

export default mongoose.model('Worker', WorkerSchema)
