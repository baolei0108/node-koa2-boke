const Koa = require('koa')
const app = new Koa()
const config = require('./config/default.js')
 
const Router = require('koa-router')
const router = new Router()
const views = require('koa-views')
const path = require('path')

const bodyParser = require('koa-bodyparser')

const session = require('koa-session');
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
app.use(require('./routers/create.js').routes())  // 发表文章界面


//使用 koa-session
app.keys = ["hello world"];
const CONFIGG = {
    key: 'koa:sess', /** (string) cookie key (default is koa:sess) */
    /** (number || 'session') maxAge in ms (default is 1 days) */
    /** 'session' will result in a cookie that expires when session/browser is closed */
    /** Warning: If a session cookie is stolen, this cookie will never expire */
    maxAge: 86400000,
    overwrite: true, /** (boolean) can overwrite or not (default true) */
    httpOnly: true, /** (boolean) httpOnly or not (default true) */
    signed: true, /** (boolean) signed or not (default true) */
    rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
    renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
};

app.use(session(CONFIGG, app));
// or if you prefer all default config, just use => app.use(session(app));


app.listen(config.port)

console.log(config.test.caijingnenws)

console.log(`listen on http://localhost ${config.port}` )