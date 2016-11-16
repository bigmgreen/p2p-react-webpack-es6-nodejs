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
 * 表格组件
 */
var Table = Global.component.Table;
/**
 * 左菜单组件
 */
var AccountLeft = Global.component.AccountLeft;
/**
 * 请求地址
 */
var URL = Global.URLS.ACCOUNT;

/**
 * 积分信息
 */
var ScoreInfo = React.createClass({
    getInitialState: function () {
        return {
            scoreUser: {
                //累计获取积分
                usedPoints: "查询中",
                //可用积分
                conversionPoints: "查询中",
                //冻结积分
                freezePoints: "查询中",
                //已用积分
                expendPoints: "查询中",
            }
        };
    },
    componentWillReceiveProps: function (nextProps) {
        this.setState(nextProps);
    },
    render: function () {

        var scoreUser = this.state.scoreUser;

        return (
            <section>
                <h3 className="account-wrap-title">我的积分</h3>
                <ul className="score-list clearfix">
                    <li>
                        <p>累计获取积分</p>
                        <p className="score-lj">{scoreUser.usedPoints}</p>
                    </li>
                    <li>
                        <p>可用积分</p>
                        <p className="score-ky">{scoreUser.conversionPoints}</p>
                    </li>
                    <li>
                        <p>冻结积分</p>
                        <p className="score-dj">{scoreUser.freezePoints}</p>
                    </li>
                    <li>
                        <p>已用积分</p>
                        <p className="score-yy">{scoreUser.expendPoints}</p>
                    </li>
                </ul>
            </section>
        );
    }
});

/**
 * 积分表格
 */
var ScoreTable = React.createClass({
    getInitialState: function () {
        return {
            list: [
                {
                    createTime: null,
                    status: null,
                    bizName: null,
                    goodsName: null,
                    points: null
                }
            ],
            pageView: {
                currentPage: 1,
                pageCount: 0
            }
        };
    },
    componentWillReceiveProps: function (nextProps) {
        this.setState(nextProps);
    },
    getScoreTextByStatus: function (status) {
        status = parseInt(status);
        switch (status) {
            case 0:
            case 4:
                return (<span>已获得</span>);
            case 2:
                return (<span>兑换通过</span>);
            case 3:
                return (<span>兑换失败</span>);
        }
    },
    getScorePointsByStatus: function (status, points) {
        status = parseInt(status);
        switch (status) {
            case 0:
            case 4:
                return (
                    <span style={{color: '#00A672'}}>+{points}</span>
                );
            case 2:
                return (
                    <span style={{color: '#DF032E'}}>-{points}</span>
                );
            case 3:
                return (
                    <span style={{color: '#009EDC'}}>+{points}</span>
                );
        }
    },
    render: function () {
        return (
            <section>
                <h3 className="account-wrap-title">积分记录</h3>
                <div className="table-responsive">
                    <Table
                        {...this.state}
                        tableClass="table table-hover"
                        th={['时间', '详情', '状态', '积分']}
                        noDataText="没有积分！"
                        callBack={
                            function (result) {
                                return (
                                    <tr>
                                        <td>{result.createTime}</td>
                                        <td>{result.bizName}</td>
                                        <td>{this.getScoreTextByStatus(result.status)}</td>
                                        <td><span
                                            className="active">{this.getScorePointsByStatus(result.status, result.points)}</span>
                                        </td>
                                    </tr>
                                )
                            }.bind(this)
                        }
                    />
                </div>
            </section>
        );
    }
});

var AccountRight = React.createClass({
    componentWillReceiveProps: function (nextProps) {
        this.setState(nextProps);
    },
    render: function () {
        return (
            <div className="account-right account-wrap">
                <ScoreInfo {...this.state} />
                <ScoreTable {...this.state}/>
            </div>
        );
    }
});

var App = React.createClass({
    componentDidMount: function () {
        this.queryData();
    },
    queryData: function (param) {

        if (param) {
            this.param = $.extend(this.param, param);
        } else {
            this.param = {
                currentPage: 1
            }
        }

        $.get(URL.SCORE.SCORE, this.param, function (result) {
            var pageView = result.pageView;
            this.setState({
                appUser: result.appUser,
                list: pageView.voList,
                pageView: {
                    currentPage: pageView.currentPage,
                    pageCount: pageView.pageCount
                },
                scoreUser: result.scoreUser
            });
        }.bind(this));

    },
    render: function () {
        return (
            <div>
                <Header {...this.state}/>
                <div className="page-container">
                    <Breadcrumb {...{
                        index: '首页',
                        pageName: '我的积分'
                    }}/>
                    <div className="clear-fix">
                        <AccountLeft  {...this.state}/>
                        <AccountRight  {...this.state} queryData={this.queryData}/>
                    </div>
                </div>
                <Footer {...this.state}/>
            </div>
        );
    }
});

ReactDOM.render(<App />, document.getElementById('app'));