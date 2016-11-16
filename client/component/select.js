/**
 * select 组件
 * name：html标签的name
 * id：html标签的id
 * className：html标签的class
 * title：html标签的title
 * selected：需要选中的下拉选项
 * list：要生成的数据列表  结构：[value-unit, value-unit,...] value:是具体值 unit是显示文本
 * mark: 用来链接list的项
 * onChange: 回调函数
 */
Global.component.Select = React.createClass({
    getInitialState: function () {
        return {
            name: this.props.name || null,
            id: this.props.id || null,
            className: this.props.className || null,
            title: this.props.title || null,
            selected: this.props.selected || null,
            list: this.props.list || [],
            mark: this.props.mark || '-'
        }
    },
    componentWillReceiveProps: function (nextProps) {
        this.setState(nextProps);
    },
    /**
     * 作为生成option集合的函数存在
     * @param list 要生成的数据列表
     * @param selected 需要选中的列表项
     * @returns option集合
     * @private
     * @desc 结构 [value-unit, value-unit,...] value:是具体值 unit是显示文本
     */
    _getOption: function (list, selected, mark) {
        return list.map(function (item) {

            var temp = item.split(mark);
            var value = temp[0];
            var text = temp[1];

            /**
             * 没有值得选项，一般作为默认项
             */
            if (temp.length === 1) {
                return (
                    <option>{value}</option>
                );
            }

            if (String(selected) == String(value)) {
                /**
                 * 需要选中的选项
                 */
                return (
                    <option selected value={value}>{text}</option>
                );
            } else {
                /**
                 * 按照顺序生成的选项
                 */
                return (
                    <option value={value}>{text}</option>
                );
            }
        });
    },
    handleChange: function (e) {
        if (typeof this.props.callBack === 'function') {
            this.props.callBack(e);
        }
    },
    render: function () {
        return (
            <select
                name={this.state.name}
                id={this.state.id || this.state.name}
                className={this.state.className}
                title={this.state.title}
                onChange={this.handleChange}
            >
                {this._getOption(this.state.list, this.state.selected, this.state.mark)}
            </select>
        );
    }
});