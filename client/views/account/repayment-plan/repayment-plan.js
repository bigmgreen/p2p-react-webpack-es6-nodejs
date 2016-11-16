/**
 * 头部组件
 */
var Header = Global.component.Header;
/**
 * 底部组件
 */
var Footer = Global.component.Footer;
/**
 * 面包屑组件
 */
var Breadcrumb = Global.component.Breadcrumb;
/**
 * 表格组件
 */
var Table = Global.component.Table;
/**
 * 左菜单组件
 */
var AccountLeft = Global.component.AccountLeft;
/**
 * 弹框组件
 */
var Modal = Global.component.Modal;
/**
 * 请求地址
 */
var URL = Global.URLS.ACCOUNT;
/**
 * 链接地址
 */
var LINK = Global.LINK;


var LoanInfo = React.createClass({
    getInitialState: function () {
        return {
            loan: {
                title: null,
                amount: null,
                annualInterestRate: null,
                termCount: null,
                termUnit: null,
                description: null,
            }
        };
    },
    componentWillReceiveProps: function (nextProps) {
        this.setState({loan: nextProps.info.loan});
    },
    render: function () {
        var loan = this.state.loan;
        return (
            <section>
                <h4 className="account-wrap-title">{loan.title}</h4>
                <table className="table">
                    <thead>
                    <tr>
                        <th>借款金额</th>
                        <th>年化利率</th>
                        <th>期限</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>{'￥' + loan.amount + '元'}</td>
                        <td>{loan.annualInterestRate + '%'}</td>
                        <td>{Utils.formatTerm(loan.termCount, loan.termUnit)}</td>
                    </tr>
                    </tbody>
                </table>
                <div className="loan-description">
                    <strong>借款用途说明：</strong>
                    <p>{loan.description}</p>
                </div>
            </section>
        );
    }
});

var RepaymentPanel = React.createClass({
    getInitialState: function () {
        return {
            repaymentMoney: 0,
            cash: 0
        };
    },
    componentWillReceiveProps: function (nextProps) {
        this.setState(nextProps.info);
    },
    componentDidMount: function () {
        /***
         * 获取用户余额
         */
        Utils.getUserCash(function (cash) {
            this.setState({cash: cash});
        }.bind(this));
    },
    /**
     * 还款，计算还款钱余额
     * @param repaymentMoney  应还金额
     * @param cash  余额
     */
    repay: function (param) {

        var repaymentMoney = param.repaymentMoney;
        var cash = param.cash;

        if (repaymentMoney === 0) {
            $("#validateModalBody").html('请选择要还款的分期');
            $('#validateModal').modal();
            return;
        }
        if (cash < repaymentMoney) {
            $("#validateModalBody").html("您的余额不足，<a href='../views/account/recharge.html'>马上充值</a>!");
            $('#validateModal').modal();
            return;
        }

        if (confirm("您确定要还款吗?")) {
            $.post(URL.BORROW.REPAY, {
                loanId: param.loan.loanId,
                userId: param.loan.borrowerId,
                parseNumber: param.parseNumber,
                transAmt: repaymentMoney,
                prepayType: 1
            }).done(function () {
                this.props.queryData();
            }.bind(this));
        }
    },
    render: function () {
        return (
            <div className="repay-wrap">
                <div className="repay-item">
                    <span className="repay-text">选择的还款额(元)</span>
                    <span className="repay-value">{'￥' + this.state.repaymentMoney}</span>
                </div>
                <div className="repay-item">
                    <span className="repay-text">账户余额(元)</span>
                    <span className="repay-value">{'￥' + this.state.cash}</span>
                </div>
                <button
                    type="button"
                    className="btn btn-success"
                    onClick={this.repay.bind(this, this.state)}
                >还款
                </button>
            </div>
        );
    }
});

