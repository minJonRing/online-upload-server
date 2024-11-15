const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const jwt = require('jsonwebtoken');
// 启动数据库
const statrDB = require('./models/index');
statrDB()

// 路由
const index = require('./routes/index')
const CompanyController = require("./controller/CompanyController")
const ProjectController = require("./controller/ProjectController")

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  map: { html: 'ejs' }
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})
// verify
app.use(async (ctx, next) => {
  await next()
  const { url, header } = ctx.request;
  if (!/login|uploadToConfigParam/g.test(url)) {
    const token = header['token'];
    if (!token) {
      ctx.body = {
        code: 400,
        message: '请登录!',
        data: {}
      }
    }
    jwt.verify(token, "user", (err, decoded) => {
      if (err) {
        ctx.body = {
          code: 400,
          message: '登录过期,请重新登录!',
          data: {}
        }
      }
    });
  }
})


// routes
app.use(index.routes(), index.allowedMethods())
app.use(CompanyController.routes(), CompanyController.allowedMethods())
app.use(ProjectController.routes(), ProjectController.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
