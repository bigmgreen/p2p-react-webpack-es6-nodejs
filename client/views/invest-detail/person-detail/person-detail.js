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
 * 投资确认框组件
 */
var InvestBtn = Global.component.InvestBtn;
/**
 * 投资记录组件
 */
var BidPanel = Global.component.BidPanel;
/**
 * 倒计时组件
 */
var CountDown = Global.component.CountDown;
/**
 * 面包屑组件
 */
var Breadcrumb = Global.component.Breadcrumb;
/**
 * 请求地址
 */
var URL = Global.URLS.DETAIL;
/**
 * 链接地址
 */
var LINK = Global.LINK;

/**
 * 上左部分
 */
var TopLeft = React.createClass({
    getInitialState: function () {
        return {
            appUser: {
                userId: null
            },
            progress: null,
            loan: {
                loanId: null,
                title: null,
                amount: null,
                annualInterestRate: null,
                termCount: null,
                termUnit: null,
                productId: null,
                openTime: null,
                limitMoney: null,
                status: null
            },
            assureOrganization: {
                organizationName: '无',
                createMoney: '无',
                belongCity: '无',
                registerTime: '无',
                organizationBrief: '无'
            }
        };
    },
    collection: function () {
        $.post(URL.ADD_CLOSELY, {
            favoriteLoanId: this.state.loan.loanId,
            favoriteUserId: this.state.appUser.userId
        }, function (status) {
            if (status == 6) {
                alert("收藏成功");
            } else if (status == 2) {
                alert("该标已收藏");
            } else if (status == 3) {
                alert("收藏失败");
            }
        });
    },
    countDownOver: function () {
        alert('倒计时完成！！');
    },
    componentWillReceiveProps: function (props) {
        if (!(props.assureOrganization instanceof Object)) {
            props.assureOrganization = this.state.assureOrganization;
        }
        this.setState(props);
    },
    render: function () {

        var assureOrganization = this.state.assureOrganization,
            loan = this.state.loan;

        return (
            <section className="detail-top-left">
                <h3 className="detail-title">
                    <span>{loan.title}</span>
                    <button
                        type="button"
                        className="pull-right text-warning"
                        onClick={Utils.checkLoginStatus.bind(this, this.collection, null)}>收藏
                    </button>
                </h3>
                <div className="detail-info">
                    <ul>
                        <li>
                            <b className="detail-info-val">{loan.amount / 10000}</b>
                            <span className="detail-info-unit">万元</span>
                            <span className="detail-info-desc">融资金额</span>
                        </li>
                        <li>
                            <b className="detail-info-val">{loan.annualInterestRate}</b>
                            <span className="detail-info-unit">%</span>
                            <span className="detail-info-desc">年利率</span>
                        </li>
                        <li>
                            <b className="detail-info-val">{loan.termCount}</b>
                            <span className="detail-info-unit">{Utils.getTermUnit(loan.termUnit)}</span>
                            <span className="detail-info-desc">借款期限</span>
                        </li>
                    </ul>
                    <ul>
                        <li className="detail-info-text">还款方式：{Utils.formatProductId(loan.productId)}</li>
                        <li className="detail-info-text">开标时间：<span>{Utils.getMsToDate(loan.openTime)}</span></li>
                        <li className="detail-info-text">单笔投资限额：{loan.limitMoney}元</li>
                    </ul>
                    <p className="detail-guarantee-wrap">
                        <img src="../../static/invest-detail/person-detail/img/I_2.png"/>
                        <span className="detail-guarantee">
                            <span>担保公司：</span>
                            <span>{assureOrganization.organizationName}</span>
                        </span>
                    </p>
                    <ul className="detail-certification">
                        <li>注册资本：{assureOrganization.createMoney}</li>
                        <li>所属城市：{assureOrganization.belongCity}</li>
                        <li>注册时间：{assureOrganization.registerTime}</li>
                        <li className="full">担保简介：{assureOrganization.organizationBrief}</li>
                    </ul>
                </div>
                <footer className="clear-fix">
                    <div className="detail-item">
                        <span className="detail-process-title">投资进度：</span>
                        <div className="detail-process">
                            <div className="detail-process-bar">
                                <div style={{width: this.state.progress + '%'}}></div>
                            </div>
                            <span>{this.state.progress}%</span>
                        </div>
                    </div>
                    <div className="detail-item">
                        {loan.status === 301 && <CountDown openTime={loan.openTimeLong} callBack={this.countDownOver}/>}
                    </div>
                </footer>
            </section>
        );
    }
});

