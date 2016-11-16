/**
 * 头部组件
 */
var Header = Global.component.Header;
/**
 * 底部组件
 */
var Footer = Global.component.Footer;
/**
 * 表格组件
 */
var Table = Global.component.Table;
/**
 * 左菜单组件
 */
var AccountLeft = Global.component.AccountLeft;
/**
 * 合同弹窗
 */
var ContractConfirm = Global.component.ContractConfirm;
/**
 * 请求地址
 */
var URL = Global.URLS.ACCOUNT.ACCOUNT_CENTER;
/**
 * 链接地址
 */
var LINK = Global.LINK;
/**
 * Mixins
 */
var Mixins = {
    tabSetItem: function (num) {
        sessionStorage.setItem('react-tab-index' + LINK.ACCOUNT.RECHARGE.split('/').pop(), num);
        location.href = LINK.ACCOUNT.RECHARGE;
    }
}

/**
 * 待签约的标列表
 */
var WaitingDeal = React.createClass({
    getInitialState: function () {
        return {
            /*   待签约的标的列表   */
            list: [
                {
                    /*  标的标题    */
                    title: null,
                    /*  投资金额    */
                    amount: null,
                    /*  投资期限    */
                    termCount: null,
                    /*  投资期限单位    */
                    termUnit: null,
                    /*  年化收益率    */
                    annualInterestRate: null,
                    /*  信用等级    */
                    creditDegree: null,
                    /*  标的id    */
                    loanId: null,
                    /*  开标时间    */
                    openTime: null,
                    /*  结标时间    */
                    openEndTime: null,
                    /*  借款协议编号    */
                    contractNo: null
                }
            ],
            appUser: {
                /*   借款人真名   */
                realName: null,
                /*   借款人昵称   */
                nickName: null
            },
            /*  弹窗合同的数据类型  */
            loan: {
                /*  标的标题    */
                title: null,
                /*  投资金额    */
                amount: null,
                /*  投资期限    */
                termCount: null,
                /*  投资期限单位    */
                termUnit: null,
                /*  年化收益率    */
                annualInterestRate: null,
                /*  信用等级    */
                creditDegree: null,
                /*  标的id    */
                loanId: null,
                /*  开标时间    */
                openTime: null,
                /*  结标时间    */
                openEndTime: null,
                /*  借款协议编号    */
                contractNo: null
            }
        };
    },
    componentWillReceiveProps: function (nextProps) {
        this.setState(nextProps);
    },
    handleClick: function (item) {
        this.setState({loan: item}, function () {
            $('#contractModal').modal();
        }.bind(this));
    },
    queryData: function () {
        $.get(URL.GET_WAIT_LIST).done(function (result) {
            this.setState({list: result});
        }.bind(this));
    },
    render: function () {
        return (
            <div className="tabBox">
                <ul className="navTab tc widAuto">
                    <li className="active wid150"><a href="#">待签约的标</a></li>
                </ul>
                <div className="tabContent">
                    <Table
                        {...this.state}
                        tableClass="table table-hover table-bordered"
                        th={['标题', '金额', '期限', '年化利率', '信用等级', '签订合同']}
                        callBack={
                            function (item) {
                                return (
                                    <tr>
                                        <td><span className="text-overflow-small">{item.title}</span></td>
                                        <td>{item.amount}元</td>
                                        <td>{item.termCount}</td>
                                        <td>{item.annualInterestRate}</td>
                                        <td>{item.creditDegree}</td>
                                        <td>
                                            <button
                                                className="btn-contract"
                                                onClick={this.handleClick.bind(this, item)}>合同
                                            </button>
                                        </td>
                                    </tr>
                                )
                            }.bind(this)
                        }
                    />
                </div>
                <ContractConfirm
                    {...this.state}
                    queryData={this.queryData}
                    id='contractModal'
                    modalTitle='签订合同'
                    bodyId='contractModalBody'
                />
            </div>
        );
    }
});

/**
 * 数据披露
 */
