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
var URL = Global.URLS.LOAN;
/**
 * 链接地址
 */
var LINK = Global.LINK.LOAN;

var EnterpriseLoan = React.createClass({
    getInitialState: function () {
        return {
            loanProducts: [
                {
                    id: null,//借款产品id
                    productstype: null,//借款名称
                    loanmoneymin: null,//资金范围
                    loanmoneymax: null,
                    beginratescope: null,//年利率范围
                    endratescope: null,
                    begintermscope: null,//借款期限范围
                    endtermscope: null,
                    termtype: null,//借款期限单位
                    repaytype: null,//还款方式
                    features: null, //产品特点
                    conditions: null, //申请条件
                    materials: null,  //必要申请资料
                }
            ]
        };
    },
    componentWillReceiveProps: function (props) {
        this.setState(props);
    },
    render: function () {
        return (
            <div className="page-container">
                <div className="swiper-container">
                    <div className="swiper-wrapper">
                        {this.state.loanProducts.map(function (result) {
                            return (
                                <div className="swiper-slide">
                                    <div className="loan-plan">
                                        <h3 className="loan-plan-title">{result.productstype}</h3>
                                        <a className="btn btn-lg btn-primary"
                                           href={LINK.ENTERPRISE_LOAN_APPLY + result.id}>申请借款</a>
                                        <ul>
                                            <li>
                                                <b>金额范围：</b>
                                                <span>{result.loanmoneymin}元-{result.loanmoneymax}元</span>
                                            </li>
                                            <li>
                                                <b>年利率范围：</b>
                                                <span>{result.beginratescope}%-{result.endratescope}%</span>
                                            </li>
                                            <li>
                                                <b>借款期限：</b>
                                                <span>{result.begintermscope}-{result.endtermscope}{Utils.getTermUnit(result.termUnit)}</span>
                                            </li>
                                            <li>
                                                <b>还款方式：</b>
                                                <span>{Utils.formatProductId(result.repaytype)}</span>
                                            </li>
                                        </ul>
                                        <div>
                                            <button className="btn btn-default"
                                                    data-container="body"
                                                    title="产品特点"
                                                    data-toggle="popover"
                                                    data-placement="top"
                                                    data-content={result.features}>产品特点
                                            </button>
                                            <button className="btn btn-default"
                                                    data-container="body"
                                                    title="申请条件"
                                                    data-toggle="popover"
                                                    data-placement="top"
                                                    data-content={result.conditions}>申请条件
                                            </button>
                                            <button className="btn btn-default"
                                                    data-container="body"
                                                    title="必要申请资料"
                                                    data-toggle="popover"
                                                    data-placement="top"
                                                    data-content={result.materials}>必要申请资料
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )
                        }.bind(this))}
                    </div>
                    <div className="swiper-pagination"></div>
                </div>
            </div>
        );
    }
});

var App = React.createClass({
    componentDidMount: function () {
        $.get(URL.ENTERPRISE_LOAN, function (result) {
            this.setState(result);

            setTimeout(function () {
                new Swiper('.swiper-container', {
                    pagination: '.swiper-pagination',
                    slidesPerView: 3,
                    width: 1200,
                    paginationClickable: true,
                    preventClicks: false,
                    spaceBetween: 30,
                    autoplay: 4000,
                    speed: 1000
                });

                $("[data-toggle='popover']").popover({trigger: "hover"});
            }, 66);
        }.bind(this));
    },
    render: function () {
        return (
            <div>
                <Header {...this.state}/>
                <EnterpriseLoan {...this.state} />
                <Footer {...this.state}/>
            </div>
        );
    }
});
ReactDOM.render(<App />, document.getElementById('app'));