/**
 * 上右部分
 */
var TopRight = React.createClass({
    getInitialState: function () {
        return {
            cash: 0,
            investAmount: null,
            appUser: {
                userId: null
            },
            loan: {
                loanId: null,
                title: null,
                annualInterestRate: null,
                //投资总额
                amount: null,
                //已投金额
                biddingAmount: null,
                //标的状态
                status: null,
                beginAmount: null,
                increaseAmount: null,
                termCount: null,
                termUnit: null,
                productId: null,
                openTime: null,
                limitMoney: null,
                progress: null,
            }
        };
    },
    getCashInfo: function () {
        if (this.state.appUser instanceof Object) {
            return (
                <ul className="detail-form-info">
                    <li>
                        <span>可投金额</span>
                        <span className="detail-cash">{this.state.loan.amount - this.state.loan.biddingAmount}</span>
                        <span>元</span>
                    </li>
                    <li>
                        <span>账户余额</span>
                        <span id="cash" className="detail-cash">{this.state.cash}</span>
                        <span>元</span>
                        <a className="text-warning" href={LINK.ACCOUNT.RECHARGE}>&nbsp;&nbsp;充值</a>
                    </li>
                </ul>
            );
        } else {
            return (
                <ul className="detail-form-info">
                    <li className="text-center">
                        <a className="text-warning" href={LINK.USER.LOGIN}>登录</a>
                        <span>后可查看余额和投资</span>
                    </li>
                </ul>
            );
        }
    },
    handleChange: function (event) {
        this.setState({investAmount: parseInt(event.target.value)});
    },
    componentWillReceiveProps: function (props) {
        this.setState(props, function () {
            //获取余额  如果在线就请求
            if (this.state.appUser instanceof Object) {
                Utils.getUserCash(function (cash) {
                    this.setState({cash: cash});
                }.bind(this));
            }
        }.bind(this));
    },
    getInvestBtn: function () {
        var status = parseInt(this.state.loan.status);
        switch (status) {
            case 300:
                return (
                    <InvestBtn
                        cash={this.state.cash}
                        investAmount={this.state.investAmount}
                        {...this.props}
                    />
                );
            case 301:
            case 302:
                return <button type="button" disabled className="btn btn-danger btn-lg">未开始</button>;
            case 400:
                return <button type="button" disabled className="btn btn-danger btn-lg">已满标</button>;
            case 500:
                return <button type="button" disabled className="btn btn-danger btn-lg">还款中</button>;
            case 600:
                return <button type="button" disabled className="btn btn-danger btn-lg">已还款</button>;
        }
    },
    render: function () {
        return (
            <section className="detail-top-right">
                <h3 className="detail-title text-center">我要投资</h3>
                <div className="detail-form">
                    {this.getCashInfo()}
                    <div className="detail-form-row">
                        <div className="input-group">
                            <input
                                type="text"
                                id="investAmount"
                                className="form-control detail-input"
                                placeholder={'起投' + this.state.loan.beginAmount + '元，递增' + this.state.loan.increaseAmount + '元'}
                                onFocus={Utils.checkLoginStatus.bind(this, null, null)}
                                onChange={this.handleChange}
                            />
                            <div className="input-group-addon">元</div>
                        </div>
                        <img src="../../static/invest-detail/person-detail/img/I_4.png"/>
                        <span className="text-warning">资金由银行提供全程托管,请放心投资！</span>
                    </div>
                    <div className="text-center">{this.getInvestBtn()}</div>
                </div>
            </section>
        );
    }
});

/**
 * 页面切换
 */
var Tab = React.createClass({
    componentDidMount: function () {
        /*   标签页切换   */
        $('[data-target]').click(function () {
            // 移除旧样式
            var oldActive = $(this).siblings('.active');
            oldActive.removeClass('active');
            $(oldActive.data('target')).hide();

            // 激活新样式
            $(this).addClass('active');
            $($(this).data('target')).fadeIn();
        });
    },
    render: function () {
        return (
            <div className="detail-bottom">
                <div className="detail-bottom-tab">
                    <ul>
                        <li data-target="#infoPanel" className="active">项目信息</li>
                        <li data-target="#authenticationPanel">认证信息</li>
                        <li data-target="#riskManagementPanel">风控信息</li>
                        <li data-target="#bidPanel">投标信息</li>
                    </ul>
                </div>
                <div className="detail-bottom-content">
                    <InfoPanel {...this.props} />
                    <AuthenticationPanel {...this.props} />
                    <RiskManagementPanel {...this.props} />
                    <BidPanel />
                </div>
            </div>
        );
    }
});

