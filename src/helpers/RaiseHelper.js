import Worker from '../models/Worker.model.js'

const CHECK_INTERVAL = 1000 * 60

export default class RaiseHelper {
    static runPlanner() {
        setTimeout(RaiseHelper.planner, CHECK_INTERVAL)
    }

    static async planner() {
        const paidSalons = await Worker.aggregate([
            {
                '$match': {
                    'parent': {
                        '$exists': false
                    },
                    'raises.0': {
                        '$exists': true
                    }
                }
            }, {
                '$project': {
                    'lastRaise': 1,
                    'raises': 1
                }
            }
        ])

        console.log(JSON.stringify(paidSalons, null, 2))

        return setTimeout(RaiseHelper.planner, CHECK_INTERVAL)
    }
}
