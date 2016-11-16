/**
 * 头部组件
 */
var Header = Global.component.Header;
/**
 * 底部组件
 */
var Footer = Global.component.Footer;
/**
 * 表格组件
 */
var Table = Global.component.Table;
/**
 * 请求地址
 */
var URL = Global.URLS;
/**
 * 链接地址
 */
var LINK = Global.LINK;

/**
 * 公共方法
 */
var Mixin = {
    /**
     * 根据标状态返回按钮
     * @param loan 标的
     * 标地址
     */
    getInvestBtn: function (loan) {
        var status = parseInt(loan.status);
        switch (status) {
            case 300:
                return <a href={Utils.getInvestUrl(loan)} className="btn-invest">立即投资</a>;
            case 301:
            case 302:
                return <span className="btn-invest btn-not-start">未开始</span>;
            case 400:
                return <span className="btn-invest btn-invest-full">已满标</span>;
            case 500:
                return <span className="btn-invest btn-repayment">还款中</span>;
            case 600:
                return <span
                    className="btn-invest btn-already-repayment">已还款</span>;
        }
    }
};

/**
 * 搜索条件
 */
var SearchTerms = React.createClass({
    getInitialState: function () {
        return {
            loanTypeRanges: null,
            loanTypeIndex: null,
            loanStatusRanges: null,
            loanStatusIndex: null,
            priceRanges: null,
            priceRangeIndex: null,
            termCountRanges: null,
            termCountIndex: null,
            interestRanges: null,
            interestRangeIndex: null
        };
    },
    handleClick: function (param, event) {
        event.preventDefault();
        this.props.queryData(param);
        this.setState(param);
    },
    getItem: function (ranges, index, key) {
        return ranges && ranges.map(function (result, i) {
                /**
                 * 初始化参数
                 */
                var param = {};
                param[key] = i;
                param.currentPage = 1;
                return (
                    <dd>
                        <button
                            type="button"
                            className={i == index ? "active" : null}
                            onClick={this.handleClick.bind(this, param)}>{result}</button>
                    </dd>
                );
            }.bind(this));
    },
    componentWillReceiveProps: function (props) {
        this.setState(props.searchTerms);
    },
    render: function () {
        return (
            <section className="page-container">
                <h3 className="list-tab">
                    <ul>
                        <li className="list-item active"><a href={LINK.INVEST_LIST}>项目投资</a></li>
                        <li className="list-item"><a href={LINK.DEBT_LIST}>债权购买</a></li>
                    </ul>
                </h3>
                <div className="search-area clear-fix">
                    <div className="pull-left">
                        <dl>
                            <dt>项目类型</dt>
                            {this.getItem(this.state.loanTypeRanges, this.state.loanTypeIndex, 'loanTypeIndex')}
                        </dl>
                        <dl>
                            <dt>项目状态</dt>
                            {this.getItem(this.state.loanStatusRanges, this.state.loanStatusIndex, 'loanStatusIndex')}
                        </dl>

                        <dl>
                            <dt>项目金额</dt>
                            {this.getItem(this.state.priceRanges, this.state.priceRangeIndex, 'priceRangeIndex')}
                        </dl>

                        <dl>
                            <dt>借款期限</dt>
                            {this.getItem(this.state.termCountRanges, this.state.termCountIndex, 'termCountIndex')}
                        </dl>
                        <dl>
                            <dt>预计收益</dt>
                            {this.getItem(this.state.interestRanges, this.state.interestRangeIndex, 'interestRangeIndex')}
                        </dl>
                    </div>
                    <div className="pull-right">
                        <p>收获财富，如此简单</p>
                        <img className="lb" src="../../static/list/invest-list/img/lb.png"/>
                        <img className="lb1" src="../../static/list/invest-list/img/lb1.png"/>
                    </div>
                </div>
            </section>
        );
    }
});

/**
 * 表格数据
 */
var InvestTable = React.createClass({
    mixins: [Mixin],
    getInitialState: function () {
        return {
            list: [
                {
                    loanClassify: null,
                    loanType: null,
                    title: null,
                    loanId: null,
                    annualInterestRate: null,
                    amount: null,
                    termCount: null,
                    termUnit: null,
                    productId: null,
                    progress: null,
                    status: null
                }
            ]
        };
    },
    componentWillReceiveProps: function (props) {
        this.setState(props, function () {
            setTimeout(function () {
                var pie = $('[data-percent]');
                pie.each(function () {
                    $(this).easyPieChart({
                        barColor: function (percent) {
                            return ((percent <= 0) ? '#eee' : '#CE0808');
                        },
                        trackColor: '#eee',
                        scaleColor: false,
                        lineCap: 'square',
                        lineWidth: 5,
                        size: 57,
                        animate: ({
                            duration: 2000,
                            enabled: true
                        })
                    });
                });

                pie.each(function () {
                    $(this).data('easyPieChart').update($(this).attr('data-percent'));
                });
            }.bind(this), 66);
        });
    },
    render: function () {
        return (
            <Table
                {...this.state}
                th={['借款标题', '年化利率', '借款总额', '期限', '还款方式', '投资进度', '操作']}
                callBack={
                    function (loan) {
                        return (
                            <tr>
                                <td>
                                    <a className="invest-title text-overflow-middle"
                                       title={loan.title}
                                       href={Utils.getInvestUrl(loan)}>{loan.title}</a>

                                    {loan.loanClassify === 1 ? <span>【新手专享】</span> : null}
                                </td>
                                <td>{loan.annualInterestRate}</td>
                                <td>{Utils.formatAmount(loan.amount)}</td>
                                <td>{Utils.formatTerm(loan.termCount, loan.termUnit)}</td>
                                <td>{Utils.formatProductId(loan.productId)}</td>
                                <td>
                                    <div className="percentage" data-percent={loan.progress}>
                                        <span className="percentage-text">{loan.progress + '%'}</span>
                                    </div>
                                </td>
                                <td>{this.getInvestBtn(loan)}</td>
                            </tr>
                        );
                    }.bind(this)
                }
            />
        );
    }
});

var App = React.createClass({
    queryData: function (param) {
        if (param) {
            this.param = $.extend(this.param, param);
        } else {
            this.param = {
                currentPage: 1,
                loanTypeIndex: 0,
                loanStatusIndex: 0,
                priceRangeIndex: 0,
                termCountIndex: 0,
                interestRangeIndex: 0
            }

        }
        $.get(URL.INVEST_LIST, this.param, function (result) {
            this.setState(result);
        }.bind(this));
    },
    componentDidMount: function () {
        this.queryData();
    },
    render: function () {
        return (
            <div>
                <Header {...this.state}/>
                <SearchTerms queryData={this.queryData} {...this.state}/>
                <section className="page-container clear-fix">
                    <h3 className="list-tab">
                        <span className="list-item active">项目展示<a href={LINK.OTHER.CALCULATE}><img
                            src="../../static/list/invest-list/img/lc.png"/></a></span>
                    </h3>
                    <InvestTable {...this.state} queryData={this.queryData}/>
                </section>
                <Footer {...this.state}/>
            </div>
        );
    }
});

ReactDOM.render(<App />, document.getElementById('app'));