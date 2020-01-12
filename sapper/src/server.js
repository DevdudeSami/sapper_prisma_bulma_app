import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import session from 'express-session';
import * as sapper from '@sapper/server';
import redisStore from 'connect-redis'
import redis from 'redis'
import { json } from 'body-parser'

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

const RedisStore = redisStore(session)

polka()
	.use(json())
	.use(session({
		secret: 'SESSION_SECRET',
		resave: false,
		saveUninitialized: true,
		cookie: {
			maxAge: 31536000
		},
		store: new RedisStore({host: 'redis', port: 6379, client: redis.createClient()})
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
