const Koa = require('koa');
const session = require('koa-session');

const server = new Koa();

server.keys = ["hello world"];

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

server.use(session(CONFIGG, server));
// or if you prefer all default config, just use => app.use(session(app));

server.use((ctx, next) => {
  // ignore favicon
  //if (ctx.path === "/favicon.ico") return;
  console.log('1-' + ctx.session);
  let n = ctx.session.views || 0;
  ctx.session.views = ++n;
  var num = ctx.session.views
  console.log('1-' +  num)
  //ctx.body = n + " views";

  next()
});


server.use(ctx => {
  // ignore favicon
  //if (ctx.path === "/favicon.ico") return;
  console.log('2-' + ctx.session);
  let n = ctx.session.views2 || 0;
  ctx.session.views2 = ++n;
  var num = ctx.session.views2
  console.log('2-' + num)
  //ctx.body = n + " views";
});

server.listen(8080);