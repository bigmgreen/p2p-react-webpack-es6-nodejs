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
 * 标签页组件
 */
var Tab = Global.component.Tab;
/**
 * 弹框组件
 */
var Modal = Global.component.Modal;
/**
 * 请求地址
 */
var URL = Global.URLS.ACCOUNT;
/**
 * 链接地址
 */
var LINK = Global.LINK;

var MsgCenterPanel = React.createClass({
    getInitialState: function () {

        var temp = {
            isread: null,
            id: null,
            messageType: null,
            sendtime: null,
            senderName: null,
            title: null,
            timeOrder: null,
        };

        return {
            today: [temp],
            yesterday: [temp],
            twoDaysBefore: [temp],
            pageView: {
                currentPage: 1,
                pageCount: null
            },
            checked: false
        };
    },
    componentWillReceiveProps: function (nextProps) {
        this.setState(nextProps);
    },
    /**
     * 获取选中的消息
     */
    validateChecked: function () {

        var readId = "";
        $('[name=mcb]').each(function () {
            if (this.checked) {
                readId += this.value + ",";
            }
        });

        return readId;
    },
    updateMsgStatus: function (url) {
        var readId = this.validateChecked(url);

        if (readId === "") {
            if (url === "markedRead") {
                $("#validateModalBody").html('请选择要标记为已读的记录');
            }
            else if (url === "markedNoRead") {
                $("#validateModalBody").html('请选择要标记为未读的记录');
            }
            else if (url === "delInnerMail") {
                $("#validateModalBody").html('请选择要删除的记录');
            }
            $('#validateModal').modal();
            return;
        }

        if (url === URL.MESSAGE_CENTER.DEL_INNER_MAIL) {
            if (!confirm("是否确定删除选中的站内信!")) {
                return;
            }
        }

        Utils.checkLoginStatus(function () {
            $.post(url, {readId: readId}).done(function () {
                this.props.queryData(this.props.param);
            }.bind(this));
        }.bind(this), null);

    },
    getTables: function (list, dayText) {

        if (list.length === 0) {
            return false;
        }

        return (
            <section>
                <h3 className="account-wrap-title">
                    <span>{dayText}</span>
                    <span>{'(' + list.length + ')'}</span>
                </h3>
                <table className="table table-hover">
                    <tbody>
                    {list.map(function (item) {

                        // 注意这里有个空格
                        var className = 'text-overflow-large ';
                        if (item.isread === false) {
                            className += 'not-read';
                        }

                        return (
                            <tr>
                                <td className="wid50">
                                    <input
                                        type="checkbox"
                                        name="mcb"
                                        value={item.id}
                                    />
                                </td>
                                <td className="wid100">{Utils.getMessageType(item.messageType)}</td>
                                <td className="wid200">{item.sendtime}</td>
                                <td className="wid100">{item.senderName}</td>
                                <td>
                                    <a className={className}
                                       href={LINK.ACCOUNT.MESSAGE_DETAIL + item.id + '#' + this.state.pageView.currentPage}>
                                        {item.title}
                                    </a>
                                </td>
                            </tr>
                        );
                    }.bind(this))}
                    </tbody>
                </table>
            </section>
        );
    },
    render: function () {

        return (
            <div>
                <div className="btn-group">
                    <button
                        type="button"
                        className="btn btn-default"
                        onClick={this.props.handleClick.bind(this, true)}>全选
                    </button>
                    <button
                        type="button"
                        className="btn btn-default"
                        onClick={this.props.handleClick.bind(this, false)}>反选
                    </button>
                    <button
                        type="button"
                        className="btn btn-default"
                        onClick={this.updateMsgStatus.bind(this, URL.MESSAGE_CENTER.MARKED_READ)}>已读
                    </button>
                    <button
                        type="button"
                        className="btn btn-default"
                        onClick={this.updateMsgStatus.bind(this, URL.MESSAGE_CENTER.MARKED_NO_READ)}>未读
                    </button>
                    <button
                        type="button"
                        className="btn btn-default"
                        onClick={this.updateMsgStatus.bind(this, URL.MESSAGE_CENTER.DEL_INNER_MAIL)}>删除
                    </button>
                </div>
                <section>
                    {this.getTables(this.state.today, '今天')}
                    {this.getTables(this.state.yesterday, '昨天')}
                    {this.getTables(this.state.twoDaysBefore, '两天前')}
                    {((this.state.today.length === 0 &&
                    this.state.yesterday.length === 0 &&
                    this.state.twoDaysBefore.length === 0)) && (
                        <tr>
                            <td className="no-record" colSpan="5">没有消息！</td>
                        </tr>
                    )}
                </section>
                <Pagination {...this.state} queryData={this.props.queryData}/>
            </div>
        );
    }
});

