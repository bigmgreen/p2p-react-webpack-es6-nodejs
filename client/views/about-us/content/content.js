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

var App = React.createClass({
    componentDidMount: function () {
        $.get(URL_ABOUT_US.CONTENT,{type: Utils.getUrlQueryValue()}, function (result) {
            this.setState(result);

            //改变title的值
            document.title = this.state.title;
        }.bind(this));
    },
    getInitialState: function () {
        return {
            title: null,
            content: null
        };
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
                            <p dangerouslySetInnerHTML={{__html: this.state.content}}/>
                        </div>
                    </div>
                </div>
                <Footer {...this.state}/>
            </div>
        );
    }
});

ReactDOM.render(<App />, document.getElementById('app'));