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
 * 请求地址
 */
var URL = Global.URLS.ACCOUNT;
/**
 * 链接地址
 */
var LINK = Global.LINK;
/**
 * 左菜单组件
 */
var AccountLeft = Global.component.AccountLeft;
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
 * 流水信息
 */
var SessionInfo = React.createClass({
    mixins: [Mixins],
    getInitialState: function () {
        return {
            //账户余额
            cash: null,
            statics: {
                //充值总额
                totalCharge: null,
                //提现总额
                totalWithdraw: null
            }
        };
    },
    componentDidMount: function () {
        Utils.getUserCash(function (cash) {
            this.setState({
                cash: cash
            });
        }.bind(this));
    },
    componentWillReceiveProps: function (nextProps) {
        this.setState(nextProps.info);
    },
    render: function () {
        return (
            <section className="session-info">
                <header className="clear-fix session-info-title">
                    <h3 className="pull-left">
                        <span>账户余额：￥</span>
                        <span>{this.state.cash}</span>
                    </h3>
                    <span className="pull-right">
                        <button type="button" onClick={this.tabSetItem.bind(this, 0)} className="btn btn-success">充值</button>
                        <button type="button" onClick={this.tabSetItem.bind(this, 1)} className="btn btn-success">提现</button>
                    </span>
                </header>
                <p className="session-info-text">充值总额：￥<span>{this.state.statics.totalCharge}</span></p>
                <p className="session-info-text">提现总额：￥<span>{this.state.statics.totalWithdraw}</span></p>
            </section>
        );
    }
});

