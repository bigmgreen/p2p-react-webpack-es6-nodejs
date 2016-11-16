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
 * 请求地址
 */
var URL = Global.URLS.ACCOUNT;
/**
 * 链接地址
 */
var LINK = Global.LINK;

var AccountRight = React.createClass({
    getInitialState: function () {
        return {
            mb: {
                sendDate: null,
                sendName: null,
                content: null
            }
        };
    },
    componentWillReceiveProps: function (nextProps) {
        this.setState(nextProps)
    },
    render: function () {
        return (
            <section className="account-right account-wrap">
                <header className="clear-fix">
                    <h3 className="wrap-title">消息中心</h3>
                    <a href={LINK.ACCOUNT.MESSAGE_CENTER +"#" + Utils.getHashValue()} className="btn btn-default pull-right">返回</a>
                </header>
                <div className="contentBox">
                    <div className="clear-fix">
                        <span className="pull-right">{this.state.mb.sendDate}</span>
                        <span className="pull-left">{this.state.mb.sendName}</span>
                    </div>
                    <p dangerouslySetInnerHTML={{__html: this.state.mb.content}}/>
                </div>
            </section>
        );
    }
});

var App = React.createClass({
    componentDidMount: function () {

        /**   设置选中效果  */
        $('[data-account-left]').find('a').each(function () {
            if ($(this).attr('href') === 'message-center.html') {
                $(this).addClass('active');
                return false;
            }
        });

        $.get(URL.MESSAGE_CENTER.MESSAGE_DETAIL, {readId: Utils.getUrlQueryValue()}, function (result) {
            this.setState(result);
        }.bind(this));
    },
    render: function () {
        return (
            <div>
                <Header {...this.state}/>
                <div className="page-container">
                    <Breadcrumb {...{
                        index: '首页',
                        pageName: '消息详情'
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
