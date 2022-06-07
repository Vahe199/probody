import express from "express";
import * as userValidators from '../../validators/User.js'
import AuthGuard from "../../middlewares/AuthGuard.js";
import User from "../../models/User.model.js";

const router = express.Router()

router.get('/user/me', AuthGuard('user'), async (req, res) => {
    const {
        nickName,
        avatar,
        reffCode,
        balance,
        paymentCode,
        role,
        email,
        phone
    } = req.user;//req.user это объект, который пришел из AuthGuard

    res.json({
        nickName,
        avatar,
        balance,
        paymentCode,
        role,
        email,
        reffCode,
        phone//это все нужно для того, чтоб не светить пароль в ответе
    })
});

router.patch('/user', AuthGuard('user'), userValidators.updateUser, async (req, res) => {
    const {field, value} = req.body

    try {
        await User.updateOne({_id: req.user._id}, {$set: {[field]: value}})

        res.status(202).json({
            message: 'updatedUser'
        })
    } catch (e) {
        res.status(500).json({
            error: e.message
        })
    }
})

export default router
