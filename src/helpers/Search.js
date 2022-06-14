import Worker from "../models/Worker.model.js"
import RedisHelper from "./RedisHelper.js"

const BATCHSIZE = 100;

export default class Search {
    static async fullSync() {
        await Search.syncWorkers()
        // await Search.syncRegions()
    }

    static async addWorker(keyPrefix, workerId, kind, name, phone, lastRaise, avgCost, rooms, description, leads, services, massageTypes, regionName) {
        return RedisHelper.hset(keyPrefix + workerId,
            "name", name.toLowerCase(),
            'phone', phone.replace('+', ''),
            'kind', kind,
            'lastraise', String(+lastRaise),
            'description', description.toLowerCase(),
            'region', regionName.toLowerCase() + ' район',
            'services', services.map(s => s.name.toLowerCase()).join(','),
            'leads', leads.map(l => l.name.toLowerCase()).join(','),
            'massagetypes', massageTypes.map(m => m.name.toLowerCase()).join(','),
            'rooms', String(rooms),
            'avgcost', String(avgCost)
        )
    }

    static async syncWorkers() {
        const PREFIX = "search:worker:"
        let workerCount = await Worker.count({parent: {$exists: false}}),
            offset = 0

        while (offset < workerCount) {
            let workers = await Worker.find({parent: {$exists: false}})
                .populate('services', 'name')
                .populate('leads', 'name')
                .populate('region', 'name')
                .skip(offset)
                .limit(BATCHSIZE)

            for (let worker of workers) {
                await Search.addWorker(PREFIX,
                    worker._id,
                    worker.kind,
                    worker.name,
                    worker.phone,
                    worker.lastRaise,
                    worker.avgCost,
                    worker.rooms,
                    worker.description,
                    worker.leads,
                    worker.services,
                    worker.programs,
                    worker.region.name)
            }

            offset += BATCHSIZE
            console.log('next batch')
        }

        console.log('Synced all workers with RediSearch')
    }

    // static async syncRegions() {
    //     const PREFIX = "search:region:"
    //     let regCount = await Region.count(),
    //         offset = 0
    //
    //     while (offset < regCount) {
    //         let regions = await Region.find()
    //             .skip(offset)
    //             .limit(BATCHSIZE)
    //
    //         for (let region of regions) {
    //             await RedisHelper.hset(PREFIX + region._id,
    //                 "name", region.name.toLowerCase()
    //             )
    //         }
    //
    //         offset += BATCHSIZE
    //         console.log('next batch')
    //     }
    //
    //     console.log('Synced all regions with RediSearch')
    // }

    static async createIndexes() {
        // await Search.createRegionIndex()
        await Search.createWorkerIndex()
    }

    // static async createRegionIndex() {
    //     try {
    //         await RedisHelper.createIndex("idx:region", "search:region:", {
    //             name: "TEXT"
    //         })
    //     } catch (e) {
    //     }
    //
    //     console.log('Created region index')
    // }

    static async createWorkerIndex() {
        try {
            await RedisHelper.createIndex("idx:worker", "search:worker:", {
                rooms: 'NUMERIC',
                region: 'TEXT',
                lastraise: 'NUMERIC SORTABLE',
                avgcost: 'NUMERIC',
                name: 'TEXT',
                kind: 'TAG',
                description: 'TEXT',
                leads: 'TEXT',
                phone: 'TAG',
                services: 'TEXT',
                massagetypes: 'TEXT'
            })
        } catch (e) {
        }

        console.log('Created worker index')
    }

    // static async findRegion(queryString, limit, offset) {
    //     const searchResults = await RedisHelper.ftSearch('idx:region', queryString, limit, offset),
    //         searchResultsIds = searchResults
    //             .splice(1)
    //             .map(key => key.split(':')[2])
    //
    //     return {
    //         count: searchResults[0],
    //         results: await Region.find({_id: {$in: searchResultsIds}})
    //     }
    // }

    static async findWorker(queryString, isMapView, limit, offset) {
        const searchResults = await RedisHelper.ftSearch('idx:worker', queryString, limit, offset, ['SORTBY', 'lastraise', 'DESC']),
            searchResultsIds = searchResults
                .splice(1)
                .map(key => key.split(':')[2])
        let workerQuery = Worker.find({_id: {$in: searchResultsIds}}).sort({lastRaise: -1})

        if (isMapView) {
            workerQuery.projection('location name slug workHours workDays isVerified messengers address')
        } else {
            workerQuery = Worker.populate(await workerQuery.projection('location name slug isVerified photos address social programs description phone messengers region'), { path: 'region', select: 'name' })
        }

        return {
            count: searchResults[0],
            results: await workerQuery
        }
    }
}
