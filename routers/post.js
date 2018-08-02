const Router = require('koa-router')
const router = new Router()
const userMoudle = require('../lib/mysql')
const sha1 = require('sha1')

const session = require('koa-session');

router.get('/post', async(ctx, next) => {
    var name = ctx.cookies.get('name')

    //读取数据库数据
    await ctx.render('post', {
        name: name
        
    })

})


router.post('/post', async(ctx, next) => { 
    
    
    //console.log('设置值')
    ctx.session.name = 'wangqiang'

    var name = ctx.request.body.signin_name
    var pass = ctx.request.body.signin_pass


    //验证输入信息是否正确
    try {
        if(name == '') {
            console.log('姓名为空')
            throw new Error('姓名不能为空')
        }
        if(pass == '') {
            console.log('密码为空')
            throw new Error('密码不能为空')
        }

    } catch(e) {
        console.log('e1111')
        return ctx.redirect('/signin')  //验证不成功，则跳转到重新登陆页面
    }



    //信息都不为空后，连接数据库验证姓名和密码是否一致
     await userMoudle.findDataByName(name)  //await 等待异步程序执行完成以后 再往下执行
      .then(function(res) {
          //console.log(res[0])
         // console.log(res[0].pass)
        
          //将登录填写的密码也进行加密 再和数据库的值进行比较  数据库中存储的是加密之后的
          if(sha1(pass) == res[0].pass){
            //ctx.session.name = name;
            //console.log('ctx.session.name: ' + ctx.session.name)
            ctx.cookies.set('name',name)
            ctx.redirect('/post')
          }
          else{
            ctx.redirect('/signin')
          }
          
        
      })
      .catch(function(e) {

        console.log(e)
        return ctx.redirect('/index')

        next(e)
    
      }) 

      console.log('1111')

    

})





module.exports = router