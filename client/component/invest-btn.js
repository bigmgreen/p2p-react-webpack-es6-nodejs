/**
 * 请求地址
 */
var URL = Global.URLS.DETAIL;
/**
 * 请求地址
 */
var LINK = Global.LINK;

/**
 *投资按钮
 */
Global.component.InvestBtn = window.InvestBtn = React.createClass({
    getInitialState: function () {
        return {
            //可用余额
            cash: 0,
            //投资金额
            investAmount: null,
            //用户是否具有投资权限
            hasRight: false,
            //登录用户相关信息
            appUser: {
                //用户id
                userId: null,
                //用户角色
                roles: null,
                //手机号
                mobile: null
            },
            //标的信息
            loan: {
                loanId: null,
                title: null,
                annualInterestRate: null,
                //投资总额
                amount: null,
                //已投金额
                biddingAmount: null,
                //标的状态
                status: null,
                //借款人id
                borrowerId: null,
                //是否新手标 1是 0 否
                loanClassify: null,
                //投资次数
                investCount: null,
                //递增金额
                increaseAmount: null,
                //起投金额
                beginAmount: null,
                //单笔最大投资限额
                limitMoney: null
            }
        };
    },
    componentWillReceiveProps: function (props) {
        this.setState(props);
    },
    handleClick: function () {
        /********************************  投资校验  start  *********************/

        /**   手机是否绑定  */
        if (typeof this.state.appUser.mobile !== 'string') {
            $("#validateModalBody").html('你还未绑定手机，现在就去<a href=' + LINK.ACCOUNT.ACCOUNT_SETTING + '>绑定</a>');
            $('#validateModal').modal();
            return;
        }

        //投资金额
        var investAmount = this.state.investAmount;
        //没有输入金额
        if (investAmount === null) {
            $("#investModalBody").html("请输入投资金额!");
            $("#investValidateModal").modal();
            return;
        }
        //输入金额格式错误
        if (isNaN(investAmount)) {
            $("#investModalBody").html("请输入正确的金额格式!");
            $("#investValidateModal").modal();
            return
        }


        //用户类型
        if (this.state.appUser.roles === Global.ROLE.ENTERPRISE) {
            $("#investModalBody").html("您是企业用户无法进行投资呢!");
            $("#investValidateModal").modal();
            return;
        }


        //验证用户是否有投资的权限
        if (!this.state.hasRight) {
            $("#investModalBody").html("您的用户类型不能投资!");
            $("#investValidateModal").modal();
            return
        }


        //不能投资自己的借款
        if (this.state.appUser.userId === this.state.loan.borrowerId) {
            $("#investModalBody").html("不能投资自己的借款!");
            $("#investValidateModal").modal();
            return;
        }

        //用户是否注册第三方
        if (typeof this.state.appUser.userCode === 'number') {
            $("#investModalBody").html('你还没有开户，现在就去<a href=' + LINK.ACCOUNT.ACCOUNT_SETTING + '>开户</a>!');
            $("#investValidateModal").modal();
            return;
        }


        //余额不足
        if (investAmount > this.state.cash) {
            $("#investModalBody").html('您的余额不足，<a href=' + LINK.ACCOUNT.RECHARGE + '>马上充值</a>!');
            $("#investValidateModal").modal();
            return;
        }

        //新手标只能投资一次
        if (this.state.loan.loanClassify === 1 && this.state.loan.investCount >= 1) {
            $("#investModalBody").html("此标的为新手标，您已有投资记录!");
            $("#investValidateModal").modal();
            return;
        }


        // TODO  可投金额(异步获取会不会好点？)
        var remaining = this.state.loan.amount - this.state.loan.biddingAmount;
        //起投金额
        var beginAmount = this.state.loan.beginAmount;
        //投资金额不能大于可投金额
        if (investAmount > remaining) {
            $("#investModalBody").html("投资金额不能大于可投金额!");
            $("#investValidateModal").modal();
            return;
        }
        //投资金额不能小于起投金额
        if (investAmount < beginAmount && remaining >= beginAmount) {
            $("#investModalBody").html("投资金额不能小于起投金额!");
            $("#investValidateModal").modal();
            return;
        }


        //递增金额
        var increaseAmount = this.state.loan.increaseAmount;
        //投资金额必须为递增金额整数倍 注：递增金额不能大于起投金额
        if (beginAmount != 0 && (investAmount - beginAmount) % increaseAmount != 0 && (remaining >= (increaseAmount + beginAmount))) {
            $("#investModalBody").html("投资金额必须为递增金额整数倍!");
            $("#investValidateModal").modal();
            return;
        }

        //单笔最大投资限额
        var limitMoney = parseInt(this.state.loan.limitMoney);
        //投资金额超过单笔最大投资金额
        if (limitMoney != 0 && investAmount > limitMoney) {
            $("#investModalBody").html("投资金额超过单笔最大投资金额!");
            $("#investValidateModal").modal();
            return;
        }

        // 投资最后一笔的验证
        if (parseInt(investAmount) != remaining && remaining < beginAmount) {
            $("#investModalBody").html("可投金额小于起投金额时，最后一笔投资金额必须等于可投金额!");
            $("#investValidateModal").modal();
            return;
        }

        /********************************  投资校验  end  *********************/

        //校验通过弹出投资确认框
        $('#investConfirm').modal();
    },
    render: function () {
        return (
            <div>
                <button type="button"
                        onClick={Utils.checkLoginStatus.bind(this, this.handleClick, null)}
                        className="btn btn-danger btn-lg">立即投资
                </button>
                <InvestConfirm {...this.props} />
                <Modal {...{
                    id: 'investValidateModal',
                    isBig: false,
                    title: '提示',
                    bodyId: 'investModalBody',
                    showHead: true,
                    showFoot: false
                }}/>
            </div>
        );
    }
});

