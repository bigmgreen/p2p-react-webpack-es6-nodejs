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
 * 左菜单组件
 */
var AccountLeft = Global.component.AccountLeft;
/**
 * 标签页组件
 */
var Tab = Global.component.Tab;
/**
 * 输入框组件
 */
var Input = Global.component.RechargeCashInput;
/**
 * 只读输入框组件
 */
var TextInput = Global.component.TextInput;
/**
 * 请求地址
 */
var URL = Global.URLS.ACCOUNT.RECHARGE;
/**
 * 链接地址
 */
var LINK = Global.LINK;

var RechargePanel = React.createClass({
    getInitialState: function () {
        return {
            /**  输入金额    */
            value: null,
            /**  余额  */
            cash: null,
            appUser: {
                mobile: null,
                userCode: null
            }
        }
    },
    componentWillReceiveProps: function (nextProps) {
        this.setState(nextProps)
    },
    checkMoney: function (state, form) {

        var appUser = state.appUser;
        /**   手机是否绑定  */
        if (typeof appUser.mobile !== 'string') {
            $("#validateModalBody").html('你还未绑定手机，现在就去<a href=' + LINK.ACCOUNT.ACCOUNT_SETTING + '>绑定</a>');
            $('#validateModal').modal();
            return;
        }
        /**   是否注册第三方支付  */
        if (typeof appUser.userCode !== 'string') {
            $("#validateModalBody").html('你还没有开户，现在就去<a href=' + LINK.ACCOUNT.ACCOUNT_SETTING + '>开户</a>!');
            $("#validateModal").modal();
            return;
        }

        /**     充值输入金额      */
        var value = Number(state.value);
        /**   充值限制为正整数，和移动端统一     */
        if (isNaN(value) || value <= 0) {
            $("#validateModalBody").html("充值金额不正确,请输入大于0的整数");
            $('#validateModal').modal();
            return;
        }

        if (value > Global.MAX_LIMIT_RECHARGE) {
            $("#validateModalBody").html("充值金额不能超过" + (Global.MAX_LIMIT_RECHARGE / 10000) + '万');
            $('#validateModal').modal();
            return;
        }

        Utils.checkLoginStatus(function () {
            form.submit()
        }, null);


        $("#validateModalBody").html('请充值完毕后关闭此窗口');
        $('#validateModal').modal();

    },
    /**    钩子函数，用于获取子元素的值   */
    getChildValue: function (value) {
        this.setState({value: value});
    },
    render: function () {
        return (
            <div>
                <form
                    id="rechargeForm"
                    className="form"
                    action={URL.RECHARGE}
                    method="post"
                    target="_blank"
                >
                    <TextInput
                        {...{
                            text: '账户余额：',
                            value: this.state.cash
                        }}
                    />
                    <Input
                        {...{
                            inputName: '我要充值：',
                            id: 'transAmt',
                            name: 'transAmt',
                            onChange: this.getChildValue.bind(this)
                        }}
                    />
                    <p className="input-row">充值手续费由平台代付</p>
                    <div className="input-row">
                        <button
                            type="button"
                            className="btn btn-success"
                            onClick={this.checkMoney.bind(this, this.state, document.querySelector('#rechargeForm'))}
                        >充值
                        </button>
                    </div>
                </form>
                <div className="warm-warning">
                    <strong><img alt="温馨提示图标"
                                 src="../../static/common/img/tixiantanhao.png"/>温馨提示</strong>
                    <ol>
                        <li>为了您的账户安全，请在充值前进行身份认证、手机绑定。</li>
                        <li>您的账户资金将通过第三方平台进行充值。</li>
                        <li>请注意您的银行卡充值限制，以免造成不便。</li>
                        <li>禁止洗钱、信用卡套现、虚假交易等行为，一经发现并确认，将终止该账户的使用。</li>
                    </ol>
                </div>
            </div>
        );
    }
});
var CashPanel = React.createClass({
    getInitialState: function () {
        return {
            /**  输入金额    */
            value: null,
            /**  余额  */
            cash: null,
            appUser: {
                mobile: null,
                userCode: null
            }
        }
    },
    componentWillReceiveProps: function (nextProps) {
        this.setState(nextProps)
    },
    checkMoney: function (state, form) {

        var appUser = state.appUser;
        /**   手机是否绑定  */
        if (typeof appUser.mobile !== 'string') {
            $("#validateModalBody").html('你还未绑定手机，现在就去<a href=' + LINK.ACCOUNT.ACCOUNT_SETTING + '>绑定</a>');
            $('#validateModal').modal();
            return;
        }
        /**   是否注册第三方支付  */
        if (typeof appUser.userCode !== 'string') {
            $("#validateModalBody").html('你还没有开户，现在就去<a href=' + LINK.ACCOUNT.ACCOUNT_SETTING + '>开户</a>!');
            $("#validateModal").modal();
            return;
        }

        /**   银行卡是否绑定  */
        if (!(state.card instanceof Object)) {
            $("#validateModalBody").html('你还未绑定银行卡，现在就去<a href=' + LINK.ACCOUNT.ACCOUNT_SETTING + '>绑定</a>');
            $('#validateModal').modal();
            return;
        }

        /**   能提现的次数  */
        var canGetCashNum = parseInt(state.sysvars12.valstring);
        /**   已提现的次数  */
        var haveGetCashNum = parseInt(state.tixianCount);
        /**  检查提现的次数  */
        if (canGetCashNum <= haveGetCashNum) {
            $("#validateModalBody").html("今日提现次数已经超过了" + state.sysvars12.valstring + '次');
            $('#validateModal').modal();
            return;
        }

        /**  提现输入金额      */
        var value = Number(state.value);
        /**  提现限制为正整数，和移动端统一     */
        if (isNaN(value) || value <= 0) {
            $("#validateModalBody").html("提现金额不正确,请输入大于0的整数");
            $('#validateModal').modal();
            return;
        }

        /**  检查余额     */
        if (value >= state.cash) {
            $("#validateModalBody").html("你的余额不足");
            $('#validateModal').modal();
            return;
        }

        /**  检查提现的上限    */
        if (value > parseInt(state.sysvars11.valstring)) {
            $("#validateModalBody").html("提现金额不能大于" + state.sysvars11.valstring + "元");
            $('#validateModal').modal();
            return;
        }

        /**  检查提现的下限     */
        if (value < parseInt(state.sysvars10.valstring)) {
            $("#validateModalBody").html("提现金额不能小于" + state.sysvars10.valstring + "元");
            $('#validateModal').modal();
            return;
        }

        Utils.checkLoginStatus(function () {
            form.submit()
        }, null);

        $("#validateModalBody").html('请提现完毕后关闭此窗口');
        $('#validateModal').modal();

    },
    /**    钩子函数，用于获取子元素的值   */
    getChildValue: function (value) {
        this.setState({value: value});
    },
    render: function () {
        return (
            <div>
                <div className="clear-fix">
                    <form
                        id="cashForm"
                        className="form pull-left"
                        action={URL.CASH}
                        method="post"
                        target="_blank"
                    >
                        <TextInput
                            {...{
                                text: '账户余额：',
                                value: this.state.cash
                            }}
                        />
                        <Input
                            {...{
                                inputName: '提现金额：',
                                id: 'transAmt',
                                name: 'transAmt',
                                onChange: this.getChildValue.bind(this)
                            }}
                        />
                        <p className="input-row">每笔提现收取{Global.CASH_FEE}元手续费</p>
                        <div className="input-row">
                            <button
                                type="button"
                                className="btn btn-success"
                                onClick={this.checkMoney.bind(this, this.state, document.querySelector('#cashForm'))}
                            >提现
                            </button>
                        </div>
                    </form>
                    <BankCard {...this.state}/>
                </div>
                <div className="warm-warning">
                    <strong><img alt="温馨提示图标"
                                 src="../../static/common/img/tixiantanhao.png"/>温馨提示</strong>
                    <ol>
                        <li>为了您的账户安全，请在提现前进行身份认证、手机绑定以及提现密码设置。</li>
                        <li>您的账户资金将由第三方平台托管。</li>
                        <li>请注意您的银行卡提现限制，以免造成不便。</li>
                        <li>禁止洗钱、信用卡套现、虚拟交易等行为，一经发现并确认，将终止该账户的使用。</li>
                        <li>如果提现金额没有及时到账，请联系客服，{Global.SERVICE_TEL}。</li>
                    </ol>
                </div>
            </div>
        );
    }
});

