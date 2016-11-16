/*   分页组件   */
var Pagination= Global.component.Pagination;

/**
 * 表格组件
 *
 * tableClass  表格的样式
 * queryData 查询方法 TODO
 * th 表头
 * callBack 生成表格数据的回调函数
 * noDataText 没有数据时的显示文本
 * noDataClass
 *
 * 备注：有依赖Pagination组件！！！需要在html中引入组件
 */
Global.component.Table = React.createClass({
    getInitialState: function () {
        return {
            th: this.props.th || [],
            list: [],
            noDataText: this.props.noDataText || '暂无数据！',
            tableClass: this.props.tableClass || null,
            noDataClass: this.props.noDataClass || 'no-record',
            callBack: this.props.callBack || function () {
            }
        };
    },
    componentWillReceiveProps: function (nextProps) {
        this.setState(nextProps);
    },
    getTableRow: function (param) {
        var tableRow = null;
        if (param.list.length === 0) {
            tableRow = (
                <tr>
                    <td
                        className={param.noDataClass}
                        colSpan={param.length}>{param.noDataText}</td>
                </tr>
            );
        } else {
            tableRow = param.list.map(param.callBack);
        }

        return (
            <tbody>
            {tableRow}
            </tbody>
        );
    },
    getPagination: function () {
        return Pagination instanceof Object && <Pagination {...this.state} queryData={this.props.queryData}/>
    },
    render: function () {
        return (
            <div>
                <table className={this.state.tableClass}>
                    <thead>
                    {this.state.th.map(function (item) {

                        if ((item instanceof Object)) {
                            if (item.isShow) {
                                return (<th>{item.text}</th>);
                            } else {
                                return false;
                            }
                        }

                        return (<th>{item}</th>);
                    })}
                    </thead>
                    {this.getTableRow({
                        list: this.state.list,
                        length: this.state.th.length,
                        callBack: this.state.callBack,
                        noDataClass: this.state.noDataClass,
                        noDataText: this.state.noDataText
                    })}
                </table>
                {this.getPagination()}
            </div>
        );
    }
});