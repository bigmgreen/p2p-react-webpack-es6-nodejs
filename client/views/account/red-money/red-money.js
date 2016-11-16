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
 * 红包信息
 */
var RedMoneyInfo = React.createClass({
    getInitialState: function () {
        return {
            /*  未使用个数 未使用金额   */
            unusedRMcountlist: [
                {
                    count1: null,
                    count2: null,
                    count3: null,
                    count4: null,
                    sumAmount: null,
                    sumRate: null,
                    sumGold: null,
                    summoney: null
                }
            ],
            /*  已使用金额   */
            usedRMcountlist: [
                {
                    sumAmount: null,
                    sumRate: null,
                    sumGold: null,
                    summoney: null
                }
            ],
            /*  已过期金额   */
            overdueRMcountlist: [
                {
                    sumAmount: null,
                    sumRate: null,
                    sumGold: null,
                    summoney: null
                }
            ]
        }
    },
    componentWillReceiveProps: function (nextProps) {
        this.setState(nextProps);
    },
    render: function () {
        var unusedRMcountlist = this.state.unusedRMcountlist[0];
        var usedRMcountlist = this.state.usedRMcountlist[0];
        var overdueRMcountlist = this.state.overdueRMcountlist[0];
        return (
            <section>
                <h4 className="account-wrap-title">我的红包</h4>
                <div className="red-money-info">
                    <dl>
                        <dd>代金券红包</dd>
                        <dd>加息红包</dd>
                        <dd>体验金红包</dd>
                        <dd>现金红包</dd>
                    </dl>
                    <dl>
                        <dt>未使用个数</dt>
                        <dd>{unusedRMcountlist.count1}个</dd>
                        <dd>{unusedRMcountlist.count2}个</dd>
                        <dd>{unusedRMcountlist.count3}个</dd>
                        <dd>{unusedRMcountlist.count4}个</dd>
                    </dl>
                    <dl>
                        <dt>未使用红包</dt>
                        <dd>{unusedRMcountlist.sumAmount}元</dd>
                        <dd>{unusedRMcountlist.sumRate}%</dd>
                        <dd>{unusedRMcountlist.sumGold}元</dd>
                        <dd>{unusedRMcountlist.summoney}元</dd>
                    </dl>
                    <dl>
                        <dt>已使用红包</dt>
                        <dd>{usedRMcountlist.sumAmount}元</dd>
                        <dd>{usedRMcountlist.sumRate}%</dd>
                        <dd>{usedRMcountlist.sumGold}元</dd>
                        <dd>{usedRMcountlist.summoney}元</dd>
                    </dl>
                    <dl>
                        <dt>已过期红包</dt>
                        <dd>{overdueRMcountlist.sumAmount}元</dd>
                        <dd>{overdueRMcountlist.sumRate}%</dd>
                        <dd>{overdueRMcountlist.sumGold}元</dd>
                        <dd>{overdueRMcountlist.summoney}元</dd>
                    </dl>
                </div>
            </section>
        );
    }
});

/**
 * 数据筛选
 */
var FilterData = React.createClass({
    getInitialState: function () {
        return {
            pageView: {
                currentPage: 1,
                pageCount: 0
            },
            status: null,
            list: [
                {
                    way: null,
                    amount: null,
                    recieveDate: null,
                    startDate: null,
                    endDate: null,
                    requirement: null,
                    name: null,
                    status: null
                }
            ]
        };
    },
    componentWillReceiveProps: function (nextProps) {
        this.setState(nextProps);
    },
    queryData: function (status, e) {

        var target = $(e.target);
        target.siblings('.btn-primary').removeClass('btn-primary');
        target.addClass('btn-primary');

        this.props.queryData({status: status});
    },
    render: function () {
        return (
            <div className="RedList">
                <div className="cash">
                    <span>红包状态：</span>
                    <button
                        className="btn btn-primary"
                        type="button"
                        onClick={this.queryData.bind(this, -1)}
                    >全部
                    </button>
                    <button
                        className="btn"
                        type="button"
                        onClick={this.queryData.bind(this, 20)}
                    >未使用
                    </button>
                    <button
                        className="btn"
                        type="button"
                        onClick={this.queryData.bind(this, 30)}
                    >已使用
                    </button>
                    <button
                        className="btn"
                        type="button"
                        onClick={this.queryData.bind(this, 40)}
                    >已过期
                    </button>
                </div>
                <Table
                    {...this.state}
                    tableClass="table table-hover table-bordered"
                    th={['红包金额', '红包名称', '获得时间', '生效时间', '过期时间', '最小投资额(元)', '红包来源', '状态']}
                    noDataText="没有红包！"
                    callBack={
                        function (result) {
                            return (
                                <tr>
                                    <td>{Utils.getRedMoneyByWay(result.way, result.amount)}</td>
                                    <td>{Utils.getRedMoneyNameByWay(result.way)}</td>
                                    <td>{result.recieveDate}</td>
                                    <td>{Utils.getRedMoneyDateByWay(result.way, result.startDate)}</td>
                                    <td>{Utils.getRedMoneyDateByWay(result.way, result.endDate)}</td>
                                    <td>{Utils.getRedMoneyRequirement(result.requirement)}</td>
                                    <td>{result.name}</td>
                                    <td>{Utils.getRedMoneyStatus(result.status)}</td>
                                </tr>
                            )
                        }
                    }
                />
            </div>
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
                <RedMoneyInfo {...this.state} />
                <FilterData {...this.state} queryData={this.props.queryData}/>
            </div>
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
                currentPage: 1,
                status: -1
            }
        }

        $.get(URL.RED_MONEY, this.param, function (result) {
            var pageView = result.pageView;
            this.setState({
                appUser: result.appUser,
                list: pageView.voList,
                pageView: {
                    currentPage: pageView.currentPage,
                    pageCount: pageView.pageCount
                },
                status: result.status,
                /*  未使用个数 未使用金额   */
                unusedRMcountlist: result.unusedRMcountlist,
                /*  已使用金额   */
                usedRMcountlist: result.usedRMcountlist,
                /*  已过期金额   */
                overdueRMcountlist: result.overdueRMcountlist
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
                        pageName: '我的红包'
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