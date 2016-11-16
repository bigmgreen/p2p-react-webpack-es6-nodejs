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
 * 请求地址
 */
var URL = Global.URLS.ACCOUNT;

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
        this.setState({loan: nextProps.loan});
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

var RepaymentTable = React.createClass({
    getInitialState: function () {
        return {
            list: {
                repayMentDate: null,
                status: null,
                plannedTermInterest: null,
                plannedTermPrincipal: null,
                overDueInterest: null
            }
        };
    },
    componentWillReceiveProps: function (nextProps) {
        this.setState({
            list: nextProps.repayMentList
        });
    },
    render: function () {
        return (
            <section>
                <h4 className="account-wrap-title">收款计划</h4>
                <Table
                    {...this.state}
                    tableClass="table table-hover table-bordered"
                    queryData={this.queryData}
                    th={['收款日期', '状态', '应收利息', '应收本金', '应收罚息']}
                    callBack={
                        function (item) {
                            return (
                                <tr>
                                    <td>{item.repayMentDate}</td>
                                    <td>{item.status}</td>
                                    <td>{'￥' + item.plannedTermInterest}</td>
                                    <td>{'￥' + item.plannedTermPrincipal}</td>
                                    <td>{'￥' + item.overDueInterest}</td>
                                </tr>
                            )
                        }.bind(this)
                    }
                />
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
        this.queryData();
    },
    queryData: function () {
        /**   设置选中效果  */
        $('[data-account-left]').find('a').each(function () {
            if ($(this).attr('href') === 'message-center.html') {
                $(this).addClass('active');
                return false;
            }
        });

        $.get(URL.INVEST.COLLECTION_PLANNING, Utils.queryStrToJson(), function (result) {
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
                        pageName: '收款计划'
                    }}/>
                    <div className="clear-fix">
                        <AccountLeft  {...this.state}/>
                        <AccountRight  {...this.state} queryData={this.queryData}/>
                    </div>
                </div>
                <Footer {...this.state}/>
            </div>
        );
    }
});

ReactDOM.render(<App />, document.getElementById('app'));