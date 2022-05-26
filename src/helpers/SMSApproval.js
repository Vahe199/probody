import RedisHelper from "./RedisHelper.js";

export const APPROVAL_LENGTH = 5

export default class SMSApproval {
    code = ''
    phone = ''

    constructor(phone, code = null) {
        this.phone = phone

        if (!code) {
            this.generateCode()
        } else {
            this.code = code
        }
    }

    generateCode() {
        let code = ''
        const characters = '0123456789',
            charactersLength = characters.length

        for (let i = 0; i < APPROVAL_LENGTH; i++) {
            code += characters.charAt(Math.floor(Math.random() *
                charactersLength))
        }

        this.code = code
    }

    async send() {
        //ban sms resend for 30sec
        const redisBanKey = 'ban:sms:' + this.phone

        await RedisHelper.set(redisBanKey, '')
        await RedisHelper.expire(redisBanKey, 30)

        //TODO: Send this.code to this.phone
        return new Promise(resolve => {
            setTimeout(resolve, 250)
        })
    }

    get code () {
        return this.code
    }
}
