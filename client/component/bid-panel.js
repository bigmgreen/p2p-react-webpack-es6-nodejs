/**
 * 请求地址
 */
var URL = Global.URLS.DETAIL;
/**
 * 投标信息
 */
Global.component.BidPanel = React.createClass({

    getInitialState: function () {
        return {
            pageView: {
                pageCount: 0,
                currentPage: 1
            },
            listMap: null
        };
    },
    queryData: function (param) {
        if (param instanceof Object) {
            this.param = $.extend(this.param, param);
        } else {
            this.param = {
                currentPage: 1,
                pageSize: 10,
                loanId: Utils.getUrlQueryValue(),
                typeFlag: 6
            }
        }
        $.post(URL.INVEST_DETAIL_LIST, this.param, function (result) {
            this.setState(result);
        }.bind(this));
    },
    componentDidMount: function () {
        this.queryData();
    },
    render: function () {
        var tr = null;
        var listMap = this.state.listMap;

        if (Array.isArray(listMap) && listMap.length > 0) {
            tr = this.state.listMap.map(function (item) {
                return (
                    <tr>
                        <td>{item.investorNickname.charAt(0)}***</td>
                        <td>{item.investTime}</td>
                        <td>{Utils.formatAmount(item.investAmount)}</td>
                    </tr>
                );
            });
        } else {
            tr = (
                <tr>
                    <td colSpan="3">暂无投标记录！</td>
                </tr>
            );
        }

        return (
            <div id="bidPanel" className="detail-tab-panel">
                <table>
                    <thead>
                    <tr>
                        <th>用户名</th>
                        <th>投资日期</th>
                        <th>金额</th>
                    </tr>
                    </thead>
                    <tbody>{tr}</tbody>
                </table>
                <div className="clear-fix">
                    <Pagination pageView={this.state.pageView} queryData={this.queryData}/>
                </div>
            </div>
        );
    }
});