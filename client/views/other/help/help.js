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
var URL = Global.URLS.OTHER;

var App = React.createClass({
    componentDidMount: function () {
        $.get(URL.HELP, function (result) {
            this.setState(result);
        }.bind(this));
    },
    handleClick: function (e) {
        if ($(e.target).hasClass('active')) {
            $(e.target).removeClass('active').siblings('.summary-detail').slideUp(500);
        } else {
            $(e.target).addClass('active').siblings('.summary-detail').slideDown(500);
        }
    },
    getInitialState: function () {
        return {
            list: [
                {
                    title: '',
                    content: ''
                }
            ]
        };
    },
    render: function () {
        return (
            <div>
                <Header {...this.state}/>
                <div className="page-container">
                    <Breadcrumb {...{
                        index: '首页',
                        pageName: '帮助中心'
                    }}/>
                    <div>
                        {this.state.list.map(function (item) {
                            return (
                                <section className="summary">
                                    <h4 onClick={this.handleClick.bind(this)}
                                        className="summary-title">{item.title}</h4>
                                    <div className="summary-detail">
                                        <p>{item.content}</p>
                                    </div>
                                </section>
                            );
                        }.bind(this))}
                    </div>
                </div>
                <Footer {...this.state}/>
            </div>
        );
    }
});

ReactDOM.render(<App />, document.getElementById('app'));