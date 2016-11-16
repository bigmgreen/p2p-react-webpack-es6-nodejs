var captchapng = require('captchapng');
module.exports = function (app) {

    /*********************************     登录  start     ****************************************/
    app.post('/login', app.bodyParser, function (req, res) {
        if (req.body.name == 'admin' && req.body.password == '111111') {
            res.json({
                status: 1
            });
        } else {
            res.json({
                msg: '用户名或者密码错误'
            });
        }
    });
    /*********************************     登录  end     ****************************************/

    /*********************************     手机注册  start     ****************************************/

    //获取注册的验证码
    app.get('/register/captcha', function (req, res) {
        var p = new captchapng(80, 30, parseInt(Math.random() * 9000 + 1000)); // width,height,numeric captcha 
        p.color(0, 0, 0, 0);  // First color: background (red, green, blue, alpha) 
        p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha) 

        var img = p.getBase64();
        var imgbase64 = new Buffer(img, 'base64');
        res.writeHead(200, {
            'Content-Type': 'image/png'
        });
        res.end(imgbase64);
    });

    //验证码用户名是否存在
    app.post('/register/existsNickName', app.bodyParser, function (req, res) {
        if (req.body.nickName == 'admin') {
            res.send(false);
        } else {
            res.send(true);
        }
    });

    //验证码校验
    app.post('/register/checkCaptcha', app.bodyParser, function (req, res) {
        if (req.body.jcaptcha == '2233') {
            res.send(true);
        } else {
            res.send(false);
        }
    });


    //发送手机验证码 1表示成功 0表示失败
    app.post('/register/getPhoneCode', app.bodyParser, function (req, res) {
        res.send(1);
    });

    //验证码手机号是否存在
    app.post('/register/checkPhone', app.bodyParser, function (req, res) {
        if (req.body.mobile == '18381012869') {
            res.send(true);
        } else {
            res.send(false);
        }
    });

    //验证码手机短信
    app.post('/register/checkCodeByPhone', app.bodyParser, function (req, res) {
        if (req.body.mobile == '18381012869' && req.body.verifyCode == '2233') {
            res.send(true);
        } else {
            res.send(false);
        }
    });

    // 手机注册
    app.post('/phoneRegister', app.bodyParser, function (req, res) {
        if (req.body) {
            res.json({
                status: 1
            });
        } else {
            res.json({
                msg: '注册失败，请稍后重试'
            });
        }
    });
    /*********************************     手机注册  end     ****************************************/


    /*********************************     邮箱注册  start     ****************************************/
    //验证码邮箱是否存在
    app.post('/register/checkEmail', app.bodyParser, function (req, res) {
        if (req.body.email == 'bigmgreen@163.com') {
            res.send(true);
        } else {
            res.send(false);
        }
    });

    //发送邮箱验证码 1表示成功 0表示失败
    app.post('/register/getEmailCode', app.bodyParser, function (req, res) {
        res.send(1);
    });

    //验证码邮箱验证码
    app.post('/register/checkCodeByMail', app.bodyParser, function (req, res) {
        if (req.body.email == 'bigmgreen@163.com' && req.body.verifyCodeEmail == '2233') {
            res.send(true);
        } else {
            res.send(false);
        }
    });
    // 邮箱注册
    app.post('/emailRegister', app.bodyParser, function (req, res) {
        if (req.body) {
            res.json({
                status: 1
            });
        } else {
            res.json({
                msg: '注册失败，请稍后重试'
            });
        }
    });
    /*********************************     邮箱注册  end     ****************************************/

    /*********************************     手机找回密码  start     ****************************************/

    //获取手机找回密码的验证码
    app.get('/findPwd/phoneCaptcha', function (req, res) {
        var p = new captchapng(80, 30, parseInt(Math.random() * 9000 + 1000)); // width,height,numeric captcha 
        p.color(0, 0, 0, 0);  // First color: background (red, green, blue, alpha) 
        p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha) 

        var img = p.getBase64();
        var imgbase64 = new Buffer(img, 'base64');
        res.writeHead(200, {
            'Content-Type': 'image/png'
        });
        res.end(imgbase64);
    });

    //手机找回密码验证手机号 
    app.post('/password/isRightPhone', app.bodyParser, function (req, res) {
        if (req.body.phone == '18381012869') {
            res.send(true);
        } else {
            res.send(false);
        }
    });

    //手机找回密码验证图片验证码
    app.post('/password/jcaptchaPhone', app.bodyParser, function (req, res) {
        if (req.body.jcaptchaPhone == '2233') {
            res.send(true);
        } else {
            res.send(false);
        }
    });

    //手机找回密码第一步提交 
    app.post('/password/sendVilidateCodeByPhone', app.bodyParser, function (req, res) {
        res.json({
            mobile: '18381012869'
        });
    });

    //手机找回密码短信验证码
    app.post('/password/codeByPhone', app.bodyParser, function (req, res) {
        if (req.body.codeByPhone == '2233') {
            res.send(true);
        } else {
            res.send(false);
        }
    });

    //手机找回密码第二步提交 
    app.post('/password/findByValidCodePhone', app.bodyParser, function (req, res) {
        if (req.body.codeByPhone == '2233') {
            res.send(true);
        } else {
            res.send(false);
        }
    });

    /*********************************     手机找回密码  end     ***********************************/


    /*********************************     邮箱找回密码  start     ***********************************/

    //获取邮箱找回密码的图片验证码
    app.get('/findPwd/emailCaptcha', function (req, res) {
        var p = new captchapng(80, 30, parseInt(Math.random() * 9000 + 1000)); // width,height,numeric captcha 
        p.color(0, 0, 0, 0);  // First color: background (red, green, blue, alpha) 
        p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha) 

        var img = p.getBase64();
        var imgbase64 = new Buffer(img, 'base64');
        res.writeHead(200, {
            'Content-Type': 'image/png'
        });
        res.end(imgbase64);
    });

    //邮箱找回密码验证邮箱 
    app.post('/password/isRightEmail', app.bodyParser, function (req, res) {
        if (req.body.email == 'bigmgreen@163.com') {
            res.send(true);
        } else {
            res.send(false);
        }
    });

    //邮箱找回密码验证图片验证码
    app.post('/password/jcaptchaEmail', app.bodyParser, function (req, res) {
        if (req.body.jcaptchaEmail == '2233') {
            res.send(true);
        } else {
            res.send(false);
        }
    });

    //邮箱找回密码第一步提交 
    app.post('/password/sendVilidateCodeByEmail', app.bodyParser, function (req, res) {
        res.json({
            email: 'bigmgreen@163.com'
        });
    });

    //邮箱找回密码邮件验证码
    app.post('/password/codeByEmail', app.bodyParser, function (req, res) {
        if (req.body.codeByEmail == '2233') {
            res.send(true);
        } else {
            res.send(false);
        }
    });

    //邮箱找回密码第二步提交 
    app.post('/password/findByValidCode', app.bodyParser, function (req, res) {
        if (req.body.codeByEmail == '2233') {
            res.send(true);
        } else {
            res.send(false);
        }
    });

    /*********************************     邮箱找回密码  end     ***********************************/

    /*********************************     重置密码  start     ***********************************/

    //重置密码
    app.post('/password/resetPwd', app.bodyParser, function (req, res) {
        if (req.body) {
            console.log(req.body)
            res.send(true);
        } else {
            res.send(false);
        }
    });

    /*********************************     重置密码  end     ***********************************/

}
