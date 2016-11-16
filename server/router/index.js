module.exports = function(app) {
    app.get('/index', function(req, res) {
        res.json({
            //banner数据
            banner: {
                //用户是否登录
                userId: 1,
                //banner
                banners: [{
                        // banner的链接
                        link: '#',
                        // banner的图的地址
                        picture: '../../static/index/img/banner1.png'
                    },
                    {
                        link: '#',
                        picture: '../../static/index/img/banner2.png'
                    },
                    {
                        link: '#',
                        picture: '../../static/index/img/banner3.png'
                    }
                ],
            },
            //平台基本信息
            platformInfo: {
                //累计投资总金额
                totalAmount: '5309.30',
                //平台投资人次
                InvestmentPerson: '5201',
                //投资成功项目数
                successfulProjects: '5071',
                //注册总量
                totalRegistered: '5051'
            },
            //最新公告
            latestNotice: [{
                    id: 1,
                    title: '中科柏诚',
                    issueTime: '2016/9/14'
                },
                {
                    id: 1,
                    title: '中科柏诚',
                    issueTime: '2016/9/14'
                },
                {
                    id: 1,
                    title: '中科柏诚',
                    issueTime: '2016/9/14'
                }
            ],
            //新手专享
            novice: {
                //期限时间
                termCount: 10,
                //期限单位
                termUnit: 1,
                //年化利率
                annualInterestRate: '10.5',
                //融资金额
                amount: 10,
                //标状态
                status: 300,
                // 判断个人还是企业 1是个人 2是企业
                loanType: 1,
                //标id
                loanId: '75000'
            },
            //理财
            finances: [{
                    title: '测试新的标题',
                    //期限时间
                    termCount: 5,
                    //期限单位 1天2周3个月
                    termUnit: 2,
                    //年化利率
                    annualInterestRate: '20',
                    //融资金额
                    amount: 1000000,
                    //标的状态
                    status: 300,
                    // 判断个人还是企业 1是个人 2是企业
                    loanType: 2,
                    //标id
                    loanId: '750000',
                    /*
                     * 还款方式 
                     * 1=按月付息，到期还本 
                     * 2=一次性还本付息 
                     * 3=等额本息
                     */
                    productId: 1,
                },
                {
                    title: '测试新的标题',
                    //期限时间
                    termCount: 5,
                    //期限单位 1天2周3个月
                    termUnit: 3,
                    //年化利率
                    annualInterestRate: '20',
                    //融资金额
                    amount: 1000000,
                    //标的状态
                    status: 301,
                    // 判断个人还是企业 1是个人 2是企业
                    loanType: 1,
                    //标id
                    loanId: '750000',
                    /*
                     * 还款方式 
                     * 1=按月付息，到期还本 
                     * 2=一次性还本付息 
                     * 3=等额本息
                     */
                    productId: 3,
                },
                {
                    title: '测试新的标题',
                    //期限时间
                    termCount: 5,
                    //期限单位 1天2周3个月
                    termUnit: 1,
                    //年化利率
                    annualInterestRate: '20',
                    //融资金额
                    amount: 1000000,
                    //标的状态
                    status: 300,
                    // 判断个人还是企业 1是个人 2是企业
                    loanType: 2,
                    //标id
                    loanId: '750000',
                    /*
                     * 还款方式 
                     * 1=按月付息，到期还本 
                     * 2=一次性还本付息 
                     * 3=等额本息
                     */
                    productId: 2,
                }
            ],
            //平台新闻和公告  副内容和主内容字段意义一样
            news: {
                //平台新闻
                reports: [{
                        //平台新闻图片地址
                        imgName: '#',
                        //平台新闻标题
                        title: '蚂蚁金服程立：重视区块链的信任机制',
                        //平台新闻主内容
                        contentBrief: '今年以来，区块链技术越来越火，各机构、公司、研究者，都对这个领域投注了大量关注，态度、动向不绝于耳。作为备受关注的互联网金融公司，蚂蚁金服在7月9日举行的XIN公益大会上首次透露将把区块...',
                        //平台新闻日期
                        issueTime: '2016-08-01'
                    },
                    {
                        imgName: '#',
                        title: '甩卖P2P平台： 200万一个你要吗？',
                        contentBrief: '[自2011年以来，已经有超过1500家平台出现问题，其中，2015年达到风险暴露高峰',
                        issueTime: '2016-06-03 01:53:30'
                    },
                    {
                        imgName: '#',
                        title: '不能把非法集资帽子都往P2P头上扣',
                        contentBrief: '今年以来，相关监管部门对于不法理财公司非法集资、金融诈骗等整治正频繁加码',
                        issueTime: '2016-06-02 11:38:25'
                    }
                ],
                //平台公告
                notices: [{
                        //平台公告图片地址
                        imgName: '#',
                        //平台公告标题
                        title: '甩卖P2P平台： 200万一个你要吗',
                        //平台公告主内容
                        contentBrief: '[自2011年以来，已经有超过1500家平台出现问题，其中，2015年达到风险暴露高峰，出现问题的平台达到896家，占比超过一半。2014年全年问题平台为275家，而今年截至目前，问题平台就已经达到270家...',
                        //平台公告日期
                        issueTime: '2016-06-03'
                    },
                    {
                        imgName: '#',
                        title: '不能把非法集资帽子都往P2P头上扣',
                        contentBrief: '今年以来，相关监管部门对于不法理财公司非法集资、金融诈骗等整治正频繁加码',
                        issueTime: '2016-06-02 11:38:25'
                    },
                    {
                        imgName: '#',
                        title: '蚂蚁金服程立：重视区块链的信任机制',
                        contentBrief: '今年以来，区块链技术越来越火，各机构、公司、研究者，都对这个领域投注了大量关注，态度',
                        issueTime: '2016-06-03 01:53:30'
                    }
                ]
            },
            //合作机构
            partners: [{
                    officialSite: '#',
                    name: '中科柏诚',
                    logo: '../../static/index/img/1.png'
                },
                {
                    officialSite: '#',
                    name: '中科柏诚',
                    logo: '../../static/index/img/2.png'
                },
                {
                    officialSite: '#',
                    name: '中科柏诚',
                    logo: '../../static/index/img/3.png'
                },
                {
                    officialSite: '#',
                    name: '中科柏诚',
                    logo: '../../static/index/img/4.png'
                }
            ]
        });
    });
}