/**
 * 项目信息
 */
var InfoPanel = React.createClass({
    getInitialState: function () {
        return {
            loan: {
                title: null,
                productId: null,
                termCount: null,
                termUnit: null,
                annualInterestRate: null,
                creditDegree: null

            },
            borrowType: {
                name: null
            },
            loanProductType: {
                productstype: null
            },
            realName: '',
            bpinfo: {
                topEducation: null,
                gender: null,
                hasMarried: null,
                homeTownProvince: null,
                homeTownCity: null,
                homeTownCounty: null,
                topEduSchool: null,
                residenceProvince: null,
                residenceCity: null,
                residenceCounty: null
            },
            bwinfo: {
                officeType: null,
                officeJoinDate: null,
                position: null,
                officeSize: null
            }
        };
    },
    componentWillReceiveProps: function (props) {
        this.setState(props);
    },
    render: function () {
        var loanInfo = null;
        var state = this.state;
        if (state.bpinfo) {
            var bpInfo = this.state.bpinfo;
            loanInfo = (
                <article>
                    <h4>借款人信息</h4>
                    <ul>
                        <li><span>姓名：</span><span>{state.realName.charAt(0)}***</span></li>
                        <li><span>学历：</span><span>{Utils.getTopEducation(bpInfo.topEducation)}</span></li>
                        <li><span>性别：</span><span>{bpInfo.gender ? '男' : '女'}</span></li>
                        <li><span>年 龄：</span><span>{bpInfo.age}岁</span></li>
                        <li><span>婚姻状态：</span><span>{bpInfo.hasMarried ? '已婚' : '未婚'}</span></li>
                        <li><span>子女情况：</span><span>{bpInfo.hasChild ? '有子女' : '无子女'}</span></li>
                        <li>
                            <span>籍 贯：</span>
                            <span id="native">
                                {Utils.getRegionById(bpInfo.homeTownProvince, bpInfo.homeTownCity, bpInfo.homeTownCounty)}
                            </span>
                        </li>
                        <li><span>毕业院校：</span><span>{bpInfo.topEduSchool }</span></li>
                        <li>
                            <span>现居住地：</span>
                            <span id="zhuCity">
                                {Utils.getRegionById(bpInfo.residenceProvince, bpInfo.residenceCity, bpInfo.residenceCounty)}
                            </span>
                        </li>
                    </ul>
                </article>
            );
        }

        var workInfo = null;
        if (state.bwinfo) {
            workInfo = (
                <article>
                    <h4>工作情况</h4>
                    <ul>
                        <li>
                            <span>公司性质：</span>
                            <span>{Utils.getOfficeType(state.bwinfo.officeType)}</span>
                        </li>
                        <li>
                            <span>进入公司时间：</span>
                            <span>{state.bwinfo.officeJoinDate}</span>
                        </li>
                        <li>
                            <span>担任职务：</span>
                            <span>{Utils.getOffPosition(state.bwinfo.position)}</span>
                        </li>
                        <li>
                            <span>公司规模：</span>
                            <span>{Utils.getOfficeSize(state.bwinfo.officeSize)}</span>
                        </li>
                    </ul>
                </article>
            );
        }

        return (
            <div id="infoPanel" className="detail-tab-panel active">
                <article>
                    <h4>借款信息</h4>
                    <ul>
                        <li><span>项目名称：</span><span>{state.loan.title}</span></li>
                        <li><span>借款用途：</span><span>{state.borrowType && state.borrowType.name}</span></li>
                        <li><span>还款方式：</span><span>{Utils.formatProductId(state.loan.productId)}</span></li>
                        <li>
                            <span>借款期限：</span><span>{state.loan.termCount}{Utils.getTermUnit(state.loan.termUnit)}</span>
                        </li>
                        <li><span>年利率：</span><span>{state.loan.annualInterestRate}%</span></li>
                        <li><span>信用等级：</span><span>{state.loan.creditDegree}</span></li>
                        <li><span>产品类型：</span><span>个人标-{state.loanProductType.productstype}</span></li>
                    </ul>
                </article>
                {loanInfo}
                {workInfo}
            </div>
        );
    }
});

