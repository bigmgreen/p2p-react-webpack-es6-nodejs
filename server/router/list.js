module.exports = function(app) {

    /* 查询投资列表数据 */
    app.post('/investList', app.bodyParser, function(req, res) {
        res.json({
            //分页信息
            pageView: {
                pageCount: 2,
                currentPage: req.body.currentPage
            },
            //列表搜索条件
            searchTerms: {
                loanTypeRanges: ['全部', '个人标', '企业标'],
                loanTypeIndex: req.body.loanTypeIndex,
                loanStatusRanges: ['全部', '未开始', '投标中', '满标', '还款中', '已还款'],
                loanStatusIndex: req.body.loanStatusIndex,
                priceRanges: ['全部', '10万以下', '10-20万', '20-50万', '50万以上'],
                priceRangeIndex: req.body.priceRangeIndex,
                termCountRanges: ['全部', '1个月以下', '1-6个月', '6-12个月', '12-18个月', '18-24个月', '24个月以上'],
                termCountIndex: req.body.termCountIndex,
                interestRanges: ['全部', '10%以下', '10%-12%', '12%-15%', '15%-18%', '18%-21%', '21%-24%'],
                interestRangeIndex: req.body.interestRangeIndex
            },
            //列表数据
            list: [{
                    //是否是新手标 1代表是   其他代表不是
                    loanClassify: 1,
                    //是否是企业标  1是个人标   2是企业标
                    loanType: 1,
                    //标的标题
                    title: '验证首页标的显示验证首页标的显示',
                    //标的id
                    loanId: '750090',
                    //年化利率
                    annualInterestRate: '10%',
                    //借款总额
                    amount: 10000000,
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
                    //投资进度
                    progress: '0',
                    /*
                     * 标的状态 
                     * 300=立即投资 要区分个人和企业
                     * 301和302=未开始
                     * 400=已满标
                     * 500=还款中
                     * 600=已还款
                     */
                    status: '301'
                },
                {
                    loanClassify: 0,
                    loanType: 1,
                    title: '验证首页标的显示验证首页标的显示',
                    loanId: '750090',
                    annualInterestRate: '10%',
                    amount: 10000000,
                    termCount: 10,
                    termUnit: 2,
                    productId: 3,
                    progress: '50.00',
                    status: '300'
                },
                {
                    loanClassify: 0,
                    loanType: 2,
                    title: '验证首页标的显示验证首页标的显示',
                    loanId: '750090',
                    annualInterestRate: '10%',
                    amount: 10000000,
                    termCount: 3,
                    termUnit: 3,
                    productId: 2,
                    progress: '100',
                    status: '400'
                },
                {
                    loanClassify: 0,
                    loanType: 1,
                    title: '验证首页标的显示验证首页标的显示',
                    loanId: '750090',
                    annualInterestRate: '10%',
                    amount: 10000000,
                    termCount: 10,
                    termUnit: 1,
                    productId: 1,
                    progress: '50.00',
                    status: '300'
                },
                {
                    loanClassify: 0,
                    loanType: 1,
                    title: '验证首页标的显示验证首页标的显示',
                    loanId: '750090',
                    annualInterestRate: '10%',
                    amount: 10000000,
                    termCount: 10,
                    termUnit: 2,
                    productId: 3,
                    progress: '100',
                    status: '500'
                },
                {
                    loanClassify: 0,
                    loanType: 1,
                    title: '验证首页标的显示验证首页标的显示',
                    loanId: '750090',
                    annualInterestRate: '10%',
                    amount: 10000000,
                    termCount: 10,
                    termUnit: 2,
                    productId: 3,
                    progress: '50.00',
                    status: '300'
                },
                {
                    loanClassify: 0,
                    loanType: 1,
                    title: '验证首页标的显示验证首页标的显示',
                    loanId: '750090',
                    annualInterestRate: '10%',
                    amount: 10000000,
                    termCount: 10,
                    termUnit: 2,
                    productId: 3,
                    progress: '100',
                    status: '600'
                },
                {
                    loanClassify: 0,
                    loanType: 1,
                    title: '验证首页标的显示验证首页标的显示',
                    loanId: '750090',
                    annualInterestRate: '10%',
                    amount: 10000000,
                    termCount: 10,
                    termUnit: 2,
                    productId: 3,
                    progress: '50.00',
                    status: '300'
                },
                {
                    loanClassify: 1,
                    loanType: 1,
                    title: '验证首页标的显示验证首页标的显示',
                    loanId: '750090',
                    annualInterestRate: '10%',
                    amount: 10000000,
                    termCount: 10,
                    termUnit: 1,
                    productId: 1,
                    progress: '0',
                    status: '301'
                },
                {
                    loanClassify: 1,
                    loanType: 1,
                    title: '验证首页标的显示验证首页标的显示',
                    loanId: '750090',
                    annualInterestRate: '10%',
                    amount: 10000000,
                    termCount: 10,
                    termUnit: 1,
                    productId: 1,
                    progress: '0',
                    status: '301'
                },
                {
                    loanClassify: 1,
                    loanType: 1,
                    title: '验证首页标的显示验证首页标的显示',
                    loanId: '750090',
                    annualInterestRate: '10%',
                    amount: 10000000,
                    termCount: 10,
                    termUnit: 1,
                    productId: 1,
                    progress: '0',
                    status: '301'
                }
            ]
        });
    });

    /* 确认转让  */
    app.post('/debtAgreement', app.bodyParser, function(req, res) {
        res.json({
            appVars: {
                websiteTitle: '中科柏诚',
                websiteDomain: '127.0.0.1',
                websiteNameCn: '中科柏诚'
            },
            agreement: {
                statusCode: 302,
                statusMessage: '这个标已结束',
                uuid: 'uuid',
                aName: '中科柏诚',
                aIdNo: '7500',
                aUsername: '科柏',
                bName: '中科',
                bIdNo: '622626***',
                bUsername: '柏诚',
                startDate: '2016-09-23',
                title: '项目名称',
                contractNo: '075000',
                borrowerName: '中科柏',
                amount: '借款金额',
                interestRate: '年化利率',
                term: 1,
                termUnit: 1,
                tradeDate: '2016-09-23',
                price: '转让价格',
                commission: '管理费',
                leftTerm: '剩余期数(期)'
            }
        });
    });

    /* 查询转让列表数据 */
    app.post('/debtList', app.bodyParser, function(req, res) {
        res.json({
            //用户id  null表示用户没有登录
            userId: 0,
            //用户是否注册第三方支付
            userCode: 0,
            //分页信息
            pageView: {
                pageCount: 2,
                currentPage: req.body.currentPage
            },
            //列表搜索条件
            searchTerms: {
                priceRanges: ['全部', '10万以下', '10-20万', '20-50万', '50万以上'],
                priceRangeIndex: req.body.priceRangeIndex,
                interestRanges: ['全部', '10%以下', '10%-15%', '15%以上'],
                interestRangeIndex: req.body.interestRangeIndex
            },
            //列表数据
            list: [{
                    //是否是企业标  1是个人标   2是企业标
                    loanType: 1,
                    //标的id
                    loanId: '750090',
                    //标的标题
                    loanTitle: '验证首页标的显示验证首页标的显示',
                    //年化利率
                    loanAnnualInterestRate: '10%',
                    //待收本息
                    collectInterest: '16442.68',

                    //转让价格
                    soldPrice: '15408.35',
                    //手续费
                    soldCommission: '10.00',
                    //下个还款日
                    nextRepayDate: '2016-09-02',
                    //剩余期数
                    leftTermCount: 5,
                    //债权id
                    id: 5
                },
                {
                    //是否是企业标  1是个人标   2是企业标
                    loanType: 1,
                    //标的id
                    loanId: '750090',
                    //标的标题
                    loanTitle: '验证首页标的显示验证首页标的显示',
                    //年化利率
                    loanAnnualInterestRate: '10%',
                    //待收本息
                    collectInterest: '16442.68',

                    //转让价格
                    soldPrice: '15408.35',
                    //手续费
                    soldCommission: '10.00',
                    //下个还款日
                    nextRepayDate: '2016-09-02',
                    //剩余期数
                    leftTermCount: 5,
                    //债权id
                    id: 5
                },
                {
                    //是否是企业标  1是个人标   2是企业标
                    loanType: 1,
                    //标的id
                    loanId: '750090',
                    //标的标题
                    loanTitle: '验证首页标的显示验证首页标的显示',
                    //年化利率
                    loanAnnualInterestRate: '10%',
                    //待收本息
                    collectInterest: '16442.68',

                    //转让价格
                    soldPrice: '15408.35',
                    //手续费
                    soldCommission: '10.00',
                    //下个还款日
                    nextRepayDate: '2016-09-02',
                    //剩余期数
                    leftTermCount: 5,

                    //投资人id
                    lastInvestorUserId: 75000,
                    //债权id
                    id: 5
                },
                {
                    //是否是企业标  1是个人标   2是企业标
                    loanType: 1,
                    //标的id
                    loanId: '750090',
                    //标的标题
                    loanTitle: '验证首页标的显示验证首页标的显示',
                    //年化利率
                    loanAnnualInterestRate: '10%',
                    //待收本息
                    collectInterest: '16442.68',

                    //转让价格
                    soldPrice: '15408.35',
                    //手续费
                    soldCommission: '10.00',
                    //下个还款日
                    nextRepayDate: '2016-09-02',
                    //剩余期数
                    leftTermCount: 5,
                    //债权id
                    id: 5
                },
                {
                    //是否是企业标  1是个人标   2是企业标
                    loanType: 1,
                    //标的id
                    loanId: '750090',
                    //标的标题
                    loanTitle: '验证首页标的显示验证首页标的显示',
                    //年化利率
                    loanAnnualInterestRate: '10%',
                    //待收本息
                    collectInterest: '16442.68',

                    //转让价格
                    soldPrice: '15408.35',
                    //手续费
                    soldCommission: '10.00',
                    //下个还款日
                    nextRepayDate: '2016-09-02',
                    //剩余期数
                    leftTermCount: 5,
                    //债权id
                    id: 5
                },
                {
                    //是否是企业标  1是个人标   2是企业标
                    loanType: 1,
                    //标的id
                    loanId: '750090',
                    //标的标题
                    loanTitle: '验证首页标的显示验证首页标的显示',
                    //年化利率
                    loanAnnualInterestRate: '10%',
                    //待收本息
                    collectInterest: '16442.68',

                    //转让价格
                    soldPrice: '15408.35',
                    //手续费
                    soldCommission: '10.00',
                    //下个还款日
                    nextRepayDate: '2016-09-02',
                    //剩余期数
                    leftTermCount: 5,
                    //债权id
                    id: 5
                }
            ]
        });
    });
}