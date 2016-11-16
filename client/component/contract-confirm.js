/**
 * 请求地址
 */
var URL = Global.URLS.ACCOUNT.ACCOUNT_CENTER;
/**
 * 合同弹窗
 */
Global.component.ContractConfirm = React.createClass({
    getInitialState: function () {
        return {
            /*  弹窗id    */
            id: null,
            /*  弹窗标题    */
            modalTitle: null,
            /*  弹窗内容id    */
            bodyId: null,
            loan: {
                /*  标的标题    */
                title: null,
                /*  投资金额    */
                amount: null,
                /*  投资期限    */
                termCount: null,
                /*  投资期限单位    */
                termUnit: null,
                /*  年化收益率    */
                annualInterestRate: null,
                /*  信用等级    */
                creditDegree: null,
                /*  标的id    */
                loanId: null,
                /*  开标时间    */
                openTime: null,
                /*  结标时间    */
                openEndTime: null,
                /*  借款协议编号    */
                contractNo: null,
            },
            appUser: {
                /*   借款人真名   */
                realName: null,
                /*   借款人昵称   */
                nickName: null
            }
        };
    },
    handleClick: function (index, loanId) {
        $.post(URL.DEAL_LOAN, {
            loanId: loanId,
            sign: index
        }, function (msg) {
            // 刷新页面
            if (msg == 1) {
                alert('处理成功')
                $('#contractModal').modal('hide');
                this.props.queryData();
            }
        }.bind(this));
    },
    componentWillReceiveProps: function (nextProps) {
        this.setState(nextProps);
    },
    render: function () {
        var loan = this.state.loan;
        return (
            <div className="modal fade" id={this.state.id} tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal">×</button>
                            <h4 className="modal-title" id="myModalLabel">{this.state.modalTitle}</h4>
                        </div>
                        <div id={this.state.bodyId} className="modal-body">
                            <form className="" role="form">
                                <p className="p3 text-center f16"><span>借款协议</span></p>
                                <p className="p3"><span>借款协议编号：{loan.contractNo}</span></p>

                                <p className="p3"><span>借款人：{this.state.appUser.realName}</span></p>

                                <p className="p3"><span>出借人：</span></p>

                                <p className="p2"><span>本协议使用说明：</span></p>

                                <p><span>1、本协议系由出借人、借款人等各方使用老微贷网站的居间服务，根据老微贷网站《服务协议》、《出借人协议》、《借款人协议》自愿达成并签订的</span></p>

                                <p>
                                    <span>2、本协议使用出借人、借款人各方事先已阅读并认可的老微贷提供的借款协议样本。<br/></span>
                                    <span>3、本协议采用电子合同形式，合同效力受中华人民共和国法律保护。</span>
                                </p>

                                <p><span>借款人通过老微贷网站（以下称"网站）的居间，就有关借款事项与各出借人达成协议如下:</span></p>

                                <p className="p2"><span>一、借款的基本条款</span></p>

                                <table>
                                    <tbody>
                                    <tr>
                                        <td>借款人(用户名)</td>
                                        <td>借款金额</td>
                                        <td>借款期限</td>
                                        <td>年利率(单利)</td>
                                        <td>借款开始集资日</td>
                                        <td>借款预计集资完成日</td>
                                    </tr>
                                    <tr>
                                        <td>{this.state.appUser.nickName}</td>
                                        <td>{loan.amount}元</td>
                                        <td>{Utils.formatTerm(loan.termCount, loan.termUnit)}</td>
                                        <td>{loan.annualInterestRate}%</td>
                                        <td>{loan.openTime}</td>
                                        <td>{loan.openEndTime}</td>
                                    </tr>
                                    </tbody>
                                </table>

                                <p className="p2"><span>二、还款</span></p>

                                <p><span>1、借款人承诺按照本协议第一条约定的时间和金额按月足额向出借人还款。</span></p>

                                <p><span>2、借款人的最后一期还款必须包含全部剩余本金、利息及其他根据本协议产生的全部费用。</span></p>

                                <p><span>3、借款人有权一次性提前偿还全部借款并结清利息，提前还款部分按本协议第一条约定的利息和实际借款天数记收利息。</span></p>

                                <p><span>4、借款人提前偿还部分借款的，借款人仍应按合同约定的月还款本息额向出借人支付本金和利息。</span></p>

                                <p className="p2"><span>三、逾期还款</span></p>

                                <p><span>1、若借款人逾期未还款，则借款人应按照应还未还本金的每日万分之五向出借人支付逾期罚息。</span></p>

                                <p><span>2、借款人逾期还款超过15天的，出借人有权要求网站将借款人的</span></p>

                                <p><span>4、借款人同意，若借款人逾期未还款，出借人可以通过发布借款人的信息或悬赏方式追索债权。</span></p>

                                <p><span>5、借款人逾期超过30天的，出借人均有权通过任何方式向任何人披露借款人的联系方式及其个人信息和资料。</span></p>

                                <p className="p2"><span>四、借款的支付和还款方式</span></p>

                                <p><span>1、出借人在同意向借款人出借相应款项时，已委托网站在本借款协议生效时将该笔借款直接划付至借款人帐户。</span></p>

                                <p><span>2、借款人已委托网站将还款直接划付至出借人帐户。</span></p>

                                <p><span>3、借款人和出借人均同意上述网站接受委托的行为所产生的法律后果均由相应委托方承担。</span></p>

                                <p><span>4、若借款人的任何一期还款不足以偿还应还本金、利息、罚息和违约金的，出借人之间同意按照出借金额的相应比例收取还款。</span></p>

                                <p className="p2"><span>五、法律适用和管辖</span></p>

                                <p><span>1、本协议的履行地为网站住所地。</span></p>

                                <p><span>2、本协议的签订、履行、终止、解释均适用中华人民共和国法律，并由协议履行地的</span></p>

                                <p className="p2"><span>六、特别条款</span></p>

                                <p><span>1、借款人不得将所借款项用于任何违法活动（包括但不限于赌博、吸毒、贩毒、卖淫嫖娼等），否则一经发现，出借人和或网站将立即向公安等有关行政机关举报，追回赃款并追究借款人的刑事责任。</span>
                                </p>

                                <p><span>2、借款人不得将所借款项用于生产经营和消费以外的范畴（包括但不限于股票，基金，期货等金融产品的投资，房地产及房地产信托投资，二次借贷，彩票）。</span>
                                </p>

                                <p><span>3、出借人保证其是具有完全民事行为能力的中华人民共和国公民，并且出借资金来源合法。</span></p>

                                <p><span>4、本借款协议中的每一出借人与借款人之间的借款均是相互独立的，一旦借款人逾期未归还借款本息，任何一出借人有权单独对该出借人未收回的借款本息向借款人追索或者提起诉讼。</span>
                                </p>
                                <p><span>5、出借人出借本金所获得的收益（包括但不限于利息和罚息等）应纳税款由出借人自行申报及缴纳。</span></p>
                                <p className="p2"><span>七、其他</span></p>

                                <p><span>1、本协议采用电子文本形式制成，并在网站上保留存档；双方同意，双方有争议的，则以网站作为第三方所保留文档版本以及网站解释为准。</span></p>

                                <p><span>2、本协议自借款列表完成之日起生效，并自协议生效之日起开始计算利息。</span></p>

                                <div className="modal-footer">
                                    <button type="button"
                                            onClick={this.handleClick.bind(this, 1, loan.loanId)}
                                            className="agreeBtn">同意
                                    </button>
                                    <button type="button"
                                            onClick={this.handleClick.bind(this, 3, loan.loanId)}
                                            className="refuseBtn">拒绝
                                    </button>
                                    <button type="button"
                                            data-dismiss="modal"
                                            className="cancleBtn">取消
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});