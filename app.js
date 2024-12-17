require('dotenv').config();

const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const cors = require('koa2-cors');
const logger = require('koa-logger')
const jwt = require('jsonwebtoken');
// 启动数据库
const statrDB = require('./models/index');
statrDB()


// 路由
const index = require('./routes/index')
const CompanyController = require("./controller/CompanyController")
const ProjectController = require("./controller/ProjectController")
const SoftwareController = require("./controller/SoftwareController")
const ArtController = require("./controller/ArtController")
const ProgramController = require("./controller/ProgramController")

// error handler
onerror(app)

app.use(cors({
  origin: (ctx) => {
    // 允许的来源，动态设置
    // if (ctx.request.header.origin === 'http://example.com') {
    //     return 'http://example.com'; // 允许指定的域名
    // }
    return '*'; // 默认允许所有
  },
  credentials: true, // 是否允许携带 Cookie
  allowMethods: ['GET'], // 允许的方法
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'], // 允许的请求头
}));
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
  if (!/login|client|admin|uploadToConfigParam|projectToSign/g.test(url) && url !== '/') {
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
console.log(process.env.OSS_ACCESS_KEY_ID)


// routes
app.use(index.routes(), index.allowedMethods())
app.use(CompanyController.routes(), CompanyController.allowedMethods())
app.use(ProjectController.routes(), ProjectController.allowedMethods())
app.use(SoftwareController.routes(), SoftwareController.allowedMethods())
app.use(ArtController.routes(), ArtController.allowedMethods())
app.use(ProgramController.routes(), ProgramController.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
