const Router = require('koa-router')
const router = new Router()
const userMoudle = require('../lib/mysql')
const sha1 = require('sha1')

router.get('/login', async(ctx, next) => {
    //ctx.body = 'login'
    await ctx.render('login', {
        session: ctx.session,
    })

})


router.post('/login', async(ctx, next) => {
    //await ctx.render('<h1>yes</h1>')
    
    //console.log(ctx.request.body)
    var name = ctx.request.body.name;
    var pas= ctx.request.body.password
    var repas = ctx.request.body.repeatpass
    var avator = ctx.request.body.avator


    //验证输入信息是否正确
    try {
        if(name == '') {
            console.log('空')
            throw new Error('姓名不能为空')
        }
        if(pas !== repas) {
            console.log('不一样')
            throw new Error('两次密码不一样')
        }

    } catch(e) {
        //console.log(e)
        return ctx.redirect('/login')  //验证不成功，则跳转到重新注册页面
    }


    
    //输入信息都正确之后
    //ctx.body = `<h1>login之后的页面</h1>`
    await ctx.render('signin')  //转到登录页面




    //查看数据库是否有同样的数据，若没有，则写入数据库
    pas = sha1(pas)  //将密码进行加密处理
    let user = {
        name: name,
        pas: pas,
        repas: repas,
        avator: avator
    }

    await userMoudle.findDataByName(user.name)
      .then(function(result) {
          console.log('reslust: ' + result)

          if(result.length) {
              console.log('1')
          }
          else {
              console.log('0')
              userMoudle.insertUserinfo([user.name, user.pas,'12','12'])
          }

      })




    //userMoudle.insertUserinfo([name,pas,'12','12'])


    
})


module.exports = router