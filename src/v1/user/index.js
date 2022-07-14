import express from "express";
import {v4 as uuidv4} from "uuid";
import * as userValidators from '../../validators/User.js'
import AuthGuard from "../../middlewares/AuthGuard.js";
import User from "../../models/User.model.js";
import Mail from "../../helpers/Mail.js";
import RedisHelper from "../../helpers/RedisHelper.js";
import Worker from "../../models/Worker.model.js";

const router = express.Router()

router.get('/me', AuthGuard('serviceProvider'), async (req, res) => {
    const {
        reffCode,
        balance,
        paymentCode,
        email,
        phone,
        approvedEmail,
        internalRole
    } = req.user;//req.user это объект, который пришел из AuthGuard

    let verificationStatus

    if (approvedEmail) {
        verificationStatus = 'verified'
    } else {
        //TODO get from redis
        verificationStatus = 'notverified'
    }

    res.json({
        balance,
        paymentCode,
        email,
        reffCode,
        internalRole,
        verificationStatus,
        phone//это все нужно для того, чтоб не светить пароль в ответе
    })
});

router.patch('/', AuthGuard('serviceProvider'), userValidators.updateUser, async (req, res) => {
    const {field, value} = req.body
    const {email, _id: userId} = req.user

    try {
        await User.updateOne({_id: req.user._id}, {$set: {[field]: value}})

        if (field === 'email' && email !== value) {
            const code = uuidv4(),
                redisKey = 'pending:approve:email:' + userId + ':' + code,
                mailer = new Mail('confirmMail', {
                    code
                }),
                approvalKeys = await RedisHelper.keys('pending:approve:email:' + userId + ':*')

            if (approvalKeys.length > 0) {
                await Promise.all(approvalKeys.forEach(async key => await RedisHelper.unlink(key)))
            }

            await mailer.addRecipient(value).send()

            await RedisHelper.set(redisKey, '')
            await RedisHelper.expire(redisKey, 30 * 60)//30 minutes
        }

        res.status(202).json({
            message: 'updatedUser'
        })
    } catch (e) {
        res.status(500).json({
            error: e.message
        })
    }
})

// router.patch('/approvemail', AuthGuard('serviceProvider'), async (req, res) => {
//     try {
//         const {email, _id: userId} = req.user
//
//         if (!email) {
//             return res.status(406).json({
//                 message: 'emailNotFound'
//             })
//         }
//
//         const code = uuidv4(),
//             redisKey = 'pending:approve:email:' + userId + ':' + code,
//             mailer = new Mail('confirmMail', {
//                 code
//             })
//
//         if ((await RedisHelper.keys('pending:approve:email:' + userId + ':*')).length > 0) {
//             return res.status(406).json({
//                 message: 'emailAlreadySent'
//             })
//         }
//
//         await mailer.addRecipient(email).send()
//
//         await RedisHelper.set(redisKey, '',)
//         await RedisHelper.expire(redisKey, 30 * 60)//30 minutes
//
//         res.json({
//             message: 'sentVerificationEmail'
//         })
//     } catch (e) {
//         res.status(500).json({
//             error: e.message
//         })
//     }
// })

router.get('/allowpa', AuthGuard('serviceProvider'), async (req, res) => {
    const userWorkersCnt = await Worker.countDocuments({
        host: req.user._id
    })

    if (userWorkersCnt > 0) {
        return res.json(true)
    }

    const hasPendingWorker = await RedisHelper.keys('haspw:' + req.user._id)

    if (hasPendingWorker.length > 0) {
        return res.json(true)
    }

    return res.json(false)
})

router.patch('/approvemail/:code', async (req, res) => {
    const redisKeys = (await RedisHelper.keys('pending:approve:email:*:' + req.params.code))
    if (redisKeys.length === 0) {
        return res.status(422).json({
            message: 'invalidOrExpiredCode'
        })
    }

    await User.updateOne({_id: redisKeys[0].split(':')[3]}, {$set: {approvedEmail: true}})
    await RedisHelper.unlink(redisKeys[0])

    res.redirect('/')
})

export default router
