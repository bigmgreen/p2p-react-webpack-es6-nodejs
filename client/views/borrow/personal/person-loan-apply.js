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
var LINK = Global.LINK;

var ApplyPersonLoan = React.createClass({
    getInitialState: function () {
        return {
            loanProduct: {
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
            },
            loanuse: [
                {
                    id: null, //借款用途id
                    name: null //借款用途名称
                }
            ]
        };
    },
    componentDidMount: function () {
        $("#personLoanApplyForm").validate({
            rules: {
                'loan.title': {
                    minlength: 4,
                    maxlength: 14,
                    required: true,
                },
                'loan.borrowType': {
                    required: true
                },
                'loan.amount': {
                    required: true,
                    digits: true,
                    borrowAmount: true
                },
                'loan.annualInterestRate': {
                    required: true,
                    number: true
                },
                'loan.termCount': {
                    required: true,
                    number: true,
                    digits: true
                },
                'loan.description': {
                    required: true,
                    minlength: 10,
                    maxlength: 200
                }

            },
            highlight: function (element) {
                $(element).closest('.form-group').addClass('has-error');
            },
            unhighlight: function (element) {
                $(element).closest('.form-group').removeClass('has-error');
            },
            errorElement: 'span',
            errorClass: 'help-block',
            errorPlacement: function (error, element) {
                if (element.parent('.input-group').length) {
                    error.insertAfter(element.parent());
                } else {
                    error.insertAfter(element);
                }
            },
            submitHandler: function (form) {
                Utils.checkLoginStatus(function () {
                    $.post(URL.PERSON_APPLY_SAVE, $(form).serialize(), function (result) {
                            if (result === 'ok') {
                                alert('申请成功！！');
                                location.href = LINK.LOAN.PERSON_APPLY_SUCCESS;
                            } else {
                                alert(result);
                            }
                        }.bind(this)
                    );
                }, null);
                return false;
            }.bind(this)
        });
    },
    componentWillReceiveProps: function (props) {
        this.setState(props);
    },
    render: function () {

        var loanProduct = this.state.loanProduct;
        var borrowAmount = loanProduct.loanmoneymin + "元到" + loanProduct.loanmoneymax + "元之间，且为1000的倍数";
        var annualInterestRate = "产品利率" + loanProduct.beginratescope + "%-" + loanProduct.endratescope + "%";
        var termCount = "期限" + loanProduct.begintermscope + "-" + loanProduct.endtermscope;
        var borrowType = this.state.loanuse.map(function (result) {
            return (
                <option value={result.id}>{result.name}</option>
            );
        });

        return (
            <div className="page-container">
                <form className="form-horizontal" id="personLoanApplyForm">
                    <h4 className="person-loan-title">个人借款——{loanProduct.productstype}</h4>
                    <input type="hidden" name="loanProductId" value={loanProduct.id}/>
                    <div className="form-group">
                        <label htmlFor="loanTitle" className="control-label">借款标题</label>
                        <div className="input-wrap">
                            <input type="text"
                                   className="form-control"
                                   id="loanTitle"
                                   name="loan.title"
                                   placeholder="字数4-14个字之间"
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="loanBorrowType" className="control-label">借款用途</label>
                        <div className="input-wrap">
                            <select className="form-control"
                                    id="loanBorrowType"
                                    name="loan.borrowType">
                                <option value="">--请选择--</option>
                                {borrowType}
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="loanAmount" className="control-label">借款金额</label>
                        <div className="input-wrap">
                            <div className="input-group input-group-icon">
                                <span className="input-group-addon"><span className="icon">￥</span></span>
                                <input type="text"
                                       className="form-control"
                                       id="loanAmount"
                                       name="loan.amount"
                                       placeholder={borrowAmount}
                                       min={loanProduct.loanmoneymin}
                                       max={loanProduct.loanmoneymax}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="loanAnnualInterestRate" className="control-label">期望年化利率</label>
                        <div className="input-wrap">
                            <div className="input-group input-group-icon">
                                <input type="text"
                                       className="form-control"
                                       id="loanAnnualInterestRate"
                                       name="loan.annualInterestRate"
                                       placeholder={annualInterestRate}
                                       min={loanProduct.beginratescope}
                                       max={loanProduct.endratescope}
                                />
                                <span className="input-group-addon">%</span>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="loanTermCount" className="control-label">借款期限</label>
                        <div className="input-wrap">
                            <div className="input-group input-group-icon">
                                <input type="text"
                                       className="form-control"
                                       id="loanTermCount"
                                       name="loan.termCount"
                                       placeholder={termCount}
                                       min={loanProduct.begintermscope}
                                       max={loanProduct.endtermscope}
                                />
                                <span className="input-group-addon">{Utils.getTermUnit(loanProduct.termtype)}</span>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="loanDescription" className="control-label">描述</label>
                        <div className="input-wrap">
                            <textarea className="form-control" id="loanDescription" name="loan.description"/>
                        </div>
                    </div>
                    <div className="form-group text-center">
                        <button className="btn btn-danger" type="submit">提交申请</button>
                    </div>
                </form>
            </div>
        );
    }
});

var App = React.createClass({
    componentDidMount: function () {
        $.get(URL.PERSON_APPLY, {
            loanProductId: Utils.getUrlQueryValue()
        }, function (result) {
            this.setState(result);
        }.bind(this));
    },
    render: function () {
        return (
            <div>
                <Header {...this.state}/>
                <ApplyPersonLoan {...this.state} />
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


