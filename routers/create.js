const Router = require('koa-router')
const router = new Router()
const postMoudle = require('../lib/mysql')
const sha1 = require('sha1')

const session = require('koa-session');

router.get('/create', async(ctx, next) => {
    //ctx.body = 'login'
    
    await ctx.render('create', {
        
        
    })

})



router.post('/create', async(ctx, next) => {
     //ctx.body = 'create 成功'

     var title = ctx.request.body.title;
     var content = ctx.request.body.content;

     //console.log(title)
     //console.log(content)


     //验证输入信息是否正确
     try {
        if(title == '') {
            console.log('空')
            throw new Error('姓名不能为空')
        }
        if(content == '') {
            console.log('空')
            throw new Error('内容不能为空')
        }

     } catch(e) {
        //console.log(e)
        return ctx.redirect('/create')  //验证不成功，则跳转到重新注册页面
     }


     //输入信息都正确之后
     await ctx.render('post')  //转到个人主页页面


     //之后，将新文章写进数据库里面
     var name = ctx.cookies.get('name')
     console.log('create-cooie-get: '+ name)
     //console.log('ctx.session:' + ctx.session)
     //console.log('ctx.session.name222=' + ctx.session.name)
     let post = {
         name: name,
         title: title,
         content: content
     }


     postMoudle.insertPostinfo([post.name, post.title, post.content, '1', '1', '1', '1'])


     





        






})






module.exports = router