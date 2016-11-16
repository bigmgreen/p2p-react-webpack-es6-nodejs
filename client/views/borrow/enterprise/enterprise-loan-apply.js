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
var URL = Global.URLS.LOAN;
/**
 * 链接地址
 */
var LINK = Global.LINK;

var ApplyEnterpriseLoan = React.createClass({
    getInitialState: function () {
        return {
            loanProduct: {
                id: "查询中",//借款产品id
                productstype: "查询中",//借款名称
                loanmoneymin: "查询中",//资金范围
                loanmoneymax: "查询中",
                beginratescope: "查询中",//年利率范围
                endratescope: "查询中",
                begintermscope: "查询中",//借款期限范围
                endtermscope: "查询中",
                termtype: "查询中"//借款期限单位
            }
        };
    },
    componentDidMount: function () {
        $("#enterpriseLoanApplyForm").validate({
            rules: {
                'financeApply.companyName': {
                    required: true,
                    minlength: 1,
                    maxlength: 30
                },
                'financeApply.registerName': {
                    required: true,
                    minlength: 1,
                    maxlength: 30
                },
                'financeApply.name': {
                    required: true,
                    minlength: 2,
                    maxlength: 6
                },
                'financeApply.cardNo': {
                    required: true,
                    isIDCard: true
                },
                'financeApply.phone': {
                    required: true,
                    isMobilePhone: true
                },
                'financeApply.city': {
                    required: true,
                    minlength: 1,
                    maxlength: 16
                },
                'financeApply.amount': {
                    required: true,
                    maxlength: 14,
                    digits: true,
                    borrowAmount: true
                },
                'financeApply.interestRate': {
                    required: true,
                    number: true
                },
                'financeApply.loanUse': {
                    required: true,
                    minlength: 10,
                    maxlength: 200
                },
                'financeApply.repaySource': {
                    required: true,
                    minlength: 10,
                    maxlength: 200
                },
                jcaptcha: {
                    required: true,
                    remote: {
                        url: URL.CHECK_CAPTCHA,
                        type: "post",
                        dateType: "text",
                        data: {
                            jcaptcha: function () {
                                return $("#jCaptcha").val();
                            }
                        }
                    }
                }
            },
            highlight: function (element) {
                $(element).closest('.form-group').addClass('has-error');
            },
            unhighlight: function (element) {
                $(element).closest('.form-group').removeClass('has-error');
            },
            errorElement: 'span',
            errorClass: 'help-block',
            errorPlacement: function (error, element) {
                if (element.parent('.input-group').length) {
                    error.insertAfter(element.parent());
                } else {
                    error.insertAfter(element);
                }
            },
            messages: {
                jcaptcha: {
                    remote: '验证码错误'
                },
            },
            submitHandler: function (form) {
                Utils.checkLoginStatus(function () {
                    $.post(URL.ENTERPRISE_APPLY_SAVE, $(form).serialize(), function (result) {
                            if (result === 'ok') {
                                alert('申请成功！！');
                                location.href = LINK.LOAN.ENTERPRISE_APPLY_SUCCESS;
                            } else {
                                alert(result);
                            }
                        }.bind(this)
                    );
                }.bind(this), null);
                return false;
            }.bind(this)
        });
    },
    componentWillReceiveProps: function (props) {
        this.setState(props);
    },
    render: function () {

        var loanProduct = this.state.loanProduct;
        var borrowAmount = loanProduct.loanmoneymin + "元到" + loanProduct.loanmoneymax + "元之间，且为1000的倍数";
        var annualInterestRate = "产品利率" + loanProduct.beginratescope + "%-" + loanProduct.endratescope + "%";
        var termCount = "期限" + loanProduct.begintermscope + "-" + loanProduct.endtermscope;

        return (
            <div className="page-container">
                <form className="form-horizontal" id="enterpriseLoanApplyForm">
                    <input type="hidden" name="loanProduct.productstype" value={loanProduct.productstype}/>
                    <input type="hidden" name="loanProduct.loanmoneymin" value={loanProduct.loanmoneymin}/>
                    <input type="hidden" name="loanProduct.loanmoneymax" value={loanProduct.loanmoneymax}/>
                    <input type="hidden" name="loanProduct.beginratescope" value={loanProduct.beginratescope}/>
                    <input type="hidden" name="loanProduct.endratescope" value={loanProduct.endratescope}/>
                    <input type="hidden" name="loanProduct.begintermscope" value={loanProduct.begintermscope}/>
                    <input type="hidden" name="loanProduct.endtermscope" value={loanProduct.endtermscope}/>
                    <input type="hidden" name="loanProduct.termtype" value={loanProduct.termtype}/>
                    <h4 className="person-loan-title">企业融资——{loanProduct.productstype}</h4>
                    <div className="form-group">
                        <label htmlFor="companyName" className="control-label">企业名称</label>
                        <div className="input-wrap">
                            <input type="text"
                                   id="companyName"
                                   name="financeApply.companyName"
                                   className="form-control"
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="registerName" className="control-label">注册号</label>
                        <div className="input-wrap">
                            <input type="text"
                                   id="registerName"
                                   name="financeApply.registerName"
                                   className="form-control"
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="name" className="control-label">法人/负责人</label>
                        <div className="input-wrap">
                            <input type="text"
                                   id="name"
                                   name="financeApply.name"
                                   className="form-control"
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="cardNo" className="control-label">身份证号</label>
                        <div className="input-wrap">
                            <input type="text"
                                   className="form-control"
                                   id="cardNo"
                                   name="financeApply.cardNo"
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone" className="control-label">手机号码</label>
                        <div className="input-wrap">
                            <input type="text"
                                   className="form-control"
                                   id="phone"
                                   name="financeApply.phone"
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="city" className="control-label">所在城市</label>
                        <div className="input-wrap">
                            <input type="text"
                                   className="form-control"
                                   id="city"
                                   name="financeApply.city"
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="amount" className="control-label">借款金额</label>
                        <div className="input-wrap">
                            <div className="input-group input-group-icon">
                                <span className="input-group-addon">
                                    <span className="icon">￥</span>
                                </span>
                                <input type="text"
                                       className="form-control"
                                       id="amount"
                                       name="financeApply.amount"
                                       placeholder={borrowAmount}
                                       min={loanProduct.loanmoneymin}
                                       max={loanProduct.loanmoneymax}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="interestRate" className="control-label">借款利率</label>
                        <div className="input-wrap">
                            <div className="input-group input-group-icon">
                                <input type="text"
                                       className="form-control"
                                       id="interestRate"
                                       name="financeApply.interestRate"
                                       placeholder={annualInterestRate}
                                       min={loanProduct.beginratescope}
                                       max={loanProduct.endratescope}
                                />
                                <span className="input-group-addon">%</span>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="period" className="control-label">借款周期</label>
                        <div className="input-wrap">
                            <div className="input-group input-group-icon">
                                <input type="text"
                                       className="form-control required number digits placeholder"
                                       id="period"
                                       name="financeApply.period"
                                       placeholder={termCount}
                                       min={loanProduct.begintermscope}
                                       max={loanProduct.endtermscope}
                                       required="required"
                                />
                                <span className="input-group-addon">个月</span>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="loanUse" className="control-label">借款用途</label>
                        <div className="input-wrap">
                            <input type="text"
                                   className="form-control"
                                   id="loanUse"
                                   name="financeApply.loanUse"
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="repaySource" className="control-label">还款来源</label>
                        <div className="input-wrap">
                            <input type="text"
                                   className="form-control"
                                   id="repaySource"
                                   name="financeApply.repaySource"
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="jCaptcha" className="control-label">验证码</label>
                        <div className="input-wrap input-code">
                            <input type="text"
                                   className="form-control"
                                   id="jCaptcha"
                                   name="jcaptcha"
                            />
                        </div>
                        <img className="input-code-img"
                             alt="验证码"
                             title="点击刷新验证码"
                             src={URL.APPLY_BORROW_JCAPTCHA}
                             onClick={Utils.freshImgCode}
                        />
                    </div>
                    <div className="form-group text-center">
                        <button className="btn btn-danger" type="submit">提交申请</button>
                    </div>
                </form>
            </div>
        );
    }
});

var App = React.createClass({
    componentDidMount: function () {
        $.get(URL.ENTERPRISE_APPLY, {
            loanProductId: Utils.getUrlQueryValue()
        }, function (result) {
            this.setState(result);
        }.bind(this));
    },
    render: function () {
        return (
            <div>
                <Header {...this.state}/>
                <ApplyEnterpriseLoan {...this.state} />
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
            </div>
        );
    }
});

ReactDOM.render(<App />, document.getElementById('app'));
