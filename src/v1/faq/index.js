import express from 'express';
import FAQ from "../../models/FAQ.model.js";
import AuthGuard from "../../middlewares/AuthGuard.js";
import FAQResponse from "../../models/FAQResponse.model.js";
import apicache from "apicache";

const router = express.Router();

router.get('/', apicache.middleware('5 minutes'), async (req, res) => {
    console.log(!!req.user)
    res.json(req.user ? await FAQ.aggregate([{
        $lookup: {
            from: 'faqResponse',
            localField: '_id',
            foreignField: 'faqId',
            as: 'gotResponse',
            pipeline: [{
                $match: {
                    userId: req.user._id
                }
            }]
        }
    }, {
        $project: {
            name: 1,
            description: 1,
            gotResponse: {
                $toBool: {
                    $ne: [{
                        $size: '$gotResponse'
                    },
                        0
                    ]
                }
            }
        }
    }]) : await FAQ.find({}))
})

router.get('/:id/quality', apicache.middleware('30 minutes'), async (req, res) => {
    try {
        const satisfiedCnt = await FAQResponse.countDocuments({
                faq: req.params.id,
                isUseful: true
            }),
            allCnt = await FAQResponse.countDocuments({
                faq: req.params.id
            })

        res.json({
            quality: satisfiedCnt / allCnt
        })
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

router.post('/:id', AuthGuard('serviceProvider'), async (req, res) => {
    try {
        const faqAnswer = await FAQResponse.findOne({faqId: req.params.id, userId: req.user._id})

        if (faqAnswer) {
            return res.status(400).json({message: 'You have already answered this question'})
        }

        await (new FAQResponse({
            faqId: req.params.id,
            userId: req.user._id,
            text: req.body.text,
            isUseful: req.body.isUseful,
        })).save()

        res.json({message: 'Answer added'})
    } catch (e) {
        res.status(500).json({message: e.message})
    }
})

export default router;
