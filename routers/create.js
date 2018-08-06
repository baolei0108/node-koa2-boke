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


     


     //之后，将新文章写进数据库里面
     var name = ctx.cookies.get('name')
     var result = []


    



    //  //读取数据库数据
    //  await postMoudle.findPostByName(name)
    //  .then(function(res) {
    //     //console.log('res: '+ res[1].title)
    //     result = res
    //  })
    // .catch(function(e) {
    //      console.log(e)
    // })

    
    //  //输入信息都正确之后
    //  await ctx.render('post', {
    //      name: name,
    //      result: result
    //  })  //转到个人主页页面

     


    let post = {
        name: name,
        title: title,
        content: content
    }
    await postMoudle.insertPostinfo([post.name, post.title, post.content, '1', '1', '1', '1'])



    ctx.redirect("/post")

     


     





        






})






module.exports = router