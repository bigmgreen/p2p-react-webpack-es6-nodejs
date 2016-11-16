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
 * 弹框组件组件
 */
var Modal = Global.component.Modal;
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

var HobbyTable = React.createClass({
    getInitialState: function () {
        return {
            list: {
                gradle_name: null,
                amount_lower: null,
                amount_upper: null,
                term_lower: null,
                term_upper: null,
                rate_lower: null,
                rate_upper: null,
                is_push: null,
                push_way: null,
                id: null
            },
            id: null
        };
    },
    componentWillReceiveProps: function (nextProps) {
        this.setState(nextProps);
    },
    deleteHobby: function (id) {
        Utils.checkLoginStatus(function () {
            $('#deleteModalBody').html('您确定删除这个喜好吗？');
            $('#deleteModal').modal();
            this.setState({id: id});
        }.bind(this), null);
    },
    render: function () {
        return (
            <div>
                <Table
                    {...this.state}
                    tableClass="table table-hover table-bordered"
                    th={['借款人等级', '金额范围', '期限范围', '利率范围', '是否推送', '推送方式', '操作']}
                    callBack={
                        function (result) {
                            return (
                                <tr>
                                    <td>{result.gradle_name}</td>
                                    <td>{result.amount_lower}~{result.amount_upper}</td>
                                    <td>{result.term_lower}~{result.term_upper}个月</td>
                                    <td>{result.rate_lower * 100}%~{result.rate_upper * 100}%</td>
                                    <td>{result.is_push ? '是' : '否'}</td>
                                    <td>{Utils.getPushTextByWap(result)}</td>
                                    <td>
                                        <a className="btn btn-success"
                                           href={LINK.ACCOUNT.HOBBY_EDIT + result.id}
                                           style={{'margin-right': '1em'}}
                                        >编辑</a>
                                        <button
                                            type="button"
                                            className="btn btn-success"
                                            onClick={this.deleteHobby.bind(this, result.id)}>删除
                                        </button>
                                    </td>
                                </tr>
                            )
                        }.bind(this)
                    }
                />
                <Modal {...{
                    id: 'deleteModal',
                    isBig: false,
                    title: '删除提示',
                    bodyId: 'deleteModalBody',
                    showHead: true,
                    showFoot: true,
                    okBtn: true,
                    callBack: function () {
                        $.post(URL.HOBBY.DELETE_HOBBY, {id: this.state.id}, function () {
                            $('#deleteModal').modal('hide');
                            this.props.queryData();
                        }.bind(this));
                    }.bind(this)
                }}/>
            </div>
        );
    }
});


var AccountRight = React.createClass({
    getInitialState: function () {
        return {
            list: []
        };
    },
    componentWillReceiveProps: function (nextProps) {
        this.setState(nextProps)
    },
    render: function () {

        return (
            <section className="account-right account-wrap">
                <h3 className="account-wrap-title">
                    <span>喜好记录</span>
                    {this.state.list.length < 2 &&
                    (<a className="btn btn-success pull-right" href={LINK.ACCOUNT.HOBBY_ADD}>添加喜好</a>)}
                </h3>
                <HobbyTable {...this.state} queryData={this.props.queryData}/>
                <Modal {...{
                    id: 'loginModal',
                    isBig: false,
                    title: '提示',
                    showHead: true,
                    showFoot: false,
                    body: (
                        <span>
                            <span>你还没有登录平台，请你去</span>
                            <a className="text-warning" href={LINK.USER.LOGIN}>登录</a>
                        </span>
                    )
                }}/>
            </section>
        );
    }
});

var App = React.createClass({
    componentDidMount: function () {
        this.queryData();
    },
    queryData: function () {
        $.get(URL.HOBBY.GET_HOBBY_LIST, function (result) {
            this.setState({
                list: result.list,
                appUser: result.appUser
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
                        pageName: '我的喜好'
                    }}/>
                    <div className="clear-fix">
                        <AccountLeft {...this.state}/>
                        <AccountRight {...this.state} queryData={this.queryData}/>
                    </div>
                </div>
                <Footer {...this.state}/>
            </div>
        );
    }
});

ReactDOM.render(<App />, document.getElementById('app'));