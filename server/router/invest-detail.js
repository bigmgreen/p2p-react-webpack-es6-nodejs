var captchapng = require('captchapng');
module.exports = function(app) {

    //跳转第三方
    app.get('/loan/bid', app.bodyParser, function(req, res) {
        res.redirect('http://www.baidu.com');
    });

    // 收藏
    app.post('/addClosely', app.bodyParser, function(req, res) {
        console.log(req.body);
        res.json({ status: 6 }); /* 收藏成功 */
        // res.json({ status: 2 });/* 该标已收藏 */
        // res.json({ status: 3 });/* 收藏失败 */
    });

    //获取投标的验证码
    app.get('/invest/captcha', function(req, res) {
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

    //验证投标的验证码
    app.post('/invest/checkVerifyCode', app.bodyParser, function(req, res) {
        if (req.body.captcha == 2233) {
            res.json({
                status: true
            });
        } else {
            res.json({
                status: false
            });
        }
    });

    //获取标详情的投资记录
    app.post('/investDetailList', app.bodyParser, function(req, res) {
        res.json({
            pageView: {
                pageCount: 2,
                currentPage: req.body.currentPage || 1
            },
            list: [{
                    // 投资人名称
                    investorNickname: '中科柏诚',
                    // 投资金额
                    investAmount: '100000000',
                    // 投资时间
                    investTime: '2016-08-02 21:23:35'
                }, {
                    // 投资人名称
                    investorNickname: '中科柏诚',
                    // 投资金额
                    investAmount: '100000000',
                    // 投资时间
                    investTime: '2016-08-02 21:23:35'
                }, {
                    // 投资人名称
                    investorNickname: '中科柏诚',
                    // 投资金额
                    investAmount: '100000000',
                    // 投资时间
                    investTime: '2016-08-02 21:23:35'
                }, {
                    // 投资人名称
                    investorNickname: '中科柏诚',
                    // 投资金额
                    investAmount: '100000000',
                    // 投资时间
                    investTime: '2016-08-02 21:23:35'
                }, {
                    // 投资人名称
                    investorNickname: '中科柏诚',
                    // 投资金额
                    investAmount: '100000000',
                    // 投资时间
                    investTime: '2016-08-02 21:23:35'
                }, {
                    // 投资人名称
                    investorNickname: '中科柏诚',
                    // 投资金额
                    investAmount: '100000000',
                    // 投资时间
                    investTime: '2016-08-02 21:23:35'
                }, {
                    // 投资人名称
                    investorNickname: '中科柏诚',
                    // 投资金额
                    investAmount: '100000000',
                    // 投资时间
                    investTime: '2016-08-02 21:23:35'
                }, {
                    // 投资人名称
                    investorNickname: '中科柏诚',
                    // 投资金额
                    investAmount: '100000000',
                    // 投资时间
                    investTime: '2016-08-02 21:23:35'
                }, {
                    // 投资人名称
                    investorNickname: '中科柏诚',
                    // 投资金额
                    investAmount: '100000000',
                    // 投资时间
                    investTime: '2016-08-02 21:23:35'
                }, {
                    // 投资人名称
                    investorNickname: '中科柏诚',
                    // 投资金额
                    investAmount: '100000000',
                    // 投资时间
                    investTime: '2016-08-02 21:23:35'
                }, {
                    // 投资人名称
                    investorNickname: '中科柏诚',
                    // 投资金额
                    investAmount: '100000000',
                    // 投资时间
                    investTime: '2016-08-02 21:23:35'
                }, {
                    // 投资人名称
                    investorNickname: '中科柏诚',
                    // 投资金额
                    investAmount: '100000000',
                    // 投资时间
                    investTime: '2016-08-02 21:23:35'
                }, {
                    // 投资人名称
                    investorNickname: '中科柏诚',
                    // 投资金额
                    investAmount: '100000000',
                    // 投资时间
                    investTime: '2016-08-02 21:23:35'
                }, {
                    // 投资人名称
                    investorNickname: '中科柏诚',
                    // 投资金额
                    investAmount: '100000000',
                    // 投资时间
                    investTime: '2016-08-02 21:23:35'
                }

            ]
        });
    });

    //个人标数据获取
    app.get('/personDetail', app.bodyParser, function(req, res) {
        res.json({
            /*****************   不显示的数据   *******************/
            //是否是新手标 1代表是   0代表不是
            loanClassify: 0,
            //是否是企业标  1是个人标   2是企业标
            loanType: 1,
            //用户是否有投资权限  true 有  false 没有
            hasRight: true,
            //标的id
            loanId: '750090',
            //用户id null表示未登录
            userId: 1,
            //用户类型 0是个人 3是企业
            role: 0,
            //用户是否注册第三方
            userCode: 1,
            //借款人id
            borrowerId: 10,
            //可投金额
            remaining: 50000,
            //红包是否可用
            redMoneyOpen: true,
            //是否体验标
            isExperience: true,
            //优惠方式
            preferentialWay: null,
            //投资次数
            investCount: 0,
            /*
             * 标的状态 
             * 300=立即投资 要区分个人和企业
             * 301和302=未开始
             * 400=已满标
             * 500=还款中
             * 600=已还款
             */
            status: '300',
            //已投金额
            biddingAmount: 20000,
            //起投金额
            beginAmount: 1000,
            //递增金额
            increaseAmount: 1000,

            /*****************   显示的数据   *******************/
            //标的标题
            title: '验证首页标的显示验证首页标的显示',
            //借款总额
            amount: 100000,
            //年化利率
            annualInterestRate: '10',
            //期限时间
            termCount: 10,
            //期限单位
            termUnit: 1,
            /*
             * 还款方式 
             * 1=按月付息，到期还本 
             * 2=一次性还本付息 
             * 3=等额本息
             */
            productId: 1,
            //开标时间(ms) 2016,9(js Date构造函数月份9等于10月，是从0开始),30,17,55,55
            openTime: 1477821355000,
            //结标时间(ms) 2016,11,30,17,55,55
            openEndTime: 1483091755000,
            //单笔最大投资限额
            limitMoney: 200000,
            //风控
            assureOrganization: {
                //担保公司名称
                organizationName: '中科柏诚',
                //注册资本
                createMoney: '1000.00',
                //所属城市
                belongCity: ' 北京',
                //注册时间
                registerTime: '2010-03-02',
                //担保简介
                organizationBrief: '中科柏诚-担保公司简介'
            },
            //投资进度
            progress: '50.00%',
            //可用优惠券
            abledRedMoneys: [{
                    amount: 100,
                    requirement: 3000,
                    id: 1,
                    way: 1
                },
                {
                    amount: 100,
                    requirement: 300,
                    id: 1,
                    way: 0
                }, {
                    amount: 100,
                    requirement: 300,
                    id: 1,
                    way: 1
                },
                {
                    amount: 100,
                    requirement: 300,
                    id: 1,
                    way: 2
                },
                {
                    amount: 100,
                    requirement: 300,
                    id: 1,
                    way: 2
                }
            ],


            /*****  借款信息 start  ****/

            //项目名称
            borrowName: '短期周转测',
            //信用等级
            creditDegree: 'AAA',
            //产品类型
            productstype: '装修',

            /*****  借款信息 end  ****/


            /*****  借款人信息 start  ****/
            //借款人姓名
            realName: '大青山',
            bpinfo: {
                //学历 0--10小学20初中30中专40高中50大专60本科70硕士80博士90其他
                topEducation: 50,
                //性别 true 男  false 女
                gender: true,
                //年龄
                age: 23,
                //婚姻状况   true 结婚  false 没有结婚
                hasMarried: true,
                //子女情况 true 有  false 没有
                hasChild: true,

                /* 籍贯  数字编号 start */
                //省
                homeTownProvince: 110000,
                //市
                homeTownCity: 110100,
                //县
                homeTownCounty: 110105,
                /* 籍贯 end */

                //毕业院校
                topEduSchool: '北京大学',

                /*   现居住地 数字编号 start   */
                //省
                residenceProvince: 110000,
                //市
                residenceCity: 110100,
                //县
                residenceCounty: 110101
                    /*   现居住地  end   */
            },

            /*****  借款人信息 end  ****/

            //工作情况
            bwinfo: {
                //公司性质 1机关事业单位2国营3民营4三资企业5其他
                officeType: '2',
                //进入公司时间
                officeJoinDate: '2016-05-23',
                //担任职务 1管理、技术、行政岗位2销售岗位3其他基层服务岗位
                position: '1',
                //公司规模 1.20人以下 2.20-99人 3.100-499人 4.500-999人 5.1000-9999人 6.10000人以上
                officeSize: '6',
            },

            /*  认证信息  start  */
            authentications: ['信用报告', '收入证明', '居住地址证明', '工作证明', '身份证'],
            /*  认证信息  end  */

            /*  基本信息  start   */

            //基本信息
            bfInfo: {
                //个人月收入
                monthlyIncome: '1000000',
                //住房种类 1无房2有房无贷款3有房有贷款
                housingType: 2,
                //房产面积
                housingArea: '170平方米',
                //有无汽车 true有 false没有
                hasCar: true,
                //汽车价值 0.-- 1.30万以上且有贷 2.30万以下且有贷 3.30万以上且无贷款 4.30万以下且无贷款
                carValue: 3,
                //有无证券 true有 false没有
                hasBond: true,
                //证券价值
                bondValue: 500000
            },

            //房产抵押图片信息
            houseInfo: [{
                materialType: '信用报告',
                imgUrl: '111',
                minImgUrl: '222'
            }, {
                materialType: '收入证明',
                imgUrl: '111',
                minImgUrl: '222'
            }, {
                materialType: '居住地址证明',
                imgUrl: '111',
                minImgUrl: '222'
            }, {
                materialType: '工作证明',
                imgUrl: '111',
                minImgUrl: '222'
            }, {
                materialType: '身份证',
                imgUrl: '111',
                minImgUrl: '222'
            }],

            //房产抵押图片信息
            riskManagementInfo: [{
                materialType: '信用风控',
                imgUrl: '111',
                minImgUrl: '222'
            }, {
                materialType: '收入风控',
                imgUrl: '111',
                minImgUrl: '222'
            }, {
                materialType: '居住地址风控',
                imgUrl: '111',
                minImgUrl: '222'
            }, {
                materialType: '工作风控',
                imgUrl: '111',
                minImgUrl: '222'
            }, {
                materialType: '身份证风控',
                imgUrl: '111',
                minImgUrl: '222'
            }]

            /*  基本信息  end   */
        });
    });

    //企业标数据获取
    app.get('/enterpriseDetail', app.bodyParser, function(req, res) {
        res.json({
            /*****************   不显示的数据   *******************/
            //是否是新手标 1代表是   0代表不是
            loanClassify: 0,
            //是否是企业标  1是个人标   2是企业标
            loanType: 2,
            //用户是否有投资权限  true 有  false 没有
            hasRight: true,
            //标的id
            loanId: '750010',
            //用户id null表示未登录
            userId: 1,
            //用户类型 0是个人 3是企业
            role: 0,
            //用户是否注册第三方
            userCode: 1,
            //借款人id
            borrowerId: 10,
            //可投金额
            remaining: 50000,
            //红包是否可用
            redMoneyOpen: true,
            //是否体验标
            isExperience: true,
            //优惠方式
            preferentialWay: null,
            //投资次数
            investCount: 0,
            /*
             * 标的状态 
             * 300=立即投资 要区分个人和企业
             * 301和302=未开始
             * 400=已满标
             * 500=还款中
             * 600=已还款
             */
            status: '300',
            //已投金额
            biddingAmount: 20000,
            //起投金额
            beginAmount: 1000,
            //递增金额
            increaseAmount: 1000,

            /*****************   显示的数据   *******************/
            //标的标题
            title: '验证首页标的显示验证首页标的显示',
            //借款总额
            amount: 100000,
            //年化利率
            annualInterestRate: '10',
            //期限时间
            termCount: 10,
            //期限单位
            termUnit: 1,
            /*
             * 还款方式 
             * 1=按月付息，到期还本 
             * 2=一次性还本付息 
             * 3=等额本息
             */
            productId: 1,
            //开标时间(ms) 2016,9(js Date构造函数月份9等于10月，是从0开始),30,17,55,55
            openTime: 1477821355000,
            //结标时间(ms) 2016,11,30,17,55,55
            openEndTime: 1483091755000,
            //单笔最大投资限额
            limitMoney: 200000,
            //风控
            assureOrganization: {
                //担保公司名称
                organizationName: '中科柏诚',
                //注册资本
                createMoney: '1000.00',
                //所属城市
                belongCity: ' 北京',
                //注册时间
                registerTime: '2010-03-02',
                //担保简介
                organizationBrief: '中科柏诚-担保公司简介'
            },
            //投资进度
            progress: '50.00%',
            //可用优惠券
            abledRedMoneys: [{
                    amount: 100,
                    requirement: 3000,
                    id: 1,
                    way: 1
                },
                {
                    amount: 100,
                    requirement: 300,
                    id: 1,
                    way: 0
                }, {
                    amount: 100,
                    requirement: 300,
                    id: 1,
                    way: 1
                },
                {
                    amount: 100,
                    requirement: 300,
                    id: 1,
                    way: 2
                },
                {
                    amount: 100,
                    requirement: 300,
                    id: 1,
                    way: 2
                }
            ],


            /*****  借款信息 start  ****/

            //项目名称
            borrowName: '短期周转测',
            //信用等级
            creditDegree: 'AAA',
            //产品类型
            productstype: '装修',

            /*****  借款信息 end  ****/

            /***********************  企业介绍  start  ******************************/
            productInfo: {
                //项目描述
                description: '投资宝是有中科柏诚推出的，对经过中科柏诚资产安全保障系统严格审核并提供全面保护的优质借款项目进行自动投资及定时自动转让的理财计划。用户授权定存宝进行分散投资和定时赎回，极大地提高了小额分散投资、回款及时复投和定时自动转让的效率，在满足用户的投资需求同时，提供了更好的投资体验。',
                //资金用途
                fundsUse: '加入投资宝的资金仅投资中科柏诚资产安全保障系统严格审核并提供多重权益保障措施*的优质借款项目。',
                //还款来源
                repaymentSource: '安阳彰德府置业有限公司开发的彰德府•威尼斯印象项目二期（步行街）的销售收入，以及丹尼斯和二期商铺的租金收益。'
            },
            /***********************  企业介绍  end  ******************************/


            /***********************  企业介绍  start  ******************************/
            enterpriseDesc: {
                //企业背景
                companyBackground: '中科柏诚科技（北京）股份有限公司是国内最为领先的互联网金融服务高新技术企业。公司核心团队是由资深金融人士、IT人士、互联网专业人士构成，骨干团队均具备丰富的海内外金融业、监管机构、国企、上市公司等从业背景。',
                //经营范围
                businessScope: '大数据征信管理平台，消费金融，供应链金融，融资租赁，金融超市，金融资产交易所',
                //经营状况
                businessState: '2015年1月23日下午，“第二届中国互联网金融高层论坛暨第八届中国电子金融年会”在北京召开。会上，中科柏诚科技（北京）有限公司荣获“2014年度中国互联网金融创新奖”。'
            },
            /***********************  企业介绍  end  ******************************/

            /***********************  担保详情  start  ******************************/
            guarantees: {
                //担保机构
                organizationName: '中科柏诚',
                //简介
                organizationBrief: '中科柏诚科技（北京）股份有限公司是国内最为领先的互联网金融服务高新技术企业。公司核心团队是由资深金融人士、IT人士、互联网专业人士构成，骨干团队均具备丰富的海内外金融业、监管机构、国企、上市公司等从业背景。自成立以来，中科柏诚先后获得国家高新技术企业认证、双软企业认证、ISO9001认证、中国金融行业信息化标杆企业奖、北京市信息网络创新30强；获得各类奖项、证书数十项；被各类主管机构、行业协会吸纳为会员单位；是北京市网贷行业协会发起会员并担任协会安全技术委员会主任委员，参与行业监管标准制定。中科柏诚主要以咨询、监管支撑、软件开发、软件实施、SAAS（云金融）服务、IT运维、信息服务等为核心能力，为互联网金融领域提供最优质的产品与服务，支持各类金融机构践行普惠金融理念，推动中国互联网金融高速稳健发展。',
                //担保意见
                assureOpinion: '我方提供的担保方式为连带责任保证。我方确认：当债务人不履行其债务时，无论债务人在借款协议项下的债务是否拥有其他担保（包括但不限于保证，抵押，质押等担保方式），你方均有权直接要求我方在保证范围内承担保证责任，我方放弃因存在其他担保方式而产生的任何抗辩权',
                //抵押物简介
                pawn: '安阳彰德府置业有限公司拥有100%产权的位于安阳市文峰中路中环的彰德府•威尼斯印象项目一期（彰德府购物中心）总建筑面积3.69万平方米，项目为地上三层，地下一层，其中地上一层面积7967.57平方米，二层面积8821.75平方米，一层面积8848.20平方米，地下一层11265.24平方米，评估总价为80113.27万元，目前该项目已租给丹尼斯用作经营性物业，年租金约2500万元。',
                //风控措施
                riskMeasures: '抵押财产应当可以进入民事流转程序而又不违反法律禁止性规定，抵押物合法性应从以下方面进行考察，如抵押物是否为法律禁止流通物，是否为根本不能变现的物品，抵押人是否拥有抵押物的所有权。同时应对担保人的身份进行考察，防止担保人不符合法律规定，致使担保合同无效'
            },
            /***********************  担保详情  end  ******************************/


            /************************  相关文件图片信息  start ***********************/
            relevantFiles: [{
                    // 名称
                    materialType: '信用卡',
                    // 大图地址
                    imgUrl: '111',
                    // 小图地址
                    minImgUrl: '222'
                }, {
                    materialType: '房产证',
                    imgUrl: '111',
                    minImgUrl: '222'
                }, {
                    materialType: '户口',
                    imgUrl: '111',
                    minImgUrl: '222'
                }, {
                    materialType: '工作证',
                    imgUrl: '111',
                    minImgUrl: '222'
                }, {
                    materialType: '身份证',
                    imgUrl: '111',
                    minImgUrl: '222'
                }]
                /************************  相关文件图片信息  end ***********************/
        });
    });
};