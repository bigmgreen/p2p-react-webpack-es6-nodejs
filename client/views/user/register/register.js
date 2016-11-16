/**
 * 头部组件
 */
var Header = Global.component.Header;
/**
 * 底部组件
 */
var Footer = Global.component.Footer;
/**
 * 手机短信验证码组件
 */
var Code = Global.component.Code;
/**
 * 图片验证码组件
 */
var ImgCode = Global.component.ImgCode;
/**
 * 输入框组件
 */
var Input = Global.component.RegisterInput;
/**
 * 标签页组件
 */
var Tab = Global.component.Tab;
/**
 * 请求地址
 */
var REGISTER = Global.URLS.USER.REGISTER;
/**
 * 公共请求地址
 */
var COMMON_URL = Global.URLS.COMMON;
/**
 * 链接地址
 */
var LINK = Global.LINK;
/**
 * 函数mixin
 */
var Mixin = {
    componentWillReceiveProps: function (nextProps) {
        this.setState(nextProps);
    },
    submit: function (form, url) {
        $.post(url, $(form).serialize(), function (result) {
            if (result === 'ok') {
                location.href = LINK.INDEX;
            } else {
                alert(result);
            }
        });
    }
};

/**
 * 轮播组件
 */
var Banner = React.createClass({
    render: function () {
        return (
            <div className="owl-carousel">
                <div>
                    <img alt="banner" className="img-rounded" src="../../static/user/register/img/reg1.jpg"/>
                </div>
                <div>
                    <img alt="banner" className="img-rounded" src="../../static/user/register/img/reg2.jpg"/>
                </div>
            </div>
        );
    },
    componentDidMount: function () {
        $(this.getDOMNode()).owlCarousel({"items": 1, "autoHeight": true, "autoPlay": true});
    }
});

/**
 *协议和服务条款
 */
var Agreement = React.createClass({
    getInitialState: function () {
        return {checked: true}
    },
    handleChange: function () {
        this.setState({
            checked: !this.state.checked,
            disabled: this.state.checked
        });
    },
    render: function () {
        return (
            <div>
                <div className="input-row">
                    <input type="checkbox"
                           name="agreement"
                           checked={this.state.checked}
                           value="true"
                           onChange={this.handleChange}
                    />
                    <label htmlFor="phoneAgreement" onClick={this.handleChange}>我同意</label>
                    <span>
                        <a href="#" className="service" onClick={Utils.openServiceItems.bind(this, 'service')}>使用条款</a>
                        <span>和</span>
                        <a href="#" className="privacy" onClick={Utils.openServiceItems.bind(this, 'privacy')}>隐私条款</a>
                    </span>
                </div>
                <div className="input-row text-center">
                    <button type="submit" className="btn btn-primary" disabled={this.state.disabled}>马上注册</button>
                </div>
            </div>
        );
    }
});

/**
 * 手机注册form组件
 */
