import Worker from "../models/Worker.model.js"
import Review from "../models/Review.model.js"
import RedisHelper from "./RedisHelper.js"
import {parsePhoneNumber} from "libphonenumber-js";
import mongoose from "mongoose";

const BATCHSIZE = 100;

export default class Search {
    static async fullSync() {
        await Search.syncWorkers()
        // await Search.syncRegions()
    }

    static async addWorker(keyPrefix, workerId, kind, name, phone, lastRaise, avgCost, rooms, description, leads, services, massageTypes, regionName, messengers, coords) {
        let parsedMessengers = []

        if (messengers.tg) {
            parsedMessengers.push('telegram')
        }

        if (messengers.wa) {
            parsedMessengers.push('whatsapp')
        }

        return RedisHelper.hset(keyPrefix + workerId,
            "name", name.toLowerCase(),
            'phone', parsePhoneNumber(phone, 'KZ').number.replace('+', ''),
            'kind', kind,
            'lastraise', String(+lastRaise),
            'description', description.toLowerCase(),
            'region', regionName.toLowerCase(),
            'services', services.map(s => s.name.toLowerCase()).join(','),
            'leads', leads.map(l => l.name.toLowerCase()).join(','),
            'massagetypes', massageTypes.map(m => m.name.toLowerCase()).join(','),
            'rooms', String(rooms),
            'avgcost', String(avgCost),
            'messengers', parsedMessengers.join(','),
            'location', coords.join(',')
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
                    worker.region.name,
                    worker.messengers,
                    worker.location.coordinates)
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
                massagetypes: 'TEXT',
                messengers: 'TEXT',
                location: 'GEO'
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
        try {
            const searchResults = await RedisHelper.ftSearch('idx:worker', queryString, limit, offset, ['SORTBY', 'lastraise', 'DESC']),
                searchResultsIds = searchResults
                    .splice(1)
                    .map(key => key.split(':')[2])

            if (limit === 0) {
                return {
                    count: searchResults[0],
                }
            }

            let workerAggregation = [{
                $match: {_id: {$in: searchResultsIds.map(i => new mongoose.Types.ObjectId(i))}}
            },
                {
                    $sort: {lastRaise: -1}
                }]
            // Worker.find({_id: {$in: searchResultsIds}}).sort({lastRaise: -1})

            if (isMapView) {
                workerAggregation.push({
                    $project: {
                        location: 1,
                        name: 1,
                        slug: 1,
                        isVerified: 1,
                        messengers: 1,
                        address: 1,
                        photos: 1,
                    }
                })
            } else {
                workerAggregation.push(
                    {
                        $project: {
                            kind: 1,
                            location: 1,
                            characteristics: 1,
                            name: 1,
                            slug: 1,
                            workHours: 1,
                            workDays: 1,
                            isVerified: 1,
                            photos: 1,
                            messengers: 1,
                            address: 1,
                            social: 1,
                            programs: 1,
                            description: 1,
                            phone: 1,
                            region: 1
                        }
                    }, {
                        $lookup: {
                            from: 'regions',
                            localField: 'region',
                            foreignField: '_id',
                            as: 'region'
                        }
                    },
                    {
                        $lookup: {
                            from: 'workers',
                            localField: '_id',
                            foreignField: 'parent',
                            as: 'masters'
                        }
                    }
                )
            }

            console.log(queryString)

            return {
                pageCount: Math.ceil(searchResults[0] / limit), //searchResults[0] is total count
                results: await Worker.aggregate(workerAggregation),
                count: searchResults[0],
                workerLocations: queryString.includes('@region:') ? (await RedisHelper.ftSearchRaw('idx:worker', queryString.match(/@region:(\w+)/g)[0], 'RETURN', '1', 'location')).splice(1).filter(i => (i + 1) % 3 === 0) : [],
                reviews: await Review.aggregate([{
                    $match: {
                        target: {
                            $in: searchResultsIds.map(id => new mongoose.mongo.ObjectId(id))
                        }
                    }
                }, {
                    $group: {
                        _id: '$target',
                        avg: {
                            $avg: '$avg'
                        },
                        count: {
                            $count: {}
                        }
                    }
                }])
            }
        } catch (e) {
            console.log(e)
            return {}
        }
    }
}
