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

/**
 * 邀请好友相关信息
 */
var InviteFriendsInfo = React.createClass({
    getInitialState: function () {
        return {
            inviteFriends: {
                path: null,
                icode: null
            },
            websiteTitle: null,
            websiteDomain: null,
            websitePort: null
        };
    },
    componentWillReceiveProps: function (nextProps) {
        this.setState(nextProps, function () {
            this.getShareComponent(this.state);
        }.bind(this));
    },
    componentDidMount: function () {
        var clipboard = new Clipboard('#linkBtn');
        clipboard.on('success', function (e) {
            $("#msg").css("display", "block");
            console.log(e);
        });

        clipboard.on('error', function (e) {
            console.log(e);
        });
    },
    /**
     * 生成分享组件
     * @param state
     */
    getShareComponent: function (state) {
        if ($('#shareScript').length) {
            return;
        }
        window._bd_share_config = {
            common: {
                bdText: '我刚刚注册了［' + state.websiteTitle + '］安全可靠的P2P投资融金网贷平台，投资收益高门槛低，借款额度高放款快，邀请你也来注册http://' + state.websiteDomain + state.websitePort + '/goRegister?invitedCode=' + state.inviteFriends.icode,
                bdDesc: '我刚刚注册了［' + state.websiteTitle + '］安全可靠的P2P投资融金网贷平台，投资收益高门槛低，借款额度高放款快，邀请你也来注册', //自定义分享摘要
                bdUrl: state.websiteDomain + '/goRegister?invitedCode=' + state.inviteFriends.icode,
                bdPic: state.websiteDomain + '/static/pic/logo/aa',
                bdMiniList: ["tsina", "mogujie", "tqq", "sqq", "douban", "isohu"]
            },
            slide: [{
                bdImg: 6,
                bdPos: "right",
                bdTop: 200
            }]
        };
        $('body').append("<script id='shareScript' src='//bdimg.share.baidu.com/static/api/js/share.js?cdnversion='" + (+new Date()) + "></script>");
    },
    closeDialog: function () {
        $("#inviteDialog").css("display", "none");
        $("#msg").css("display", "none");
    },
    handleClick: function () {
        Utils.checkLoginStatus(function () {
            $.get(URL.INVITE_FRIENDS.COPY_LINK).done(function (result) {
                if (typeof result === 'string') {
                    // TODO 邀请码链接配置需要更改
                    $("#linkInfo").text('http://124.205.230.50:8200' + LINK.USER.GO_REGISTER + "?" + result);
                } else {
                    $("#linkInfo").text("您还未进行实名认证，请先绑定身份证！");
                }

                $("#info").css("display", "block");
                $("#copyBtn").css("display", "block");
                $("#inviteDialog").css("display", "block");
            }.bind(this));
        }.bind(this), null)
    },
    render: function () {

        return (
            <div className="inviteFriends">
                <h4 className="account-wrap-title">邀请好友：</h4>
                <div className="clear-fix warp-content">
                    <div className="warp-content-left">
                        <span className="invite-friends-text">复制邀请链接发送给好友</span>
                        <button
                            type="button"
                            className="btn btn-success"
                            onClick={this.handleClick}
                        >复制链接
                        </button>
                    </div>
                    <div className="warp-content-right">
                        <p>每成功邀请一位好友即可获得平台相应的奖励，上不封顶。</p>
                        <img alt="二维码图片" src={this.state.inviteFriends.path}/>
                    </div>
                </div>
                <div id="inviteDialog" className="invite-dialog">
                    <section>
                        <header>
                            <div className="invite-dialo-title">
                                <span>复制邀请链接</span>
                                <a id="closeDialog" className="pull-right" onClick={this.closeDialog}>×</a>
                            </div>
                        </header>
                        <div className="invite-dialo-content">
                            <span id="info">100元起投！年化收益12%-15%，全额本息担保，注册即可获得平台相应的奖励，快来吧！</span>
                            <span id="linkInfo" className="text-danger"></span>
                            <div id="copyBtn">
                                <button
                                    type="button"
                                    id="linkBtn"
                                    className="btn btn-warning"
                                    data-clipboard-action="copy"
                                    data-clipboard-target="#linkInfo"
                                >复制邀请链接
                                </button>
                            </div>
                            <span id="msg" className="text-danger">链接复制成功</span>
                        </div>
                    </section>
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
            </div>
        );
    }
});

var InviteFriendsTable = React.createClass({
    getInitialState: function () {
        return {
            list: [
                {
                    name: null,
                    inviteeRegDate: null,
                    statu: null,
                    redMoneyAmount: null,
                    redMoneyOpen: null,
                    redMoneyWay: null,
                    moneyStatus: null
                }
            ]
        };
    },
    componentWillReceiveProps: function (nextProps) {
        this.setState({list: nextProps.inviteFriends.inviteds});
    },
    render: function () {
        return (
            <section>
                <div className="table-responsive">
                    <Table
                        {...this.state}
                        tableClass="table table-hover table-bordered"
                        th={['邀请用户昵称', '用户注册时间', '用户状态', '邀请奖励', '是否生效']}
                        noDataText="暂无邀请记录！"
                        callBack={
                            function (result) {
                                return (
                                    <tr>
                                        <td>{result.name}</td>
                                        <td>{result.inviteeRegDate}</td>
                                        <td>{result.statu}</td>
                                        <td>{Utils.getRedMoneyAmountByWay(result.redMoneyAmount, result.redMoneyOpen, result.redMoneyWay)}</td>
                                        <td>{result.moneyStatus}</td>
                                    </tr>
                                )
                            }.bind(this)
                        }
                    />
                </div>
                <div className="warm-warning">
                    <strong><img alt="温馨提示图标"
                                 src="../../static/common/img/tixiantanhao.png"/>温馨提示</strong>
                    <ol>
                        <li>邀请奖励无上限，邀请越多奖励越多。</li>
                        <li>请不要随意邀请您不熟悉的人，避免给别人带来不必要的困扰。</li>
                    </ol>
                </div>
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
                <InviteFriendsInfo {...this.state} />
                <InviteFriendsTable {...this.state} queryData={this.queryData}/>
            </div>
        );
    }
});

var App = React.createClass({
    componentDidMount: function () {
        this.queryData();
    },
    queryData: function () {
        $.get(URL.INVITE_FRIENDS.GET_FRIENDS_LIST, this.param, function (result) {
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
                        pageName: '邀请好友'
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