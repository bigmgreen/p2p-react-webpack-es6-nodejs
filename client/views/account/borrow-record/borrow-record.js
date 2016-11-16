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
 * 标签页组件
 */
var Tab = Global.component.Tab;
/**
 * 弹框组件
 */
var Modal = Global.component.Modal;
/**
 * 输入框组件
 */
var Input = Global.component.Input;
/**
 * 请求地址
 */
var URL = Global.URLS.ACCOUNT;
/**
 * 链接地址
 */
var LINK = Global.LINK;

var AccountRight = React.createClass({
    componentWillReceiveProps: function (nextProps) {
        this.setState(nextProps);
    },
    render: function () {

        return (
            <Tab
                index={Utils.getHashValue()}
                className={{
                    container: 'account-right',
                    header: 'tab-header',
                    title: 'tab-button',
                    content: 'tab-content',
                    item: 'tab-item'
                }}
                tabItemIds={[
                    {repaymentIn: '偿还中借款'},
                    {fundraising: '筹款中借款'},
                    {audit: '审核中借款'},
                    {alreadyRepaid: '已偿还借款'}
                ]}
                tabItemClick={[
                    this.props.queryData.bind(this, {currentPage: 1}, URL.BORROW.REPAYMENT_IN),
                    this.props.queryData.bind(this, {currentPage: 1}, URL.BORROW.FUNDRAISING),
                    this.props.queryData.bind(this, {currentPage: 1}, URL.BORROW.AUDIT),
                    this.props.queryData.bind(this, {currentPage: 1}, URL.BORROW.ALREADY_REPAID)
                ]}
                tabItem={[
                    {
                        repaymentIn: <Table
                            {...this.state}
                            tableClass="table table-hover table-bordered"
                            queryData={this.props.queryData}
                            th={['序号', '借款标题', '借款金额', '期数', '年化利率', '下次还款日期', '应还本息', '操作']}
                            callBack={
                                function (item, index) {
                                    return (
                                        <tr>
                                            <td>{parseInt(index) + 1}</td>
                                            <td>
                                                <a
                                                    href={Utils.getInvestUrl(item)}
                                                    title={item.title}
                                                    className="text-overflow-middle"
                                                >{item.title}</a>
                                            </td>
                                            <td>{item.amount}元</td>
                                            <td>{Utils.getPeriodsByProductId(item) + '期'}</td>
                                            <td>{item.annualInterestRate + '%'}</td>
                                            <td>{item.nextRepayDate}</td>
                                            <td>{item.plannedTermAmount + '元'}</td>
                                            <td>
                                                <a href={LINK.ACCOUNT.REPAYMENT_PLAN + item.loanId}
                                                   className="btn btn-success">还款</a>
                                            </td>
                                        </tr>
                                    );
                                }
                            }
                        />
                    },
                    {
                        fundraising: <Table
                            {...this.state}
                            tableClass="table table-hover table-bordered"
                            queryData={this.props.queryData}
                            th={['序号', '借款标题', '借款金额', '期限', '年化利率', '进度']}
                            callBack={
                                function (item, index) {
                                    return (
                                        <tr>
                                            <td>{parseInt(index) + 1}</td>
                                            <td>
                                                <a
                                                    href={Utils.getInvestUrl(item)}
                                                    title={item.title}
                                                    className="text-overflow-middle"
                                                >{item.title}</a>
                                            </td>
                                            <td>{item.amount}元</td>
                                            <td>{Utils.formatTerm(item.termCount, item.termUnit)}</td>
                                            <td>{item.annualInterestRate + '%'}</td>
                                            <td>{item.schedule}%</td>
                                        </tr>
                                    );
                                }
                            }
                        />
                    },
                    {
                        audit: <Table
                            {...this.state}
                            tableClass="table table-hover table-bordered"
                            queryData={this.props.queryData}
                            th={['序号', '借款标题', '借款金额', '期限', '年化利率', '状态']}
                            callBack={
                                function (item, index) {
                                    return (
                                        <tr>
                                            <td>{parseInt(index) + 1}</td>
                                            <td>
                                                <a
                                                    href={Utils.getInvestUrl(item)}
                                                    title={item.title}
                                                    className="text-overflow-middle"
                                                >{item.title}</a>
                                            </td>
                                            <td>{item.amount}元</td>
                                            <td>{Utils.formatTerm(item.termCount, item.termUnit)}</td>
                                            <td>{item.annualInterestRate + '%'}</td>
                                            <td>{Utils.getBorrowStatusByStatus(item.status)}</td>
                                        </tr>
                                    );
                                }
                            }
                        />
                    },
                    {
                        alreadyRepaid: <Table
                            {...this.state}
                            tableClass="table table-hover table-bordered"
                            queryData={this.props.queryData}
                            th={['序号', '借款标题', '借款金额', '期限', '年化利率']}
                            callBack={
                                function (item, index) {
                                    return (
                                        <tr>
                                            <td>{parseInt(index) + 1}</td>
                                            <td>
                                                <a
                                                    href={Utils.getInvestUrl(item)}
                                                    title={item.title}
                                                    className="text-overflow-middle"
                                                >{item.title}</a>
                                            </td>
                                            <td>{item.amount}元</td>
                                            <td>{Utils.formatTerm(item.termCount, item.termUnit)}</td>
                                            <td>{item.annualInterestRate + '%'}</td>
                                        </tr>
                                    );
                                }
                            }
                        />
                    }
                ]}
            />
        );
    }
});

var App = React.createClass({
    queryData: function (param, url) {

        /**
         * 缓存上一次请求的地址
         */
        if (url) {
            this.url = url;
        }

        if (param) {
            this.param = $.extend(this.param, param);
        } else {
            this.param = {
                currentPage: 1
            }
        }

        $.get(this.url, this.param, function (result) {
            this.setState({
                appUser: result.appUser,
                list: result.list.voList,
                pageView: {
                    currentPage: result.list.currentPage,
                    pageCount: result.list.pageCount
                }
            });
        }.bind(this));
    },
    render: function () {
        return (
            <div>
                <Header {...this.state}/>
                <div className="page-container">
                    <Breadcrumb {...{
                        index: '首页',
                        pageName: '借款记录'
                    }}/>
                    <div className="clear-fix">
                        <AccountLeft {...this.state}/>
                        <AccountRight {...this.state} queryData={this.queryData}/>
                    </div>
                </div>
                <Footer {...this.state}/>
            </div>
        );
    }
});

ReactDOM.render(<App />, document.getElementById('app'));