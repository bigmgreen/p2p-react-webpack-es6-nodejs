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
var Input = Global.component.Input;
/**
 * 获取远程验证码（手机和邮箱）的组件
 */
var Code = Global.component.Code;
/**
 * 获取图片验证码的组件
 */
var ImgCode = Global.component.ImgCode;
/**
 * 请求地址
 */
var URL = Global.URLS.ACCOUNT.ACCOUNT_SETTING;
/**
 * 公共请求地址
 */
var COMMON_URL = Global.URLS.COMMON;
/**
 * 链接地址
 */
var LINK = Global.LINK;

/**
 * Mixins
 */
var Mixins = {
    submit: function (form, url, callBack) {
        $.post(url, $(form).serialize(), function (result) {
            (typeof callBack === 'function') && callBack(result);
        });
    }
};

/**
 * 手机认证
 */
var Phone = React.createClass({
    mixins: [Mixins],
    getInitialState: function () {
        return {
            mobile: null,
            bindMobile: null
        };
    },
    componentWillReceiveProps: function (nextProps) {
        this.setState({
            mobile: nextProps.appUser.mobile
        });
    },
    /**
     * 检查手机号为空，不发短信
     */
    checkInputIsNull: function () {
        return this.checkForm.element("#mobile");
    },
    componentDidMount: function () {
        this.checkForm = $("#mrForm").validate({
            rules: {
                mobile: {
                    required: true,
                    isMobilePhone: true,
                    remote: {
                        url: COMMON_URL.PHONE_EXISTED,
                        type: 'get',
                        data: {
                            mobile: function () {
                                return $("#mobile").val();
                            }
                        }
                    }
                },
                verifyCode: {
                    required: true,
                    remote: {
                        url: URL.CHECK_CODE_BY_PHONE,
                        type: "get",
                        async: true,
                        data: {
                            verifyCode: function () {
                                return $("#verifyCode").val();
                            },
                            mobile: function () {
                                return $("#mobile").val();
                            }
                        }
                    }
                }
            },
            messages: {
                mobile: {
                    remote: "该手机号已被使用"
                },
                verifyCode: {
                    remote: "验证码错误"
                }
            },
            submitHandler: function (form) {
                this.submit(form, URL.BIND_PHONE, function (data) {
                    if (data.responseText == 2) {
                        alert("绑定成功");
                        location.reload(true);
                    } else if (data.responseText == 1) {
                        alert("手机验证码错误");
                    } else if (data.responseText == 3) {
                        alert("短信验证码已达最大尝试次数或过期，需重新发送");
                    } else {
                        alert("手机绑定失败");
                    }
                });
                return false;
            }.bind(this)
        });
    },
    /**
     * 取得子元素的值
     * @param state 子元素传回来的对象
     */
    getChildValue: function (state) {
        state['bindMobile'] = state['mobile'];
        delete state['mobile'];
        this.setState(state);
    },
    /**
     * 处理短信发出去后返回信息的处理
     * @param result 返回的信息
     * @-1 发送失败
     * @0 发送成功
     * @1 图片验证码输入不正确
     * @smsNum 获取短信次数过多
     */
    handleSendPhoneCode: function (result) {
        if (parseInt(result) === false) {
            alert('发送失败');
        }
    },
    getItemBody: function (mobile) {

        if ((typeof mobile) === 'string') {
            return false;
        }

        return (
            <div className="toggle-content">
                <div className="form-body">
                    <form className="bsdForm" id="mrForm">
                        <Input {...{
                            inputName: '手机号码：',
                            id: 'mobile',
                            name: 'mobile',
                            maxLength: 11,
                            onChange: this.getChildValue.bind(this)
                        }}/>
                        <Input {...{
                            inputName: '短信验证码：',
                            id: 'verifyCode',
                            name: 'verifyCode',
                            maxLength: 6
                        }}>
                            <Code
                                {...{
                                    url: URL.GET_PHONE_CODE,
                                    param: {
                                        mobilePhone: this.state.bindMobile
                                    },
                                    callBack: this.checkInputIsNull,
                                    success: this.handleSendPhoneCode.bind(this)
                                }}
                            />
                        </Input>
                        <div className="form-group">
                            <label className="control-label"/>
                            <div>
                                <button className="opeBtn" type="submit">认证</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    },
    getItemTitle: function (mobile) {

        var title = null;
        if ((typeof mobile) === 'string') {
            title = (
                <span>
                    <span>{Utils.getPhoneStr(mobile)}</span>
                    <span className="toggle-tip">已认证</span>
                </span>
            );
        } else {
            title = (<span>未认证</span>);
        }

        return title;
    },
    render: function () {
        return (
            <section className="toggle">
                <label className="toggle-label">
                    <span>手机认证</span>
                    <span className="pull-right">{this.getItemTitle(this.state.mobile)}</span>
                </label>
                {this.getItemBody(this.state.mobile)}
            </section>
        );
    }
});

/**
 * 邮箱认证
 */
var Email = React.createClass({
    mixins: [Mixins],
    getInitialState: function () {
        return {
            email: null,
            bindEmail: null
        };
    },
    componentWillReceiveProps: function (nextProps) {
        this.setState({
            email: nextProps.appUser.email
        });
    },
    /**
     * 检查邮箱为空，不发验证码
     */
    checkInputIsNull: function () {
        return this.checkForm.element("#email");
    },
    componentDidMount: function () {
        this.checkForm = $("#erForm").validate({
            rules: {
                email: {
                    required: true,
                    isEmail: true,
                    remote: {
                        url: COMMON_URL.EMAIL_EXISTED,
                        type: "get",
                        data: {
                            email: function () {
                                return $("#email").val();
                            }
                        }
                    }
                },
                verifyCodeEmail: {
                    required: true,
                    remote: {
                        url: URL.CHECK_CODE_BY_MAIL,
                        type: "get",
                        async: true,
                        data: {
                            email: function () {
                                return $("#email").val();
                            },
                            verifyCodeEmail: function () {
                                return $("#verifyCodeEmail").val();
                            },
                        }
                    }
                }
            },
            messages: {
                email: {
                    remote: "该邮箱已被使用"
                },
                verifyCodeEmail: {
                    remote: "验证码错误"
                }
            },
            submitHandler: function (form) {
                this.submit(form, URL.BIND_EMAIL, function (data) {
                    if (data == 1) {
                        alert("绑定成功");
                        window.location.reload(true);
                    } else if (data == -1) {
                        alert("邮箱验证码输入有误");
                    } else if (data == -3) {
                        alert("邮箱验证码失效");
                    } else {
                        alert("邮箱绑定失败");
                    }
                });
                return false;
            }.bind(this)
        });
    },
    /**
     * 取得子元素的值
     * @param state 子元素传回来的对象
     */
    getChildValue: function (state) {
        state['bindEmail'] = state['email'];
        delete state['email'];
        this.setState(state);
    },
    /**
     * 处理短信发出去后返回信息的处理
     * @param result 返回的信息
     * @-1 发送失败
     * @0 发送成功
     * @1 图片验证码输入不正确
     * @smsNum 获取短信次数过多
     */
    handleSendEmailCode: function (result) {
        if (parseInt(result) !== 1) {
            alert('发送失败');
        }
    },
    getItemBody: function () {

        var email = this.state.email;
        if ((typeof email) === 'string') {
            return false;
        }

        return (
            <div className="toggle-content">
                <div className="form-body">
                    <form className="bsdForm" id="erForm">
                        <Input {...{
                            inputName: '认证邮箱：',
                            id: 'email',
                            name: 'email',
                            onChange: this.getChildValue.bind(this)
                        }}/>
                        <Input {...{
                            inputName: '邮箱验证码：',
                            id: 'verifyCodeEmail',
                            name: 'verifyCodeEmail'
                        }}>
                            <Code
                                {...{
                                    url: URL.GET_EMAIL_CODE,
                                    param: {email: this.state.bindEmail},
                                    callBack: this.checkInputIsNull,
                                    success: this.handleSendEmailCode.bind(this)
                                }}
                            />
                        </Input>

                        <div className="form-group">
                            <label className="control-label"/>
                            <div>
                                <button className="opeBtn" type="submit">认证</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    },
    getItemTitle: function () {

        var email = this.state.email;
        var title = null;
        if ((typeof email) === 'string') {
            title = (
                <span>
                    <span>{email}</span>
                    <span className="toggle-tip">已认证</span>
                </span>
            );
        } else {
            title = (<span>未认证</span>);
        }

        return title;
    },
    render: function () {
        return (
            <section className="toggle">
                <label className="toggle-label">
                    <span>邮箱认证</span>
                    <span className="pull-right">{this.getItemTitle()}</span>
                </label>
                {this.getItemBody()}
            </section>
        );
    }
});

/**
 * 设置登录密码
 */
var LoginPassword = React.createClass({
    mixins: [Mixins],
    componentDidMount: function () {
        $("#lrForm").validate({
            rules: {
                oldPassword: {
                    required: true,
                    minlength: 6,
                    maxlength: 16,
                    remote: {
                        url: URL.IS_OLD_PWD_RIGHT,
                        type: 'post',
                        data: {
                            oldPassword: function () {
                                return $("#oldPassword").val();
                            }
                        }
                    }
                },
                newPassword: {
                    required: true,
                    minlength: 6,
                    maxlength: 16,
                    isPassword: true
                },
                renewpassword: {
                    required: true,
                    minlength: 6,
                    maxlength: 16,
                    equalTo: "#newPassword"
                },
                jcaptcha: {
                    required: true,
                    remote: {
                        url: URL.IS_IMG_CODE_RIGHT,
                        type: "post",
                        data: {
                            jcaptcha: function () {
                                return $("#jcaptcha").val();
                            }
                        }
                    }
                }
            },
            messages: {
                oldPassword: {
                    remote: "原密码错误"
                },
                jcaptcha: {
                    remote: '验证码错误'
                },
                renewpassword: {
                    equalTo: "两次输入密码不一致"
                }
            },
            submitHandler: function (form) {
                this.submit(form, URL.UPDATE_PASSWORD, function (data) {

                    $('#imgCode').trigger('click');
                    data = parseInt(data)
                    if (data === 1) {
                        alert("密码修改成功，请重新登录");
                        /**
                         * 退出登录
                         */
                        $.get(COMMON_URL.LOGOUT, function () {
                            location.href = LINK.USER.LOGIN;
                        });
                    } else if (data === 0) {
                        alert("更新失败，请稍后再试");
                    } else if (data === 2) {
                        alert("新密码不能和旧密码相同");
                    } else {
                        alert(data);
                    }

                });
                return false;
            }.bind(this)
        });
    },
    render: function () {
        return (
            <section className="toggle">
                <label className="toggle-label">
                    <span>登录密码</span>
                    <span className="pull-right">
                        <span>已设置</span>
                        <span className="toggle-tip">修改</span>
                    </span>
                </label>
                <div className="toggle-content">
                    <div className="form-body">
                        <form className="bsdForm" id="lrForm">
                            <Input {...{
                                inputName: '原密码：',
                                id: 'oldPassword',
                                name: 'oldPassword',
                                minLength: 6,
                                maxLength: 16,
                                type: 'password'
                            }}/>
                            <Input {...{
                                inputName: '新密码：',
                                id: 'newPassword',
                                name: 'newPassword',
                                minLength: 6,
                                maxLength: 16,
                                type: 'password'
                            }}/>
                            <Input {...{
                                inputName: '确认新密码：',
                                id: 'renewpassword',
                                name: 'renewpassword',
                                minLength: 6,
                                maxLength: 16,
                                type: 'password'
                            }}/>
                            <Input {...{
                                inputName: '验证码：',
                                id: 'jcaptcha',
                                name: 'jcaptcha',
                                add: 'imgCode'
                            }}>
                                <ImgCode id="imgCode" url={URL.GET_IMG_CODE}/>
                            </Input>
                            <div className="form-group">
                                <label className="control-label"/>
                                <div>
                                    <button type="submit" className="opeBtn">修改</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        );
    }
});

/**
 * 实名认证
 */
var PayPassword = React.createClass({
    getInitialState: function () {
        return {
            appUser: {
                realName: null,
                mobile: null,
                roles: null,
                idCardNo: null
            },
            isPayReady: false
        };
    },
    componentWillReceiveProps: function (nextProps) {
        this.setState({
            appUser: nextProps.appUser
        }, function () {
            /**
             * 开通第三方支付
             */
            $("#trform").validate({
                rules: {
                    realName: {
                        required: true,
                        maxlength: 16
                    },
                    idNo: {
                        required: true,
                        isIDCard: true
                    }
                },
                submitHandler: function (form) {
                    form.submit();
                }
            });
        });
    },
    componentDidMount: function () {
        this.getPayAccountReady();
    },
    /**
     * 根据用户角色获取提交时的form action
     * @param role 用户角色
     */
    getFormAction: function (role) {
        if (role === Global.ROLE.PERSON) {
            return URL.PERSON_PAY_PWD;
        } else {
            return URL.ENTERPRISE_PAY_PWD;
        }
    },
    /**
     * 通过第三方检查用户支付状态
     */
    getPayAccountReady: function () {
        $.get(COMMON_URL.PAY_ACCOUNT_READY + '?' + (+new Date()), function (isPayReady) {
            this.setState({
                isPayReady: isPayReady
            });
        }.bind(this));
    },
    getItemBody: function (appUser) {

        return (
            <div className="toggle-content">
                <div className="form-body">
                    <form className="bsdForm" method="post" id="trform" target="_blank"
                          action={this.getFormAction(appUser.roles)}>
                        <Input {...{
                            inputName: '真实姓名：',
                            id: 'realName',
                            name: 'realName',
                            maxLength: 16,
                            disabled: this.state.isPayReady,
                            value: appUser.realName
                        }}/>
                        <Input {...{
                            inputName: '身份证号：',
                            id: 'idNo',
                            name: 'idNo',
                            disabled: this.state.isPayReady,
                            value: appUser.idCardNo
                        }}/>

                        <div className="form-group">
                            <label className="control-label"/>
                            <div>
                                <button
                                    className="opeBtn"
                                    type="submit"
                                    disabled={this.state.isPayReady}
                                >开通第三方支付账户
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );

    },
    render: function () {

        var appUser = this.state.appUser;
        var title = null;
        var body = null;

        if (appUser.roles === Global.ROLE.PERSON) {
            if (typeof appUser.mobile !== 'string') {
                title = (<span>请先进行手机认证</span>);
            } else {
                if (this.state.isPayReady) {
                    title = (<span className="toggle-tip">已注册</span>);
                } else {
                    title = (<span className="toggle-tip">点击注册</span>);
                }
                body = this.getItemBody(appUser);
            }
        } else {
            if (typeof appUser.mobile !== 'string') {
                title = (<span>请先进行手机认证</span>);
            } else if (typeof appUser.email !== 'string') {
                title = (<span>请先进行邮箱认证</span>);
            } else {
                if (this.state.isPayReady) {
                    title = (<span className="toggle-tip">已注册</span>);
                } else {
                    title = (<span className="toggle-tip">点击注册</span>);
                }
                body = this.getItemBody(appUser);
            }
        }
        return (
            <section className="toggle">
                <label className="toggle-label">
                    <span>第三方支付</span>
                    <span className="pull-right">{title}</span>
                </label>
                {body}
            </section>
        );
    }
});

/**
 * 绑定银行卡
 */
var BindBank = React.createClass({
    mixins: [Mixins],
    getInitialState: function () {
        return {
            appUser: {
                userCode: null,
                bankcard: null,
                realName: null,
                mobile: null
            },
            bankcard: null
        };
    },
    componentWillReceiveProps: function (nextProps) {
        this.setState(nextProps);
    },

    getItemBody: function (appUser, bankcard) {

        if ((typeof appUser.userCode) !== 'string') {
            return false;
        }

        if ((bankcard instanceof Object) &&
            (typeof appUser.realName === 'string') &&
            (typeof appUser.mobile === 'string')) {
            return false;
        }

        return (
            <div className="toggle-content">
                <div className="form-body">
                    <form className="bsdForm" method="post"
                          action={URL.BIND_BANKCARD} target="_blank">
                        <div className="form-group">
                            <label className="control-label"/>
                            <div >
                                <button className="opeBtn" type="submit">点击绑定</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    },
    getItemTitle: function (appUser, bankcard) {

        var title = null;
        if (bankcard instanceof Object) {
            title = (
                <span>
                    <span>{bankcard.cardNo}</span>
                    <span className="toggle-tip">已认证</span>
                </span>
            );
        } else {
            if ((typeof appUser.userCode) !== 'string') {
                title = (<span>请先注册第三方账户</span>);
            } else {
                title = (<span>未绑定</span>);
            }
        }

        return title;
    },
    render: function () {
        return (
            <section className="toggle">
                <label className="toggle-label">
                    <span>绑定银行卡</span>
                    <span className="pull-right">{this.getItemTitle(this.state.appUser, this.state.bankcard)}</span>
                </label>
                {this.getItemBody(this.state.appUser, this.state.bankcard)}
            </section>
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
                <Phone {...this.state}/>
                <Email {...this.state}/>
                <LoginPassword {...this.state}/>
                <PayPassword {...this.state}/>
                <BindBank {...this.state}/>
            </div>
        );
    }
});

var App = React.createClass({
    componentDidMount: function () {
        $.get(URL.ACCOUNT_SETTING, function (result) {
            this.setState(result, function () {
                $('.toggle-label').click(function (e) {
                    e.preventDefault();
                    $(this).next('.toggle-content').slideToggle();
                });
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
                        pageName: '账户概览'
                    }}/>
                    <div className="clear-fix">
                        <AccountLeft {...this.state}/>
                        <AccountRight {...this.state}/>
                    </div>
                </div>
                <Footer {...this.state}/>
            </div>
        );
    }
});

ReactDOM.render(<App />, document.getElementById('app'));
