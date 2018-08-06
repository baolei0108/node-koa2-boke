const mysql = require('mysql')
const config = require('../config/default')

// const connection = mysql.createConnection(config.database)

// connection.connect()

// // 执行sql脚本对数据库进行读写 
// connection.query('SELECT * FROM user',  (error, results, fields) => {
//   if (error) throw error
//   else {
//       console.log(results)
//       console.log(results[0])
//   }

//   // 结束会话
//   connection.end() 
// });


var pool  = mysql.createPool({
  host     : config.database.host,
  user     : config.database.user,
  password : config.database.password,
  database : config.database.database
});


//统一接口
let query = function(sql, values) {

  return new Promise( (resolve,reject)=> {

    pool.getConnection(function(err,connection) {
      if(err) {
        reject(err)
      } else {
        connection.query(sql, values, (err,rows)=> {
          if(err) {
            reject(err)
          } else {
            resolve(rows)
          }

          connection.release() //用于连接池
        })
      }
    })

  })

}


let users =
    `create table if not exists users(
     id INT NOT NULL AUTO_INCREMENT,
     name VARCHAR(100) NOT NULL,
     pass VARCHAR(100) NOT NULL,
     avator VARCHAR(100) NOT NULL,
     moment VARCHAR(100) NOT NULL,
     PRIMARY KEY ( id )
    );`



let posts =
    `create table if not exists posts(
     id INT NOT NULL AUTO_INCREMENT,
     name VARCHAR(100) NOT NULL,
     title TEXT(0) NOT NULL,
     content TEXT(0) NOT NULL,
     md TEXT(0) NOT NULL,
     uid VARCHAR(40) NOT NULL,
     moment VARCHAR(100) NOT NULL,
     comments VARCHAR(200) NOT NULL DEFAULT '0',
     pv VARCHAR(40) NOT NULL DEFAULT '0',
     avator VARCHAR(100) NOT NULL,
     PRIMARY KEY ( id )
    );`

// 建表
let createTable = function(sql) {
  return query(sql, [])
}


// 通过名字查找用户
let findDataByName = function (name) {
  let _sql = `select * from users where name="${name}";`
  return query( _sql)
}

//通过名字查找文章
let findPostByName = function(name) {
  let _sql = `select * from posts where name="${name}";`
  return query(_sql)
}


// 将用户信息插入数据库
let insertUserinfo = function(value) {
  //let _sql = `insert into users set name=?,pass=?,avator=?,moment=?;`
    let _sql = "insert into users set name=?,pass=?,avator=?,moment=?;"
  return query(_sql, value)
}


//将文章信息插入数据库
let insertPostinfo = function(value) {
  let _sql = "insert into posts set name=?,title=?,content=?,md=?,uid=?,moment=?,avator=?;"
  return query( _sql, value )
}



// 建表
createTable(users)
createTable(posts)

//insertUserinfo(['1','1','1','1'])

module.exports = {
  query,
  createTable,
  findDataByName,
  insertUserinfo,
  insertPostinfo,
  findPostByName,
}