/*  筛选出来的数据  */
var FilterTable = React.createClass({
    getInitialState: function () {
        return {
            list: [
                {
                    mtype: null,
                    record: {
                        tradeTime: null,
                        loanTitle: null,
                        tradeType: null,
                        amount: null,
                        tradeComment: null
                    }
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
            <div className="table-responsive">
                <Table
                    {...this.state}
                    tableClass="table table-hover table-bordered"
                    th={['时间', '类型', '项目', '收入', '支出', '备注']}
                    noDataText="没有流水！"
                    callBack={
                        function (result) {
                            return (
                                <tr>
                                    <td>{result.record.tradeTime}</td>
                                    <td>{result.mtype}</td>
                                    <td title={result.record.loanTitle}><span
                                        className="text-overflow-small">{result.record.loanTitle}</span></td>
                                    <td className="text-danger">{result.record.tradeType < 1000 && '+' + result.record.amount}</td>
                                    <td className="text-danger">{result.record.tradeType > 1000 && '-' + result.record.amount}</td>
                                    <td title={result.record.tradeComment}>
                                        <span className="text-overflow-small">{result.record.tradeComment}</span>
                                    </td>
                                </tr>
                            )
                        }.bind(this)
                    }
                />
            </div>
        );
    }
});

/**
 * 数据筛选
 */
var FilterData = React.createClass({
    getInitialState: function () {
        return {
            roles: null
        };
    },
    componentWillReceiveProps: function (nextProps) {
        this.setState(nextProps);
    },
    queryData: function (param) {
        this.props.queryData(param);
    },
    getBorrowerFilter: function () {
        return (
            <dl>
                <dt>流水类型：</dt>
                <dd>
                    <button
                        className="active"
                        type="button"
                        onClick={this.queryDataByType.bind(this, 0)}>所有流水
                    </button>
                </dd>
                <dd>
                    <button type="button" onClick={this.queryDataByType.bind(this, 220)}>回收本金</button>
                </dd>
                <dd>
                    <button type="button" onClick={this.queryDataByType.bind(this, 230)}>回收利息</button>
                </dd>
                <dd>
                    <button type="button" onClick={this.queryDataByType.bind(this, 100)}>充值</button>
                </dd>
                <dd>
                    <button type="button" onClick={this.queryDataByType.bind(this, 1100)}>提现</button>
                </dd>
                <dd>
                    <button type="button" onClick={this.queryDataByType.bind(this, -1)}>其他类型</button>
                </dd>
            </dl>
        );
    },
    getPersonFilter: function () {
        return (
            <dl>
                <dt>流水类型：</dt>
                <dd>
                    <button
                        className="active"
                        type="button"
                        onClick={this.queryDataByType.bind(this, 0)}>所有流水
                    </button>
                </dd>
                <dd>
                    <button type="button" onClick={this.queryDataByType.bind(this, 1350)}>投资冻结</button>
                </dd>
                <dd>
                    <button type="button" onClick={this.queryDataByType.bind(this, 300)}>借款成功</button>
                </dd>
                <dd>
                    <button type="button" onClick={this.queryDataByType.bind(this, 1200)}>偿还本息</button>
                </dd>
                <dd>
                    <button type="button" onClick={this.queryDataByType.bind(this, 1550)}>风险保证金</button>
                </dd>
                <dd>
                    <button type="button" onClick={this.queryDataByType.bind(this, 1500)}>借款手续费</button>
                </dd>
                <dd>
                    <button type="button" onClick={this.queryDataByType.bind(this, 100)}>充值</button>
                </dd>
                <dd>
                    <button type="button" onClick={this.queryDataByType.bind(this, 1100)}>提现</button>
                </dd>
                <dd>
                    <button type="button" onClick={this.queryDataByType.bind(this, -1)}>其他类型</button>
                </dd>
            </dl>
        );
    },
    getEnterpriseFilter: function () {
        return (
            <dl>
                <dt>流水类型：</dt>
                <dd>
                    <button
                        className="active"
                        type="button"
                        onClick={this.queryDataByType.bind(this, 0)}>所有流水
                    </button>
                </dd>
                <dd>
                    <button type="button" onClick={this.queryDataByType.bind(this, 300)}>借款成功</button>
                </dd>
                <dd>
                    <button type="button" onClick={this.queryDataByType.bind(this, 1200)}>偿还本息</button>
                </dd>
                <dd>
                    <button type="button" onClick={this.queryDataByType.bind(this, 1550)}>风险保证金</button>
                </dd>
                <dd>
                    <button type="button" onClick={this.queryDataByType.bind(this, 1500)}>借款手续费</button>
                </dd>
                <dd>
                    <button type="button" onClick={this.queryDataByType.bind(this, 100)}>充值</button>
                </dd>
                <dd>
                    <button type="button" onClick={this.queryDataByType.bind(this, 1100)}>提现</button>
                </dd>
                <dd>
                    <button type="button" onClick={this.queryDataByType.bind(this, -1)}>其他类型</button>
                </dd>
            </dl>
        );
    },
    getFilterByRole: function (role) {
        switch (role) {
            case Global.ROLE.PERSON:
                return this.getPersonFilter();
            case Global.ROLE.ENTERPRISE:
                return this.getEnterpriseFilter();
            case Global.ROLE.BORROWER:
                return this.getBorrowerFilter();
        }
    },
    queryDataByType: function (type, e) {
        e.preventDefault();

        var target = $(e.target);
        target.parents('dl').find('.active').removeClass('active');
        target.addClass('active');

        this.queryData({
            currentPage: 1,
            type: type
        });
    },
    queryDataByTime: function (time, e) {
        e.preventDefault();

        var target = $(e.target);
        target.parents('dl').find('.active').removeClass('active');
        target.addClass('active');

        $('#startTime').val('');
        $('#endTime').val('');

        this.queryData({
            currentPage: 1,
            time: time,
            startTime: null,
            endTime: null
        });
    },
    queryDataByDate: function (e) {
        e.preventDefault();

        $(e.target).parents('dl').find('.active').removeClass('active');

        this.queryData({
            currentPage: 1,
            startTime: $('#startTime').val(),
            endTime: $('#endTime').val()
        });
    },
    render: function () {
        return (
            <div className="filter-panel">
                {this.getFilterByRole(this.state.roles)}
                <dl>
                    <dt>时间范围：</dt>
                    <dd>
                        <button
                            className="active"
                            type="button"
                            onClick={this.queryDataByTime.bind(this, 0)}>最近七天
                        </button>
                    </dd>
                    <dd>
                        <button type="button" onClick={this.queryDataByTime.bind(this, 1)}>1个月</button>
                    </dd>
                    <dd>
                        <button type="button" onClick={this.queryDataByTime.bind(this, 2)}>2个月</button>
                    </dd>
                    <dd>
                        <button type="button" onClick={this.queryDataByTime.bind(this, 3)}>3个月</button>
                    </dd>
                    <dd>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: '<input type="text" class="form-control" name="startTime" id="startTime" onfocus=WdatePicker({maxDate:"%y-%M-{%d}",dateFmt:"yyyy-MM-dd"}) />'
                            }}
                        ></div>
                    </dd>
                    <dd>-</dd>
                    <dd>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: '<input type="text" class="form-control" name="endTime" id="endTime" onfocus=WdatePicker({maxDate:"%y-%M-{%d}",minDate:"#F{$dp.$D(\'startTime\')}",dateFmt:"yyyy-MM-dd"}) />'
                            }}
                        ></div>
                    </dd>
                    <dd>
                        <button
                            type="button"
                            onClick={this.queryDataByDate}
                            className="btn btn-success"
                        >确 定
                        </button>
                    </dd>
                </dl>
                <FilterTable {...this.state}/>
                <Pagination {...this.state} queryData={this.queryData}/>
            </div>
        );
    }
});

var AccountRight = React.createClass({
    componentWillReceiveProps: function (nextProps) {
        this.setState(nextProps)
    },
    render: function () {
        return (
            <div className="account-right">
                <SessionInfo {...this.state} />
                <FilterData {...this.state} />
            </div>
        );
    }
});

var App = React.createClass({
    componentDidMount: function () {
        this.queryData();
    },
    queryData: function (param) {
        if (param instanceof Object) {
            this.param = $.extend(this.param, param);
        } else {
            this.param = {
                currentPage: 1,
                type: 0,
                time: 0
            }
        }
        $.get(URL.SESSION, this.param, function (result) {
            var pageView = result.pageView
            this.setState({
                appUser: result.appUser,
                list: result.datas,
                pageView: {
                    currentPage: pageView.currentPage,
                    pageCount: pageView.pageCount
                },
                roles: result.appUser.roles,
                info: result
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
                        pageName: '资金流水'
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
