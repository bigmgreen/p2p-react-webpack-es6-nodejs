/**
 * 头部组件
 */
var Header = Global.component.Header;
/**
 * 底部组件
 */
var Footer = Global.component.Footer;
/**
 * 输入框组件
 */
var Input = Global.component.RegisterInput;
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
    }
};

var App = React.createClass({
    mixins: [Mixin],
    getInitialState: function () {
        return {
            email: null,
            phone: null,
            validCode: null
        };
    },
    componentDidMount: function () {

        this.setState({
            email: sessionStorage.getItem('email'),
            phone: sessionStorage.getItem('phone'),
            validCode: sessionStorage.getItem('validCode')
        });

        $("#resetForm").validate({
            rules: {
                newpassword: {
                    required: true,
                    minlength: 6,
                    maxlength: 16,
                    isPassword: true
                },
                rePassword: {
                    required: true,
                    minlength: 6,
                    maxlength: 16,
                    isPassword: true,
                    equalTo: "#password"
                }
            },
            messages: {
                rePassword: {
                    equalTo: "两次输入密码不一致"
                }
            },
            submitHandler: function (form) {
                this.submit(form, FIND_PASSWORD.RESET_PASSWORD, function (result) {

                    if (result === 'ok') {
                        sessionStorage.removeItem('email');
                        sessionStorage.removeItem('phone');
                        sessionStorage.removeItem('validCode');
                        location.href = LINK.LOGIN;
                    } else {
                        alert('重置密码失败');
                    }
                }.bind(this));

                return false;
            }.bind(this)
        });
    },
    render: function () {
        return (
            <section>
                <Header/>
                <section className="page-container">
                    <h3 className="page-tab">重置密码：请输入您的新密码</h3>
                    <form id="resetForm">
                        <input type="hidden" name="email" value={this.state.email}/>
                        <input type="hidden" name="phone" value={this.state.phone}/>
                        <input type="hidden" name="validCode" value={this.state.validCode}/>
                        <Input {...{
                            inputName: '新密码',
                            type: 'password',
                            id: 'password',
                            name: 'newpassword',
                            placeholder: '请输入新密码',
                            maxLength: 18
                        }}/>
                        <Input {...{
                            inputName: '确认密码',
                            type: 'password',
                            id: 'rePassword',
                            name: 'rePassword',
                            placeholder: '请重新输入新密码'
                        }}/>
                        <div className="text-center">
                            <button type="submit"
                                    className="btn btn-success"
                            >提交
                            </button>
                        </div>
                    </form>
                </section>
                <Footer/>
            </section>
        );
    }
});

ReactDOM.render(<App />, document.getElementById('app'));