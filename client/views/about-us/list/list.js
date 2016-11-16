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
    getInitialState: function () {
        return {
            url: null,
            title: null,
            content: [],
            pageView: {
                currentPage: 1,
                pageCount: 0
            }
        };
    },
    queryData: function (param) {

        if (param) {
            this.param = $.extend(this.param, param);
        } else {
            this.param = {
                currentPage: Utils.getHashValue() || 1,
                type: Utils.getUrlQueryValue()
            }
        }

        $.get(URL_ABOUT_US.LIST, this.param, function (result) {
            this.setState(result);

            //改变title的值
            document.title = this.state.title;
        }.bind(this));
    },
    componentDidMount: function () {
        this.queryData();
    },
    render: function () {
        return (
            <div>
                <Header {...this.state}/>
                <div className="page-container">
                    <Breadcrumb {...{
                        index: '首页',
                        pageName: this.state.title
                    }}/>
                    <div className="clear-fix">
                        <AboutLeft />
                        <div className="about-right">
                            <h4 className="about-title">{this.state.title}</h4>
                            <hr />
                            <ul className="about-list">
                                {this.state.content.map(function (item) {
                                    return (
                                        <li className="clear-fix">
                                            <a href={LINK_ABOUT_US.DETAIL + '?' + this.state.url + '-' + item.id + '#' + this.state.pageView.currentPage}
                                               title={item.title}>{item.title}</a>
                                            <span>{item.issueTime}</span>
                                        </li>
                                    );
                                }, this)}
                            </ul>
                            <div className="clear-fix">
                                <Pagination pageView={this.state.pageView} queryData={this.queryData}/>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer {...this.state}/>
            </div>
        );
    }
});

ReactDOM.render(<App />, document.getElementById('app'));