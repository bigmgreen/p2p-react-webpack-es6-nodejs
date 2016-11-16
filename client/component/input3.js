/**
 * 带左图标输入框组件
 */
const IconInput = React.createClass({
    handleChange: function (event) {
        var value = $.trim(event.target.value);
        this.setState({value: value});
    },
    getInitialState: function () {
        return {value: ''}
    },
    render: function () {
        return (
            <div className="input-row">
                <div className="input-group input-group-icon">
                <span className="input-group-addon">
                    <span className="icon">
                        <i className={this.props.icon}/>
                    </span>
                </span>
                    <input type={this.props.type}
                           id={this.props.id}
                           name={this.props.name}
                           value={this.state.value}
                           className='form-control input-lg'
                           placeholder={this.props.placeholder}
                           maxLength={this.props.maxLength}
                           onChange={this.handleChange}
                    />
                </div>
            </div>
        );
    }
});
module.exports = {
    IconInput: IconInput
};