/*   确认框   */
var InvestConfirm = React.createClass({
    getInitialState: function () {
        return {
            verifyCode: null,
            agreement: true,
            rmId: '',
            errorRedMoney: '',
            errorJcaptcha: '',
            errorAgreement: '',
            //可用红包列表
            abledRedMoneys: null,
            //红包是否可用
            redMoneyOpen: null,
            //可用余额
            cash: 0,
            //投资金额
            investAmount: 0,
            //用户是否具有投资权限
            hasRight: false,
            //登录用户相关信息
            appUser: {
                //用户id
                userId: null,
                //用户角色
                roles: null
            },
            //标的信息
            loan: {
                //标的id
                loanId: null,
                title: null,
                annualInterestRate: null,
                //投资总额
                amount: null,
                //已投金额
                biddingAmount: null,
                //标的状态
                status: null,
                //借款人id
                borrowerId: null,
                //是否新手标 1是 0 否
                loanClassify: null,
                //投资次数
                investCount: null,
                //递增金额
                increaseAmount: null,
                //起投金额
                beginAmount: null,
                //单笔最大投资限额
                limitMoney: null,
                termCount: null,
                termUnit: null,
                productId: null
            }
        };
    },
    componentDidMount: function () {

        $("#scrollable").scrollable({

            onSeek: function (event, i) {
                $("#status").find('li').removeClass("active").eq(i).addClass("active");
            },
            onBeforeSeek: function (event, i) {

                if (i == 1) {
                    if (this.state.loan.redMoneyOpen === true) {
                        var rm = $("#redMoneySelect").val().split(',');
                        var requireRedMoney = rm[1] * 1;
                        this.setState({rmId: rm[2]});
                        if (requireRedMoney > this.state.investAmount) {
                            this.setState({errorRedMoney: "您的投资金额低于该红包的最低使用金额"});
                            return false;
                        }
                    }
                }

                if (i == 2) {
                    if (!this.state.verifyCode) {
                        this.setState({errorCaptcha: "请输入验证码"});
                        return false;
                    } else if (!this.checkVerifyCode(this.state.verifyCode)) {
                        this.setState({errorCaptcha: "验证码错误"});
                        return false;
                    }

                    if (!this.state.agreement) {
                        this.setState({errorAgreement: "请同意使用条款和隐私条款"});
                        return false;
                    }
                }

            }.bind(this)
        });
    },
    checkVerifyCode: function (verifyCode) {
        var flag = false;
        $.ajax({
            type: "post",
            url: URL.CHECK_INVEST_VERFIY_CODE,
            data: {jcaptcha: verifyCode},
            success: function (data) {
                flag = data;
            },
            async: false
        });
        return flag;
    },
    //红包计算
    toRedMoney: function (event) {
        var investAmount = this.state.investAmount;
        var rm = event.target.value.split(',');
        var redMoney = rm[0] * 1;
        var redMoneyWay = rm[3] * 1;
        // 当红包为代金券时，抵消一部分投资额
        if (redMoneyWay == 0) {
            if (investAmount >= redMoney) {
                this.setState({
                    investAmount: (investAmount - redMoney),
                    errorRedMoney: null
                });
            } else {
                this.setState({
                    investAmount: 0,
                    errorRedMoney: null
                });
            }
        } else {
            this.setState({
                investAmount: this.state.investAmount,
                errorRedMoney: null
            });
        }
    },
    //获取红包
    getSelect: function () {

        var option = null;
        if (this.state.abledRedMoneys instanceof Object) {
            option = [<option value="0,0">请选择优惠券</option>];
            var temp = this.state.abledRedMoneys.map(function (item) {
                var val = item.amount + ',' + item.requirement + ',' + item.id + ',' + item.way;
                if (item.way == 1) {
                    return (
                        <option value={val}>
                            {item.amount}%({item.way}满{item.requirement}元使用)
                        </option>
                    );
                }
                if (item.way != 1) {
                    return (
                        <option value={val}>
                            {item.amount}元({item.way}满{item.requirement}元使用)
                        </option>
                    );
                }
            });
            option.push(temp);
        } else {
            option = <option value="0,0" selected>没有可使用的投资红包</option>
        }

        return (
            <select className="form-control"
                    id="redMoneySelect"
                    onChange={this.toRedMoney.bind(this)}>
                {option}
            </select>
        );
    },
    componentWillReceiveProps: function (nextProps) {
        this.setState(nextProps);
    },
    handleChange: function (type, event) {
        if (type == 'verifyCode') {
            this.setState({
                verifyCode: event.target.value,
                errorCaptcha: null
            });
        } else {
            this.setState({
                agreement: !this.state.agreement,
                errorAgreement: null
            });
        }
    },
    render: function () {
        var loan = this.state.loan;
        return (
            <div className="modal fade" id="investConfirm" tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal">×</button>
                            <h4 className="modal-title" id="myModalLabel">确认投标信息</h4>
                        </div>
                        <div className="modal-body">
                            <form className="form-horizontal">
                                <input type="hidden" value={loan.loanId}/>
                                <div id="scrollable" className="scrollable">
                                    <ul id="status" className="scrollable-status">
                                        <li className="active"><strong>第一步、</strong>请选择优惠券</li>
                                        <li><strong>第二步、</strong>核实投标信息</li>
                                        <li><strong>第三步、</strong>完成投标</li>
                                    </ul>

                                    <div className="items">
                                        <div className="scrollable-panel">
                                            <strong>选择优惠券</strong>

                                            <div className="input-group">
                                                <span className="input-group-addon">
                                                    <label htmlFor="redMoneySelect">可用优惠券</label>
                                                </span>
                                                {this.getSelect()}
                                                <span className="invest-error">{this.state.errorRedMoney}</span>
                                            </div>

                                            <div className="input-group">
                                                <span className="info-name">实际投标金额</span>
                                                <span className="info-value">{this.state.investAmount}</span>
                                                <span className="info-unit">元</span>
                                            </div>
                                            <div className="scrollable-btn-nav  text-center">
                                                <button type="button" className="next">下一步»</button>
                                            </div>
                                        </div>

                                        <div className="scrollable-panel">
                                            <div className="input-group">
                                                <span className="info-name">投资金额</span>
                                                <span className="info-value">{loan.amount}</span>
                                                <span className="info-unit">元</span>
                                            </div>
                                            <div className="input-group">
                                                <span className="info-name">借款期限</span>
                                                <span
                                                    className="info-value">{Utils.formatTerm(loan.termCount, loan.termUnit)}</span>
                                            </div>
                                            <div className="input-group">
                                                <span className="info-name">还款方式</span>
                                                <span
                                                    className="info-value">{Utils.formatProductId(loan.productId)}</span>
                                            </div>
                                            <div className="input-group">
                                                <span className="info-name">预计年化收益</span>
                                                <span className="info-value">{loan.annualInterestRate}</span>
                                                <span className="info-unit">%</span>
                                            </div>
                                            <div className="input-group">
                                                <span className="info-name">剩余金额</span>
                                                <span className="info-value">{loan.amount - loan.biddingAmount}</span>
                                                <span className="info-unit">元</span>
                                            </div>
                                            <div className="input-group">
                                                <span className="info-name">投标金额</span>
                                                <span className="info-value">{this.state.investAmount}</span>
                                                <span className="info-unit">元</span>
                                            </div>

                                            <div className="form-wrap">
                                                <div className="input-group">
                                                    <span className="input-group-addon">
                                                        <label htmlFor="verifyCode">验证码</label>
                                                    </span>
                                                    <input type="text"
                                                           className="form-control"
                                                           name="captcha"
                                                           value={this.state.verifyCode}
                                                           onChange={this.handleChange.bind(this, 'verifyCode')}
                                                    />
                                                    <span className="input-group-addon img-code">
                                                        <img alt="验证码"
                                                             title="点击刷新验证码"
                                                             src={URL.INVEST_VERFIY_CODE}
                                                             onClick={Utils.freshImgCode}
                                                        />
                                                    </span>
                                                    <span className="invest-error">{this.state.errorCaptcha}</span>
                                                </div>
                                                <div className="input-group">
                                                    <input type="checkbox"
                                                           id="agreement"
                                                           name="agreement"
                                                           checked={this.state.agreement}
                                                           onChange={this.handleChange.bind(this, 'agreement')}
                                                    />
                                                    <label htmlFor="agreement" className="control-label">
                                                        <span>我同意</span>
                                                        <a href="javascript:void(0)"
                                                           className="service"
                                                           title="您是否同意使用条款"
                                                           onClick={Utils.openServiceItems.bind(this, 'service')}>使用条款</a>
                                                        <span>和</span>
                                                        <a href="javascript:void(0)"
                                                           className="privacy"
                                                           title="您是否同意隐私条款"
                                                           onClick={Utils.openServiceItems.bind(this, 'privacy')}>隐私条款</a>
                                                    </label>
                                                    <span className="invest-error">{this.state.errorAgreement}</span>
                                                </div>
                                            </div>

                                            <div className="scrollable-btn-nav">
                                                <button type="button" className="prev">«上一步</button>
                                                <button type="button" className="next">下一步»</button>
                                            </div>
                                        </div>

                                        <div className="scrollable-panel">
                                            <strong>点击确定完成投标，即将跳转到第三方托管银行。</strong>
                                            <a type="button"
                                               className="btn btn-default btn-lg"
                                               href={URL.BUY_LOAN + this.state.loan.loanId + "&transAmt=" + this.state.investAmount + "&couponsId=" + this.state.rmId}
                                               target="_blank"
                                            >确认
                                            </a>
                                            <div className="scrollable-btn-nav  text-center">
                                                <button type="button" className="prev">«上一步</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal">取消</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});