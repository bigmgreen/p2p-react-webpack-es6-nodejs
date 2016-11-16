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
var FIND_PASSWORD = Global.URLS.USER.FIND_PASSWORD;
/**
 * 链接地址
 */
var LINK = Global.LINK.USER;

/**
 * 函数mixin
 */
var Mixin = {
    submit: function (form, url, callBack) {
        $.post(url, $(form).serialize(), function (result) {
            typeof callBack === 'function' && callBack(result);
        });
    },
    /**
     * 取得子元素的值
     * @param state 子元素传回来的对象
     */
    getChildValue: function (state) {
        this.setState(state);
    }
};


/**
 * 手机找回第一步
 */
var PhoneInput = React.createClass({
    mixins: [Mixin],
    getInitialState: function () {
        return {
            phone: null
        };
    },
    componentDidMount: function () {
        $("#phoneForm").validate({
            rules: {
                phone: {
                    required: true,
                    isMobilePhone: true,
                    remote: {
                        url: FIND_PASSWORD.PHONE_EXISTED,
                        type: "get",
                        data: {
                            phone: function () {
                                return $("#phone").val();
                            }
                        }
                    }
                },
                jcaptchaPhone: {
                    required: true,
                    remote: {
                        async: true,
                        url: FIND_PASSWORD.CHECK_IMG_JCAPTCHA_IN_PHONE,
                        type: "post",
                        data: {
                            jcaptcha: function () {
                                return $("#jcaptchaPhone").val();
                            }
                        }
                    }
                }
            },
            messages: {
                phone: {
                    remote: "该手机号不存在"
                },
                jcaptchaPhone: {
                    remote: "验证码错误"
                }
            },
            submitHandler: function (form) {

                this.submit(form, FIND_PASSWORD.SEND_PHONE_CODE, function (result) {
                    if (result === 'ok') {
                        this.props.handleClick('#phoneFormCommit');
                        $('#phoneNumber').html(this.state.phone);
                    } else {
                        alert('发送失败');
                    }
                }.bind(this));

                return false;
            }.bind(this)
        });
    },
    render: function () {
        return (
            <form id="phoneForm">
                <Input {...{
                    inputName: '手机号',
                    id: 'phone',
                    name: 'phone',
                    placeholder: '请输入手机号',
                    maxLength: 18,
                    onChange: this.getChildValue.bind(this)
                }}/>
                <Input {...{
                    inputName: '验证码',
                    id: 'jcaptchaPhone',
                    name: 'jcaptchaPhone',
                    placeholder: '请输入验证码'
                }}>
                    <ImgCode url={FIND_PASSWORD.FIND_PWD_BY_PHONE}/>
                </Input>
                <div className="text-center">
                    <button type="submit"
                            className="btn btn-success"
                    >提交
                    </button>
                </div>
            </form>
        );
    }
});

/**
 * 手机找回第二步
 */
var PhoneCode = React.createClass({
    mixins: [Mixin],
    componentDidMount: function () {
        $("#phoneFormCommit").validate({
            rules: {
                validCode: {
                    required: true,
                    remote: {
                        async: true,
                        url: FIND_PASSWORD.CHECK_CODE_BY_PHONE,
                        type: "post",
                        data: {
                            validCode: function () {
                                return $('#codeByPhone').val();
                            },
                            phone: function () {
                                return $('#phone').val();
                            }
                        }
                    }
                }
            },
            messages: {
                validCode: {
                    remote: "验证码错误"
                }
            },
            submitHandler: function () {

                this.props.submit({
                    phone: $("#phone").val(),
                    validCode: $("#codeByPhone").val()
                });
            }.bind(this)
        });
    },
    render: function () {
        return (
            <form id="phoneFormCommit" style={{display: 'none'}}>
                <div className="code-info">
                    <span>尊敬的用户，验证码已经发送到您的手机，请注意查收</span>
                    <h3 id="phoneNumber"/>
                </div>
                <Input {...{
                    inputName: '收到的验证码',
                    id: 'codeByPhone',
                    name: 'validCode',
                    placeholder: '请输入验证码'
                }}/>
                <div className="text-center">
                    <button type="submit"
                            className="btn btn-success"
                    >提交
                    </button>
                </div>
            </form>
        );
    }
});

/**
 * 邮箱找回第一步
 */
