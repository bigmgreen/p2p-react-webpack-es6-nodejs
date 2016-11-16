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

var Article = React.createClass({
    render: function () {

        var hasDate = null;
        if (this.props.list === null || this.props.list.length === 0) {
            hasDate = (<strong className="active-item no-content">暂时没有活动！</strong>);
        } else {
            hasDate = this.props.list.map(function (item, index) {
                return (
                    <article className="active-item">
                        <header>
                            <h4><a className="active-title" href={item.link}>{item.title}</a></h4>
                            <span className="active-date">{item.date}</span>
                        </header>
                        <div className="active-content">
                            {item.content}
                        </div>
                    </article>
                );
            });
        }

        return (
            <div className={this.props.isActive ? 'actives active' : 'actives'} id={this.props.id}>
                {hasDate}
            </div>
        );
    }
});

var App = React.createClass({
        getInitialState: function () {
            return {
                nowActivity: null,
                futureActivity: null,
                oldActivity: null
            }
        },
        componentDidMount: function () {
            $.get(URL.ACTIVITY, function (result) {
                this.setState(result)
            }.bind(this));

            /*   标签页切换   */
            $('[data-target]').click(function (e) {
                e.preventDefault();

                // 移除旧样式
                var oldActive = $(this).siblings('.active');
                oldActive.removeClass('active');
                $(oldActive.attr('href')).hide();

                // 激活新样式
                $(this).addClass('active');
                $($(this).attr('href')).fadeIn();
            });
        },
        render: function () {
            return (
                <div>
                    <Header {...this.state}/>
                    <div className="page-container">
                        <Breadcrumb {...{
                            index: '首页',
                            pageName: '活动专区'
                        }}/>
                        <div className="page-container">
                            <div className="text-center">
                                <a data-target href="#nowActivity" className="activity active now-activity"/>
                                <a data-target href="#futureActivity" className="activity future-activity"/>
                                <a data-target href="#oldActivity" className="activity old-activity"/>
                            </div>
                            <div className="page-content">
                                <Article
                                    isActive={true}
                                    id="nowActivity"
                                    list={this.state.nowActivity}
                                />
                                <Article
                                    id="futureActivity"
                                    list={this.state.futureActivity}
                                />
                                <Article
                                    id="oldActivity"
                                    list={this.state.oldActivity}
                                />
                            </div>
                        </div>
                    </div>
                    <Footer {...this.state}/>
                </div>
            );
        }
    }
);

ReactDOM.render(<App />, document.getElementById('app'));