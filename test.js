//test.js

var add = require('./add.js')
var expect = require('chai').expect
var fetch = require('node-fetch')

describe('加法函数的测试 组合1', function() {

    //在本测试块的所有测试之前执行且仅执行一次
     before(function() {
         console.log('before')
     });

     //在本测试块的所有测试之后的执行且仅执行一次
     after(function() {
          console.log('after')
     });
     
     // 在测试块的每个测试用例之前执行（有几个测试用例it，就执行几次）
     beforeEach(function() {
         console.log('beforeEach')
     });

     // 在测试块的每个测试用例之后执行（同上）
     afterEach(function(){
         console.log('afterEach')
     });

     
     //测试用例
     it('1+1应该等于2', function() {
        expect(add(1, 1)).to.be.equal(2);
     });

     //测试用例
     it('1+ -1 应该等于0',function() {
        expect(add(1,-1)).to.be.equal(0);
     });

});



describe('测试组2', function() {
   
    //异步测试，回调参数必须有done,并且done必须调用
    it('1+ 1 shoule be 2', function(done) {
        setTimeout(function() {
            expect(add(1,2)).to.be.equal(3)
            done()
        },1000)

    });

    //同步测试
    it('1+ 0 shoule be 1', function() {
        expect(add(1,0)).to.be.equal(1);

    });

    //测试only,该test.js只运行only测试用例了
    // it.only('1+3 should 4', function() {
    //     expect(add(1,3)).to.be.equal(4)
    // });

});




describe('测试接口', function() {
    it('请求测试', function() {
        return fetch('http://61.129.128.56:8802/api/ClickRank/GetClickRank')
          .then(function(res) {
              return res.json();

          }).then(function(json) {
              expect(json).to.be.an('object')
             
          })
    })
});