var ShowData = React.createClass({
    getInitialState: function () {
        return {
            userInfo: {
                balance: {
                    toCollectPrincipal: '0.00',
                    toCollectInterest: '0.00',
                    totalPermittedAmount: '0.00',
                    actualLoanAmount: '0.00',
                    totalToRepayAmount: '0.00',
                    toCollectRedmoneyInterest: '0.00',
                    totalInvestAmout: '0.00',
                    totalEarnedRedmoneyInterest: '0.00',
                    totalEarnedPunitiveInterest: '0.00',
                    totalEarnedInterest: '0.00'
                },
                totalAssertNew: '0.00',
                totalToInterest: '0.00'
            },
            /**
             * 第三方信息
             */
            onLineInfo: {
                AcctBal: '0.00',
                AvlBal: '0.00',
                FrzBal: '0.00'
            }
        }
    },
    /**
     * 返回资产总额
     * @param state
     * @returns {string}
     * @private
     */
    _getTotalAssertNew: function (state) {
        var info = state.userInfo;
        var onLineInfo = state.onLineInfo;
        var toCollectPrincipal = Number(info.balance.toCollectPrincipal);
        var toCollectInterest = Number(info.balance.toCollectInterest);
        var toCollectRedmoneyInterest = Number(info.balance.toCollectRedmoneyInterest);
        var frzBal = Number(onLineInfo.FrzBal);
        var acctBal = Number(onLineInfo.AcctBal);

        return (toCollectPrincipal + toCollectInterest + toCollectRedmoneyInterest + frzBal + acctBal).toFixed(2);
    },
    /**
     * 返回待收收益
     * @param state
     * @private
     */
    _getToCollectInterest: function (state) {
        var info = state.userInfo;
        var toCollectInterest = Number(info.balance.toCollectInterest);
        var toCollectRedmoneyInterest = Number(info.balance.toCollectRedmoneyInterest);

        return (toCollectInterest + toCollectRedmoneyInterest).toFixed(2);
    },
    /**
     * 返回累计收益
     * @param state
     * @private {string}
     */
    _getTotalToInterest: function (state) {
        var info = state.userInfo;
        var totalEarnedInterest = Number(info.balance.totalEarnedInterest);
        var totalEarnedPunitiveInterest = Number(info.balance.totalEarnedPunitiveInterest);
        var totalEarnedRedmoneyInterest = Number(info.balance.totalEarnedRedmoneyInterest);

        return (totalEarnedInterest + totalEarnedPunitiveInterest + totalEarnedRedmoneyInterest).toFixed(2);
    },
    componentDidMount: function () {
        $.get(URL.GET_ACCOUNT_INFO).done(function (result) {

            if (typeof result.onLineInfo.fail === 'string') {
                delete result.onLineInfo.fail;
                result.onLineInfo = {
                    AcctBal: '0.00',
                    AvlBal: '0.00',
                    FrzBal: '0.00'
                };
            }
            this.setState(result);
            this.props.getCash(this.state.onLineInfo.AcctBal);
        }.bind(this));
    },
    render: function () {
        var userInfo = this.state.userInfo;
        return (
            <section className="account-data">
                <table>
                    <tbody>
                    <tr>
                        <td className="clearfix tc">
                            <img src="../../static/account/account/img/acc-cash-1.png" className="fl"/>
                            <span className="fl">
                                <strong>待收本金(元)</strong>
                                <span>{Number(userInfo.balance.toCollectPrincipal).toFixed(2)}</span>
                            </span>
                        </td>
                        <td className="clearfix tc">
                            <img src="../../static/account/account/img/acc-cash-2.png" className="fl"/>
                            <span className="fl">
                                <strong>待收收益(元)</strong>
                                <span>{this._getToCollectInterest(this.state)}</span>
                            </span>
                        </td>
                        <td className="clearfix tc">
                            <img src="../../static/account/account/img/acc-cash-1.png" className="fl"/>
                            <span className="fl">
                                <strong>冻结资金(元)</strong>
                                <span>{Number(this.state.onLineInfo.FrzBal).toFixed(2)}</span>
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td className="clearfix tc">
                            <img src="../../static/account/account/img/acc-cash-4.png" className="fl"/>
                            <span className="fl">
                                <strong>累计收益(元)</strong>
                                <span>{this._getTotalToInterest(this.state)}</span>
                            </span>
                        </td>
                        <td className="clearfix tc">
                            <img src="../../static/account/account/img/acc-cash-5.png" className="fl"/>
                            <span className="fl">
                                <strong>投资金额(元)</strong>
                                <span>{Number(userInfo.balance.totalInvestAmout).toFixed(2)}</span>
                            </span>
                        </td>
                        <td className="clearfix tc">
                            <img src="../../static/account/account/img/acc-cash-6.png" className="fl"/>
                            <span className="fl">
                                <strong>资产总额(元)</strong>
                                <span>{this._getTotalAssertNew(this.state)}</span>
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td className="clearfix tc">
                            <img src="../../static/account/account/img/acc-cash-7.png" className="fl"/>
                            <span className="fl">
                                <strong>申请借款总额(元)</strong>
                                <span>{Number(userInfo.balance.totalPermittedAmount).toFixed(2)}</span>
                            </span>
                        </td>
                        <td className="clearfix tc">
                            <img src="../../static/account/account/img/acc-cash-8.png" className="fl"/>
                            <span className="fl">
                                <strong>实到借款资金(元)</strong>
                                <span>{Number(userInfo.balance.actualLoanAmount).toFixed(2)}</span>
                            </span>
                        </td>
                        <td className="clearfix tc">
                            <img src="../../static/account/account/img/acc-cash-9.png" className="fl"/>
                            <span className="fl">
                                <strong>待还资金(元)</strong>
                                <span>{Number(userInfo.balance.totalToRepayAmount).toFixed(2)}</span>
                            </span>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </section>
        );
    }
});

/**
 * 账户页右半部分
 */
