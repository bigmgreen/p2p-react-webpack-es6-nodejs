/**
 * 购买债权确认框
 */
Global.component.DebtAgreement = window.DebtAgreement = React.createClass({
    getInitialState: function () {
        return {
            id: null,
            userId: null,
            appVars: {
                websiteTitle: null,
                websiteDomain: null,
                websiteNameCn: null
            },
            agreement: {
                aName: null,
                aIdNo: null,
                aUsername: null,
                bName: null,
                bIdNo: null,
                bUsername: null,
                startDate: null,
                title: null,
                contractNo: null,
                borrowerName: null,
                amount: null,
                interestRate: null,
                term: null,
                tradeDate: null,
                price: null,
                commission: null,
                leftTerm: null
            }
        };
    },
    componentWillReceiveProps: function (props) {
        this.setState(props.debtAgreement);
    },
    render: function () {
        var agreement = this.state.agreement;
        var appVars = this.state.appVars;
        return (
            <div className="modal fade" id="buyDialog" tabIndex="-1" role="dialog">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                            <h4 className="modal-title">协议</h4>
                        </div>
                        <div className="modal-body">
                            <h3 className="text-center">债权转让及受让协议</h3>
                            <dl>
                                <dt>本债权转让及受让协议（下称“本协议”）由以下双方于签署：</dt>
                                <dd><strong>甲方（转让人）：</strong>{agreement.aName}</dd>
                                <dd><strong>身份证号：</strong>{agreement.aIdNo}</dd>
                                <dd><strong>用户名：</strong>{agreement.aUsername}</dd>
                                <dd><strong>乙方（受让人）：</strong>{agreement.bName}</dd>
                                <dd><strong>身份证号：</strong>{agreement.bIdNo}</dd>
                                <dd><strong>用户名：</strong>{agreement.bUsername}</dd>
                            </dl>
                            <p>就甲方通过{appVars.websiteNameCn}运营管理的{appVars.websiteDomain}网站（下称“{appVars.websiteTitle}网站”）向乙方转让债权事宜，双方经协商一致，达成如下协议：</p>
                            <h4>1. 债权转让</h4>
                            <p>1.1 标的债权信息及转让</p>
                            <p>甲方同意将其通过{appVars.websiteTitle}的居间协助而形成的有关债权（下称“标的债权”）转让给乙方，乙方同意受让该等债权。标的债权具体信息如下：</p>
                            <table className="table table-bordered">
                                <caption>标的债权信息</caption>
                                <tbody>
                                <tr>
                                    <th>出借日期</th>
                                    <td>{Utils.getMsToDate(agreement.startDate)}</td>
                                </tr>
                                <tr>
                                    <th>项目名称</th>
                                    <td>{agreement.title}</td>
                                </tr>
                                <tr>
                                    <th>借款合同号</th>
                                    <td>{agreement.contractNo}</td>
                                </tr>
                                <tr>
                                    <th>借款人</th>
                                    <td>{agreement.borrowerName}</td>
                                </tr>
                                <tr>
                                    <th>借款金额(元)</th>
                                    <td>{agreement.amount}</td>
                                </tr>
                                <tr>
                                    <th>年化利率</th>
                                    <td>{agreement.interestRate}%</td>
                                </tr>
                                <tr>
                                    <th>借款期限({Utils.getTermUnit(agreement.termUnit)})</th>
                                    <td>{agreement.term}</td>
                                </tr>
                                </tbody>
                            </table>
                            <table className="table table-bordered">
                                <caption>标的债权转让信息</caption>
                                <tbody>
                                <tr>
                                    <th>转让日期</th>
                                    <td>{Utils.getMsToDate(agreement.tradeDate)}</td>
                                </tr>
                                <tr>
                                    <th>转让价格(元)</th>
                                    <td>{agreement.price}</td>
                                </tr>
                                <tr>
                                    <th>管理费(元)</th>
                                    <td>{agreement.commission}</td>
                                </tr>
                                <tr>
                                    <th>剩余期数(期)</th>
                                    <td>{agreement.leftTerm}</td>
                                </tr>
                                </tbody>
                            </table>
                            <p>1.2 债权转让流程</p>
                            <p>1.2.1 双方同意并确认，双方通过自行或授权有关方根据{appVars.websiteTitle}网站有关规则和说明，在{appVars.websiteTitle}网站进行债权转让和受让购买操作等方式确认签署本协议。</p>
                            <p>1.2.2
                                双方接受本协议且{appVars.websiteTitle}审核通过时，本协议立即成立,并待转让价款支付完成时生效。协议成立的同时甲方不可撤销地授权{appVars.websiteTitle}自行或委托第三方支付机构或合作的金融机构，将转让价款在扣除甲方应支付给{appVars.websiteTitle}的转让管理费之后划转、支付给乙方，上述转让价款划转完成即视为本协议生效且标的债权转让成功；同时甲方不可撤销地授权{appVars.websiteTitle}将其代为保管的甲方与标的债权借款人签署的电子文本形式的《借款协议》（下称“借款协议”）及借款人相关信息在{appVars.websiteTitle}网站有关系统板块向乙方进行展示。</p>
                            <p>1.2.3
                                本协议生效且标的债权转让成功后，双方特此委托{appVars.websiteTitle}将标的债权的转让事项及有关信息通过站内信等形式通知与标的债权对应的借款人。</p>
                            <p>1.3 自标的债权转让成功之日起，乙方成为标的债权的债权人，承继借款协议项下出借人的权利并承担出借人的义务。</p>
                            <h4>2. 保证与承诺</h4>
                            <p>2.1
                                甲方保证其转让的债权系其合法、有效的债权，不存在转让的限制。甲方同意并承诺按有关协议及{appVars.websiteTitle}网站的相关规则和说明向{appVars.websiteTitle}支付债权转让管理费。</p>
                            <p>2.2 乙方保证其所用于受让标的债权的资金来源合法，乙方是该资金的合法所有人。如果第三方对资金归属、合法性问题发生争议，乙方应自行负责解决并承担相关责任。</p>
                            <h4>3. 违约</h4>
                            <p>3.1 双方同意，如果一方违反其在本协议中所作的保证、承诺或任何其他义务，致使其他方遭受或发生损害、损失等责任，违约方须向守约方赔偿守约方因此遭受的一切经济损失。</p>
                            <p>3.2 双方均有过错的，应根据双方实际过错程度，分别承担各自的违约责任。</p>
                            <h4>4. 适用法律和争议解决</h4>
                            <p>4.1 本协议的订立、效力、解释、履行、修改和终止以及争议的解决适用中国的法律。</p>
                            <p>4.2 本协议在履行过程中，如发生任何争执或纠纷，双方应友好协商解决；若协商不成，任何一方均有权向有管辖权的人民法院提起诉讼。</p>
                            <h4>5. 其他</h4>
                            <p>5.1 双方可以书面协议方式对本协议作出修改和补充。经过双方签署的有关本协议的修改协议和补充协议是本协议组成部分，具有与本协议同等的法律效力。</p>
                            <p>5.2
                                本协议及其修改或补充均通过{appVars.websiteTitle}网站以电子文本形式制成，可以有一份或者多份并且每一份具有同等法律效力；同时双方委托{appVars.websiteTitle}代为保管并永久保存在{appVars.websiteTitle}为此设立的专用服务器上备查。双方均认可该形式的协议效力。</p>
                            <p>5.3
                                甲乙双方均确认，本协议的签订、生效和履行以不违反中国的法律法规为前提。如果本协议中的任何一条或多条违反适用的法律法规，则该条将被视为无效，但该无效条款并不影响本协议其他条款的效力。</p>
                            <p>5.4
                                除本协议上下文另有定义外，本协议项下的用语和定义应具有{appVars.websiteTitle}网站服务协议及其有关规则中定义的含义。若有冲突，则以本协议为准。</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button"
                                    className="btn btn-primary"
                                    onClick={this.props.buyDebt.bind(this, this.state.id, this.state.userId)}>
                                同意协议，立即购买
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});