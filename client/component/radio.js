/**
 * 多个单选框
 *  @list 一个对象数组，结构如下  必填
 *      @value: html标签value属性  必填
 *      @title: html标签title属性  必填
 *      @text: label的显示文字  必填
 *
 * @name: html标签name属性  必填
 * @className: 单选按钮的class
 * @labelClassName: label的class
 * @selectedValue: 需要选中的单选框
 */
Global.component.Radios = React.createClass({
    getInitialState: function () {
        return {
            list: [
                {
                    value: null,
                    title: null,
                    text: null
                }
            ],
            name: null,
            className: null,
            labelClassName: null,
            selectedValue: null
        };
    },
    componentWillReceiveProps: function (nextProps) {
        this.setState(nextProps);
    },
    onChange: function (event) {
        this.setState({
            selectedValue: event.target.value
        });
    },
    render: function () {
        return (
            <span>
                {
                    this.state.list.map(function (item, i) {

                        var id = this.state.name + "_" + i;
                        var stringValue = String(item.value).valueOf();
                        var checked = String(this.state.selectedValue).valueOf() === stringValue;

                        return (
                            <span>
                                <input
                                    type="radio"
                                    id={id}
                                    name={this.state.name}
                                    className={this.state.className}
                                    value={stringValue}
                                    title={item.title}
                                    checked={checked}
                                    onChange={this.onChange.bind(this)}
                                />
                                <label htmlFor={id}
                                       labelClassName={this.state.labelClassName}
                                >{item.text}</label>
                            </span>
                        );
                    }, this)
                }
            </span>
        );
    },
});