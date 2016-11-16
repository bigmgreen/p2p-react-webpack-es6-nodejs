var Top = React.createClass({
    getInitialState: function () {
        return {
            userId: null,
            nickName: null,
            messages: 0,
            roles: 0
        };
    },
    componentDidMount: function () {
        $.get('/getUser', function (user) {
            if (user instanceof Object) {
                this.setState(user);
            } else {
                // location.href = '../user/login.html';
            }
        }.bind(this));
    },
    handleClick: function () {
        $.get('/logout', function () {
            location.href = '../user/login.html';
        });
    },
    getLoginInfo: function () {
        var msg = '消息(' + this.state.messages + ')';
        if (this.state.messages > 99) {
            msg = '消息(99+)';
        }

        var arr = [];
        if (typeof this.state.userId === 'number') {
            arr.push(<li><a href="../account/account.html">{this.state.nickName}</a></li>);
            arr.push(<li><a href="../account/messageCenter.html">{msg}</a></li>);
        } else {
            arr.push(<li><a href="../user/login.html">登录</a></li>);
            arr.push(<li><a href="../user/register.html">立即注册</a></li>);
            arr.push(<li><a href="../user/pwd-find.html">找回密码</a></li>);
        }
        return arr;
    },
    render: function () {
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
                    <a href="../other/insurance.html">安全保障</a>
                </li>
                <li>
                    <a href="../other/activity.html">活动专区</a>
                </li>
                {loginOut}
            </ul>
        );
    }
});

var App = React.createClass({
    render: function () {
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
                        <Top />
                    </div>
                </div>
                <div className="page-nav">
                    <div className="page-nav-wrap">
                        <a href="/index">
                            <img className="logo" src="../../static/common/img/logo.jpg"/>
                        </a>
                        <nav>
                            <ul>
                                <li>
                                    <a href="../index/index.html">首页</a>
                                </li>
                                <li>
                                    <a href="../list/invest-list.html">理财</a>
                                </li>
                                <li className="page-nav-select">
                                    <a href="../borrow/person-loan.html">借款</a>
                                    <ul className="text-center">
                                        <li>
                                            <a href="../borrow/person-loan.html">个人借款</a>
                                        </li>
                                        <li>
                                            <a href="../borrow/enterprise-loan.html">企业融资</a>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <a href="../other/guide.html">新手指引</a>
                                </li>
                                <li>
                                    <a href="../about-us/content.html?about-us">关于我们</a>
                                </li>
                                <li>
                                    <a href="../account/account.html">我的账户</a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        );
    }
});

ReactDOM.render(<App />, document.getElementById('header'));