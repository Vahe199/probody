import * as redis from 'redis'

const escapeQuotes = s => s.replace(/\\([\s\S])|(")/g, "\\$1$2")

class RedisHelper {
    async init() {
        if (!this.redisClient) {
            const host = process.env.REDIS_HOST,
                port = process.env.REDIS_PORT,
                password = '';

            this.redisClient = redis.createClient({
                url: `redis://${host}:${port}`
            })

            this.redisClient.on('reconnecting', (err) => {
                console.error('RedisClient', `Redis reconnecting ${JSON.stringify(err)}`);
            });

            await this.redisClient.connect()

            return password ? this.auth(password) : Promise.resolve('');
        }

        return Promise.resolve('');
    }

    async expire(key, seconds) {
        await this.init();

        return this.redisClient.expire(key, seconds);
    }

    async exists(key) {
        await this.init();

        return this.redisClient.exists(key);
    }

    async set(key, value) {
        await this.init();

        return this.redisClient.set(key, value);
    }

    async get(key) {
        await this.init();

        return this.redisClient.get(key);
    }

    async unlink() {
        await this.init();

        return this.redisClient.unlink(...arguments);
    }

    async hset(key, field, value, expire = undefined) {
        await this.init();

        // const cacheValue = {
        //     value: JSON.stringify(value)
        // };
        //
        // promisify(this.redisClient.hset).bind(this.redisClient)(key, field, JSON.stringify(cacheValue));
        this.redisClient.hset(key, field, value)

        if (expire) {
            await this.expire(key, expire);
        }

        return true;
    }

    async hget(key, field) {
        await this.init();

        return this.redisClient.hget(key, field);
    }

    async hincrby(key, field, increment) {
        await this.init();

        return key && this.redisClient.hincrby(key, field, increment);
    }

    async hgetall(key) {
        await this.init();

        return this.redisClient.hgetall(key);
    }

    async keys(pattern) {
        await this.init();

        return this.redisClient.keys(pattern);
    }

    async ftSearch(index, query, limit, offset) {
        await this.init();

        return this.redisClient.send_command(
            'FT.SEARCH',
            [
                index,
                `"${escapeQuotes(query.toLowerCase())}"`,
                'LIMIT',
                offset,
                limit
            ]
        );
    }

    async createIndex(name, prefix, schema) {
        await this.init();

        return this.redisClient.send_command(
            'FT.CREATE',
            [
                name,
                'ON',
                'hash',
                'PREFIX',
                1,
                prefix,
                'SCHEMA',
                ...Object.keys(schema).reduce((acc, key) => {
                    return acc + key + ' ' + schema[key] + ' '
                }, '').trim().split(' ')
            ]
        );
    }

    async auth(password){
        return this.redisClient.auth(password);
    }
}

export default new RedisHelper()