var EmailInput = React.createClass({
    mixins: [Mixin],
    getInitialState: function () {
        return {
            email: null
        };
    },
    componentDidMount: function () {
        $("#emailForm").validate({
            rules: {
                email: {
                    required: true,
                    isEmail: true,
                    remote: {
                        url: FIND_PASSWORD.EMAIL_EXISTED,
                        type: "get",
                        data: {
                            email: function () {
                                return $("#email").val();
                            }
                        }
                    }
                },
                jcaptcha: {
                    required: true,
                    remote: {
                        async: true,
                        url: FIND_PASSWORD.CHECK_IMG_JCAPTCHA_IN_EMAIL,
                        type: "post",
                        data: {
                            jcaptcha: function () {
                                return $("#jcaptchaEmail").val();
                            }
                        }
                    }
                }
            },
            messages: {
                email: {
                    remote: "该邮箱不存在"
                },
                jcaptcha: {
                    remote: "验证码错误"
                }
            },
            submitHandler: function (form) {

                this.submit(form, FIND_PASSWORD.SEND_EMAIL_CODE, function (result) {
                    if (result === 'ok') {
                        this.props.handleClick('#emailFormCommit');
                        $('#emailUrl').html(this.state.email);
                    } else {
                        alert('发送失败');
                    }
                }.bind(this));

                return false;
            }.bind(this)
        });
    },
    render: function () {
        return (
            <form id="emailForm">
                <Input {...{
                    inputName: '邮箱地址',
                    id: 'email',
                    name: 'email',
                    type: 'email',
                    placeholder: '请输入邮箱地址',
                    onChange: this.getChildValue.bind(this)
                }}/>
                <Input {...{
                    inputName: '验证码',
                    id: 'jcaptchaEmail',
                    name: 'jcaptcha',
                    placeholder: '请输入验证码'
                }}>
                    <ImgCode url={FIND_PASSWORD.FIND_PWD_BY_EMAIL}/>
                </Input>
                <div className="text-center">
                    <button type="submit"
                            className="btn btn-success"
                    >提交
                    </button>
                </div>
            </form>
        );
    }
});

/**
 * 邮箱找回第二步
 */
var EmailCode = React.createClass({
    mixins: [Mixin],
    componentDidMount: function () {

        $("#emailFormCommit").validate({
            rules: {
                validCode: {
                    required: true,
                    remote: {
                        async: true,
                        url: FIND_PASSWORD.CHECK_CODE_BY_MAIL,
                        type: "post",
                        data: {
                            validCode: function () {
                                return $("#codeByEmail").val();
                            },
                            email: function () {
                                return $("#email").val();
                            }
                        }
                    }
                }
            },
            messages: {
                validCode: {
                    remote: "验证码错误"
                }
            },
            submitHandler: function () {
                this.props.submit({
                    email: $("#email").val(),
                    validCode: $("#codeByEmail").val()
                });
            }.bind(this)
        });

    },
    render: function () {
        return (
            <form id="emailFormCommit" style={{display: 'none'}}>
                <div className="code-info">
                    <span>尊敬的用户，验证码已经发送到您的邮箱，请注意查收</span>
                    <h3 id="emailUrl"/>
                </div>
                <Input {...{
                    inputName: '收到的验证码',
                    id: 'codeByEmail',
                    name: 'validCode',
                    placeholder: '请输入验证码'
                }}/>
                <div className="text-center">
                    <button type="submit"
                            className="btn btn-success"
                    >提交
                    </button>
                </div>
            </form>
        );
    }
});

/**
 * 页面主体
 */
var App = React.createClass({
    handleClick: function (form) {
        $('form').hide();
        $(form).fadeIn();
    },
    handleSubmit: function (param) {
        /**
         * 邮箱，手机和验证码放入本地会话
         */

        if (param.phone) {
            sessionStorage.setItem('phone', param.phone);
        }
        if (param.email) {
            sessionStorage.setItem('email', param.email);
        }
        sessionStorage.setItem('validCode', param.validCode);
        location.href = LINK.RESET_PASSWORD;
    },
    render: function () {
        return (
            <section>
                <Header/>
                <div className="page-container clear-fix">
                    <Tab
                        className={{
                            container: 'tab-container',
                            header: 'tab-header',
                            title: 'btn btn-primary',
                            content: 'tab-content',
                            item: 'tab-item'
                        }}
                        tabItemIds={[
                            {resetPhone: '使用绑定手机号找回密码'},
                            {resetEmail: '使用绑定邮箱找回密码'}
                        ]}
                        tabItem={[
                            {
                                resetPhone: (
                                    <div>
                                        <PhoneInput handleClick={this.handleClick}/>
                                        <PhoneCode submit={this.handleSubmit}/>
                                    </div>
                                )
                            },
                            {
                                resetEmail: (
                                    <div>
                                        <EmailInput handleClick={this.handleClick}/>
                                        <EmailCode submit={this.handleSubmit}/>
                                    </div>
                                )
                            }
                        ]}
                    />
                </div>
                <Footer/>
            </section>
        );
    }
});

ReactDOM.render(<App />, document.getElementById('app'));