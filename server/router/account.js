module.exports = function(app) {
    app.get('/account/info', app.bodyParser, function(req, res) {
        res.json({
            loginUser: {
                realName: '张三',
                nickName: 'qqq01111',
                portrait: 'aaaa'
            },
            wait: [{
                    /*  标的id    */
                    loanId: 1000,
                    /*  标的标题    */
                    title: '借款标题1',
                    /*  投资金额    */
                    amount: 100,
                    /*  投资期限    */
                    termCount: 2,
                    /*  投资期限单位    */
                    termUnit: '1',
                    /*  年化收益率    */
                    annualInterestRate: 10,
                    /*  信用等级    */
                    creditDegree: 'A',
                    /*   借款协议编号    */
                    contractNo: '11111111',
                    /*  开标时间    */
                    openTime: '2016-03-04',
                    /*  结标时间    */
                    openEndTime: '2017-09-09'
                },
                {
                    loanId: '1001',
                    title: '借款标题2',
                    loanType: 2,
                    amount: 200,
                    termCount: 2,
                    termUnit: '2',
                    annualInterestRate: 20,
                    creditDegree: 'B',
                    contractNo: '2222222',
                    openTime: '2016-03-05',
                    openEndTime: '2017-09-09'

                },
                {
                    loanId: '1002',
                    title: '借款标题3',
                    loanType: 1,
                    amount: 300,
                    termCount: 3,
                    termUnit: '3',
                    annualInterestRate: 30,
                    creditDegree: 'C',
                    contractNo: '3333333',
                    openTime: '2016-03-06',
                    openEndTime: '2017-09-09'
                }
            ]
        });
    });
    /*个人资料*/
    app.post('/person-info', app.bodyParser, function(req, res) {
        res.json({
                loginUser: {
                    "userId": 583231,
                    "idCardNo": '12312313131',
                    "realName": '张三',
                    "mobile": '18756856213'
                },

                personalInfo: {
                    "totalCreditLimit": 0,
                    "avaliableCreditLimit": 0,
                    "creditPoint": 0,
                    "gender": true,
                    "topEducation": "大学",
                    "topEduStartYear": '1990',
                    "topEduSchool": "山东大学",
                    "hasMarried": true,
                    "hasChild": true,
                    "telephone": '010-1234567',
                    "qq": '12321313',
                    "homeTownProvince": '北京',
                    "homeTownCity": '北京',
                    "homeTownCounty": '顺义',
                    "homeTownAddr": '阿萨大的撒',
                    "residenceProvince": '河南',
                    "residenceCity": "南阳",
                    "residenceCounty": 'dasdad',
                    "residenceAddr": 'adadqdqdq',
                    "residencePostCode": '100010'
                },
                userWorkInfo: {
                    "officeName": '北京市ssss公司',
                    "officeProvice": '湖南',
                    "officeCity": '岳阳',
                    "officeCounty": '顺义',
                    "officeAddress": '撒打电话',
                    "officePhone": '18734902898',
                    "officeJoinDate": '1990-01-01',
                    "department": '开发部门',
                    "position": '管理、技术、行政岗位',
                    "officeType": '1',
                    "officeSize": "1"
                },
                financialInfo: {
                    "monthlyIncome": '10000',
                    "payDay": '10',
                    "payType": '1',
                    "housingType": '1',
                    "housingArea": '100',
                    "monthlyHouseLoan": '1000',
                    "hasCar": true,
                    "carBrand": '宝马',
                    "carValue": '2',
                    "monthlyCarLoan": '1000',
                    "hasBondValue": true,
                    "bondValue": '1000万'
                },
                contact4: {
                    "id": '10001',
                    "borrowerId": '10002',
                    "isDisplay": '1',
                    "name": 'contact01',
                    "relationship": '100',
                    "mobile": '13829809821',
                    "telephone": '010-1234567',
                    "contactProvice": "河北",
                    "contactCity": '石家庄',
                    "contactCountry": 'aaa',
                    "contactAddress": '具体地址'
                },
                contact1: {
                    "id": '10001',
                    "borrowerId": '10002',
                    "isDisplay": '1',
                    "name": 'contact02',
                    "relationship": '100',
                    "mobile": '13829809821',
                    "telephone": '010-1234567',
                    "contactProvice": "河北",
                    "contactCity": '石家庄',
                    "contactCountry": 'aaa',
                    "contactAddress": '具体地址'
                },
                contact5: {
                    "id": '10001',
                    "borrowerId": '10002',
                    "isDisplay": '1',
                    "name": 'contact01',
                    "relationship": '700',
                    "mobile": '13829809821',
                    "telephone": '010-1234567'
                },
                contact2: {
                    "id": '10001',
                    "borrowerId": '10002',
                    "isDisplay": '1',
                    "name": 'contact02',
                    "relationship": '700',
                    "mobile": '13829809821',
                    "telephone": '010-1234567'
                },
                contact6: {
                    "id": '10001',
                    "borrowerId": '10002',
                    "isDisplay": '1',
                    "name": 'contact01',
                    "relationship": '600',
                    "mobile": '13829809821',
                    "telephone": '010-1234567',
                    "contactProvice": "河北",
                    "contactCity": '石家庄',
                    "contactCountry": 'aaa',
                    "contactAddress": '具体地址03'
                },
                contact3: {
                    "id": '10001',
                    "borrowerId": '10002',
                    "isDisplay": '1',
                    "name": 'contact02',
                    "relationship": '500',
                    "mobile": '13829809821',
                    "telephone": '010-1234567',
                    "contactProvice": "云南",
                    "contactCity": '昆明',
                    "contactCountry": 'vvv',
                    "contactAddress": '具体地址04'
                },
                creditTypes: {
                    "key": '0001',
                    "value": 'aa证明'
                }
            }

        );
    });
    /*消息中心*/
    app.post('/messageCenter', app.bodyParser, function(req, res) {
        res.json({
            list: {
                list1: {
                    "count": 12,
                    "items": [{
                            "id": "10090",
                            "messageType": '101',
                            "sendTime": "2016-09-09 11:55:14",
                            "senderName": "中科柏诚",
                            "isRead": false,
                            "title": "先截取30个字符串先截取30个字符串先截取30个字符串"
                        },
                        {
                            "id": "10090",
                            "messageType": '102',
                            "sendTime": "2016-09-09 11:55:14",
                            "senderName": "中科柏诚",
                            "isRead": true,
                            "title": "先截取30个字符串先截取30个字符串先截取30个字符串"
                        },
                        {
                            "id": "10090",
                            "messageType": '103',
                            "sendTime": "2016-09-09 11:55:14",
                            "senderName": "中科柏诚",
                            "isRead": true,
                            "title": "先截取30个字符串先截取30个字符串先截取30个字符串"
                        }
                    ]
                },
                list2: {
                    "count": 13,
                    "items": [{
                            "id": "10190",
                            "messageType": '104',
                            "sendTime": "2016-09-09 11:55:14",
                            "senderName": "中科柏诚",
                            "isRead": true,
                            "title": "先截取30个字符串先截取30个字符串先截取30个字符串"
                        },
                        {
                            "id": "10191",
                            "messageType": '101',
                            "sendTime": "2016-09-09 11:55:14",
                            "senderName": "中科柏诚",
                            "isRead": false,
                            "title": "先截取30个字符串先截取30个字符串先截取30个字符串"
                        },
                        {
                            "id": "10290",
                            "messageType": '102',
                            "sendTime": "2016-09-09 11:55:14",
                            "senderName": "中科柏诚",
                            "isRead": true,
                            "title": "先截取30个字符串先截取30个字符串先截取30个字符串"
                        }
                    ]
                },
                list3: {
                    "count": 14,
                    "items": [{
                            "id": "10190",
                            "messageType": '101',
                            "sendTime": "2016-09-09 11:55:14",
                            "senderName": "中科柏诚",
                            "isRead": true,
                            "title": "先截取30个字符串先截取30个字符串先截取30个字符串"
                        },
                        {
                            "id": "10191",
                            "messageType": '101',
                            "sendTime": "2016-09-09 11:55:14",
                            "senderName": "中科柏诚",
                            "isRead": true,
                            "title": "先截取30个字符串先截取30个字符串先截取30个字符串"
                        },
                        {
                            "id": "10290",
                            "messageType": '101',
                            "sendTime": "2016-09-09 11:55:14",
                            "senderName": "中科柏诚",
                            "isRead": false,
                            "title": "先截取30个字符串先截取30个字符串先截取30个字符串"
                        }
                    ]
                }
            }
        });
    });
    /*删除一条消息*/
    app.post('/messageCenter/delInnerMail', function(req, res) {
        res.json({
            'test': "删除成功返回数据"
        });
    });
    /*标记已读消息*/
    app.post('/messageCenter/markedRead', function(req, res) {
        res.json({
            'test': "标记已读成功返回数据"
        });
    });
    /*标记未读消息*/
    app.post('/messageCenter/markedNoRead', function(req, res) {
        res.json({
            'test': "标记未读成功返回数据"
        });
    });
    /*设置消息*/
    app.post('/saveMessageSetup', app.bodyParser, function(req, res) {
        res.json({
            'test': "消息设置结束返回数据"
        });
    });
    /*消息详情*/
    app.post('/messageDetail', app.bodyParser, function(req, res) {
        res.json({
            "id": "1012",
            "sendDate": "2016-09-09",
            "sendName": "中科柏诚",
            "content": '详细的消息详情展示全部内容'
        });
    });
    /**
     * 
     * 投资记录
     * 
     */
    app.get('/account/invest/backIn', app.bodyParser, function(req, res) {
        res.json({
            "recordCount": 2,
            "pageSize": 20,
            "pageCount": 1,
            "currentPage": 1,
            "voList": [{
                    "red_money_id": "",
                    "termUnit": 3,
                    "collectedPrincipal": 0,
                    "openEndTime": 1507971183000,
                    "openTime": 1476435181000,
                    "nextPhasePrincipal": 0,
                    "toBeCollectedPrincipal": 10000,
                    "amount": 20000,
                    "id": 204,
                    "toBeCollectedRedmoneyInterest": 0,
                    "title": "大青山测试标",
                    "loanType": 1,
                    "leftTermCount": 12,
                    "borrowerId": 750052,
                    "nextPhaseInterest": 66.67,
                    "termCount": 12,
                    "investTime": "2016-10-14 18:15:56",
                    "collectedInterest": 0,
                    "status": 500,
                    "biddingAmount": 20000,
                    "productId": 1,
                    "toBeCollectedInterest": 800.04,
                    "termReturnAmount": 66.67,
                    "collectedRedmoneyInterest": 0,
                    "borrowerCreditPoint": 1,
                    "releaseTime": "2016-10-14 18:29:02",
                    "borrowerNickname": "ceshi111",
                    "investAmount": 10000,
                    "annualInterestRate": 8,
                    "nextRepayDate": "2016-11-14 23:59:57",
                    "loanId": 750119
                },
                {
                    "red_money_id": "",
                    "termUnit": 3,
                    "collectedPrincipal": 0,
                    "openEndTime": 1507971183000,
                    "openTime": 1476435181000,
                    "nextPhasePrincipal": 0,
                    "toBeCollectedPrincipal": 10000,
                    "amount": 20000,
                    "id": 203,
                    "toBeCollectedRedmoneyInterest": 0,
                    "title": "大青山测试标",
                    "loanType": 1,
                    "leftTermCount": 12,
                    "borrowerId": 750052,
                    "nextPhaseInterest": 66.67,
                    "termCount": 12,
                    "investTime": "2016-10-14 18:10:32",
                    "collectedInterest": 0,
                    "status": 500,
                    "biddingAmount": 20000,
                    "productId": 1,
                    "toBeCollectedInterest": 800.04,
                    "termReturnAmount": 66.67,
                    "collectedRedmoneyInterest": 0,
                    "borrowerCreditPoint": 1,
                    "releaseTime": "2016-10-14 18:29:02",
                    "borrowerNickname": "ceshi111",
                    "investAmount": 10000,
                    "annualInterestRate": 8,
                    "nextRepayDate": "2016-11-14 23:59:57",
                    "loanId": 750119
                }
            ],
            "pageIndex": {
                "startIndex": 1,
                "endIndex": 1
            },
            "pagecode": 5,
            "orderby": null,
            "ascORdesc": 0
        });
    });
    /*借款记录*/
    app.get('/account/repaymentIn', function(req, res) {
        res.json({
            voList: [{
                    "isTransfer": "1",
                    "createTime": "2016-06-24 10:10:19",
                    "repayedTermCount": 2,
                    "isWay": "0,1,2",
                    "termUnit": 3,
                    "limit_money": 20000.00,
                    "openEndTime": 1467252919000,
                    "openTime": 1466734519000,
                    "endTime": "2016-06-24 10:49:02",
                    "transferTime": "0",
                    "amount": 20000.00,
                    "monthFeeRate": 2.00,
                    "title": "HQ个人按月付息标",
                    "recommendWeight": 0,
                    "minAnnualInterestRate": 10.00,
                    "description": "HQ个人按月付息标描述描述",
                    "loanType": 1,
                    "loanProductId": 97,
                    "contractNo": "002201606241012160000014",
                    "borrowerId": 750000,
                    "borrowType": "102",
                    "auditorId": 1,
                    "albumCapacity": 20,
                    "debtcontract": "dfc9c97b-0a14-4e60-9b03-9a7eefe8cf4c",
                    "fullTime": "2016-06-24 10:28:23",
                    "assureId": 1,
                    "termCount": 2,
                    "status": 600,
                    "loan_classify": 0,
                    "beginAmount": 100,
                    "investorcontract": "00893bff-a360-4ff8-a9c4-8f49153420a5",
                    "biddingAmount": 20000.00,
                    "repayType": 1,
                    "increaseAmount": 100,
                    "startFeeRate": 3.00,
                    "inputFrom": 1,
                    "productId": 1,
                    "schedule": 1.000000,
                    "creditDegree": "AAA",
                    "maxAnnualInterestRate": 20.00,
                    "releaseTime": "2016-06-24 10:31:39",
                    "borrowerNickname": "ceshi11",
                    "annualInterestRate": 10.00,
                    "viewCount": 0,
                    "dealStatus": 1,
                    "loanId": 750010
                },
                {
                    "isTransfer": "1",
                    "createTime": "2016-06-24 10:10:19",
                    "repayedTermCount": 2,
                    "isWay": "0,1,2",
                    "termUnit": 3,
                    "limit_money": 20000.00,
                    "openEndTime": 1467252919000,
                    "openTime": 1466734519000,
                    "endTime": "2016-06-24 10:49:02",
                    "transferTime": "0",
                    "amount": 20000.00,
                    "monthFeeRate": 2.00,
                    "title": "HQ个人按月付息标",
                    "recommendWeight": 0,
                    "minAnnualInterestRate": 10.00,
                    "description": "HQ个人按月付息标描述描述",
                    "loanType": 1,
                    "loanProductId": 97,
                    "contractNo": "002201606241012160000014",
                    "borrowerId": 750000,
                    "borrowType": "102",
                    "auditorId": 1,
                    "albumCapacity": 20,
                    "debtcontract": "dfc9c97b-0a14-4e60-9b03-9a7eefe8cf4c",
                    "fullTime": "2016-06-24 10:28:23",
                    "assureId": 1,
                    "termCount": 2,
                    "status": 600,
                    "loan_classify": 0,
                    "beginAmount": 100,
                    "investorcontract": "00893bff-a360-4ff8-a9c4-8f49153420a5",
                    "biddingAmount": 20000.00,
                    "repayType": 1,
                    "increaseAmount": 100,
                    "startFeeRate": 3.00,
                    "inputFrom": 1,
                    "productId": 1,
                    "schedule": 1.000000,
                    "creditDegree": "AAA",
                    "maxAnnualInterestRate": 20.00,
                    "releaseTime": "2016-06-24 10:31:39",
                    "borrowerNickname": "ceshi11",
                    "annualInterestRate": 10.00,
                    "viewCount": 0,
                    "dealStatus": 1,
                    "loanId": 750010
                }, {
                    "isTransfer": "1",
                    "createTime": "2016-06-24 10:10:19",
                    "repayedTermCount": 2,
                    "isWay": "0,1,2",
                    "termUnit": 3,
                    "limit_money": 20000.00,
                    "openEndTime": 1467252919000,
                    "openTime": 1466734519000,
                    "endTime": "2016-06-24 10:49:02",
                    "transferTime": "0",
                    "amount": 20000.00,
                    "monthFeeRate": 2.00,
                    "title": "HQ个人按月付息标",
                    "recommendWeight": 0,
                    "minAnnualInterestRate": 10.00,
                    "description": "HQ个人按月付息标描述描述",
                    "loanType": 1,
                    "loanProductId": 97,
                    "contractNo": "002201606241012160000014",
                    "borrowerId": 750000,
                    "borrowType": "102",
                    "auditorId": 1,
                    "albumCapacity": 20,
                    "debtcontract": "dfc9c97b-0a14-4e60-9b03-9a7eefe8cf4c",
                    "fullTime": "2016-06-24 10:28:23",
                    "assureId": 1,
                    "termCount": 2,
                    "status": 600,
                    "loan_classify": 0,
                    "beginAmount": 100,
                    "investorcontract": "00893bff-a360-4ff8-a9c4-8f49153420a5",
                    "biddingAmount": 20000.00,
                    "repayType": 1,
                    "increaseAmount": 100,
                    "startFeeRate": 3.00,
                    "inputFrom": 1,
                    "productId": 1,
                    "schedule": 1.000000,
                    "creditDegree": "AAA",
                    "maxAnnualInterestRate": 20.00,
                    "releaseTime": "2016-06-24 10:31:39",
                    "borrowerNickname": "ceshi11",
                    "annualInterestRate": 10.00,
                    "viewCount": 0,
                    "dealStatus": 1,
                    "loanId": 750010
                }
            ],
            currentPage: req.query.currentPage,
            pageCount: 3
        })

    });
    /**
     * 还款计划
     */
    app.get('/account/repaymentPlan', app.bodyParser, function(req, res) {
        res.json({
            loan: {
                "id": 12124,
                "loanId": "10090",
                "title": "先截取10个字符串先33还款标题",
                "amount": 3433,
                "termCount": 2,
                "termUnit": 1,
                "annualInterestRate": 9,
                "description": "先截取10个字符串先33还款标题,这是说明json",
                "borrowerId": 12213
            },
            appVars: {
                "payProvider": 'ips'
            },

            datas: [{
                "id": 10001,
                "phaseNumber": 1,
                "plannedTermAmount": 2000,
                "overDueFee": 2000,
                "overDueInterest": 10000,
                "dueDate": "2016-08-08",
                "plannedTermInterest": 2000,
                "plannedTermPrincipal": 2000,
                "transactionFee": 10,
                "overDueDays": 1,
                "repaidAmount": 1000,
                "isRepaid": true,
                "loanPhaseStatus": 2
            }, {
                "id": 10002,
                "phaseNumber": 2,
                "plannedTermAmount": 2000,
                "overDueFee": 2000,
                "overDueInterest": 10000,
                "dueDate": "2016-08-08",
                "plannedTermInterest": 2000,
                "plannedTermPrincipal": 2000,
                "transactionFee": 10,
                "overDueDays": 1,
                "repaidAmount": 1000,
                "isRepaid": false,
                "loanPhaseStatus": 0
            }, {
                "id": 10003,
                "phaseNumber": 3,
                "plannedTermAmount": 2000,
                "overDueFee": 2000,
                "overDueInterest": 10000,
                "dueDate": "2016-08-08",
                "plannedTermInterest": 2000,
                "plannedTermPrincipal": 2000,
                "transactionFee": 10,
                "overDueDays": 1,
                "repaidAmount": 1000,
                "isRepaid": false,
                "loanPhaseStatus": 1
            }, {
                "id": 10004,
                "phaseNumber": 4,
                "plannedTermAmount": 2000,
                "overDueFee": 2000,
                "overDueInterest": 10000,
                "dueDate": "2016-08-08",
                "plannedTermInterest": 2000,
                "plannedTermPrincipal": 2000,
                "transactionFee": 10,
                "overDueDays": 1,
                "repaidAmount": 1000,
                "isRepaid": false,
                "loanPhaseStatus": 2
            }, {
                "id": 10005,
                "phaseNumber": 5,
                "plannedTermAmount": 2000,
                "overDueFee": 2000,
                "overDueInterest": 10000,
                "dueDate": "2016-08-08",
                "plannedTermInterest": 2000,
                "plannedTermPrincipal": 2000,
                "transactionFee": 10,
                "overDueDays": 1,
                "repaidAmount": 1000,
                "isRepaid": false,
                "loanPhaseStatus": 3
            }],
            "mindex": []
        });

    });

    /*收款计划*/
    app.post('/earnPlan', app.bodyParser, function(req, res) {
        res.json({
            loan: {
                "id": 12124,
                "loanId": "10090",
                "title": "先截取10个字符串先33还款标题首款计划",
                "amount": 3433,
                "termCount": 2,
                "termUnit": 1,
                "annualInterestRate": 9,
                "description": "先截取10个字符串先33还款标题,这是说明json"
            },

            datas: [{
                "id": 10001,
                "repayMentDate": '2016-09-09',
                "status": '已收款',
                "plannedTermInterest": 2000,
                "plannedTermPrincipal": 2000,
                "overDueInterest": 10000

            }],
        });

    });
    /*债权转让*/
    app.post('/debtIndex', app.bodyParser, function(req, res) {
        res.json({
            list: {
                list1: {
                    "items": [{
                        "id": 12124,
                        "loanId": "10090",
                        "loanType": 1,
                        "title": "先截取10个字符串先",
                        "loanAnnualInterestRate": 10,
                        "toBeCollectedPrincipal": 1000,
                        "toBeCollectedInterest": 2000,
                        "soldPrice": 100,
                        "soldCommission": 200,
                        "nextRepayDate": "2016-09-09",
                        "leftTermCount": 2
                    }]
                },
                list2: {
                    "items": [{
                            "id": 12124,
                            "loanId": "10090",
                            "loanType": 2,
                            "title": "先截取10个字符串先",
                            "loanAnnualInterestRate": 10,
                            "toBeCollectedPrincipal": 1000,
                            "toBeCollectedInterest": 2000,
                            "curValue": 300,
                            "nextRepayDate": "2016-09-09",
                            "leftTermCount": 2
                        },
                        {
                            "id": 12124,
                            "loanId": "10090",
                            "loanType": 1,
                            "title": "先截取10个字符串先",
                            "loanAnnualInterestRate": 10,
                            "toBeCollectedPrincipal": 1000,
                            "toBeCollectedInterest": 2000,
                            "curValue": 100,
                            "nextRepayDate": "2016-09-09",
                            "leftTermCount": 2
                        }
                    ]
                },
                list3: {
                    "items": [{
                            "id": 12124,
                            "loanId": "10090",
                            "loanType": 1,
                            "title": "先截取10个字符串先33",
                            "loanAnnualInterestRate": 10,
                            "tradePrice": 100,
                            "tradeCommissionFee": 200,
                            "tradeTime": '2016-09-09'
                        },
                        {
                            "id": 12124,
                            "loanId": "10090",
                            "loanType": 2,
                            "title": "先截取10个字符串先33",
                            "loanAnnualInterestRate": 11,
                            "tradePrice": 100,
                            "tradeCommissionFee": 200,
                            "tradeTime": '2016-09-09'
                        },
                        {
                            "id": 12124,
                            "loanId": "10090",
                            "loanType": 1,
                            "title": "先截取10个字符串先33",
                            "loanAnnualInterestRate": 12,
                            "tradePrice": 100,
                            "tradeCommissionFee": 200,
                            "tradeTime": '2016-09-09'
                        },
                    ]
                },
                list4: {
                    "items": [{
                            "id": 12124,
                            "loanId": "10090",
                            "loanType": 1,
                            "title": "先截取10个字符串先33",
                            "loanAnnualInterestRate": 12,
                            "tradePrice": 100,
                            "tradeTime": '2016-09-09'
                        },
                        {
                            "id": 12124,
                            "loanId": "10090",
                            "loanType": 2,
                            "title": "先截取10个字符串先33",
                            "loanAnnualInterestRate": 13,
                            "tradePrice": 200,
                            "tradeTime": '2016-09-19'
                        }
                    ]
                }
            }
        })

    });
    /*资金流水*/
    app.post('/moneyBox', function(req, res) {
        res.json({
            "cash": "1331233", //账户余额
            "totalCharge": "10000", //充值总额
            "totalWithdraw": "1200" //提现总额
        });
    });
    app.post('/serchBoxList', app.bodyParser, function(req, res) {
        if (req.body.type == 220) {
            res.json([{
                "serchTime": "2016年8月23日11:13:08", //s时间
                "serchType": "	投资1冻结", //类型
                "serchProject": "aa11烦烦11112烦", //项目
                "serchIncome": "", //收入
                "serchPay": "-1000", //支出
                "serchRemarks": "标(527841)", //备注
                "type": req.body.type
            }])
        } else {
            res.json([{
                    "serchTime": "2016年8月23日11:13:08", //s时间
                    "serchType": "	投资1冻结", //类型
                    "serchProject": "aa11烦烦11112烦", //项目
                    "serchIncome": "", //收入
                    "serchPay": "-1000", //支出
                    "serchRemarks": "标(527841)", //备注
                    "type": req.body.type
                },
                {
                    "serchTime": "2016年8月23日11:13:08", //s时间
                    "serchType": "	投资冻结", //类型
                    "serchProject": "aa11烦烦烦2", //项目
                    "serchIncome": "", //收入
                    "serchPay": "-2000", //支出
                    "serchRemarks": "标(527841)", //备注
                },
                {
                    "serchTime": "2016年8月23日11:13:08", //s时间
                    "serchType": "	投资冻结", //类型
                    "serchProject": "aa11烦烦烦3", //项目
                    "serchIncome": "", //收入
                    "serchPay": "-1000", //支出
                    "serchRemarks": "标(527841)", //备注
                },
                {
                    "serchTime": "2016年8月23日11:13:08", //s时间
                    "serchType": "	投资冻结", //类型
                    "serchProject": "aa11烦烦烦4", //项目
                    "serchIncome": "", //收入
                    "serchPay": "-10001", //支出
                    "serchRemarks": "标(527841)", //备注
                }
            ])
        }

    });
    /*充值提现*/
    app.post('/RechargeInput', app.bodyParser, function(req, res) {
        /*充值*/
        if (req.body.rechargeType == 1) {
            res.json({
                "rechargeType": "准备跳转",
                "mag": "1",
                "rechargeinput": req.body.rechargeinput
            })
        }
    });
    app.post('/WithdrawInput', app.bodyParser, function(req, res) {
        /*提现*/
        if (req.body.withdraw == 1) {
            res.json({
                "withdraw": "准备跳转",
                "mag": "1",
                "withdrawInput": req.body.withdrawInput
            })
        }
    });
    app.post('/rechargeWithdrawUiBox', function(req, res) {
        res.json({
            "AvlBal": "1", //账户余额
            "rechargeCommission": "3", //充值手续费
            "withdrawCommission": "4", //提现手续费
            "bankRealName": "伟大的", //真实姓名
            "bankCard": "334455666777" //银行卡号
        })
    });
    /*收藏明细*/
    app.post('/closely', function(req, res) {
        res.json([{
                "loanId": "1", //标的ID
                "loanTitle": "经济法硕士", // 标的名称
                "loanAmount": "100000", //标的金额
                "loanProductId": "一次性还本付息", //标的期限付款方式
                "loanTermcount": "10个月", //标的期限
                "loanBiddingAmount": "100", //标的剩余金额
                "loanFavoriteTime": "2016年8月29日10:24:57" //时间
            },
            {
                "loanId": "1", //标的ID
                "loanTitle": "经济法硕士1", // 标的名称
                "loanAmount": "1000001", //标的金额
                "loanProductId": "一次性还本付息1", //标的期限付款方式
                "loanTermcount": "4个月", //标的期限
                "loanBiddingAmount": "1000", //标的剩余金额
                "loanFavoriteTime": "2016年8月29日10:24:57" //时间
            }

        ])
    });
    /*我的积分*/
    app.post('/scoreNum', function(req, res) {
        res.json({
            "scoreUsedPoints": "9999", //累计获取积分
            "scoreConversionPoints": "8888", //可用积分
            "scoreFreezePoints": "1111", //冻结积分
            "scoreExpendPoints": "1111" //已用积分
        })
    });
    /*积分记录*/
    app.post('/integralRecord', function(req, res) {
            res.json([{
                    "createTime": "2016年8月29日10:52:56", //积分记录时间
                    "scoreDetails": "注册", //积分获得详情
                    "scoreStatus": "已获得", //获得积分状态
                    "scorePoints": "+45" //获得积分数量
                },
                {
                    "createTime": "2016年8月29日10:52:56", //积分记录时间
                    "scoreDetails": "登录", //积分获得详情
                    "scoreStatus": "已获得", //获得积分状态
                    "scorePoints": "+15" //获得积分数量
                },
            ])
        })
        /*积分兑换*/
    app.get('/account/scoreExchange', app.bodyParser, function(req, res) {
        res.json({
            "scoreUser": { "id": 10, "userId": 750006, "usedPoints": 1999, "freezePoints": 0, "expendPoints": 0, "conversionPoints": 1999 },
            "pageView": {
                "recordCount": 0,
                "pageSize": 6,
                "pageCount": 10,
                currentPage: req.body.currentPage,
                "voList": [{
                        pictureName: 1,
                        goodsName: 1,
                        points: 1,
                        Id: 1
                    },
                    {
                        pictureName: 1,
                        goodsName: 1,
                        points: 1,
                        Id: 1
                    },
                    {
                        pictureName: 1,
                        goodsName: 1,
                        points: 1,
                        Id: 1
                    },
                    {
                        pictureName: 1,
                        goodsName: 1,
                        points: 1,
                        Id: 1
                    },
                    {
                        pictureName: 1,
                        goodsName: 1,
                        points: 1,
                        Id: 1
                    },
                    {
                        pictureName: 1,
                        goodsName: 1,
                        points: 1,
                        Id: 1
                    },
                    {
                        pictureName: 1,
                        goodsName: 1,
                        points: 1,
                        Id: 1
                    }
                ],
                "pageIndex": {
                    "startIndex": 1,
                    "endIndex": 0
                },
                "pagecode": 5,
                "orderby": null,
                "ascORdesc": 0
            }
        })
    });

    /*    发生兑换的动作   */
    app.post('/account/getGoodsByScore', app.bodyParser, function(req, res) {
        console.log(req.body.goodsId);
        res.json({
            exchange: '兑换成功'
        });
    });

    /*我的红包*/
    app.post('/redMoney', app.bodyParser, function(req, res) {
            if (req.body.status == 2) {
                res.json({
                    redList: [{
                        "redMoneyListAmount": "100", //红包金额
                        "redMoneyListWay": "现金红包", //红包名称
                        "redMoneyListRecieveDate": "2016年8月29日16:12:21", //获得时间
                        "redMoneyListStartDate": "2016年8月29日16:12:21", //生效时间
                        "redMoneyListEndDate": "2017年8月29日16:12:36", //过期时间
                        "redMoneyListRequirement": "10000", //最小投资额
                        "redMoneyListName": "注册", //红包来源
                        "redMoneyListStatus": "未使用" //状态
                    }]
                })
            } else {
                res.json({
                    redMoney: {
                        /*未使用个数*/
                        "rmCountListCount1": "1",
                        "rmCountListCount2": "2",
                        "rmCountListCount3": "3",
                        "rmCountListCount4": "4",
                        /*未使用金额*/
                        "unCountListSumAmount": "100",
                        "unCountListSumRate": "0.8",
                        "unCountListSumGold": "1000",
                        "unCountListSummoney": "10",
                        /*已使用金额*/
                        "countListSumAmount": "0",
                        "countListSumRate": "0",
                        "countListSumGold": "0",
                        "countListSummoney": "0",
                        /*已过期金额*/
                        "overCountListSumAmount": "100",
                        "overCountListSumRate": "0.88",
                        "overCountListSumGold": "10000",
                        "overCountListSummoney": "100"
                    },
                    redList: [{
                            "redMoneyListAmount": "100", //红包金额
                            "redMoneyListWay": "现金红包", //红包名称
                            "redMoneyListRecieveDate": "2016年8月29日16:12:21", //获得时间
                            "redMoneyListStartDate": "2016年8月29日16:12:21", //生效时间
                            "redMoneyListEndDate": "2017年8月29日16:12:36", //过期时间
                            "redMoneyListRequirement": "10000", //最小投资额
                            "redMoneyListName": "注册", //红包来源
                            "redMoneyListStatus": "未使用" //状态
                        },
                        {
                            "redMoneyListAmount": "100", //红包金额
                            "redMoneyListWay": "体验金红包", //红包名称
                            "redMoneyListRecieveDate": "2016年8月29日16:12:21", //获得时间
                            "redMoneyListStartDate": "2016年8月29日16:12:21", //生效时间
                            "redMoneyListEndDate": "2017年8月29日16:12:36", //过期时间
                            "redMoneyListRequirement": "无限制", //最小投资额
                            "redMoneyListName": "注册", //红包来源
                            "redMoneyListStatus": "未使用" //状态
                        }
                    ]
                });
            }
        })
        /*邀请好友*/
    app.post('/inviteFriends', app.bodyParser, function(req, res) {
            res.json({
                userId: {
                    "userIdCard": "" //用户身份证
                },
                inviteUrlImg: {
                    "inviteUrl": "www.baidu.com ", //分享地址
                    "inviteImgSrc": "../../static/account/recharge/img/tixiantanhao.png" //分享二维码
                },
                inviteFriendsList: [{
                        "invitedName": "沃达丰", //邀请用户昵称
                        "inviteeRegDate": "2016年8月30日11:15:20", //用户注册时间
                        "invitedStatu": "登录", //用户状态
                        "invitedRedMoneyWay": "100元", //邀请奖励
                        "invitedMoneyStatus": "是" //是否生效
                    },
                    {
                        "invitedName": "沃达丰1", //邀请用户昵称
                        "inviteeRegDate": "2016年8月30日11:15:20", //用户注册时间
                        "invitedStatu": "登录1", //用户状态
                        "invitedRedMoneyWay": "1001元", //邀请奖励
                        "invitedMoneyStatus": "是" //是否生效
                    }
                ]

            })
        })
        /*我的喜好*/
    app.post('/hobbyTable', app.bodyParser, function(req, res) {
            res.json({
                hobbyTable: [{
                    "hobbyTableId": "1102", //喜好ID
                    "gradleName": "2", //借款人等级
                    "sopeFundsLower": "50000.00", //金额范围
                    "sopeFundsUpper": "70000.00",
                    "termLower": "0", //期限范围
                    "termUpper": "1",
                    "rateLower": "0", //利率范围
                    "rateUpper": "5",
                    "isPush": "否", //是否推送
                    "pushWay": "", //推送方式
                    "currentPage": "",
                    "pageSize": ""
                }]
            })
        })
        /*我的喜好设置添加*/
    app.post('/hobbyTableAdd', app.bodyParser, function(req, res) {
        if (req.body.creditId) {
            res.json({
                    "hobbyTableId": req.body.creditId, //喜好ID
                    "gradleName": req.body.gradleName, //借款人等级
                    "sopeFundsLower": req.body.sopeFundsLower, //金额范围
                    "sopeFundsUpper": req.body.sopeFundsUpper,
                    "termLower": req.body.termLower, //期限范围
                    "termUpper": req.body.termUpper,
                    "rateLower": req.body.rateLower, //利率范围
                    "rateUpper": req.body.rateUpper,
                    "isPush": req.body.isPush, //是否推送
                    "pushWayMail": req.body.pushWayMail, //推送方式
                    "pushWayEmail": req.body.pushWayEmail, //邮件
                    "pushWayMassage": req.body.pushWayMassage //短信
                }

            )
        }
    })
    app.post('/hobbyTableSet', app.bodyParser, function(req, res) {
        res.json({
            hobbyTable: {
                "hobbyTableId": "1102", //喜好ID
                "gradleName": "2", //借款人等级
                "sopeFundsLower": "50000.00", //金额范围
                "sopeFundsUpper": "70000.00",
                "termLower": "0.00", //期限范围
                "termUpper": "1.00",
                "rateLower": "0.00", //利率范围
                "rateUpper": "0.05",
                "isPush": true, //是否推送
                "pushWayMail": "-1-", //推送方式
                "pushWayEmail": "-2-", //邮件
                "pushWayMassage": "-3-" //短信
            }
        })
    });
    app.post('/account/boundPhoneWithNoForward', app.bodyParser, function(req, res) {
        if (req.body.mobilePhone = '18734820743') {
            res.send(true);
        } else {
            res.send(false);
        }
    });

}

/*verify*/