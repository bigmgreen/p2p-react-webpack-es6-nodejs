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
 * 购买债权确认框组件
 */
var DebtAgreement = Global.component.DebtAgreement;
/**
 * 请求地址
 */
var URL = Global.URLS;
/**
 * 链接地址
 */
var LINK = Global.LINK;

/**
 * 搜索条件
 */
var SearchTerms = React.createClass({
    getInitialState: function () {
        return {
            priceRanges: null,
            priceRangeIndex: null,
            interestRanges: null,
            interestRangeIndex: null
        };
    },
    handleClick: function (param, event) {
        event.preventDefault();
        this.props.queryData(param);
        this.setState(param);
    },
    getItem: function (ranges, index, key) {
        return ranges && ranges.map(function (result, i) {
                /* 初始化参数 */
                var param = {};
                param[key] = i;
                param.currentPage = 1;
                return (
                    <dd>
                        <button
                            type="button"
                            className={i == index ? "active" : null}
                            onClick={this.handleClick.bind(this, param)}>{result}</button>
                    </dd>
                );
            }.bind(this));
    },
    componentWillReceiveProps: function (props) {
        this.setState(props.searchTerms);
    },
    render: function () {
        return (
            <section className="page-container">
                <h3 className="list-tab">
                    <ul>
                        <li className="list-item"><a href={LINK.INVEST_LIST}>项目投资</a></li>
                        <li className="list-item active"><a href={LINK.DEBT_LIST}>债权购买</a></li>
                    </ul>
                </h3>
                <div className="search-area clear-fix">
                    <div className="pull-left">
                        <dl>
                            <dt>债权价格</dt>
                            {this.getItem(this.state.priceRanges, this.state.priceRangeIndex, 'priceRangeIndex')}
                        </dl>
                        <dl>
                            <dt>年化利率</dt>
                            {this.getItem(this.state.interestRanges, this.state.interestRangeIndex, 'interestRangeIndex')}
                        </dl>
                    </div>
                    <div className="pull-right">
                        <p>收获财富，如此简单</p>
                        <img className="lb" src="../../static/list/invest-list/img/lb.png"/>
                        <img className="lb1" src="../../static/list/invest-list/img/lb1.png"/>
                    </div>
                </div>
            </section>
        );
    }
});

/**
 * 表格数据
 */
var DebtTable = React.createClass({
    getInitialState: function () {
        return {
            userId: null,
            userCode: null,
            list: [
                {
                    loanType: null,
                    loanId: null,
                    loanTitle: null,
                    loanAnnualInterestRate: null,
                    collectInterest: null,
                    soldPrice: null,
                    soldCommission: null,
                    nextRepayDate: null,
                    leftTermCount: null,
                    id: null
                }
            ]
        };
    },
    checkDebt: function (loan) {

        var userId = this.state.userId;
        //是否登录
        if (userId === null) {
            $('#checkModalBody').html("您还没有登录！<a class='text-warning' href=" + LINK.USER.LOGIN + ">登录</a>后可进行债权购买!");
            $('#checkModal').modal();
            return;
        }

        //是否注册第三方
        if (this.state.userCode === null) {
            $('#checkModalBody').html("你还没有开户，现在就去<a href=" + LINK.ACCOUNT.RECHARGE + ">开户</a>!");
            $('#checkModal').modal();
            return;
        }

        //余额不足
        Utils.getUserCash(function (userCash) {
            //*100  1.转成数字 2.js中小数比较不靠谱，转成整数
            if (userCash * 100 < loan.soldPrice * 100) {
                $('#checkModalBody').html("您的余额不足，<a href=" + LINK.ACCOUNT.RECHARGE + ">马上充值</a>!");
                $('#checkModal').modal('show');
                return;
            }

            Utils.checkLoginStatus.bind(this, this.showConfirmDebt(loan), null);
        }.bind(this));
    },
    showConfirmDebt: function (loan) {
        $.post(URL.DEBT_AGREEMENT, {loanInvestorId: loan.id},
            function (result) {
                if (parseInt(result.agreement.statusCode) < 0) {
                    $('#checkModalBody').html(result.agreement.statusMessage);
                    $('#checkModal').modal('show');
                    return;
                }

                result.id = loan.id;
                result.userId = this.state.userId;
                this.setState({debtAgreement: result});
                $('#buyDialog').modal();
            }.bind(this)
        );
    },
    buyDebt: function (id, userId) {
        $('#buyDialog').modal('hide');
        window.open(LINK.BUY_DEBT + id + '&userId=' + userId, "_blank");
    },
    componentWillReceiveProps: function (nextProps) {
        this.setState({
            userId: nextProps.appUser && nextProps.appUser.userId,
            userCode: nextProps.appUser && nextProps.appUser.userCode,
            list: nextProps.pageView.voList,
            pageView: nextProps.pageView,
            queryData: nextProps.queryData
        });
    },
    render: function () {
        return (
            <div>
                <Table
                    {...this.state}
                    th={['项目名称', '年化利率', '待收本息(元)', '转让价格(元)', '手续费(元)', '下个还款日', '剩余期数(期)', '操作']}
                    callBack={
                        function (loan) {
                            return (
                                <tr>
                                    <td>
                                        <a className="invest-title"
                                           title={loan.loanTitle}
                                           href={Utils.getInvestUrl(loan)}>{loan.loanTitle}</a>
                                    </td>
                                    <td>{loan.loanAnnualInterestRate}</td>
                                    <td>{loan.collectInterest}</td>
                                    <td>{loan.soldPrice}</td>
                                    <td>{loan.soldCommission}</td>
                                    <td>{loan.nextRepayDate}</td>
                                    <td>{loan.leftTermCount}</td>
                                    <td>
                                        <button className="btn-debt"
                                                type="button"
                                                onClick={this.checkDebt.bind(this, loan)}>
                                            认购
                                        </button>
                                    </td>
                                </tr>
                            );
                        }.bind(this)
                    }
                />
                <DebtAgreement {...this.state} buyDebt={this.buyDebt}/>
            </div>
        );
    }
});

var App = React.createClass({
    queryData: function (param) {
        if (param) {
            this.param = $.extend(this.param, param);
        } else {
            this.param = {
                currentPage: 1,
                priceRangeIndex: 0,
                interestRangeIndex: 0
            }
        }

        $.get(URL.DEBT_LIST, this.param, function (result) {
            this.setState(result);
        }.bind(this));
    },
    componentDidMount: function () {
        this.queryData();
    },
    render: function () {
        return (
            <div>
                <Header {...this.state}/>
                <SearchTerms queryData={this.queryData} {...this.state} />
                <section className="page-container clear-fix">
                    <h3 className="list-tab">
                        <span className="list-item active">债权列表<a href={LINK.OTHER.CALCULATE}><img
                            src="../../static/list/debt-list/img/lc.png"/></a></span>
                    </h3>
                    <DebtTable {...this.state} queryData={this.queryData}/>
                </section>
                <Footer {...this.state}/>
                <Modal {...{
                    id: 'checkModal',
                    isBig: false,
                    title: '提示',
                    bodyId: 'checkModalBody',
                    showHead: true,
                    showFoot: false
                }}/>
            </div>
        );
    }
});

ReactDOM.render(<App />, document.getElementById('app'));