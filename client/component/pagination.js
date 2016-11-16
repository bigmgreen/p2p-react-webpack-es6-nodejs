/**
 * 分页组件
 *
 * pageView 对象
 *     currentPage  当前页
 *     pageCount  总页数
 *
 * queryData  数据查询函数
 */
Global.component.Pagination = window.Pagination = React.createClass({
    getInitialState: function () {
        return {
            pageCount: 0,
            currentPage: 1
        };
    },
    callBack: function (pageNum, event) {
        event.preventDefault();
        this.props.queryData({currentPage: pageNum});
    },
    componentWillReceiveProps: function (props) {
        this.setState(props.pageView);
    },
    render: function () {
        if (parseInt(this.state.pageCount) <2) {
            return false
        }

        var pageCount = parseInt(this.state.pageCount);
        var currentPage = parseInt(this.state.currentPage);

        var li = [];

        // 上一页判断
        if (currentPage == 1) {
            li.push(<li className='disabled'><span>&lt;上一页</span></li>);
        } else {
            li.push(<li><a href="#" onClick={this.callBack.bind(this, currentPage - 1)}>&lt;上一页</a></li>);
        }

        for (var i = 1; i <= pageCount; i++) {
            if (i == currentPage) {
                li.push(<li className="active"><span>{i}</span></li>);
            } else {
                li.push(<li><a href="#" onClick={this.callBack.bind(this, i)}>{i}</a></li>);
            }
        }

        // 下一页判断
        if (currentPage == pageCount) {
            li.push(<li className='disabled'><span>下一页&gt;</span></li>);
        } else {
            li.push(<li><a href="#" onClick={this.callBack.bind(this, currentPage + 1)}>下一页&gt;</a></li>);
        }

        return (
            <ul className="pagination pull-right">{li}</ul>
        );
    }
});