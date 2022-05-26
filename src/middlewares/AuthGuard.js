export default function AuthGuard(allowedRole /* serviceProvider | admin */) {
    return function(req, res, next) {
        // TODO: check if user is logged in
        next()
    }
}
