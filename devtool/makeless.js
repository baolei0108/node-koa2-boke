const less = require('less')
const fs = require('mz/fs')
const colors = require('colors')
const chokidar = require('chokidar')

async function makeLess(lesspath){
  if (!fs.existsSync(lesspath)) {
    return 'no less file'
  }

  var result;

  try {
    let css = await fs.readFile(lesspath, 'utf-8')
    let back = await less.render(css, {
      paths: ['./style/'],
      syncImport: false
    })
    result = back.css
    await fs.writeFile('./public/css/index.css', result, 'utf-8')
  } catch (error) {
    console.error(error);
    result = error.message
  }

  return result
}


var less_watcher = chokidar.watch('./style/*.less');
console.info('开始监听./style/*.less'.green);
less_watcher.on('change', lesspath => {

  makeLess('./style/main.less')
  .then(v=>{
    console.info(lesspath + ' 编译成功')
  })
  .catch(err=>{
    console.info(lesspath + ' 编译失败')
    console.error(err)
  })
})