var PhoneForm = React.createClass({
    mixins: [Mixin],
    getInitialState: function () {
        return {
            nickName: null,
            jcaptcha: null,
            mobile: null,
            verifyCode: null,
            passwd: null,
            /**
             * 邀请码
             */
            invitedCode: null
        };
    },
    componentDidMount: function () {
        this.checkForm = $("#phoneForm").validate({
            rules: {
                nickName: {
                    required: true,
                    nameWithoutNumStart: true,
                    nickName: true,
                    remote: {
                        url: REGISTER.NICKNAME_EXISTED,
                        type: "get",
                        data: {
                            nickName: function () {
                                return $("#nickName").val();
                            }
                        }
                    }
                },
                jcaptcha: {
                    required: true,
                    remote: {
                        url: REGISTER.CHECK_IMG_JCAPTCHA_IN_PHONE,
                        type: "post",
                        data: {
                            jcaptcha: function () {
                                return $("#jcaptcha").val();
                            }
                        }
                    }
                },
                mobile: {
                    required: true,
                    isMobilePhone: true,
                    remote: {
                        url: COMMON_URL.PHONE_EXISTED,
                        type: "get",
                        async: false,
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
                        url: REGISTER.CHECK_CODE_BY_PHONE,
                        type: "get",
                        data: {
                            verifyCode: function () {
                                return $("#verifyCode").val();
                            },
                            mobile: function () {
                                return $("#mobile").val();
                            }
                        }
                    }
                },
                passwd: {
                    required: true,
                    isPassword: true
                },
                ppdwuri: {
                    required: true,
                    isPassword: true,
                    equalTo: "#passwd"
                }
            },
            messages: {
                nickName: {
                    remote: "该用户名已存在"
                },
                jcaptcha: {
                    remote: '验证码错误'
                },
                mobile: {
                    remote: "该手机号已被使用"
                },
                verifyCode: {
                    remote: "验证码错误"
                },
                ppdwuri: {
                    equalTo: "两次输入密码不一致"
                }
            },
            submitHandler: function (form) {
                this.submit(form, REGISTER.REGISTER_BY_PHONE);
                return false;
            }.bind(this)
        });
    },
    /**
     * 检查手机号为空，为空不发短信
     */
    checkInputIsNull: function () {
        return this.checkForm.element("#jcaptcha") && this.checkForm.element("#mobile");
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
        var result = parseInt(result);
        if (result === -1) {
            alert('发送失败');
        } else if (result === 1) {
            this.checkForm.element("#jcaptcha")
        } else if (isNaN(result)) {
            alert(result);
        }
    },
    /**
     * 取得子元素的值
     * @param state 子元素传回来的对象
     */
    getChildValue: function (state) {
        this.setState(state);
    },
    render: function () {
        return (
            <form id="phoneForm">
                <input type="hidden" name="invitedCode" value={this.state.invitedCode}/>
                <Input {...{
                    inputName: '用户名',
                    id: 'nickName',
                    name: 'nickName',
                    placeholder: '4至18位，字母、数字或中文组成',
                    maxLength: 18
                }}/>
                <Input {...{
                    inputName: '验证码',
                    id: 'jcaptcha',
                    name: 'jcaptcha',
                    placeholder: '验证码',
                    onChange: this.getChildValue.bind(this)
                }}>
                    <ImgCode id='imgCode' url={REGISTER.SEND_IMG_JCAPTCHA_IN_PHONE}/>
                </Input>
                <Input {...{
                    inputName: '手机号码',
                    id: 'mobile',
                    name: 'mobile',
                    placeholder: '请输入手机号',
                    maxLength: 20,
                    onChange: this.getChildValue.bind(this)
                }}/>
                <Input {...{
                    inputName: '短信验证码',
                    id: 'verifyCode',
                    name: 'verifyCode',
                    placeholder: '请输入手机验证码',
                    maxLength: 6
                }}>
                    <Code
                        {...{
                            url: REGISTER.SEND_PHONE_CODE,
                            param: {
                                mobileNum: this.state.mobile,
                                jcaptcha: this.state.jcaptcha
                            },
                            callBack: this.checkInputIsNull,
                            success: this.handleSendPhoneCode.bind(this)
                        }}
                    />
                </Input>
                <Input {...{
                    inputName: '密码',
                    type: 'password',
                    id: 'passwd',
                    name: 'passwd',
                    placeholder: '请输入密码，6至16位',
                    maxLength: 16
                }}/>
                <Input {...{
                    inputName: '确认密码',
                    type: 'password',
                    id: 'ppdwuri',
                    name: 'ppdwuri',
                    placeholder: '请再次输入密码'
                }}/>
                <Agreement />
            </form>
        );
    }
});

/**
 * 邮箱注册form组件
 */
