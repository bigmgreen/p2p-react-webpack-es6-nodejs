// 输入框按钮
var Add = React.createClass({
    getInitialState: function () {
        return {
            url: '/register/captcha',
            oldUrl: '/register/captcha',
            text: '获取验证码',
            disabled: false
        };
    },
    freshCode: function () {
        this.setState({
            url: this.state.oldUrl + '?' + (+new Date())
        });
    },
    sendCode: function (param) {
        $.ajax({
            type: "post",
            url: param.url,
            data: param.data,
            dateType: "json",
            function (result) {
                if (result.msg) {
                    alert(result.msg)
                }
            }
        });
    },
    getCode: function (type, event) {
        var param = null;
        if (type == 'phoneButton') {
            param = {
                url: "/register/getPhoneCode",
                data: {mobile: $("#mobile").val()}
            };
        } else {
            param = {
                url: "/register/getEmailCode",
                data: {email: $("#email").val()}
            };
        }
        this.sendCode(param);
        this.setState({disabled: true});

        /*  开始倒计时  */
        Utils.countDown(this, 60);
    },
    render: function () {
        var type = this.props.add;
        if (type == 'imgCode') {
            return (<span className="input-group-addon">
                <img alt="验证码"
                     title="验证码"
                     className="img-code"
                     src={this.state.url}
                     onClick={this.freshCode}
                />
            </span>);
        } else if (type) {
            return (
                <a
                    className="sendMsg"
                    href="javascript:;"
                    onClick={this.getCode.bind(this, type)} disabled={this.state.disabled}>{this.state.text}
                </a>
            );
        } else {
            return false
        }
    }
});
/*   输入框组件   */
window.Input = React.createClass({
    handleChange: function (event) {
        var value = $.trim(event.target.value);
        value = value.replace('x', 'X')
        this.setState({value: value});

    },

    getInitialState: function () {
        return {value: ''}
    },
    componentWillReceiveProps: function (nextProps) {
        this.setState({
            value: nextProps.value
        });
    },
    render: function () {
        return (
            <div className="form-group">
                <label htmlFor={this.props.id} className="control-label">{this.props.inputName}</label>
                <div className="">
                    <input type={this.props.type || 'text'}
                           id={this.props.id}
                           name={this.props.name}
                           value={this.state.value}
                           className='form-control'
                           placeholder={this.props.placeholder}
                           maxLength={this.props.maxLength}
                           minLength={this.props.minLength}
                           readOnly={this.props.readOnly}
                           disabled={this.props.disabled}
                           onChange={this.handleChange}

                    />
                </div>
                <Add add={this.props.add}/>
            </div>
        );
    }
});

window.RadioButtonList = React.createClass({
    getInitialState: function () {
        return {selectedValue: this.props.selectedValue};
    },
    onSelectedValueChanged: function (event) {
        this.setState({selectedValue: event.target.value});
    },
    renderRadionButtons: function () {
        return this.props.listItems.map(function (item, index) {
            return (<RadioButton id={this.props.name + "_" + index}
                                 name={this.props.name}
                                 value={item.value || item}
                                 text={item.text || item}
                                 checked={this.state.selectedValue == (item.value || item)}
                                 onSelectedValueChanged={this.onSelectedValueChanged}/>);
        }.bind(this));
    },
    render: function () {
        return (
            <span className="radioButtonList">{this.renderRadionButtons()}</span>
        )
    },
});
window.RadioButton = React.createClass({

    handleChange: function (event) {
        this.setState({selectedValue: event.target.value});
        if (this.props.onSelectedValueChanged) {
            this.props.onSelectedValueChanged(event);
        }
    },

    render: function () {
        return (
            <label htmlFor={this.props.id}>
                <input
                    type="radio"
                    name={this.props.name}
                    value={this.props.value}
                    title={this.props.title}
                    readOnly={this.props.readOnly}
                    checked={this.props.checked}
                    onChange={this.handleChange}
                />
                {this.props.text}
            </label>
        );
    }
});