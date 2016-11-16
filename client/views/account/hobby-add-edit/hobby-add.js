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
 * 输入框组件
 */
var Input = Global.component.Input;
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

var HobbyForm = React.createClass({
    getInitialState: function () {
        return {
            creditGradeList: [
                {
                    creditId: null,
                    creditName: null
                }
            ],
            amountLowers: [
                '0-0元',
                '10000-10000元以下',
                '30000-30000元',
                '50000-50000元',
                '70000-70000元',
                '100000-100000元以上'
            ],
            amountUppers: [
                '9999-10000元以下',
                '30000-30000元',
                '50000-50000元',
                '70000-70000元',
                '100000-100000元',
                '100000000-100000000元'
            ],
            termLowers: [
                '0-0个月',
                '1-1个月',
                '3-3个月',
                '6-6个月',
                '12-1年',
                '24-2年',
                '36-3年以上'
            ],
            termUppers: [
                '1-1个月以下',
                '3-3个月',
                '6-6个月',
                '12-1年',
                '24-2年',
                '36-3年',
                '120-10年'
            ],
            rateLowers: [
                '0-0%',
                '0.05-5%',
                '0.10-10%',
                '0.15-15%',
                '0.20-20%以上'
            ],
            rateUppers: [
                '0.05-5%以下',
                '0.10-10%',
                '0.15-15%',
                '0.20-20%',
                '0.30-30%',
                '0.99-99%',
            ],
            amountLower: 0,
            termLower: 0,
            rateLower: 0
        };
    },
    componentWillReceiveProps: function (nextProps) {
        this.setState(nextProps);
    },
    getCreditGrades: function (list) {
        return list.map(function (item) {
            return (
                <option value={item.creditId}>{item.creditName}</option>
            );
        });
    },
    handleIsPush: function (flag) {
        if (flag) {
            $('[name=pushWay]').map(function () {
                $(this).removeAttr('disabled');
            });
        } else {
            $('[name=pushWay]').map(function () {
                $(this).attr('disabled', true);
            });
        }
    },
    /**
     * 作为底层生成option的函数存在
     * @param list 要生成的数据列表
     * @param min 下限
     * @private
     *
     * 结构 [value-unit, value-unit] value:是具体值 unit是单位
     *
     */
    getOption: function (list, min) {
        return list.map(function (item) {
            var temp = item.split('-');
            var num = Number(temp[0]);
            var numUnit = temp[1];

            if (min === false) {
                return (
                    <option value={num}>{numUnit}</option>
                );
            }

            if (num > min) {
                return (
                    <option value={num}>{numUnit}</option>
                );
            }
        });
    },
    handleChange: function (type, e) {
        switch (type) {
            case 'amount':
                this.setState({
                    amountLower: e.target.value
                });
                break;
            case 'term':
                this.setState({
                    termLower: e.target.value
                });
                break;
            case 'rate':
                this.setState({
                    rateLower: e.target.value
                });
                break;
        }
    },
    handleSubmit: function (e) {
        Utils.checkLoginStatus(function () {
            $.post(URL.HOBBY.ADD_HOBBY, $("#hobbyForm").serialize(), function (data) {
                if (data == 1) {
                    alert("添加成功");
                    /**
                     * 退回到之前的喜好列表页
                     */
                    location.href = LINK.ACCOUNT.HOBBY;
                } else if (data == -1) {
                    alert("喜好不能超过两个");
                } else if (data == -2) {
                    alert("是否推送不能为空");
                } else if (data == -3) {
                    alert("请选择推送方式");
                } else if (data == -4) {
                    alert("不能添加重复喜好");
                }
            });
        }, null);
    },
    render: function () {
        return (
            <form id="hobbyForm" className="hobby-form">
                <div className="form-group">
                    <label htmlFor="creditId" className="control-label">借款人等级</label>
                    <div className="hobby-input-wrap">
                        <select name="creditId" id="creditId" className='form-control'>
                            {this.getCreditGrades(this.state.creditGradeList)}
                        </select>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="amountLower" className="control-label">金额范围</label>
                    <div className="hobby-input-wrap">
                        <select
                            id="amountLower"
                            name="amountLower"
                            className="form-control"
                            onChange={this.handleChange.bind(this, 'amount')}
                        >
                            {this.getOption(this.state.amountLowers, false)}
                        </select>
                        <span>~</span>
                        <select name="amountUpper" className="form-control">
                            {this.getOption(this.state.amountUppers, this.state.amountLower)}
                        </select>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="termLower" className="control-label">期限范围</label>
                    <div className="hobby-input-wrap">
                        <select
                            id="termLower"
                            name="termLower"
                            className="form-control"
                            onChange={this.handleChange.bind(this, 'term')}
                        >
                            {this.getOption(this.state.termLowers, false)}
                        </select>
                        <span>~</span>
                        <select name="termUpper" className="form-control">
                            {this.getOption(this.state.termUppers, this.state.termLower)}
                        </select>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="rateLower" className="control-label">利率范围</label>
                    <div className="hobby-input-wrap">
                        <select
                            id="rateLower"
                            name="rateLower"
                            className="form-control"
                            onChange={this.handleChange.bind(this, 'rate')}
                        >
                            {this.getOption(this.state.rateLowers, false)}
                        </select>
                        <span>~</span>
                        <select name="rateUpper" className="form-control">
                            {this.getOption(this.state.rateUppers, this.state.rateLower)}
                        </select>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="isPush" className="control-label">是否推送</label>
                    <div className="hobby-input-wrap">
                        <input
                            type="radio"
                            value="true"
                            id="isPush"
                            name="isPush"
                            onClick={this.handleIsPush.bind(this, true)}
                        />
                        <label htmlFor="isPush">是</label>
                        <input
                            type="radio"
                            value="false"
                            id="isNotPush"
                            name="isPush"
                            onClick={this.handleIsPush.bind(this, false)}
                        />
                        <label htmlFor="isNotPush">否</label>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="siteMsg" className="control-label">推送方式</label>
                    <div className="hobby-input-wrap">
                        <input
                            type="checkbox"
                            value="-1-"
                            id="siteMsg"
                            name="pushWay"
                        />
                        <label htmlFor="siteMsg">站内信</label>
                        <input
                            type="checkbox"
                            value="-2-"
                            id="emailMsg"
                            name="pushWay"
                        />
                        <label htmlFor="emailMsg">邮件</label>
                        <input
                            type="checkbox"
                            value="-3-"
                            id="newsMsg"
                            name="pushWay"
                        />
                        <label htmlFor="newsMsg">短信</label>
                    </div>
                </div>
                <div className="form-group text-center">
                    <button
                        type="button"
                        className="btn btn-success"
                        onClick={this.handleSubmit.bind(this)}
                    >提交
                    </button>
                    <button type="reset" className="btn btn-default">重置</button>
                </div>
            </form>
        );
    }
});

var AccountRight = React.createClass({
    componentWillReceiveProps: function (nextProps) {
        this.setState(nextProps)
    },
    render: function () {
        return (
            <section className="account-right account-wrap">
                <h3 className="account-wrap-title">
                    <span>添加喜好</span>
                </h3>
                <HobbyForm {...this.state} />
            </section>
        );
    }
});

var App = React.createClass({
    componentDidMount: function () {

        /**   设置选中效果  */
        $('[data-account-left]').find('a').each(function () {
            if ($(this).attr('href') === 'hobby.html') {
                $(this).addClass('active');
                return false;
            }
        });

        $.get(URL.HOBBY.GET_CREDIT_GRADE_LIST).done(function (result) {
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
                        pageName: '添加喜好'
                    }}/>
                    <div className="clear-fix">
                        <AccountLeft {...this.state}/>
                        <AccountRight {...this.state}/>
                    </div>
                </div>
                <Footer {...this.state}/>
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
            </div>
        );
    }
});

ReactDOM.render(<App />, document.getElementById('app'));
