import nodemailer from 'nodemailer';
import fs from "fs";
import path from "path";

const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
            user: process.env.MAIL_ACCOUNT,
            pass: process.env.MAIL_PASSWORD
        },
    }),
    senderInfo = {
        from: '"Fred Foo 👻" <foo@example.com>'
    },
    templates = {
        confirmMail: {
            ...senderInfo,
            subject: 'Confirm your account',
            html: fs.readFileSync(path.resolve('mail/approve.template.html'), 'utf8')
        }
    }

export default class Mail {
    recipients = []
    config = {}

    constructor(type, /* confirmMail */ subsitutions) {
        this.config = templates[type]

        for (let key in subsitutions) {
            this.config.html = this.config.html.replace(`{{${key}}}`, subsitutions[key])
        }
    }

    addRecipient() {
        this.recipients.push(...arguments)

        return this
    }

    async send() {
        transporter.sendMail(Object.assign({}, this.config, {
            to: this.recipients.join(', ')
        }))
    }
}
