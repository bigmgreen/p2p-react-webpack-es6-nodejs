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
var URL_ABOUT_US = Global.URLS.ABOUT_US;
/**
 /**
 * 链接地址
 */
var LINK_ABOUT_US = Global.LINK.ABOUT_US;

var App = React.createClass({
    componentDidMount: function () {
        $.get(URL_ABOUT_US.DETAIL, {id: Utils.getAboutDetailId()}, function (result) {
            this.setState(result);

            //改变title的值
            document.title = this.state.title;
        }.bind(this));
    },
    getInitialState: function () {

        return {
            title: null,
            content: null,
            pageName: null,
            date: null,
            currentPage: Utils.getHashValue() || 1,
            type: Utils.getUrlQueryValue().split('-')[0]
        };
    },
    render: function () {
        return (
            <div>
                <Header {...this.state}/>
                <div className="page-container">
                    <Breadcrumb {...{
                        index: '首页',
                        pageName: this.state.pageName
                    }}/>
                    <div className="clear-fix">
                        <AboutLeft />
                        <div className="about-right">
                            <div className="clear-fix">
                                <h4 className="about-title pull-left">{this.state.title}</h4>
                                <a
                                    className="btn btn-default pull-right"
                                    href={LINK_ABOUT_US.LIST + '?' + this.state.type + '#' + this.state.currentPage}
                                >返回列表</a>
                            </div>
                            <hr />
                            <p dangerouslySetInnerHTML={{__html: this.state.content}}/>
                        </div>
                    </div>
                </div>
                <Footer {...this.state}/>
            </div>
        );
    }
});

React.render(<App />, document.getElementById('app'));