var MsgSettingPanel = React.createClass({
    componentWillReceiveProps: function (nextProps) {
        this.setState({messageSetup: nextProps.messageSetup}, function () {

            setTimeout(function () {
                this.state.messageSetup.split(',').map(function (item) {
                    $('#' + $.trim(item)).trigger('click');
                });
            }.bind(this), 99);
        }.bind(this));
    },
    handleClick: function () {
        var selectedItems = $('[name="messageSetup"]:checked').map(function () {
            return $(this).val();
        });

        $.post(URL.MESSAGE_CENTER.SAVE_MSG_SETUP,
            {messageSetup: Array.prototype.join.call(selectedItems, ',')}).done(function (result) {
            if (parseInt(result) > 0) {
                alert('保存成功!');
            } else {
                alert('保存失败!');
            }
            location.reload();
        });
    },
    getSettingItem: function (item) {

        item = $.extend({
            name: 'messageSetup',
            type: 'checkbox'
        }, item);

        return (
            <td>
                <input
                    name={item.name}
                    type={item.type}
                    id={item.value}
                    value={item.value}
                />
                <label htmlFor={item.value}>{item.text}</label>
            </td>
        );
    },
    getDefaultSettingItem: function (text) {
        return (
            <tr>
                <td>{text}</td>
                {['站内信', '邮件', '短信'].map(function (item) {
                    return (
                        <td>
                            <img src="../../static/account/message-center/img/reg_right.jpg"/>
                            <label>{item}</label>
                        </td>
                    );
                })}
            </tr>
        );
    },
    render: function () {
        return (
            <div>
                <h3 className="account-wrap-title">请选择你接受提醒的方式</h3>
                <table className="table table-bordered height40 text-center">
                    <tbody>
                    <tr>
                        <th colSpan="4" className="active">资金消息设置</th>
                    </tr>
                    {this.getDefaultSettingItem('提现成功')}
                    {this.getDefaultSettingItem('提现失败')}
                    <tr>
                        <td>充值成功</td>
                        {this.getSettingItem({value: 'me1', text: '站内信'})}
                        {this.getSettingItem({value: 'me2', text: '邮件'})}
                        {this.getSettingItem({value: 'me3', text: '短信'})}
                    </tr>
                    <tr>
                        <td>充值失败</td>
                        {this.getSettingItem({value: 'mg1', text: '站内信'})}
                        {this.getSettingItem({value: 'mg2', text: '邮件'})}
                        {this.getSettingItem({value: 'mg3', text: '短信'})}
                    </tr>
                    <tr>
                        <th colSpan="4" className="active">投资消息设置</th>
                    </tr>
                    <tr>
                        <td>投标冻结</td>
                        {this.getSettingItem({value: 'pa1', text: '站内信'})}
                        {this.getSettingItem({value: 'pa2', text: '邮件'})}
                        {this.getSettingItem({value: 'pa3', text: '短信'})}
                    </tr>
                    <tr>
                        <td>满标扣款</td>
                        {this.getSettingItem({value: 'pb1', text: '站内信'})}
                        {this.getSettingItem({value: 'pb2', text: '邮件'})}
                        {this.getSettingItem({value: 'pb3', text: '短信'})}
                    </tr>
                    <tr>
                        <td>投资流标</td>
                        {this.getSettingItem({value: 'pc1', text: '站内信'})}
                        {this.getSettingItem({value: 'pc2', text: '邮件'})}
                        {this.getSettingItem({value: 'pc3', text: '短信'})}
                    </tr>
                    <tr>
                        <td>收到还款</td>
                        {this.getSettingItem({value: 'pd1', text: '站内信'})}
                        {this.getSettingItem({value: 'pd2', text: '邮件'})}
                        {this.getSettingItem({value: 'pd3', text: '短信'})}
                    </tr>
                    <tr>
                        <td>债权转让</td>
                        {this.getSettingItem({value: 'pe1', text: '站内信'})}
                        {this.getSettingItem({value: 'pe2', text: '邮件'})}
                    </tr>
                    <tr>
                        <td>债权转让-卖出</td>
                        {this.getSettingItem({value: 'pf1', text: '站内信'})}
                        {this.getSettingItem({value: 'pf2', text: '邮件'})}
                        {this.getSettingItem({value: 'pf3', text: '短信'})}
                    </tr>
                    <tr>
                        <td>债权转让-买入</td>
                        {this.getSettingItem({value: 'pg1', text: '站内信'})}
                        {this.getSettingItem({value: 'pg2', text: '邮件'})}
                        {this.getSettingItem({value: 'pg3', text: '短信'})}
                    </tr>
                    <tr>
                        <th colSpan="4" className="active">借款消息设置</th>
                    </tr>
                    <tr>
                        <td>借款审核未通过</td>
                        {this.getSettingItem({value: 'pi1', text: '站内信'})}
                        {this.getSettingItem({value: 'pi2', text: '邮件'})}
                        {this.getSettingItem({value: 'pi3', text: '短信'})}
                    </tr>
                    <tr>
                        <td>借款审核通过</td>
                        {this.getSettingItem({value: 'pk1', text: '站内信'})}
                        {this.getSettingItem({value: 'pk2', text: '邮件'})}
                        {this.getSettingItem({value: 'pk3', text: '短信'})}
                    </tr>
                    <tr>
                        <td>满标放款</td>
                        {this.getSettingItem({value: 'ph1', text: '站内信'})}
                        {this.getSettingItem({value: 'ph2', text: '邮件'})}
                        {this.getSettingItem({value: 'ph3', text: '短信'})}
                    </tr>
                    <tr>
                        <td>还款提醒</td>
                        {this.getSettingItem({value: 'po1', text: '站内信'})}
                        {this.getSettingItem({value: 'po2', text: '邮件'})}
                        {this.getSettingItem({value: 'po3', text: '短信'})}
                    </tr>
                    <tr>
                        <td>还款操作</td>
                        {this.getSettingItem({value: 'pm1', text: '站内信'})}
                        {this.getSettingItem({value: 'pm2', text: '邮件'})}
                        {this.getSettingItem({value: 'pm3', text: '短信'})}
                    </tr>
                    <tr>
                        <td>逾期还款提醒</td>
                        {this.getSettingItem({value: 'pn1', text: '站内信'})}
                        {this.getSettingItem({value: 'pn2', text: '邮件'})}
                        {this.getSettingItem({value: 'pn3', text: '短信'})}
                    </tr>
                    <tr>
                        <td>借款流标</td>
                        {this.getSettingItem({value: 'pl1', text: '站内信'})}
                        {this.getSettingItem({value: 'pl2', text: '邮件'})}
                        {this.getSettingItem({value: 'pl3', text: '短信'})}
                    </tr>
                    <tr>
                        <th colSpan="4" className="active">网站运营消息设置</th>
                    </tr>
                    <tr>
                        <td>留言回复通知</td>
                        {this.getSettingItem({value: 'lr1', text: '站内信'})}
                        {this.getSettingItem({value: 'lr2', text: '邮件'})}
                    </tr>
                    <tr>
                        <th colSpan="4" className="active">网站消息设置</th>
                    </tr>
                    <tr>
                        <td>登录失败</td>
                        {this.getSettingItem({value: 'wa1', text: '站内信'})}
                        {this.getSettingItem({value: 'wa2', text: '邮件'})}
                    </tr>
                    {this.getDefaultSettingItem('修改登录密码')}
                    </tbody>
                </table>
                <div className="text-center">
                    <button type="button" className="opeBtn" onClick={this.handleClick}>提交</button>
                </div>
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
            <Tab
                className={{
                    container: 'account-right',
                    header: 'tab-header',
                    title: 'tab-button',
                    content: 'tab-content',
                    item: 'tab-item'
                }}
                tabItemIds={[
                    {msgCenter: '消息中心'},
                    {msgSetting: '消息设置'}
                ]}
                tabItem={[
                    {
                        msgCenter: <MsgCenterPanel
                            {...this.state}
                            queryData={this.props.queryData}
                            handleClick={this.props.handleClick}
                        />
                    },
                    {msgSetting: <MsgSettingPanel {...this.state} />}
                ]}
            />
        );
    }
});

