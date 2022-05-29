import Worker from "../models/Worker.model.js"
import Region from "../models/Region.model.js";
import RedisHelper from "./RedisHelper.js";

const BATCHSIZE = 100;

export default class Search {
    static async fullSync() {
        await Search.syncWorkers()
        await Search.syncRegions()
    }

    static async addWorker(keyPrefix, workerId, name, phone, lastRaise, avgCost, rooms, description, leads, services, massageTypes, regionName) {
        return RedisHelper.hset(keyPrefix + workerId,
            "name", name.toLowerCase(),
            'phone', phone,
            'lastRaise', String(+lastRaise),
            'description', description.toLowerCase(),
            'region', regionName.toLowerCase() + ' район',
            'services', services.map(s => s.name.toLowerCase()).join(','),
            'leads', leads.map(l => l.name.toLowerCase()).join(','),
            'massageTypes', massageTypes.map(m => m.name.toLowerCase()).join(','),
            'rooms', String(rooms),
            'avgCost', String(avgCost)
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
                .populate('massageTypes', 'name')
                .populate('region', 'name')
                .skip(offset)
                .limit(BATCHSIZE)

            for (let worker of workers) {
                await Search.addWorker(PREFIX,
                    worker._id,
                    worker.name,
                    worker.phone,
                    worker.lastRaise,
                    worker.avgCost,
                    worker.rooms,
                    worker.description,
                    worker.leads,
                    worker.services,
                    worker.massageTypes,
                    worker.region.name)
            }

            offset += BATCHSIZE
            console.log('next batch')
        }

        console.log('Synced all workers with RediSearch')
    }

    static async syncRegions() {
        const PREFIX = "search:region:"
        let regCount = await Region.count(),
            offset = 0

        while (offset < regCount) {
            let regions = await Region.find()
                .skip(offset)
                .limit(BATCHSIZE)

            for (let region of regions) {
                await RedisHelper.hset(PREFIX + region._id,
                    "name", region.name.toLowerCase()
                )
            }

            offset += BATCHSIZE
            console.log('next batch')
        }

        console.log('Synced all workers with RediSearch')
    }

    static async createIndexes() {
        await Search.createRegionIndex()
        await Search.createWorkerIndex()
    }

    static async createRegionIndex() {
        try {
            await RedisHelper.createIndex("idx:region", "search:region:", {
                name: "TAG"
            })
        } catch (e) {
        }

        console.log('Created region index')
    }

    static async createWorkerIndex() {
        try {
            await RedisHelper.createIndex("idx:worker", "search:worker:", {
                rooms: 'NUMERIC',
                region: 'TAG',
                lastRaise: 'NUMERIC SORTABLE',
                avgCost: 'NUMERIC',
                name: 'TEXT',
                description: 'TEXT',
                leads: 'TEXT',
                services: 'TEXT',
                massageTypes: 'TEXT'
            })
        } catch (e) {
        }

        console.log('Created worker index')
    }

    static async findRegion(queryString, limit, offset) {
        const searchResults = await RedisHelper.ftSearch('idx:region', queryString, limit, offset),
            searchResultsIds = searchResults
                .filter(s => typeof s === 'string' && s.includes('region'))
                .map(key => key.split(':')[2])

        console.log(searchResults, searchResultsIds)

        return {
            count: searchResults[0],
            results: await Region.find({_id: {$in: searchResultsIds}})
        }
    }
}
//
