import Worker from "../models/Worker.model.js"
import RedisHelper from "./RedisHelper.js";

const BATCHSIZE = 100,
    PREFIX = "search:worker:";

export default class Search {
    static async fullSync() {
        let workerCount = await Worker.count({parent: {$exists: false}}),
            offset = 0

        while (offset < workerCount) {
            let workers = await Worker.find({parent: {$exists: false}})
                .populate('services', 'name')
                .populate('leads', 'name')
                .populate('massageTypes', 'name')
                .populate('region', 'name')
                .skip(offset)
                .limit(BATCHSIZE)

            for (let worker of workers) {
                await RedisHelper.hset(PREFIX + worker._id,
                    "name", worker.name,
                    // 'phone', worker.phone,
                    'region', worker.region.name,
                    'services', worker.services.map(s => s.name).join(','),
                    'leads', worker.leads.map(l => l.name).join(','),
                    'massageTypes', worker.massageTypes.map(m => m.name).join(','),
                    'rooms', String(worker.rooms),
                    'avgCost', String(worker.avgCost)
                )
            }

            offset += BATCHSIZE
            console.log('next batch')
        }

        console.log('Synced all workers with RediSearch')
    }

    static async createIndexes() {

    }
}
//
