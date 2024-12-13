const router = require('koa-router')()
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const CryptoJS = require('crypto-js');
const { upload } = require('./upload');

const { username: u, password: p, username } = require('../public/db/user')
// 'admin123456$'

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: '测试地址!'
  })
})

router.get('/admin', async (ctx, next) => {
  await ctx.render('index', {
    title: '测试地址!'
  })
})
// 登录
router.post('/login', async (ctx, next) => {
  await next()
  const { username, password } = ctx.request.body;
  // 解密明文密码
  const bytes = CryptoJS.AES.decrypt(password, 'login');
  const cryptoPassword = bytes.toString(CryptoJS.enc.Utf8);
  // 验证密码
  const isPasswordValid = await bcrypt.compare(cryptoPassword, p);
  if (!isPasswordValid || username != u) {
    ctx.body = {
      code: 400,
      message: '账号密码错误!'
    }
    return
  }
  // 生成 JWT
  const token = jwt.sign({ username: u }, 'user', { expiresIn: '12h' });
  ctx.body = {
    code: 200,
    message: '登录成功',
    data: {
      token
    }
  }
});
// 获取用户信息
router.get('/userinfo', async (ctx, next) => {
  await next()
  ctx.body = {
    code: 200,
    message: '用户信息获取成功',
    data: {
      nickName: '管理员'
    }
  }
})

// 获取版本信息
router.get('/uploadToConfigParam', async (ctx, next) => {
  ctx.body = {
    code: 200,
    message: "请求成功!",
    data: {
      version: 'v1.1',
      build: '/upload/build/build.zip',
      renderer: '/upload/renderer/renderer.zip',
      dist: '/upload/static/static.zip',
      views: '/upload/views/index.zip'
    }
  }
})

// 文件上传
router.post('/upload/image', upload())
router.post('/upload/video', upload('video'))
router.post('/upload/electron/build', upload('build'))
router.post('/upload/electron/renderer', upload('renderer'))
router.post('/upload/electron/static', upload('static'))
router.post('/upload/electron/views', upload('views'))


module.exports = router
