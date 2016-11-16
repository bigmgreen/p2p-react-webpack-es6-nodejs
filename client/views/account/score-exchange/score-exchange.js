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

var ScoreTable = React.createClass({
    getInitialState: function () {
        return {
            scoreUser: {
                //累计获取积分
                usedPoints: "查询中",
                //冻结积分
                freezePoints: "查询中",
                //已用积分
                expendPoints: "查询中",
            },
            list: [
                {
                    pictureName: null,
                    goodsName: null,
                    points: null,
                    Id: null
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
        switch (parseInt(status)) {
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
    getGoodsByScore: function (goodsId) {

        Utils.checkLoginStatus(function () {
            $.post(URL.SCORE.GET_GOODS_SCORE, {goodsId: goodsId}).done(function (result) {
                alert(result.exchange);
                location.reload(true);
            });
        }, null);

    },
    render: function () {
        var list = this.state.list;
        var scoreUser = this.state.scoreUser;
        return (
            <div>
                <div className="clear-fix">
                    {list.map(function (result) {
                        return (
                            <table className="table-bordered text-center">
                                <tbody>
                                <tr>
                                    <td>
                                        <img
                                            className="img-responsive"
                                            alt="兑换物品图片"
                                            src={result.pictureName}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>{result.goodsName}</td>
                                </tr>
                                <tr>
                                    <td>积分：{result.points}</td>
                                </tr>
                                <tr>
                                    <td>
                                        <button
                                            type="button"
                                            className="btn btn-warning btn-sm"
                                            onClick={this.getGoodsByScore.bind(this, result.Id)}
                                        >兑换
                                        </button>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        )
                    }.bind(this))}
                    {(list.length === 0) && (
                        <h3 className="text-center no-record" colSpan="4">暂无兑换物品！</h3>
                    )}
                </div>
                <div className="clear-fix">
                    <Pagination {...this.state} queryData={this.props.queryData}/>
                </div>
                <strong
                    className="score-total">您的可用的积分为:{scoreUser.usedPoints - scoreUser.freezePoints - scoreUser.expendPoints}</strong>
            </div>
        );
    }
});

var AccountRight = React.createClass({
    componentWillReceiveProps: function (nextProps) {
        this.setState(nextProps);
    },
    render: function () {
        return (
            <section className="account-right account-wrap">
                <h3 className="account-wrap-title">
                    <span>积分兑换</span>
                    <span className="text-color">兑换前请仔细阅读下方的《积分兑换规则》</span>
                </h3>
                <ScoreTable {...this.state}/>
                <footer className="warm-warning">
                    <strong><img alt="温馨提示图标"
                                 src="../../static/common/img/tixiantanhao.png"/>积分兑换规则</strong>
                    <ol>
                        <li>用户的可用积分数必须大于或等于兑换物所需积分数。</li>
                        <li>申请兑换后须管理处理请求，在此期间所消耗的积分将被暂时冻结，且不会出现在积分记录中，当申请通过后会扣除该积分。如果兑换失败则将原数返还给用户。</li>
                        <li>当兑换申请通过后，客服人员将会在1-3个工作日内以邮件或电话方式联系您（以注册时填写信息为准），若您未收到相关通知，请拨打4006-111-566咨询。</li>
                    </ol>
                </footer>
            </section>
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

        $.get(URL.SCORE.SCORE_EXCHANGE, this.param, function (result) {
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
                        pageName: '积分兑换'
                    }}/>
                    <div className="clear-fix">
                        <AccountLeft {...this.state}/>
                        <AccountRight {...this.state} queryData={this.queryData}/>
                        <Modal {...{
                            id: 'loginModal',
                            isBig: false,
                            title: '提示',
                            showHead: true,
                            showFoot: false,
                            body: (
                                <span>
                            <span>你还没有登录平台，请你去</span>
                            <a className="text-warning" href='../user/login.html'>登录</a>
                        </span>
                            )
                        }}/>
                        <Modal {...{
                            id: 'alertModal',
                            isBig: false,
                            title: '提示',
                            bodyId: 'alertModalBody',
                            showHead: true,
                            showFoot: false
                        }}/>
                    </div>
                </div>
                <Footer {...this.state}/>
            </div>
        );
    }
});

ReactDOM.render(<App />, document.getElementById('app'));