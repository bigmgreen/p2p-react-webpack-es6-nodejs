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

/**
 * 转让中表格
 */
var TransferInTable = React.createClass({
    getInitialState: function () {
        return {
            loanInvestorId: null
        }
    },
    unSellDebt: function (id) {
        this.setState({loanInvestorId: id}, function () {
            Utils.checkLoginStatus(function () {
                $('#unSellModalBody').html('确定要撤销转出该债权？');
                $('#unSellModal').modal();
            }, null);
        });
    },
    componentWillReceiveProps: function (nextProps) {
        this.setState(nextProps);
    },
    render: function () {
        return (
            <div>
                <Table
                    {...this.state}
                    tableClass="table table-hover table-bordered"
                    th={['序号', '项目名称', '年化利率', '待收本息', '转让价格', '手续费', '下一收款日', '剩余期数', '操作']}
                    callBack={
                        function (item, index) {
                            return (
                                <tr>
                                    <td>{parseInt(index) + 1}</td>
                                    <td>
                                        <a
                                            href={Utils.getInvestUrl(item)}
                                            title={item.loanTitle}
                                            className="text-overflow-middle"
                                        >{item.loanTitle}</a>
                                    </td>
                                    <td>{item.loanAnnualInterestRate + '%'}</td>
                                    <td>{(item.toBeCollectedPrincipal + item.toBeCollectedInterest) + '元'}</td>
                                    <td>{item.soldPrice + '元'}</td>
                                    <td>{item.soldCommission + '元'}</td>
                                    <td>{item.nextRepayDate}</td>
                                    <td>{item.leftTermCount + '期'}</td>
                                    <td>
                                        <button
                                            type="button"
                                            onClick={this.unSellDebt.bind(this, item.id)}
                                            className="btn btn-success">撤回
                                        </button>
                                    </td>
                                </tr>
                            );
                        }.bind(this)
                    }
                />
                <Modal {...{
                    id: 'unSellModal',
                    isBig: false,
                    title: '撤销转让',
                    bodyId: 'unSellModalBody',
                    showHead: true,
                    showFoot: true,
                    okBtn: true,
                    callBack: function () {
                        $.post(URL.DEBT.UN_SELL_DEBT, {loanInvestorId: this.state.loanInvestorId}, function (result) {
                            $('#unSellModal').modal('hide');
                            if (parseInt(result.statusCode) < 0) {
                                alert(result.statusMessage);
                                return;
                            }
                            this.props.queryData();
                        }.bind(this));
                    }.bind(this)
                }}/>
            </div>
        );
    }
});


/**
 * 可转让债权确认弹窗
 */