/**
 * 认证信息
 */
var AuthenticationPanel = React.createClass({
    getInitialState: function () {
        return {
            authentications: [null]
        };
    },
    componentWillReceiveProps: function (props) {
        this.setState(props);
    },
    render: function () {
        return (
            <div id="authenticationPanel" className="detail-tab-panel">
                <article>
                    <ul>
                        {this.state.authentications.map(function (item) {
                            return (
                                <li><span>{item}：</span><span>已认证</span></li>
                            );
                        })}
                    </ul>
                </article>
            </div>
        );
    }
});

/**
 * 风控信息
 */
var RiskManagementPanel = React.createClass({
    getInitialState: function () {
        return {
            bfInfo: {
                monthlyIncome: null,
                housingType: null,
                housingArea: null,
                hasCar: null,
                carValue: null,
                hasBond: null,
                bondValue: null
            },
            houseInfo: [
                {
                    materialType: null,
                    imgUrl: null,
                    minImgUrl: null
                }
            ],
            riskManagementInfo: [
                {
                    materialType: null,
                    imgUrl: null,
                    minImgUrl: null
                }
            ]
        };
    },
    handleClick: function (url, name) {
        $('#lightBoxImg').attr('src', url);
        $('#lightBoxTitle').text(name);
        $('#lightBox').modal('show');
    },
    getItem: function (list, text) {

        var item = list.map(function (item) {
            return (
                <div className="img-item">
                    <h6>{item.materialType}</h6>
                    <img src={item.minImgUrl}
                         alt={item.materialType}
                         onClick={this.handleClick.bind(this, item.imgUrl, item.materialType)}
                    />
                </div>
            );
        }.bind(this));

        if (item.length === 0) {
            return null;
        }

        return (
            <article>
                <h4>{text}</h4>
                <div className="img-wrap">{item}</div>
            </article>
        );
    },
    componentWillReceiveProps: function (props) {
        this.setState(props);
    },
    render: function () {

        var baseInfo = null;
        if (this.state.bfInfo) {
            var bfInfo = this.state.bfInfo;
            baseInfo = (
                <article>
                    <h4>基本信息</h4>
                    <ul>
                        <li><span>个人月收入：</span><span>{bfInfo.monthlyIncome}元</span></li>
                        <li><span>住房种类：</span><span>{Utils.getHousingType(bfInfo.housingType)}</span></li>
                        <li><span>房产面积：</span><span>{bfInfo.housingArea}</span></li>
                        <li><span>有无汽车：</span><span>{bfInfo.hasCar ? '有' : '无'}</span></li>
                        <li><span>汽车价值：</span><span>{Utils.getCarValue(bfInfo.carValue)}</span></li>
                        <li><span>有无证券：</span><span>{bfInfo.hasBond ? '有' : '无'}</span></li>
                        <li><span>证券价值：</span><span>{bfInfo.bondValue}元</span></li>
                    </ul>
                </article>
            );
        }

        return (
            <div id="riskManagementPanel" className="detail-tab-panel">
                {baseInfo}
                {this.getItem(this.state.houseInfo, '房产抵押图片信息')}
                {this.getItem(this.state.riskManagementInfo, '标的风控图片信息')}
                <Modal {...{
                    id: 'lightBox',
                    isBig: true,
                    titleId: 'lightBoxTitle',
                    showHead: true,
                    showFoot: false,
                    body: (
                        <img id="lightBoxImg" height="300" style={{display: 'block'}} alt="图片信息"/>
                    )
                }}/>
            </div>
        );
    }
});

var App = React.createClass({
    componentDidMount: function () {
        $.get(URL.PERSON_DETAIL, {
            loanId: Utils.getUrlQueryValue()
        }, function (result) {
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
                        pageName: '个人标详情'
                    }}/>
                    <div className="clear-fix">
                        <TopLeft {...this.state}/>
                        <TopRight {...this.state} />
                    </div>
                    <Tab {...this.state} />
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
                <Footer {...this.state}/>
            </div>
        );
    }
});

ReactDOM.render(<App />, document.getElementById('app'));