var AccountRight = React.createClass({
    mixins: [Mixins],
    getInitialState: function () {
        return {
            appUser: {
                nickName: null,
                portrait: null,
                roles: null,
                userCode: null,
                userId: null
            },
            info: {
                userVip: null,
                userScore: null
            },
            authentication: {},
            AcctBal: '0.00'
        };
    },
    componentWillReceiveProps: function (nextProps) {
        this.setState(nextProps, function () {
            /**
             * 如果用户登录就获取下面数据
             */
            if (this.state.appUser instanceof Object) {
                this._getVIP();
                this._verify();

                if (typeof this.state.appUser.userCode !== 'string') {
                    $("#tipModal").modal();
                }
            }
        }.bind(this));
    },
    /**
     * 获取用户积分+会员信息
     * @private
     */
    _getVIP: function () {
        $.get(URL.GET_VIP).done(function (result) {
            this.setState({
                info: {
                    userVip: result.userVip,
                    userScore: result.userScore
                }
            });
        }.bind(this));
    },
    /**
     * 获取用户认证信息
     * @private
     */
    _verify: function () {

        $.get(URL.VERIFY).done(function (result) {
            var authentication = {
                phoneSrc: '../../static/account/account/img/unphone.png',
                phoneTitle: '手机未认证',
                emailSrc: '../../static/account/account/img/unemail.png',
                emailTitle: '邮箱未认证',
                realNameSrc: '../../static/account/account/img/unid-card.png',
                realNameTitle: '实名未认证',
                bankcardBindSrc: '../../static/account/account/img/un-card.png',
                bankcardBindTitle: '银行卡未认证',
            };

            var user = result.appUser;
            if (typeof user.mobile === 'string') {
                authentication.phoneSrc = '/static/themes/default/img/account/phone.png';
                authentication.phoneTitle = "手机已认证";
            }
            if (typeof user.email === 'string') {
                authentication.emailSrc = '/static/themes/default/img/account/email.png';
                authentication.emailTitle = "邮箱已认证";
            }
            if (typeof user.realName === 'string') {
                authentication.realNameSrc = '/static/themes/default/img/account/id-card.png';
                authentication.realNameTitle = "实名已认证";
            }
            if (typeof result.bankcardBind === 'number') {
                authentication.bankcardBindSrc = '/static/themes/default/img/account/card.png';
                authentication.bankcardBindTitle = "银行卡已认证";
            }

            this.setState({authentication: authentication});
        }.bind(this));

    },
    /**
     * 从子元素获取余额
     */
    getSubAcctBal: function (acctBal) {
        this.setState({AcctBal: acctBal});
    },
    render: function () {
        var authentication = this.state.authentication;
        return (
            <div className="account-right">
                <section className="first-content clearfix">
                    <div className="user-img">
                        <figure>
                            <img src="../../static/account/account/img/head.jpg" className="myImage"/>
                            <figcaption className="tc">
                                <img title={authentication.phoneTitle} src={authentication.phoneSrc}/>
                                <img title={authentication.emailTitle} src={authentication.emailSrc}/>
                                <img title={authentication.realNameTitle} src={authentication.realNameSrc}/>
                                <img title={authentication.bankcardBindTitle} src={authentication.bankcardBindSrc}/>
                            </figcaption>
                        </figure>
                    </div>
                    <div className="user-info">
                        <h4>{this.state.appUser.nickName},欢迎您!</h4>
                        <span className="user-vip">会员等级:{this.state.info.userVip}</span>
                        <span className="user-score">会员积分:{this.state.info.userScore}</span>
                    </div>
                    <div className="user-total tc">
                        <span className="f16">账户余额(元)</span>
                        <h4>{this.state.AcctBal}</h4>
                    </div>
                    <div className="user-doing">
                        <button type="button" onClick={this.tabSetItem.bind(this, 0)}>充值</button>
                        <button type="button" onClick={this.tabSetItem.bind(this, 1)}>提现</button>
                    </div>
                </section>
                <ShowData getCash={this.getSubAcctBal}/>
                <WaitingDeal {...this.props} />
            </div>
        );
    }
});

var App = React.createClass({
    componentDidMount: function () {
        $.get(URL.GET_INFO, function (result) {
            this.setState(result);
        }.bind(this));
    },
    render: function () {
        return (
            <div>
                <Header {...this.state}/>
                <div className="page-container">
                    <Breadcrumb {...{
                        index: '首页',
                        pageName: '账户概览'
                    }}/>
                    <div className="clear-fix">
                        <AccountLeft {...this.state}/>
                        <AccountRight {...this.state}/>
                    </div>
                    <Modal {...{
                        id: 'tipModal',
                        isBig: false,
                        title: '开户提醒',
                        showHead: true,
                        showFoot: false,
                        body: (
                            <span>
                            <span>你还没有开户，现在就去</span>
                            <a href={LINK.ACCOUNT.ACCOUNT_SETTING}>开户</a>
                            <span>!</span>
                        </span>
                        )
                    }}/>
                </div>
                <Footer {...this.state}/>
            </div>
        );
    }
});

ReactDOM.render(<App />, document.getElementById('app'));