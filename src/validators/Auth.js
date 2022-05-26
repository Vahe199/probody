import {parsePhoneNumber} from 'libphonenumber-js'

export async function register(req, res, next) {
    let {password, phone} = req.body;

    req.validation = []

    if (password) {
        if (password.length < 8) {//проверяем пароль
            req.validation.push({text: 'tooShortPassword', field: 'password'})
        }
        if (password.length > 50) {
            req.validation.push({text: 'tooLongPassword', field: 'password'})
        }
    } else {
        req.validation.push({text: 'emptyPassword', field: 'password'})
    }

    if (phone) {
        let parsedPhone
        try {
            parsedPhone = parsePhoneNumber(phone, process.env.PHONE_REGION)

            if (!parsedPhone.isValid()) {//проверка валидности номера телефона
                req.validation.push({text: 'invalidPhone', field: 'phone'})
            }
        } catch (e) {
            req.validation.push({text: 'invalidPhone', field: 'phone'})
        }
    } else {
        req.validation.push({text: 'emptyPhone', field: 'phone'})
    }

    if (req.validation.length > 0) {//если хоть одна валидация не прошла, отправляем ошибку, иначе пускаем дальше
        res.status(406).json({
            type: 'Validation error',
            data: req.validation
        })
    } else {
        next()
    }
}

export async function onlyPhone(req, res, next) {
    let {phone} = req.body;

    req.validation = []

    if (phone) {
        let parsedPhone
        try {
            parsedPhone = parsePhoneNumber(phone, process.env.PHONE_REGION)

            if (!parsedPhone.isValid()) {//проверка валидности номера телефона
                req.validation.push({text: 'invalidPhone', field: 'phone'})
            }
        } catch (e) {
            req.validation.push({text: 'invalidPhone', field: 'phone'})
        }
    } else {
        req.validation.push({text: 'emptyPhone', field: 'phone'})
    }

    if (req.validation.length > 0) {//если хоть одна валидация не прошла, отправляем ошибку, иначе пускаем дальше
        res.status(406).json({
            type: 'Validation error',
            data: req.validation
        })
    } else {
        next()
    }
}

export async function resendSMS(req, res, next) {
    let {phone, target} = req.body;

    req.validation = []

    if (phone) {
        let parsedPhone
        try {
            parsedPhone = parsePhoneNumber(phone, process.env.PHONE_REGION)

            if (!parsedPhone.isValid()) {//проверка валидности номера телефона
                req.validation.push({text: 'invalidPhone', field: 'phone'})
            }
        } catch (e) {
            req.validation.push({text: 'invalidPhone', field: 'phone'})
        }
    } else {
        req.validation.push({text: 'emptyPhone', field: 'phone'})
    }

    if (!['2FA', 'register', 'reset'].includes(target)) {
        req.validation.push({text: 'unknownTarget', field: 'target'})
    }

    if (req.validation.length > 0) {//если хоть одна валидация не прошла, отправляем ошибку, иначе пускаем дальше
        res.status(406).json({
            type: 'Validation error',
            data: req.validation
        })
    } else {
        next()
    }
}

export async function auth(req, res, next) {
    let {password, phone} = req.body;

    req.validation = []
    if (password) {
        if (password.length < 8) {//проверяем пароль
            req.validation.push({text: 'tooShortPassword', field: 'password'})
        }
        if (password.length > 50) {
            req.validation.push({text: 'tooLongPassword', field: 'password'})
        }
    } else {
        req.validation.push({text: 'emptyPassword', field: 'password'})
    }

    if (phone) {
        const parsedPhone = parsePhoneNumber(phone, process.env.PHONE_REGION)

        if (!parsedPhone.isValid()) {//проверка валидности номера телефона
            req.validation.push({text: 'invalidPhone', field: 'phone'})
        }
    } else {
        req.validation.push({text: 'emptyPhone', field: 'phone'})
    }

    if (req.validation.length > 0) {//если хоть одна валидация не прошла, отправляем ошибку, иначе пускаем дальше
        res.status(406).json({
            type: 'Validation error',
            data: req.validation
        })
    } else {
        next()
    }
}

export async function phoneAndPassword(req, res, next) {
    let {password, phone} = req.body;

    req.validation = []
    if (password) {
        if (password.length < 8) {//проверяем пароль
            req.validation.push({text: 'tooShortPassword', field: 'password'})
        }
        if (password.length > 50) {
            req.validation.push({text: 'tooLongPassword', field: 'password'})
        }
    } else {
        req.validation.push({text: 'emptyPassword', field: 'password'})
    }

    if (phone) {
        const parsedPhone = parsePhoneNumber(phone, process.env.PHONE_REGION)

        if (!parsedPhone.isValid()) {//проверка валидности номера телефона
            req.validation.push({text: 'invalidPhone', field: 'phone'})
        }
    } else {
        req.validation.push({text: 'emptyPhone', field: 'phone'})
    }

    if (req.validation.length > 0) {//если хоть одна валидация не прошла, отправляем ошибку, иначе пускаем дальше
        res.status(406).json({
            type: 'Validation error',
            data: req.validation
        })
    } else {
        next()
    }
}
