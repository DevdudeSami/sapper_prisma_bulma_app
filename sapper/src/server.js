import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import session from 'express-session';
import * as sapper from '@sapper/server';
import redisStore from 'connect-redis'
import redis from 'redis'
import { json } from 'body-parser'
import Minio from 'minio'

process.on("SIGINT", function () {
	console.log("CLOSING [SIGINT]");
	process.exit();
});
process.on("SIGTERM", function () {
	console.log("CLOSING [SIGTERM]");
	process.exit();
});

const minioClient = new Minio.Client({
	endPoint: 'minio',
	port: 9000,
	useSSL: false,
	accessKey: process.env.MINIO_ACCESS_KEY,
	secretKey: process.env.MINIO_SECRET_KEY
})

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

const RedisStore = redisStore(session)
const redisClient = redis.createClient({
	host: 'redis',
	port: 6379,
	retry_strategy: (options) => {
		if (options.error && options.error.code === "ECONNREFUSED") {
			return new Error("The redis server refused the connection");
		}
		if (options.total_retry_time > 1000 * 60 * 60) {
			return new Error("Redis retry time exhausted");
		}
	
		return Math.min(options.attempt * 100, 3000);
	}
})
redisClient.on("ready", function () {
	console.log("Connected to redis")
})
redisClient.on("reconnecting", function () {
	console.log("Trying to reconnect to redis")
})
redisClient.on("error", function (err) {
	console.log("Redis error recieved : " + err)
})

polka()
	.use(json())
	.use(session({
		secret: 'SESSION_SECRET',
		resave: false,
		saveUninitialized: true,
		cookie: {
			maxAge: 31536000
		},
		store: new RedisStore({ client: redisClient })
	}))
	.use(
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		sapper.middleware({
			session: (req, res) => ({
				user: req.session.user? req.session.user.user : null
			})
		})
	)
	.listen(PORT, err => {
		if (err) console.log('error', err);
	});
