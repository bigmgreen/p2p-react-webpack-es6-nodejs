/**
 * 头部组件
 */
var Header = Global.component.Header;
/**
 * 底部组件
 */
var Footer = Global.component.Footer;
/**
 * 标签页组件
 */
var Tab = Global.component.Tab;
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
 * banner 浮层
 */
var BannerForm = React.createClass({
    getInitialState: function () {
        return {
            appUser: null
        };
    },
    componentWillReceiveProps: function (nextProps) {
        this.setState({appUser: nextProps.appUser});
    },
    render: function () {
        var btnWrap = null;
        if (this.state.appUser instanceof Object) {
            btnWrap = (
                <div>
                    <a className="banner-form-btn" href={LINK.INVEST_LIST}>立即投资</a>
                    <p className="banner-form-foot">余额不足？<a href={LINK.ACCOUNT.RECHARGE}>马上充值&gt;</a></p>
                </div>
            );
        } else {
            btnWrap = (
                <div>
                    <a className="banner-form-btn" href={LINK.USER.REGISTER}>立即注册</a>
                    <p className="banner-form-foot">有账号？<a href={LINK.USER.LOGIN}>直接登录&gt;</a></p>
                </div>
            );
        }

        return (
            <div className="page-container">
                <div className="banner-form">
                    <h3 className="banner-form-title">优质理财预期年化收益</h3>
                    <strong className="banner-form-rate">高达8.0%</strong>
                    <p className="banner-form-desc">账户资金安全本金<span
                        className="banner-form-percent">100%</span>保障</p>
                    {btnWrap}
                </div>
            </div>
        );
    }
});

/**
 * banner 组件
 */
var Banner = React.createClass({
    getInitialState: function () {
        return {
            banners: [
                {
                    link: null,
                    picture: null
                }
            ]
        };
    },
    componentWillReceiveProps: function (nextProps) {
        this.setState(nextProps, function () {
            setTimeout(function () {
                new Swiper('.swiper-container', {
                    autoplay: 5000,
                    paginationClickable: true,
                    pagination: '.swiper-pagination'
                });
            }, 33);
        });
    },
    render: function () {
        return (
            <div className="page-banner">
                <BannerForm {...this.state} />
                <div className="swiper-container">
                    <div className="swiper-wrapper">
                        {this.state.banners.map(function (result) {
                            return (
                                <div className="swiper-slide">
                                    <a href={result.link}
                                       target="_blank"
                                       style={{backgroundImage: 'url(/static/pic/banner/' + result.picture + ')'}}/>
                                </div>
                            );
                        }.bind(this))}
                    </div>
                    <div className="swiper-pagination"></div>
                </div>
            </div>
        );
    }
});

/**
 * 平台基本信息
 */
var PlatformInfo = React.createClass({
    getInitialState: function () {
        return {
            investAmountCount: 0,
            investUerrCount: 0,
            investSuccess: 0,
            registerCount: 0
        };
    },
    componentWillReceiveProps: function (nextProps) {
        this.setState(nextProps);
    },
    render: function () {
        return (
            <div className="page-container">
                <ul className="platform-info clear-fix">
                    <li>
                        <strong className="platform-val">{this.state.investAmountCount}</strong>
                        <span className="platform-tit">累计投资总金额（万元）</span>
                    </li>
                    <li>
                        <strong className="platform-val">{this.state.investUerrCount}</strong>
                        <span className="platform-tit">平台投资人次</span>
                    </li>
                    <li>
                        <strong className="platform-val">{this.state.investSuccess}</strong>
                        <span className="platform-tit">投资成功项目数</span>
                    </li>
                    <li>
                        <strong className="platform-val">{this.state.registerCount}</strong>
                        <span className="platform-tit">注册总量</span>
                    </li>
                </ul>
            </div>
        );
    }
});

/**
 * 最新公告
 */
