var captchapng = require('captchapng');
module.exports = function(app) {


    /**     检查手机或邮箱认证        */
    app.post('/borrow/personal/ajaxFindEmailOrPhone.action', app.bodyParser, function(req, res) {
        res.json({
            EandM: true
        });
    });

    /**     检查是否开户        */
    app.get('/payAccountReady', app.bodyParser, function(req, res) {
        res.send(true);
    });

    /**     检查是否完成基本信息        */
    app.post('/borrow/personal/ajaxCheckFullInfo.action', app.bodyParser, function(req, res) {
        res.json({
            FullInfo: true
        });
    });

    /**     检查是否被加入黑名单        */
    app.post('/borrow/isBlackName', app.bodyParser, function(req, res) {
        res.send(true);
    });

    /*  个人借款列表  */
    app.post('/borrow/person', function(req, res) {
        res.json({
            loanProducts: [{
                    id: "1223", //借款产品id
                    productstype: "发射点法", //借款名称
                    loanmoneymin: "100000", //资金范围
                    loanmoneymax: "1000000000",
                    beginratescope: "6.70", //年利率范围
                    endratescope: "9.80",
                    begintermscope: "6", //借款期限范围
                    endtermscope: "12",
                    termtype: 1, //借款期限单位
                    repaytype: 2, //还款方式
                    features: "1122我打算", //产品特点
                    conditions: "1122我打算", //申请条件
                    materials: "1122我打算", //必要申请资料
                },
                {
                    id: "1223", //借款产品id
                    productstype: "发射点法", //借款名称
                    loanmoneymin: "100000", //资金范围
                    loanmoneymax: "1000000000",
                    beginratescope: "6.70", //年利率范围
                    endratescope: "9.80",
                    begintermscope: "6", //借款期限范围
                    endtermscope: "12",
                    termtype: 1, //借款期限单位
                    repaytype: 2, //还款方式
                    features: "1122我打算", //产品特点
                    conditions: "1122我打算", //申请条件
                    materials: "1122我打算", //必要申请资料
                },
                {
                    id: "1223", //借款产品id
                    productstype: "发射点法", //借款名称
                    loanmoneymin: "100000", //资金范围
                    loanmoneymax: "1000000000",
                    beginratescope: "6.70", //年利率范围
                    endratescope: "9.80",
                    begintermscope: "6", //借款期限范围
                    endtermscope: "12",
                    termtype: 1, //借款期限单位
                    repaytype: 2, //还款方式
                    features: "1122我打算", //产品特点
                    conditions: "1122我打算", //申请条件
                    materials: "1122我打算", //必要申请资料
                },
                {
                    id: "1223", //借款产品id
                    productstype: "发射点法", //借款名称
                    loanmoneymin: "100000", //资金范围
                    loanmoneymax: "1000000000",
                    beginratescope: "6.70", //年利率范围
                    endratescope: "9.80",
                    begintermscope: "6", //借款期限范围
                    endtermscope: "12",
                    termtype: 1, //借款期限单位
                    repaytype: 2, //还款方式
                    features: "1122我打算", //产品特点
                    conditions: "1122我打算", //申请条件
                    materials: "1122我打算", //必要申请资料
                }
            ]
        })
    });

    /*  个人借款申请页面  */
    app.get('/borrow/personApply', function(req, res) {
        res.json({
            loanProducts: {
                id: "1223", //借款产品id
                productstype: "发射点法", //借款名称
                loanmoneymin: "100000.00", //资金范围
                loanmoneymax: "1000000000.00",
                beginratescope: "6.70", //年利率范围
                endratescope: "9.80",
                begintermscope: "6", //借款期限范围
                endtermscope: "12",
                termtype: 1, //借款期限单位
                repaytype: 2, //还款方式
                features: "1122我打算", //产品特点
                conditions: "1122我打算", //申请条件
                materials: "1122我打算", //必要申请资料
            },
            loanuse: [{
                    id: "1662", //借款用途id
                    name: "短期周转测" //借款用途名称
                },
                {
                    id: "1667", //借款用途id
                    name: "购房借款" //借款用途名称
                }
            ]
        })
    });

    /*   个人借款申请操作    */
    app.post('/borrow/personal/addLoanInfo', app.bodyParser, function(req, res) {
        if (req.body) {
            res.json({
                status: 1
            });
        } else {
            res.json({
                msg: '申请失败，请稍后重试'
            });
        }
    });

    /*  企业借款产品列表    */
    app.post('/borrow/enterprise', function(req, res) {
        res.json({
            loanProducts: [{
                    id: "1223", //借款产品id
                    productstype: "发射点法", //借款名称
                    loanmoneymin: "100000", //资金范围
                    loanmoneymax: "1000000000",
                    beginratescope: "6.70", //年利率范围
                    endratescope: "9.80",
                    begintermscope: "6", //借款期限范围
                    endtermscope: "12",
                    termtype: 1, //借款期限单位
                    repaytype: 2, //还款方式
                    features: "1122我打算", //产品特点
                    conditions: "1122我打算", //申请条件
                    materials: "1122我打算", //必要申请资料
                },
                {
                    id: "1223", //借款产品id
                    productstype: "发射点法", //借款名称
                    loanmoneymin: "100000", //资金范围
                    loanmoneymax: "1000000000",
                    beginratescope: "6.70", //年利率范围
                    endratescope: "9.80",
                    begintermscope: "6", //借款期限范围
                    endtermscope: "12",
                    termtype: 1, //借款期限单位
                    repaytype: 2, //还款方式
                    features: "1122我打算", //产品特点
                    conditions: "1122我打算", //申请条件
                    materials: "1122我打算", //必要申请资料
                },
                {
                    id: "1223", //借款产品id
                    productstype: "发射点法", //借款名称
                    loanmoneymin: "100000", //资金范围
                    loanmoneymax: "1000000000",
                    beginratescope: "6.70", //年利率范围
                    endratescope: "9.80",
                    begintermscope: "6", //借款期限范围
                    endtermscope: "12",
                    termtype: 1, //借款期限单位
                    repaytype: 2, //还款方式
                    features: "1122我打算", //产品特点
                    conditions: "1122我打算", //申请条件
                    materials: "1122我打算", //必要申请资料
                },
                {
                    id: "1223", //借款产品id
                    productstype: "发射点法", //借款名称
                    loanmoneymin: "100000", //资金范围
                    loanmoneymax: "1000000000",
                    beginratescope: "6.70", //年利率范围
                    endratescope: "9.80",
                    begintermscope: "6", //借款期限范围
                    endtermscope: "12",
                    termtype: 1, //借款期限单位
                    repaytype: 2, //还款方式
                    features: "1122我打算", //产品特点
                    conditions: "1122我打算", //申请条件
                    materials: "1122我打算", //必要申请资料
                }
            ]
        })
    });

    /*  企业借款申请页面 */
    app.get('/borrow/enterpriseApply', app.bodyParser, function(req, res) {
        res.json({
            loanProducts: {
                id: "122367", //借款产品id
                loanProductStype: "发射点法", //借款名称
                loanmoneymin: "100000", //资金范围
                loanmoneymax: "1000000000",
                beginratescope: "6.70", //年利率范围
                endratescope: "9.80",
                begintermscope: "6", //借款期限范围
                endtermscope: "12",
                termtype: '1', //借款期限单位
                loanProductTermtype: "3",
            },
            financeApply: {
                companyName: "中科柏诚",
                registerName: "中科柏诚",
                name: "中科柏诚",
                cardNo: "1000000000",
                phone: "18333333333",
                city: "北京",
                amount: "6000",
                interestRate: "12",
                period: '1',
                loanUse: "3",
                repaySource: '达到'
            }
        })
    });

    /*   企业借款申请操作    */
    app.post('/borrow/enterprise/addLoanInfo', app.bodyParser, function(req, res) {
        if (req.body) {
            res.json({
                status: 1
            });
        } else {
            res.json({
                msg: '申请失败，请稍后重试'
            });
        }
    })

    /*  获取注册的验证码  */
    app.get('/jcaptcha/applyBorrowJCaptcha', function(req, res) {
        var p = new captchapng(80, 30, parseInt(Math.random() * 9000 + 1000)); // width,height,numeric captcha 
        p.color(0, 0, 0, 0); // First color: background (red, green, blue, alpha) 
        p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha) 

        var img = p.getBase64();
        var imgbase64 = new Buffer(img, 'base64');
        res.writeHead(200, {
            'Content-Type': 'image/png'
        });
        res.end(imgbase64);
    });

    /*   验证码校验    */
    app.post('/borrow/checkCaptcha', app.bodyParser, function(req, res) {
        if (req.body.jcaptcha == '2233') {
            res.send(true);
        } else {
            res.send(false);
        }
    });
}