var BankCard = React.createClass({
    getInitialState: function () {
        return {
            card: {
                cardNo: null,
                accountBankName: null
            },
            user: {
                realName: null
            }
        };
    },
    componentWillReceiveProps: function (nextProps) {
        this.setState(nextProps)
    },
    render: function () {

        var temp = null;
        var card = this.state.card;
        if (card instanceof Object) {
            temp = (
                <div>
                    <div className="bank-card-title">{card.accountBankName}</div>
                    <div className="bank-card-info">
                        <h3>{this.state.user.realName}</h3>
                        <span>银行卡信息：{card.cardNo}</span>
                    </div>
                </div>
            );
        } else {
            temp = (
                <h3 className="no-bank-card">
                    <span>银行卡信息：暂未绑卡，</span>
                    <a href={LINK.ACCOUNT.ACCOUNT_SETTING}>请立即绑卡!</a>
                </h3>
            );
        }

        return (<div className="bank-card-box">{temp}</div>);
    }
});

var AccountRight = React.createClass({
    componentWillReceiveProps: function (nextProps) {
        this.setState(nextProps)
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
                    {recharge: '充值'},
                    {cash: '提现'}
                ]}
                tabItem={[
                    {recharge: <RechargePanel {...this.state} />},
                    {cash: <CashPanel {...this.state} />}
                ]}
            />
        );
    }
});

var App = React.createClass({
    componentDidMount: function () {
        var that = this;
        $.get(URL.RECHARGE_INFO)
            .done(
                function (result) {
                    that.setState(result);
                })
            .done(
                Utils.getUserCash(
                    function (cash) {
                        that.setState({
                                cash: cash
                            }
                        );
                    }
                )
            );
    },
    render: function () {
        return (
            <div>
                <Header {...this.state}/>
                <div className="page-container">
                    <Breadcrumb {...{
                        index: '首页',
                        pageName: '充值提现'
                    }}/>
                    <div className="clear-fix">
                        <AccountLeft {...this.state}/>
                        <AccountRight {...this.state}/>
                    </div>
                </div>
                <Footer {...this.state}/>
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
                    title: '提示',
                    bodyId: 'validateModalBody',
                    showHead: true,
                    showFoot: false
                }}/>
            </div>
        );
    }
});

ReactDOM.render(<App />, document.getElementById('app'));