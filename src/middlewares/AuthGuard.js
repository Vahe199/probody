import AuthorizedToken from "../models/AuthorizedToken.model.js"

export default function AuthGuard(allowedRole /* serviceProvider | admin-front */) {
    return async function (req, res, next) {
        if (!req.get('X-Auth-Token')) {
            return res.status(401).json({
                message: 'Unauthorized'
            })
        }
        switch (allowedRole) {
            case 'serviceProvider':
                const userDoc = await AuthorizedToken.findOne({token: req.get('X-Auth-Token')}).populate('userId')

                if (!userDoc) {
                    return res.status(401).json({
                        message: 'Unauthorized'
                    })
                }

                req.user = userDoc.userId
                break

            case 'admin':
                // TODO: check if user is admin-front
                break;

            default:
                return res.status(500).json({
                    message: 'Internal server error'
                })
        }

        next()
    }
}