var LatestNotice = React.createClass({
    getInitialState: function () {
        return {
            notices: [
                {
                    id: null,
                    title: null,
                    issueTime: null
                }
            ]
        };
    },
    componentWillReceiveProps: function (nextProps) {
        this.setState(nextProps, function () {
            var marquee = $('[data-latest-notice="true"]');
            var delay = $('[data-latest-delay="3000"]').data('latest-delay');
            var list = marquee.find('li');

            setInterval(function () {
                $(Array.prototype.shift.call(list)).slideUp(1000, function () {
                    var temp = $(this).remove();
                    temp.css('display', 'block');
                    marquee.append(temp);
                    Array.prototype.push.call(list, temp.get());
                });
            }, delay);
        });
    },
    render: function () {
        return (
            <div className="latest-notice">
                <div className="page-container">
                    <div className="clear-fix">
                        <h3 className="latest-notice-title">最新公告</h3>
                        <ul data-latest-notice="true" data-latest-delay="3000" className="latest-notice-content">
                            {this.state.notices.map(function (item) {

                                var url = LINK.ABOUT_US.DETAIL + '?notices-' + item.id;

                                return (
                                    <li className="clear-fix latest-notice-item">
                                        <a href={url}
                                           title={item.title}
                                           className="latest-notice-desc"
                                        >{item.title}</a>
                                        <span className="pull-right">
                                            <span className="latest-notice-date">{item.issueTime}</span>
                                            <a href={url}
                                               className="latest-notice-more">更多&gt;&gt;</a>
                                        </span>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
});

/**
 * 平台简单描述
 */
var Desc = React.createClass({
    render: function () {
        return (
            <div className="page-desc">
                <div className="page-container clear-fix">
                    <dl>
                        <dd>
                            <img src="../../static/index/img/1-1.png"/>
                        </dd>
                        <dt className="page-desc-title">简单</dt>
                        <dt>技术自动分散投资</dt>
                        <dt>您可安心坐享高收益</dt>
                    </dl>
                    <dl>
                        <dd>
                            <img src="../../static/index/img/2-1.png"/>
                        </dd>
                        <dt className="page-desc-title">收益</dt>
                        <dt>优秀的本金保障计划</dt>
                        <dt>7%-14%预期年化收益率产品任选</dt>
                    </dl>
                    <dl>
                        <dd>
                            <img src="../../static/index/img/3-1.png"/>
                        </dd>
                        <dt className="page-desc-title">安全</dt>
                        <dt>银行级严密风控</dt>
                        <dt>保障投资安全</dt>
                    </dl>
                    <dl>
                        <dd>
                            <img src="../../static/index/img/4-1.png"/>
                        </dd>
                        <dt className="page-desc-title">保障</dt>
                        <dt>六重安全保障</dt>
                        <dt>为投资人资金安全保驾护航</dt>
                    </dl>
                </div>
            </div>
        );
    }
});

/**
 * 新手专享
 */
var NoviceExclusive = React.createClass({
    mixins: [Mixin],
    getInitialState: function () {
        return {
            newLoan: {
                //期限时间
                termCount: null,
                //期限单位
                termUnit: null,
                //年化利率
                annualInterestRate: null,
                //融资金额
                amount: 0,
                //标的状态
                status: null,
                // 判断个人还是企业 1是个人 2是企业
                loanType: null,
                //标id
                loanId: null
            }
        };
    },
    componentWillReceiveProps: function (nextProps) {
        this.setState(nextProps);
    },
    render: function () {
        var newLoan = this.state.newLoan;
        return (
            <div className="page-container">
                <section className="novice-exclusive clear-fix">
                    <header className="novice-title">
                        <h3>新手专享</h3>
                        <span>超高回报&nbsp;超短期限&nbsp;仅限未投资新手用户</span>
                    </header>
                    <div className="novice-content">
                        <ul className="clear-fix">
                            <li>
                                <strong className="novice-value">{newLoan.annualInterestRate}<span>%</span></strong>
                                <span>年化收益</span>
                            </li>
                            <li>
                                <strong className="novice-value">
                                    <span>{newLoan.termCount}</span>
                                    <span>{Utils.getTermUnit(newLoan.termUnit)}</span>
                                </strong>
                                <span>投资期限</span>
                            </li>
                            <li>
                                <strong className="novice-value">{newLoan.amount / 10000}<span>万</span></strong>
                                <span>融资金额</span>
                            </li>
                            <li>{this.getInvestBtn(newLoan)}</li>
                        </ul>
                    </div>
                </section>
            </div>
        );
    }
});

/**
 * 理财推荐标
 */
var Finances = React.createClass({
    mixins: [Mixin],
    getInitialState: function () {
        return {
            loanList: [
                {
                    title: null,
                    //期限时间
                    termCount: null,
                    //期限单位
                    termUnit: null,
                    //年化利率
                    annualInterestRate: null,
                    //融资金额
                    amount: 0,
                    //标的状态
                    status: null,
                    // 判断个人还是企业 1是个人 2是企业
                    loanType: null,
                    //标id
                    loanId: null,
                    /*
                     * 还款方式
                     * 1=按月付息，到期还本
                     * 2=一次性还本付息
                     * 3=等额本息
                     */
                    productId: null,
                }
            ]
        };
    },
    componentWillReceiveProps: function (nextProps) {
        this.setState(nextProps);
    },
    render: function () {
        return (
            <article className="page-container">
                <h3 className="finances-title">理财</h3>
                <div className="finances-wrap">
                    <div className="finances-left">
                        <strong>投资</strong>
                        <a href={LINK.INVEST_LIST}>查看更多</a>
                    </div>
                    <div className="finances-right clear-fix">
                        {this.state.loanList.map(function (item) {
                            return (
                                <div className="finances-item">
                                    <a href={Utils.getInvestUrl(item)} className="finances-item-title">{item.title}</a>
                                    <div className="finances-item-content">
                                        <div className="finances-item-block clear-fix">
                                            <div className="pull-left">
                                                <div className="finances-item-rate">
                                                    <span>{item.annualInterestRate}</span>
                                                    <span className="finances-item-rate-unit">%</span>
                                                </div>
                                                <span>年化率</span>
                                            </div>
                                            <div className="pull-right">
                                                <div className="finances-item-term">
                                                    <span>{item.termCount}</span>
                                                    <span
                                                        className="finances-item-term-unit">{Utils.getTermUnit(item.termCount)}</span>
                                                </div>
                                                <span>项目周期</span>
                                            </div>
                                        </div>
                                        <div className="finances-item-sm-block">
                                            <p><span>起投金额：</span><span>{Utils.formatAmount(item.amount)}</span></p>
                                            <p><span>还款方式：</span><span
                                                className="repay-val">{Utils.formatProductId(item.productId)}</span></p>
                                        </div>
                                    </div>
                                    {this.getInvestBtn(item)}
                                </div>
                            );
                        }, this)}
                    </div>
                </div>
            </article>
        );
    }
});

/**
 * 平台新闻和公告
 */
var ReportNotice = React.createClass({
    render: function () {
        return (
            <div id={this.props.id} className="news-content clear-fix">
                <a className="pull-right info-more"
                   href={LINK.ABOUT_US.LIST + '?' + this.props.url}
                >更多&gt;</a>
                <div className="news-left">
                    {/*     取得列表第一项   return false是提前结束循环  */}
                    {this.props.item.map(function (item, index) {
                        if (index === 0) {
                            var url = LINK.ABOUT_US.DETAIL + '?' + this.props.url + '-' + item.id;
                            return (
                                <div>
                                    <img className="news-img" src={'/newsShowPic?imgName=' + item.imgName}/>

                                    <div className="pull-left">
                                        <a href={url}
                                           className="news-title">{item.title}</a>

                                        <div className="news-text">
                                            <a href={url}>{item.contentBrief}</a>
                                        </div>
                                        <span className="news-date">{item.issueTime}</span>
                                    </div>
                                </div>
                            );
                        }
                    }, this)}
                </div>
                <div className="news-right">
                    {/*    取得列表除了第一项的其他项     */}
                    {this.props.item.map(function (item, index) {
                        if (index === 1 || index === 2) {
                            var url = LINK.ABOUT_US.DETAIL + '?' + this.props.url + '-' + item.id;
                            return (
                                <div className="news-item clear-fix">
                                    <img className="news-item-img" src={'/newsShowPic?imgName=' + item.imgName}/>

                                    <div className="news-item-content">
                                        <a href={url}
                                           className="news-item-title">{item.title}</a>
                                        <p>
                                            <span className="news-item-date">{item.date}</span>
                                            <a href={url}
                                               className="news-item-desc">{item.contentBrief}</a>
                                        </p>
                                    </div>
                                </div>
                            );
                        }
                    }, this)}
                </div>
            </div>
        );
    }
});

/**
 * 平台新闻和公告tab页
 */
var ReportNoticeTab = React.createClass({
    getInitialState: function () {
        return {
            industry3: [
                {
                    imgName: null,
                    id: null,
                    title: null,
                    contentBrief: null,
                    issueTime: null
                }
            ],
            notices: [
                {
                    imgName: null,
                    id: null,
                    title: null,
                    contentBrief: null,
                    issueTime: null
                }
            ]
        };
    },
    componentWillReceiveProps: function (nextProps) {
        this.setState(nextProps);
    },
    render: function () {
        return (
            <div className="page-container">
                <Tab
                    className={{
                        container: 'news-wrap',
                        header: 'news-tab',
                        item: 'tab-item'
                    }}
                    tabItemIds={[
                        {reports: '媒体报道'},
                        {notices: '公司公告'}
                    ]}
                    tabItem={[
                        {
                            reports: (
                                <ReportNotice
                                    url="mediaReports"
                                    item={this.state.industry3}
                                />
                            )
                        },
                        {
                            notices: (
                                <ReportNotice
                                    url="notices"
                                    item={this.state.notices}
                                />
                            )
                        }
                    ]}
                />
            </div>
        );
    }
});

/**
 * 合作机构
 */
var Partner = React.createClass({
    getInitialState: function () {
        return {
            partners: [
                {
                    officialSite: null,
                    name: null,
                    logo: null
                }
            ]
        };
    },
    componentWillReceiveProps: function (nextProps) {
        this.setState(nextProps);
    },
    render: function () {
        return (
            <section className="page-container">
                <h3 className="partner-title">合作机构</h3>
                <div className="partner-content">
                    {this.state.partners.map(function (item) {
                        return (
                            <a href={item.officialSite}>
                                <img src={'/static/pic/partner/' + item.logo + '/'} alt={item.name}/>
                            </a>
                        );
                    })}
                </div>
            </section>
        );
    }
});

var App = React.createClass({
    componentDidMount: function () {
        $.get(URL.INDEX, function (result) {
            this.setState(result);
        }.bind(this));
    },
    render: function () {
        return (
            <div>
                <Header {...this.state}/>
                <Banner {...this.state}/>
                <PlatformInfo {...this.state}/>
                <LatestNotice {...this.state}/>
                <Desc {...this.state}/>
                <NoviceExclusive {...this.state}/>
                <Finances {...this.state}/>
                <ReportNoticeTab {...this.state}/>
                <Partner {...this.state}/>
                <Footer {...this.state}/>
            </div>
        );
    }
});

ReactDOM.render(<App />, document.getElementById('app'));