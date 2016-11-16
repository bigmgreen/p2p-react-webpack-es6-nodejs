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
 * 请求地址
 */
var URL = Global.URLS.ACCOUNT;
/**
 * 链接地址
 */
var LINK = Global.LINK;

var Mixins = {
    openAgreementHtml: function (id) {
        window.open(URL.INVEST.INVEST_PDF + '?loanId=' + id, '_blank');
    }
};

/**
 * 回款中表格
 */
var BackInTable = React.createClass({
    mixins: [Mixins],
    componentWillReceiveProps: function (nextProps) {
        this.setState(nextProps);
    },
    render: function () {
        return (
            <Table
                {...this.state}
                tableClass="table table-hover table-bordered"
                th={['序号', '投标日期', '标题/借款人', '待收本息', '期限', '利率', '投资额', '收款计划', '合同']}
                callBack={
                    function (item, index) {
                        return (
                            <tr>
                                <td>{parseInt(index) + 1}</td>
                                <td>{item.investTime}</td>
                                <td>
                                    <a
                                        href={Utils.getInvestUrl(item)}
                                        title={item.title}
                                        className="text-overflow-middle"
                                    >{item.title}</a>
                                    <span>{'/' + item.borrowerNickname}</span>
                                </td>
                                <td>{Utils.getCollectInterest(item) + '元'}</td>
                                <td>{Utils.formatTerm(item.termCount, item.termUnit)}</td>
                                <td>{Utils.getRateByWay(item) + '%'}</td>
                                <td>{item.investAmount + '元'}</td>
                                <td><a className="btn btn-success"
                                       href={LINK.ACCOUNT.COLLECTION_PLANNING + 'loanId=' + item.loanId + '&loanInvestorId=' + item.id}>查看</a>
                                </td>
                                <td>
                                    <button
                                        type="button"
                                        onClick={this.openAgreementHtml.bind(this, item.id)}
                                        className="btn btn-success">合同
                                    </button>
                                </td>
                            </tr>
                        );
                    }.bind(this)
                }
            />
        );
    }
});

/**
 * 筹款中表格
 */
var FundraisingTable = React.createClass({
    componentWillReceiveProps: function (nextProps) {
        this.setState(nextProps);
    },
    render: function () {
        return (
            <Table
                {...this.state}
                tableClass="table table-hover table-bordered"
                th={['序号', '投标日期', '标题/借款人', '期限', '利率', '投资额', '进度']}
                callBack={
                    function (item, index) {
                        return (
                            <tr>
                                <td>{parseInt(index) + 1}</td>
                                <td>{item.investTime}</td>
                                <td>
                                    <a
                                        href={Utils.getInvestUrl(item)}
                                        title={item.title}
                                        className="text-overflow-middle"
                                    >{item.title}</a>
                                    <span>{'/' + item.borrowerNickname}</span>
                                </td>
                                <td>{Utils.formatTerm(item.termCount, item.termUnit)}</td>
                                <td>{Utils.getRateByWay(item) + '%'}</td>
                                <td>{item.investAmount + '元'}</td>
                                <td>{(item.biddingAmount / item.amount) + '%'}</td>
                            </tr>
                        );
                    }.bind(this)
                }
            />
        );
    }
});

/**
 * 已完成表格
 */
var CompletedTable = React.createClass({
    mixins: [Mixins],
    componentWillReceiveProps: function (nextProps) {
        this.setState(nextProps);
    },
    render: function () {
        return (
            <Table
                {...this.state}
                tableClass="table table-hover table-bordered"
                th={['序号', '投标日期', '标题/借款人', '利率', '投资额', '净收益', '合同']}
                callBack={
                    function (item, index) {
                        return (
                            <tr>
                                <td>{parseInt(index) + 1}</td>
                                <td>{item.investTime}</td>
                                <td>
                                    <a
                                        href={Utils.getInvestUrl(item)}
                                        title={item.title}
                                        className="text-overflow-middle"
                                    >{item.title}</a>
                                    <span>{'/' + item.borrowerNickname}</span>
                                </td>
                                <td>{Utils.getRateByWay(item) + '%'}</td>
                                <td>{item.investAmount + '元'}</td>
                                <td>{item.collectedInterest}</td>
                                <td>
                                    <button
                                        type="button"
                                        onClick={this.openAgreementHtml.bind(this, item.id)}
                                        className="btn btn-success">查看
                                    </button>
                                </td>
                            </tr>
                        );
                    }.bind(this)
                }
            />
        );
    }
});

var AccountRight = React.createClass({
    componentWillReceiveProps: function (nextProps) {
        this.setState(nextProps);
    },
    render: function () {
        return (
            <Tab
                className={{
                    container: 'account-right',
                    header: 'tab-header',
                    title: 'tab-button',
                    content: 'tab-content',
                    item: 'tab-item'
                }}
                tabItemIds={[
                    {backIn: '回款中的标'},
                    {fundraising: '筹款中的标'},
                    {completed: '已完成的标'}
                ]}
                tabItemClick={[
                    this.props.queryData.bind(this, {currentPage: 1}, URL.INVEST.BACK_IN),
                    this.props.queryData.bind(this, {currentPage: 1}, URL.INVEST.FUNDRAISING),
                    this.props.queryData.bind(this, {currentPage: 1}, URL.INVEST.COMPLETED)
                ]}
                tabItem={[
                    {backIn: <BackInTable  {...this.state} queryData={this.props.queryData}/>},
                    {fundraising: <FundraisingTable  {...this.state} queryData={this.props.queryData}/>},
                    {completed: <CompletedTable {...this.state} queryData={this.props.queryData}/>}
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
                list: result.pageData.voList,
                pageView: {
                    currentPage: result.pageData.currentPage,
                    pageCount: result.pageData.pageCount
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
                        pageName: '投资记录'
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