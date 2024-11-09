const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: '测试地址!'
  })
})

router.get('/uploadToConfigParam', async (ctx, next) => {
  ctx.body = {
    code: 200,
    message: "请求成功!",
    data: {
      version: 'v1.1',
      build: '/upload/build/build.zip',
      renderer: '/upload/renderer/renderer.zip',
      dist: '/upload/static/dist.zip',
      views: '/upload/views/index.html'
    }
  }
})

module.exports = router
