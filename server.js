const Koa = require('koa')
const app = new Koa()
const config = require('./config/default.js')
 
const Router = require('koa-router')
const router = new Router()
const views = require('koa-views')
const path = require('path')

const bodyParser = require('koa-bodyparser')


//处理静态文件，如css,img,js等
app.use(require('koa-static')(path.join(__dirname, './public'), {
   
}))



// 配置服务端模板渲染引擎中间件,渲染views文件夹下面的ejs文件,这段代码一定要放在最前面，避免报错
app.use(views(path.join(__dirname, './views'), {
    extension: 'ejs'
}))



//处理post需要解析body
app.use(bodyParser())



//引入路由
app.use(require('./routers/index.js').routes())
app.use(require('./routers/login.js').routes())  //注册路由
app.use(require('./routers/signin.js').routes())  // 登录路由
app.use(require('./routers/post.js').routes())  // 登录成功后界面 --路由




app.listen(config.port)

console.log(config.test.caijingnenws)

console.log(`listen on http://localhost ${config.port}` )