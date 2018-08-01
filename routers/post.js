const Router = require('koa-router')
const router = new Router()
const userMoudle = require('../lib/mysql')
const sha1 = require('sha1')

router.get('/post', async(ctx, next) => {
    //ctx.body = 'post...'
    await ctx.render('post', {
        
    })

})


router.post('/post', async(ctx, next) => {
    
    console.log(ctx.request.body)
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
          console.log(res[0])
          console.log(res[0].pass)

          if(pass == res[0].pass){
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