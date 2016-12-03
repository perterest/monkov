import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';
import session from 'koa-session';
import views from 'koa-views';
import convert from 'koa-convert';
import serve from 'koa-static';
import finalHandler from './lib/middlewares/finalHandler';
import router from './router';
import mongoose from 'mongoose'

import config from './config'

const app = new Koa()
mongoose.Promise = global.Promise
mongoose.connect(config.mongoConfig.url, config.mongoConfig.opts)
app.keys = ['some secret hurr']
app.context.config = config
app
// .use(finalHandler())
  .use(logger())
  .use(bodyParser())
  .use(convert(session(app)))
  .use(serve(__dirname + '/public'))
  .use(router.routes())
  .use(router.allowedMethods())

export default app

// import Post from './models/post.js'
// import utils from './utils'
// const post = new Post({
//   title: 'test',
//   content: 'hahaha',
//   excerpt: 'excerpt',
//   visit: 0,
//   createTime: new Date(),
//   lastEditTime: new Date(),
//   comments: []
// })
// const result = post
//   .save()
//   .catch(err => {
//     utils
//       .logger
//       .error(err)
//     console.log(err)
//     app
//       .context
//       .throw(500, 'internal error')
//   });