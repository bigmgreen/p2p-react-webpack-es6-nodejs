import './header.css';
import {LINK, URLS} from '../../common/js/global';

/**
 * 头部组件
 *
 *  userId: 用户id
 *  nickName: 用户昵称
 *  messages: 消息数量
 *  roles: 用户角色
 *
 */
export default class Header extends React.Component {
    constructor() {
        super();
        this.state = {
            logo: null
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState(nextProps, function () {
            var url = location.pathname.split('/').pop();
            $('[data-nav]').find('a').each(function () {

                var str = $(this).attr('href').split('/').pop();
                if (url.indexOf(str) > -1) {
                    $(this).addClass('active');
                    return false;
                }
            });
        });
    }

    render() {
        return (
            <div>
                <div className="page-top">
                    <div className="page-top-wrap">
                        <ul className="text-left">
                            <li >
                                <a href="#">
                                    <img src="../../static/common/img/weibo.png"/>
                                </a>
                            </li>
                            <li >
                                <a href="#">
                                    <img src="../../static/common/img/qq.png"/>
                                </a>
                            </li>
                        </ul>
                        <Top  {...this.state} />
                    </div>
                </div>
                <div className="page-nav">
                    <div className="page-nav-wrap">
                        <a href="/index">
                            <img className="logo" src="/static/pic/logo/logo.png"/>
                        </a>
                        <nav>
                            <ul data-nav>
                                <li>
                                    <a href={LINK.INDEX}>首页</a>
                                </li>
                                <li>
                                    <a href={LINK.INVEST_LIST}>理财</a>
                                </li>
                                <li className="page-nav-select">
                                    <a href={LINK.LOAN.PERSON_LOAN}>借款</a>
                                    <ul className="text-center">
                                        <li>
                                            <a href={LINK.LOAN.PERSON_LOAN}>个人借款</a>
                                        </li>
                                        <li>
                                            <a href={LINK.LOAN.ENTERPRISE_LOAN}>企业融资</a>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <a href={LINK.OTHER.GUIDE}>新手指引</a>
                                </li>
                                <li>
                                    <a href={LINK.ABOUT_US.CONTENT + '?aboutUs'}>关于我们</a>
                                </li>
                                <li>
                                    <a href={LINK.ACCOUNT.ACCOUNT}>我的账户</a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        );
    }
}

/**
 * 页面顶部
 */
class Top extends React.Component {
    constructor() {
        super();
        this.state = {
            userId: null,
            nickName: null,
            messages: 0,
            roles: 0
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState(nextProps.appUser);
    }

    handleClick() {
        $.get(URLS.COMMON.LOGOUT, function () {
            location.href = LINK.USER.LOGIN;
        });
    }

    getLoginInfo() {
        var msg = '消息(' + this.state.messages + ')';
        if (this.state.messages > 99) {
            msg = '消息(99+)';
        }

        var arr = [];
        if (typeof this.state.userId === 'number') {
            arr.push(<li><a href={LINK.ACCOUNT.ACCOUNT}>{this.state.nickName}</a></li>);
            arr.push(<li><a href={LINK.ACCOUNT.MESSAGE_CENTER}>{msg}</a></li>);
        } else {
            arr.push(<li><a href={LINK.USER.LOGIN}>登录</a></li>);
            arr.push(<li><a href={LINK.USER.REGISTER}>立即注册</a></li>);
            arr.push(<li><a href={LINK.USER.FIND_PASSWORD}>找回密码</a></li>);
        }
        return arr;
    }

    render() {
        var loginOut = null;
        if (typeof this.state.userId === 'number') {
            loginOut = (
                <li>
                    <a href="javascript:void(0);" onClick={this.handleClick}>退出</a>
                </li>
            );
        }
        return (
            <ul className="text-right">
                {this.getLoginInfo()}
                <li>
                    <img src="../../static/common/img/shouji.png"/>
                    <a href="#">APP下载</a>
                </li>
                <li>
                    <a href={LINK.OTHER.INSURANCE}>安全保障</a>
                </li>
                <li>
                    <a href={LINK.OTHER.ACTIVITY}>活动专区</a>
                </li>
                {loginOut}
            </ul>
        );
    }
}