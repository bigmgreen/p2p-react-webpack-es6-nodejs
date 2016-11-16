import {Header, Footer} from '../../../main';
import './login.css';
import {IconInput} from '../../../Component/input3';
import {LINK, URLS} from '../../../common/js/global';
import '../../../common/lib/owlcarousel/owl.carousel';
// import {render} from '../../../app';

import login01 from '../login/img/login01.jpg';
import login02 from '../login/img/login02.jpg';

/**
 * 轮播组件
 */
class Banner extends React.Component {
    render() {
        return (
            <div id="owlCarousel" className="owl-carousel">
                <div>
                    <img alt="..." className="img-rounded" src={login01}/>
                </div>
                <div>
                    <img alt="..." className="img-rounded" src={login02}/>
                </div>
            </div>
        );
    }

    componentDidMount() {
        $('#owlCarousel').owlCarousel({"items": 1, "autoHeight": true, "autoPlay": true});
    }
}


/**
 * form组件
 */
class Form extends React.Component {
    constructor() {
        super();
        this.state = {
            errorMsg: null,
            disabled: false
        };
    }

    handleClick(e) {
        e.preventDefault();

        var username = $('#username').val();
        var password = $('#password').val();
        if (!username) {
            this.setState({errorMsg: '请输入登录名'});
        } else if (!password) {
            this.setState({errorMsg: '请输入登录密码'});
        } else {
            this.setState({disabled: true});
            $.post(URLS.USER.LOGIN, $('#loginForm').serialize(), function (result) {
                if (result === 'ok') {
                    location.href = sessionStorage.getItem('backUrl') || LINK.INDEX;
                } else {
                    this.setState({
                        errorMsg: result,
                        disabled: false
                    });
                }
            }.bind(this));
        }
    }

    render() {
        return (
            <form id="loginForm">
                <IconInput {...{
                    icon: 'glyphicon glyphicon-user',
                    type: 'text',
                    id: 'username',
                    name: 'username',
                    placeholder: '用户名/邮箱/手机号'
                }} />
                <IconInput {...{
                    icon: 'glyphicon glyphicon-lock',
                    type: 'password',
                    id: 'password',
                    name: 'password',
                    maxLength: 16,
                    placeholder: '请输入密码'
                }} />
                <div className="input-row">
                    <input type="checkbox" id="rememberMe" name="rememberMe" value="true"/>
                    <label htmlFor="rememberMe">7天内自动登录</label>
                    <a className="pull-right" href={LINK.USER.FIND_PASSWORD}>忘记密码?</a>
                </div>
                <div className="input-row">
                    <label className="error">{this.state.errorMsg}</label>
                    <button
                        onClick={this.handleClick.bind(this)}
                        type="button"
                        disabled={this.state.disabled}
                        className="btn-login">立即登录
                    </button>
                </div>
                <div className="input-row">
                    <p className="text-center">没有账号？<a href={LINK.USER.REGISTER}>免费注册</a></p>
                </div>
            </form>
        );
    }
}

// render(
//     <section>
//         <Header/>
//         <div className="page-container clear-fix">
//             <div className="login-left">
//                 <Banner />
//             </div>
//             <div className="login-right">
//                 <Form />
//             </div>
//         </div>
//         <Footer/>
//     </section>
// );
ReactDOM.render(
    <section>
        <Header/>
        <div className="page-container clear-fix">
            <div className="login-left">
                <Banner />
            </div>
            <div className="login-right">
                <Form />
            </div>
        </div>
        <Footer/>
    </section>, document.getElementById('app'));