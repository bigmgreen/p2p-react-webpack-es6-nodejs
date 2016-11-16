module.exports = function(app) {

    // 获取网站基本信息
    app.get('/webInfo', function(req, res) {
        res.json({
            websiteTitle: '中科柏诚',
            websiteDomain: '127.0.0.1',
            websiteNameCn: '中科柏诚'
        });
    });

    // 获取用户账户信息
    app.get('/account/query', app.bodyParser, function(req, res) {
        console.log(req.body)
        res.json({
            cash: 100000
        });
    });

    //获取用户信息 检查用户是否在线 null表示离线
    app.get('/getUser', function(req, res) {
        res.json({
            userId: 75000,
            nickName: 'zxover',
            messages: 0,
            roles: 0
        });
    });

    //退出登录
    app.get('/logout', function(req, res) {
        res.json({
            logout: 0
        });
    });
}