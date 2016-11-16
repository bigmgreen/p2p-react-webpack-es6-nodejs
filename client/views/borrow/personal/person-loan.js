/**
 * 头部组件
 */
var Header = Global.component.Header;
/**
 * 底部组件
 */
var Footer = Global.component.Footer;
/**
 * 请求地址
 */
var URL = Global.URLS;
/**
 * 链接地址
 */
var LINK = Global.LINK;

var PersonLoan = React.createClass({
    getInitialState: function () {
        return {
            userId: null,
            role: null,
            loanProducts: [
                {
                    id: null,//借款产品id
                    productstype: null,//借款名称
                    loanmoneymin: null,//资金范围
                    loanmoneymax: null,
                    beginratescope: null,//年利率范围
                    endratescope: null,
                    begintermscope: null,//借款期限范围
                    endtermscope: null,
                    termtype: null,//借款期限单位
                    repaytype: null,//还款方式
                    features: null, //产品特点
                    conditions: null, //申请条件
                    materials: null,  //必要申请资料
                }
            ]
        };
    },
    componentWillReceiveProps: function (props) {
        this.setState(props);
    },
    // TODO  请求返回值混乱，待优化
    validate: function (id, role) {
        // 检查手机或邮箱认证
        function checkBind() {
            var flag = false;
            $.ajax({
                type: "get",
                url: URL.LOAN.CHECK_EMAIL_PHONE,
                success: function (jsonInfo) {
                    flag = jsonInfo.EandM;
                },
                async: false
            });
            return flag;
        }

        //检查是否开户
        function checkAccountReady() {
            var flag = false;
            $.ajax({
                type: "get",
                url: URL.COMMON.PAY_ACCOUNT_READY+ "?" + (+new Date()),
                success: function (data) {
                    if (data) {
                        flag = true;
                    }
                },
                async: false
            });
            return flag;
        }

        //检查是否完成基本信息
        function checkFullInfo() {
            var flag = false;
            $.ajax({
                type: "get",
                url: URL.LOAN.CHECK_FULL_INFO,
                success: function (jsonInfo) {
                    flag = jsonInfo.FullInfo;
                },
                async: false
            });
            return flag;
        }


        //检查是否被加入黑名单
        function isBlackName() {
            var isBlack = false;
            $.ajax({
                type: "get",
                url: URL.LOAN.CHECK_IS_BLACK_NAME,
                success: function (data) {
                    if (data == 1) {
                        isBlack = true;
                    }
                },
                async: false
            });
            return isBlack;
        }


        if (role === Global.ROLE.ENTERPRISE) {
            $("#checkModalBody").html("企业账户暂不支持个人借款的申请，请您退出当前账户，重新注册个人账户进行借款！");
            $("#checkModal").modal();
            return;
        }

        if (!checkBind()) {
            $("#checkModalBody").html("您尚未进行手机或邮箱认证<a href="+LINK.ACCOUNT.ACCOUNT_SETTING+">去认证</a>");
            $("#checkModal").modal();
            return;
        }
        if (!checkAccountReady()) {
            $("#checkModalBody").html("你还没有开户，现在就去<a href="+LINK.ACCOUNT.ACCOUNT_SETTING+">开户</a>!");
            $("#checkModal").modal();
            return;
        }
        if (!checkFullInfo()) {
            $("#checkModalBody").html("您尚未完成基本信息填写<a href="+LINK.ACCOUNT.PERSON_INFO+">去填写</a>");
            $("#checkModal").modal();
            return;
        }
        if (isBlackName()) {
            $("#checkModalBody").html("您已被加入黑名单，无法申请借款，如有疑问请联系客服");
            $("#checkModal").modal();
            return;
        }

        window.location.href = LINK.LOAN.PERSON_LOAN_APPLY + id;
    },
    render: function () {
        return (
                <div className="swiper-container">
                    <div className="swiper-wrapper">
                        {this.state.loanProducts.map(function (result) {
                            return (
                                <div className="swiper-slide">
                                    <div className="loan-plan">
                                        <h3 className="loan-plan-title">{result.productstype}</h3>
                                        <button className="btn btn-lg btn-primary"
                                                onClick={Utils.checkLoginStatus.bind(this, this.validate.bind(this, result.id, result.role), null)}
                                        >申请借款
                                        </button>
                                        <ul>
                                            <li>
                                                <b>金额范围：</b>
                                                <span>{result.loanmoneymin}元-{result.loanmoneymax}元</span>
                                            </li>
                                            <li>
                                                <b>年利率范围：</b>
                                                <span>{result.beginratescope}%-{result.endratescope}%</span>
                                            </li>
                                            <li>
                                                <b>借款期限：</b>
                                                <span>{result.begintermscope}-{result.endtermscope}{Utils.getTermUnit(result.termUnit)}</span>
                                            </li>
                                            <li>
                                                <b>还款方式：</b>
                                                <span>{Utils.formatProductId(result.repaytype)}</span>
                                            </li>
                                        </ul>
                                        <div>
                                            <button className="btn btn-default"
                                                    data-container="body"
                                                    title="产品特点"
                                                    data-toggle="popover"
                                                    data-placement="top"
                                                    data-content={result.features}>产品特点
                                            </button>
                                            <button className="btn btn-default"
                                                    data-container="body"
                                                    title="申请条件"
                                                    data-toggle="popover"
                                                    data-placement="top"
                                                    data-content={result.conditions}>申请条件
                                            </button>
                                            <button className="btn btn-default"
                                                    data-container="body"
                                                    title="必要申请资料"
                                                    data-toggle="popover"
                                                    data-placement="top"
                                                    data-content={result.materials}>必要申请资料
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )
                        }.bind(this))}
                    </div>
                    <div className="swiper-pagination"></div>
                </div>
        );
    }
});

var App = React.createClass({
    componentDidMount: function () {
        $.get(URL.LOAN.PERSON_LOAN, function (result) {
            this.setState(result);

            setTimeout(function () {
                new Swiper('.swiper-container', {
                    pagination: '.swiper-pagination',
                    slidesPerView: 3,
                    width: 1200,
                    paginationClickable: true,
                    preventClicks: false,
                    spaceBetween: 30,
                    autoplay: 4000,
                    speed: 1000
                });

                $("[data-toggle='popover']").popover({trigger: "hover"});
            }, 66);
        }.bind(this));
    },
    render: function () {
        return (
            <div>
                <Header {...this.state}/>
                <div className="page-container">
                    <PersonLoan {...this.state} />
                </div>
                <Modal {...{
                    id: 'checkModal',
                    isBig: false,
                    showHead: true,
                    showFoot: false,
                    bodyId: 'checkModalBody'
                }}/>
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
                <Footer {...this.state}/>
            </div>
        );
    }
});

ReactDOM.render(<App />, document.getElementById('app'));