var App = React.createClass({
    componentDidMount: function () {
        this.queryData({
            currentPage: Utils.getHashValue() || 1
        });
    },
    handleClick: function (flag, e) {
        e && e.preventDefault();

        $('table').find('[type="checkbox"]').prop('checked', flag);
    },
    queryData: function (param) {

        if (param) {
            this.param = $.extend(this.param, param);
        } else {
            this.param = {
                currentPage: 1
            }
        }

        $.get(URL.MESSAGE_CENTER.GET_MESSAGE_CENTER_LIST, this.param, function (result) {
            var pageView = result.info.pageView;
            this.setState({
                appUser: result.appUser,
                today: result.today,
                yesterday: result.yesterday,
                twoDaysBefore: result.twoDaysBefore,
                pageView: {
                    currentPage: pageView.currentPage,
                    pageCount: pageView.pageCount
                },
                messageSetup: result.info.messageSetup
            }, function () {
                /**   清除之前选中的标签   */
                this.handleClick(false);
            }.bind(this));
        }.bind(this));

    },
    render: function () {
        return (
            <div>
                <Header {...this.state}/>
                <div className="page-container">
                    <Breadcrumb {...{
                        index: '首页',
                        pageName: '消息中心'
                    }}/>
                    <div className="clear-fix">
                        <AccountLeft {...this.state}/>
                        <AccountRight {...this.state} queryData={this.queryData} handleClick={this.handleClick}/>
                    </div>
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
                    <Modal {...{
                        id: 'validateModal',
                        isBig: false,
                        title: '提示',
                        bodyId: 'validateModalBody',
                        showHead: true,
                        showFoot: false
                    }}/>
                </div>
                <Footer {...this.state}/>
            </div>
        );
    }
});

ReactDOM.render(<App />, document.getElementById('app'));