var EmailForm = React.createClass({
    mixins: [Mixin],
    getInitialState: function () {
        return {
            nickName: null,
            email: null,
            verifyCodeEmail: null,
            password: null,
            /**
             * 邀请码
             */
            invitedCode: null
        };
    },
    componentDidMount: function () {
        this.checkForm = $("#emailForm").validate({
            rules: {
                nickName: {
                    required: true,
                    nameWithoutNumStart: true,
                    nickName: true,
                    remote: {
                        url: REGISTER.NICKNAME_EXISTED,
                        type: "get",
                        data: {
                            nickName: function () {
                                return $("#emailNickName").val();
                            }
                        }
                    }
                },
                email: {
                    required: true,
                    isEmail: true,
                    remote: {
                        url: COMMON_URL.EMAIL_EXISTED,
                        type: "get",
                        async: false,
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
                        url: REGISTER.CHECK_CODE_BY_MAIL,
                        type: "get",
                        data: {
                            verifyCodeEmail: function () {
                                return $("#verifyCodeEmail").val();
                            },
                            email: function () {
                                return $("#email").val();
                            }
                        }
                    }
                },
                passwd: {
                    required: true,
                    isPassword: true
                },
                emailRePassword: {
                    required: true,
                    isPassword: true,
                    equalTo: "#passwd"
                }
            },
            messages: {
                nickName: {
                    remote: "该用户名已存在"
                },
                email: {
                    remote: "该邮箱已被使用"
                },
                verifyCodeEmail: {
                    remote: "验证码错误"
                },
                emailRePassword: {
                    equalTo: "两次输入密码不一致"
                }
            },
            submitHandler: function (form) {
                this.submit(form, REGISTER.REGISTER_BY_EMAIL);
                return false;
            }.bind(this)
        });
    },
    /**
     * 检查邮箱为空，为空不发验证码
     */
    checkInputIsNull: function () {
        return this.checkForm.element("#email");
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
        if (result === false) {
            alert('发送失败');
        }
    },
    /**
     * 取得子元素的值
     * @param state 子元素传回来的对象
     */
    getChildValue: function (state) {
        this.setState(state);
    },
    render: function () {
        return (
            <form id="emailForm">
                <input type="hidden" name="invitedCode" value={this.state.invitedCode}/>
                <Input {...{
                    inputName: '用户名',
                    id: 'emailNickName',
                    name: 'nickName',
                    placeholder: '4至18位，字母、数字或中文组成'
                }}/>
                <Input {...{
                    inputName: '邮箱',
                    id: 'email',
                    name: 'email',
                    placeholder: '请输入邮箱',
                    onChange: this.getChildValue.bind(this)
                }}/>
                <Input {...{
                    inputName: '邮箱验证码',
                    id: 'verifyCodeEmail',
                    name: 'verifyCodeEmail',
                    placeholder: '请输入邮箱验证码'
                }}>
                    <Code
                        {...{
                            url: REGISTER.SEND_EMAIL_CODE,
                            param: {
                                email: this.state.email
                            },
                            callBack: this.checkInputIsNull,
                            success: this.handleSendEmailCode.bind(this)
                        }}
                    />
                </Input>
                <Input {...{
                    inputName: '密码',
                    type: 'password',
                    id: 'emailPassword',
                    name: 'passwd',
                    placeholder: '请输入密码，6至16位'
                }}/>
                <Input {...{
                    inputName: '确认密码',
                    type: 'password',
                    id: 'emailRePassword',
                    name: 'emailRePassword',
                    placeholder: '请再次输入密码'
                }}/>
                <Agreement />
            </form>
        );
    }
});

/**
 * 页面主体
 */
var App = React.createClass({
    componentDidMount: function () {
        this.setState({invitedCode: Utils.getUrlQueryValue()});
    },
    render: function () {
        return (
            <section>
                <Header/>
                <div className="page-container clear-fix">
                    <div className="reg-left">
                        <Banner />
                    </div>
                    <div className="reg-right">
                        <Tab
                            className={{
                                container: 'tab-container',
                                header: 'tab-header',
                                title: 'tab-button',
                                content: 'tab-content',
                                item: 'tab-item'
                            }}
                            tabItemIcon={[
                                {regPhone: <i className="glyphicon glyphicon-phone"/>},
                                {regEmail: <i className="glyphicon glyphicon-envelope"/>}
                            ]}
                            tabItemIds={[
                                {regPhone: '手机注册'},
                                {regEmail: '邮箱注册'}
                            ]}
                            tabItem={[
                                {regPhone: <PhoneForm  {...this.state} />},
                                {regEmail: <EmailForm {...this.state} />}
                            ]}
                        />
                    </div>
                </div>
                <Footer/>
            </section>
        );
    }
});

ReactDOM.render(<App />, document.getElementById('app'));