var RepaymentTable = React.createClass({
    getInitialState: function () {
        return {
            info: {
                loan: {
                    loanId: null,
                    borrowerId: null
                },
                list: {
                    //期数，第一期是1，第二期是2，以此类推
                    phaseNumber: null,
                    //本期应还本息
                    plannedTermAmount: null,
                    //逾期费用
                    overDueFee: null,
                    //应付罚息
                    overDueInterest: null,
                    dueDate: null,
                    plannedTermInterest: null,
                    plannedTermPrincipal: null,
                    transactionFee: null,
                    overDueDays: null,
                    isRepaid: null,
                    repaidAmount: null,
                    loanPhaseStatus: null,
                    id: null
                },
                //应还金额
                repaymentMoney: 0,
                //期数
                parseNumber: null,
            },
            payProvider: null,
        };
    },
    /**
     * 获取还款状态
     * @param loan
     */
    getRepaymentTextByStatus: function (loan) {
        if (loan.isRepaid === true && loan.loanPhaseStatus === 2) {
            return (
                <span style={{'color': 'green'}}>已还</span>
            );
        } else if (loan.isRepaid === false){
            switch (parseInt(loan.loanPhaseStatus)) {
                case 0:
                    return (
                        <span>未还款</span>
                    );
                case 1:
                    return (
                        <span style={{'color': 'red'}}>处理中</span>
                    );
                case 3:
                    return (
                        <span style={{'color': 'green'}}>失败</span>
                    );
            }
        }
    },
    /**
     * 生成还款单选按钮
     * @param item
     */
    getRepaymentRadio: function (item) {
        if (
            item.isRepaid === false &&
            (item.loanPhaseStatus === 0 || item.loanPhaseStatus === 3) &&
            item.loanPhaseStatus !== 1
        ) {
            return (
                <input
                    type="radio"
                    name="parseNumber"
                    onClick={this.callPrice.bind(this, Utils.getRepaymentMoney(item), item.id)}
                />
            );
        }
    },
    /**
     * 计算还款金额
     * @param repaymentMoney
     */
    callPrice: function (repaymentMoney, id) {
        this.setState({
            info: {
                repaymentMoney: repaymentMoney,
                parseNumber: id
            }
        });
    },
    componentWillReceiveProps: function (nextProps) {
        this.setState({
            info: {
                list: nextProps.info.phases,
                loan: nextProps.info.loan
            },
            payProvider: nextProps.payProvider
        });
    },
    render: function () {
        var payProvider = (this.state.payProvider !== 'ips');
        return (
            <section>
                <h4 className="account-wrap-title">还款计划</h4>
                <Table
                    {...this.state.info}
                    tableClass="table table-hover table-bordered"
                    queryData={this.props.queryData}
                    th={['期数', '应还金额', '应还日期', '应还利息', '应还本金',
                        {
                            text: '还款手续费',
                            isShow: payProvider
                        },
                        '逾期费用', '逾期天数', '当期已还总额', '状态', '还款']}
                    callBack={
                        function (item) {
                            return (
                                <tr>
                                    <td>{item.phaseNumber}</td>
                                    <td>{'￥' + Utils.getRepaymentMoney(item)}</td>
                                    <td>{item.dueDate}</td>
                                    <td>{'￥' + item.plannedTermInterest}</td>
                                    <td>{'￥' + item.plannedTermPrincipal}</td>
                                    {payProvider ? <td>{'￥' + item.transactionFee}</td> : null}
                                    <td>{'￥' + (typeof item.overDueFee === 'number' ? item.overDueFee + item.overDueInterest : 0.00)}</td>
                                    <td>{typeof item.overDueDays === 'number' ? item.overDueDays : 0}天</td>
                                    <td>{'￥' + (item.isRepaid ? (Utils.getRepaidTotal(item)) : 0.00)}</td>
                                    <td>{this.getRepaymentTextByStatus(item)}</td>
                                    <td>{this.getRepaymentRadio(item)}</td>
                                </tr>
                            )
                        }.bind(this)
                    }
                />
                <RepaymentPanel {...this.state} queryData={this.props.queryData}/>
            </section>
        );
    }
});

var AccountRight = React.createClass({
    componentWillReceiveProps: function (nextProps) {
        this.setState(nextProps);
    },
    render: function () {
        return (
            <div className="account-right account-wrap">
                <LoanInfo {...this.state} />
                <RepaymentTable {...this.state} />
            </div>
        );
    }
});

var App = React.createClass({
    componentDidMount: function () {

        /**   设置选中效果  */
        $('[data-account-left]').find('a').each(function () {
            if ($(this).attr('href') === 'message-center.html') {
                $(this).addClass('active');
                return false;
            }
        });

        this.queryData();
    },
    queryData: function () {
        $.get(URL.BORROW.REPAYMENT_PLAN, {loanId: Utils.getUrlQueryValue()}, function (result) {
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
                    pageName: '还款计划'
                }}/>
                <div className="clear-fix">
                    <AccountLeft {...this.state}/>
                    <AccountRight {...this.state} queryData={this.queryData}/>
                </div>
                <Modal {...{
                    id: 'loginModal',
                    isBig: false,
                    title: '提示',
                    showHead: true,
                    showFoot: false,
                    body: (
                        <span>
                            <span>你还没有登录平台，请你去</span>
                            <a className="text-warning" href={LINK.USER.LOGIN}>登录</a>
                        </span>
                    )
                }}/>
                <Modal {...{
                    id: 'validateModal',
                    isBig: false,
                    title: '还款提醒',
                    bodyId: 'validateModalBody',
                    showHead: true,
                    showFoot: false
                }}/>
            </div>
            <Footer {...this.state}/>
        </div>
        );
    }
});

ReactDOM.render(<App />, document.getElementById('app'));