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
/**
 * 链接地址
 */
var LINK = Global.LINK;

var AccountRight = React.createClass({
    getInitialState: function () {
        return {
            list: [
                {
                    loanType: null,
                    title: null,
                    amount: null,
                    productId: null,
                    termCount: null,
                    termUnit: null,
                    biddingAmount: null,
                    favorite_time: null
                }
            ],
            pageView: {
                currentPage: 1,
                pageCount: 0
            }
        };
    },
    componentWillReceiveProps: function (nextProps) {
        this.setState(nextProps);
    },
    render: function () {
        return (
            <section className="account-right account-wrap">
                <h3 className="account-wrap-title">收藏明细</h3>
                <div className="right-box box-border">
                    <Table
                        {...this.state}
                        tableClass="table table-hover table-bordered"
                        th={['名称', '标的金额(元)', '付款方式', '标的期限', '标的剩余金额(元)', '时间', '状态']}
                        noDataText="没有收藏记录！"
                        callBack={
                            function (loan) {
                                return (
                                    <tr>
                                        <td><a className="text-overflow-middle"
                                               title={loan.title}
                                               href={Utils.getInvestUrl(loan)}>{loan.title}</a></td>
                                        <td>{loan.amount}</td>
                                        <td>{Utils.formatProductId(loan.productId)}</td>
                                        <td>{Utils.formatTerm(loan.termCount, loan.termUnit)}</td>
                                        <td>{loan.amount - loan.biddingAmount}</td>
                                        <td>{loan.favorite_time}</td>
                                        <td>已收藏</td>
                                    </tr>
                                )
                            }.bind(this)
                        }
                    />
                </div>
            </section>
        );
    }
});

var App = React.createClass({
    componentDidMount: function () {
        this.queryData();
    },
    queryData: function (param) {

        if (param) {
            this.param = $.extend(this.param, param);
        } else {
            this.param = {
                currentPage: 1
            }
        }

        $.get(URL.COLLECTION, this.param, function (result) {
            var pageView = result.pageView;
            this.setState({
                appUser: result.appUser,
                list: pageView.voList,
                pageView: {
                    currentPage: pageView.currentPage,
                    pageCount: pageView.pageCount
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
                        pageName: '我的收藏'
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