// // 用于创建网站服务器的模块
// const http = require('http');
// // 用于处理url地址
// const url = require('url');
// // app对象就是网站服务器对象
// const app = http.createServer();
// // 当客户端有请求来的时候
// app.on('request', (req, res) => {
//     // 获取请求方式
//     // req.method
//     // console.log(req.method);

//     // 获取请求地址
//     // req.url
//     // console.log(req.url);

//     // 获取请求报文信息
//     // req.headers
//     // console.log(req.headers['account']);

//     res.writeHead(200, {
//         'content-type': 'text/plain'
//     });

//     console.log(req.url);
//     // 1) 要解析的url地址
//     // 2) 将查询参数解析成对象形式
//     let { query, pathname } = url.parse(req.url, true);
//     console.log(query.name)
//     console.log(query.age)

//     if (pathname == '/index' || pathname == '/') {
//         res.end('<h2>欢迎来到首页</h2>');
//     } else if (pathname == '/list') {
//         res.end('welcome to listpage');
//     } else {
//         res.end('Page not found');
//     }

//     if (req.method == 'POST') {
//         res.end('post')
//     } else if (req.method == 'GET') {
//         res.end('get')
//     }

//     // res.end('<h2>hello user</h2>');
// });
// // 监听端口
// app.listen(3000);
// console.log('网站服务器启动成功');




// // 用于创建网站服务器的模块
// const http = require('http');
// // app对象就是网站服务器对象
// const app = http.createServer();
// // 处理请求参数模块
// const querystring = require('querystring');
// // 当客户端有请求来的时候
// app.on('request', (req, res) => {
//     // post参数是通过事件的方式接受的
//     // data 当请求参数传递的时候出发data事件
//     // end 当参数传递完成的时候出发end事件

//     let postParams = '';

//     req.on('data', params => {
//         postParams += params;
//     });

//     req.on('end', () => {
//         console.log(querystring.parse(postParams));
//     });

//     res.end('ok');

// });
// // 监听端口
// app.listen(3000);
// console.log('网站服务器启动成功');





////////////////////////////////////////////////////////////////////////


const express = require('express')
const app = express()
const bodyParser = require('body-parser')
// 处理静态资源
app.use(express.static('public'))
// 处理参数
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// 设置允许跨域访问该服务
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Headers', 'mytoken');
    next();
});



app.get('/async1', (req, res) => {
    res.send('hello1')
})
app.get('/async2', (req, res) => {
    if (req.query.info == 'hello') {
        res.send('world')
    } else {
        res.send('error')
    }
})

app.get('/adata', (req, res) => {
    res.send('Hello axios!')
})
app.get('/axios', (req, res) => {
    res.send('axios get 传递参数' + req.query.id)
})
app.get('/axios/:id', (req, res) => {
    res.send('axios get (Restful) 传递参数' + req.params.id)
})
app.delete('/axios', (req, res) => {
    res.send('axios get 传递参数' + req.query.id)
})


app.post('/login', (req, res) => {
    console.log("user acc : " + req.body.uname + "PWD IS " + req.body.pwd);
    if (req.body.uname === 'Alexander' && req.body.pwd === '123456789') {
        res.json({
            code: '200',
            msg: '用户登录成功。'
        });

    } else {
        res.json({
            code: '555',
            msg: '用户名或密码错误，请重新输入或找回密码。'
        });
    }
    //res.send('服务器成功接收关于用户名' + req.body.uname + '的' + req.body.pwd + '密码信息');
})
app.put('/axios/:id', (req, res) => {
    res.send('axios put 传递参数' + req.params.id + '---' + req.body.uname + '---' + req.body.pwd)
})

app.get('/axios-json', (req, res) => {
    res.json({
        uname: 'lisi',
        age: 12
    });
})


app.get('/fdata', (req, res) => {
    res.send('Hello Fetch!')
})
app.get('/books', (req, res) => {
    res.send('传统的URL传递参数!' + req.query.id)
})
app.get('/books/:id', (req, res) => {
    res.send('Restful形式的URL传递参数!' + req.params.id)
})
app.delete('/books/:id', (req, res) => {
    res.send('DELETE请求传递参数!' + req.params.id)
})
app.post('/books', (req, res) => {
    res.send('POST请求传递参数!' + req.body.uname + '---' + req.body.pwd)
})
app.put('/books/:id', (req, res) => {
    res.send('PUT请求传递参数!' + req.params.id + '---' + req.body.uname + '---' + req.body.pwd)
})

app.get('/json', (req, res) => {
    res.json({
        uname: 'lisi',
        age: 13,
        gender: 'male'
    });
})

app.get('/a1', (req, res) => {
    setTimeout(function () {
        res.send('Hello TOM!')
    }, 1000);
})
app.get('/a2', (req, res) => {
    setTimeout(function () {
        res.send('Hello JERRY!')
    }, 2000);
})
app.get('/a3', (req, res) => {
    setTimeout(function () {
        res.send('Hello SPIKE!')
    }, 3000);
})

// 路由
app.get('/data', (req, res) => {
    res.send('Hello World!')
})
app.get('/data1', (req, res) => {
    setTimeout(function () {
        res.send('Hello TOM!')
    }, 1000);
})
app.get('/data2', (req, res) => {
    res.send('Hello JERRY!')
})

// 启动监听
app.listen(3000, () => {
    console.log('running...')
})