var DebtModal = React.createClass({
    getInitialState: function () {
        return {
            loanInvestorId: this.props.loanInvestorId,
            diccountRateMin: null,
            diccountRateMax: null,
            fee: null,
            feeMin: null,
            feeMax: null,
            feePrice: null,
            outPrice: null
        }
    },
    componentDidMount: function () {
        $.get(URL.DEBT.DEBT_PARAM).done(function (result) {
            this.setState(result, function () {

                var state = this.state;
                $('#sellForm').validate({
                    rules: {
                        soldDiscountRate: {
                            required: true,
                            min: state.diccountRateMin,
                            max: state.diccountRateMax
                        },
                    },
                    submitHandler: function (form) {
                        $.post(URL.DEBT.COMPUTING_FEE, $(form).serialize(), function (result) {
                            this.setState({
                                feePrice: result.tradeCommissionFee,
                                outPrice: result.CalcCreditRightsValue
                            });
                        }.bind(this));
                        return false;
                    }.bind(this)
                });

            });
        }.bind(this));
    },
    componentWillReceiveProps: function (nextProps) {
        this.setState(nextProps);
    },
    sell: function () {

        if ($('#sellForm').valid() && (typeof this.state.feePrice === 'number')) {
            $.post(URL.DEBT.SELL_DEBT, $('#sellForm').serialize(), function (result) {
                $('#sellModal').modal('hide');
                if (parseInt(result.statusCode) < 0) {
                    alert(result.statusMessage);
                    return;
                }
                /**
                 * 更新下数据
                 */
                this.props.queryData();
            }.bind(this));
        } else {
            $('#calculate').trigger('click');
        }
    },
    render: function () {
        return (
            <div>
                <div id="sellModal" className="modal fade" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal">
                                    <span>×</span>
                                </button>
                                <h4 className="modal-title">转出债权</h4>
                            </div>
                            <div className="modal-body">
                                <form id="sellForm" className="sell-form">
                                    <p className="text-danger">*转出债权后，原体验金,加息券无效!</p>
                                    <input type="hidden" name="loanInvestorId" value={this.state.loanInvestorId}/>
                                    <input type="hidden" name="soldDiscountRateMin" value={this.state.diccountRateMin}/>
                                    <input type="hidden" name="soldDiscountRateMax" value={this.state.diccountRateMax}/>
                                    <Input
                                        {...{
                                            inputName: '折让率(%)：',
                                            id: 'soldDiscountRate',
                                            name: 'soldDiscountRate'
                                        }}
                                    />
                                    <p className="text-danger input-desc">{"(范围:" + this.state.diccountRateMin + "%-" + this.state.diccountRateMax + "%)"}</p>
                                    <Input
                                        {...{
                                            inputName: '转出价格(元)：',
                                            placeholder: '点击计算显示',
                                            readOnly: true,
                                            id: 'outPrice',
                                            name: 'outPrice',
                                            value: this.state.outPrice
                                        }}
                                    />
                                    <Input
                                        {...{
                                            inputName: '手续费(元)：',
                                            placeholder: '点击计算显示',
                                            readOnly: true,
                                            id: 'feePrice',
                                            name: 'feePrice',
                                            value: this.state.feePrice
                                        }}
                                    />
                                    <p className="text-danger input-desc">{"(转出价格*" + this.state.fee + "%;下限:￥" + this.state.feeMin + ";上限:￥" + this.state.feeMax + ")"}</p>
                                    <div className="input-row">
                                        <button
                                            type="submit"
                                            className="btn btn-success"
                                            id="calculate"
                                        >计算费用
                                        </button>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" onClick={this.sell.bind(this)}>
                                    确认转出
                                </button>
                                <button type="button" className="btn btn-default" data-dismiss="modal">关闭</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

/**
 * 可转让表格
 */
var TransferableTable = React.createClass({
    getInitialState: function () {
        return {
            loanInvestorId: null
        }
    },
    sellDebt: function (id) {
        this.setState({loanInvestorId: id}, function () {
            Utils.checkLoginStatus(function () {
                $('#sellModal').modal();
            }, null);
        });
    },
    componentWillReceiveProps: function (nextProps) {
        this.setState(nextProps);
    },
    render: function () {
        return (
            <div>
                <Table
                    {...this.state}
                    tableClass="table table-hover table-bordered"
                    th={['序号', '项目名称', '年化利率', '待收本息', '债权价值', '下一收款日', '剩余期数', '操作']}
                    callBack={
                        function (item, index) {
                            return (
                                <tr>
                                    <td>{parseInt(index) + 1}</td>
                                    <td>
                                        <a
                                            href={Utils.getInvestUrl(item)}
                                            title={item.loanTitle}
                                            className="text-overflow-middle"
                                        >{item.loanTitle}</a>
                                    </td>
                                    <td>{item.loanAnnualInterestRate + '%'}</td>
                                    <td>{(item.toBeCollectedPrincipal + item.toBeCollectedInterest) + '元'}</td>
                                    <td>{item.curValue + '元'}</td>
                                    <td>{item.nextRepayDate}</td>
                                    <td>{item.leftTermCount + '期'}</td>
                                    <td>
                                        <button
                                            type="button"
                                            onClick={this.sellDebt.bind(this, item.id)}
                                            className="btn btn-success">转出
                                        </button>
                                    </td>
                                </tr>
                            );
                        }.bind(this)
                    }
                />
                <DebtModal {...this.state}/>
            </div>
        );
    }
});

/**
 * 已转让表格
 */
var TransferredTable = React.createClass({
    componentWillReceiveProps: function (nextProps) {
        this.setState(nextProps);
    },
    render: function () {
        return (
            <Table
                {...this.state}
                tableClass="table table-hover table-bordered"
                th={['序号', '项目名称', '年化利率', '转让价格', '手续费', '交易时间']}
                callBack={
                    function (item, index) {
                        return (
                            <tr>
                                <td>{parseInt(index) + 1}</td>
                                <td>
                                    <a
                                        href={Utils.getInvestUrl(item)}
                                        title={item.loanTitle}
                                        className="text-overflow-middle"
                                    >{item.loanTitle}</a>
                                </td>
                                <td>{item.loanAnnualInterestRate + '%'}</td>
                                <td>{item.soldPrice + '元'}</td>
                                <td>{item.tradeCommissionFee + '元'}</td>
                                <td>{item.tradeTime}</td>
                            </tr>
                        );
                    }
                }
            />
        );
    }
});

/**
 * 已认购表格
 */
var SubscribedTable = React.createClass({
    componentWillReceiveProps: function (nextProps) {
        this.setState(nextProps);
    },
    render: function () {
        return (
            <Table
                {...this.state}
                tableClass="table table-hover table-bordered"
                th={['序号', '项目名称', '年化利率', '买入价格', '交易时间']}
                callBack={
                    function (item, index) {
                        return (
                            <tr>
                                <td>{parseInt(index) + 1}</td>
                                <td>
                                    <a
                                        href={Utils.getInvestUrl(item)}
                                        title={item.loanTitle}
                                        className="text-overflow-middle"
                                    >{item.loanTitle}</a>
                                </td>
                                <td>{item.loanAnnualInterestRate + '%'}</td>
                                <td>{item.tradePrice + '元'}</td>
                                <td>{item.tradeTime}</td>
                            </tr>
                        );
                    }
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
            <div>
                <Tab
                    className={{
                        container: 'account-right',
                        header: 'tab-header',
                        title: 'tab-button',
                        content: 'tab-content',
                        item: 'tab-item'
                    }}
                    tabItemIds={[
                        {transferInDebt: '转让中债权'},
                        {transferableDebt: '可转让债权'},
                        {transferredDebt: '已转让债权'},
                        {subscribedDebt: '已认购债权'}
                    ]}
                    tabItemClick={[
                        this.props.queryData.bind(this, {currentPage: 1}, URL.DEBT.TRANSFER_IN_DEBT),
                        this.props.queryData.bind(this, {currentPage: 1}, URL.DEBT.TRANSFER_ABLE_DEBT),
                        this.props.queryData.bind(this, {currentPage: 1}, URL.DEBT.TRANSFERRED_DEBT),
                        this.props.queryData.bind(this, {currentPage: 1}, URL.DEBT.SUBSCRIBED_DEBT)
                    ]}
                    tabItem={[
                        {transferInDebt: <TransferInTable  {...this.state} queryData={this.props.queryData}/>},
                        {transferableDebt: <TransferableTable  {...this.state} queryData={this.props.queryData}/>},
                        {transferredDebt: <TransferredTable {...this.state} queryData={this.props.queryData}/>},
                        {subscribedDebt: <SubscribedTable {...this.state} queryData={this.props.queryData}/>}
                    ]}
                />
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
            </div>
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
                list: result.pageView.voList,
                pageView: {
                    currentPage: result.pageView.currentPage,
                    pageCount: result.pageView.pageCount
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
                        pageName: '债权转让'
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
