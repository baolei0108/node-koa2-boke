const axios = require('axios')
const cache = require('memory-cache')

var hash = require('object-hash')
const encryption = require('../encryption')

module.exports = {
    /**
         * 抓取网上内容并内存缓存和落地缓存
         *
         * @param {*} url 抓取地址
         * @param {*} axios axios选项 
         * @param {*} cache_time 缓存时间：毫秒
         * @param {*} timeout 远程获取超时时间：毫秒 不传或者null则没有超时时间
         * @returns
     */

    catchWithCacheFile: async function(url, options, cache_time, timeout) {

         //console.log('cache: '+ cache)
        
         let options_hash = ''
         if(options) {
            options_hash = hash(options)
         }

         let key = encryption.sha1(url + options_hash) //将key加密进行处理
         let cache_value = cache.get(key) //尝试获取内存缓存
         //console.log('cache_value: ' + cache_value)

         if(cache_value != null) {
             return cache_value
         }
        

         try {
            let back = await axios(url, options)
            let data = back.data
            cache.put(key, data, cache_time)

            return data

        } catch(error) {

        }


        return null;

    }



}