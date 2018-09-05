const catchweb = require('../catchweb')
const axios = require('axios')
const config = require('../../config/default')

module.exports = async function(id) {

    var result = [];
    //获取到的原始数据
    result = await catchweb.catchWithCacheFile(config.getURL('caijingnenws'), {
        params: {
            channelIDs: id,
            hours: 24,
            count: 10,
            source: 'news'
        }
    }, 30*1000, 5000);

    
    //console.log(result);
    //处理过后的数据
    console.log('result: '+ result);
    var arr =[];
    var res='';
    //防止接口挂掉
    if(result == null){
        res='';
    }
    else{
        res = result.Data[0]
    }
    
    if(res == ''){
        arr = []
    } else {
        res.forEach(function(value,key) {
            //console.log(value + ',' + i)  //value是指数组里面的元素---每一个对象
            arr.push({
                title: value.Art_Title,
                url:value.Art_Url
            })

        });

    }

    //console.log(arr)

    return arr;

}