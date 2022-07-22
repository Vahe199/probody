const CHECK_INTERVAL = 1000 * 60

export default class RaiseHelper {
    static runPlanner() {
        setTimeout(RaiseHelper.planner, CHECK_INTERVAL)
    }

    static planner() {
        console.log('check')

        return setTimeout(RaiseHelper.planner, CHECK_INTERVAL)
    }
}
