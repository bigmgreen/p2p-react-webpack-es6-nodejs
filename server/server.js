/**
 * 加载服务程序
 */
var express = require('express'),
    app = express();

/**
 * 加载解析参数中间件并挂载
 */
app.bodyParser = require('body-parser').urlencoded({ extended: true });

/**
 * 代理静态目录
 */
app.use('/', express.static('client'));


/**
 *加载模块路由
 */
var aboutUs = require('./router/about-us'),
    account = require('./router/account'),
    borrow = require('./router/borrow'),
    index = require('./router/index'),
    investDetail = require('./router/invest-detail'),
    list = require('./router/list'),
    other = require('./router/other'),
    global = require('./router/global'),
    user = require('./router/user');

/**
 *启用各个模块
 */
aboutUs(app);
account(app);
borrow(app);
index(app);
investDetail(app);
list(app);
other(app);
global(app);
user(app);

/**
 * 监听服务
 */
app.listen(3000);
console.log('mock-server running!!');