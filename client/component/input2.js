/**
 * 获取验证码组件
 *
 * 可选参数：
 *      url:获取验证码地址
 *      param:发送参数
 *      callBack:发送前的校验
 *      success: 请求成功后的回调
 */
Global.component.Code = React.createClass({
    getInitialState: function () {
        return {
            text: this.props.text || '获取验证码',
            disabled: false
        };
    },
    sendCode: function (param) {
        $.ajax({
            type: "post",
            url: param.url,
            data: param.data,
            dateType: "json",
            success: function (result) {
                (typeof param.success === 'function') && param.success(result);
            }
        });
    },
    runCountDown: function (props, event) {

        event.preventDefault();

        /*  检查回调    */
        if (typeof props.callBack === 'function') {
            if (!props.callBack()) {
                return;
            }
        }

        this.setState({disabled: true});

        this.sendCode({
            url: props.url,
            data: props.param,
            success: props.success
        });

        /*  开始倒计时  */
        Utils.countDown(this, 60);
    },
    render: function () {
        return (
            <button
                className="sendMsg send-msg"
                onClick={this.runCountDown.bind(this, this.props)}
                disabled={this.state.disabled}>{this.state.text}
            </button>
        );
    }
});

/**
 * 获取图形验证码组件
 *
 * 可选参数：
 *      url:获取验证码地址
 *
 */
Global.component.ImgCode = React.createClass({
    getInitialState: function () {
        return {
            url: this.props.url,
            id: this.props.id
        };
    },
    freshCode: function (e) {
        var src = e.target.src;
        var index = src.indexOf('?');
        if (index === -1) {
            e.target.src = src + '?' + (+new Date);
        } else {
            e.target.src = src.substr(0, index) + '?' + (+new Date);
        }
    },
    render: function () {
        return (
            <img
                id={this.state.id}
                alt="验证码"
                title="验证码"
                className="img-code"
                src={this.state.url}
                onClick={this.freshCode}
            />
        );
    }
});

/**
 * 输入框组件
 */
Global.component.Input = React.createClass({
    handleChange: function (event) {
        this.setState({
            value: $.trim(event.target.value)
        });

        if (typeof this.props.onChange === 'function') {
            var temp = {};
            temp[event.target.name] = event.target.value;
            this.props.onChange(temp);
        }
    },

    getInitialState: function () {
        return {
            value: this.props.value
        }
    },
    componentWillReceiveProps: function (nextProps) {
        this.setState(nextProps);
    },
    render: function () {
        return (
            <div className="form-group">
                <label
                    htmlFor={this.props.id || this.props.name}
                    className="control-label"
                >{this.props.inputName}</label>
                <div>
                    <input type={this.props.type || 'text'}
                           id={this.props.id || this.props.name}
                           name={this.props.name}
                           value={this.state.value}
                           className={'form-control ' + this.props.className}
                           placeholder={this.props.placeholder}
                           maxLength={this.props.maxLength}
                           minLength={this.props.minLength}
                           readOnly={this.props.readOnly}
                           disabled={this.props.disabled}
                           onChange={this.handleChange}
                    />
                </div>
                {this.props.children}
            </div>
        );
    }
});

/***
 * 适合充值提现的输入框组件
 *
 * onChange 属性用于向父元素返回当前最新数据，是一个钩子函数
 *
 *
 */
Global.component.RechargeCashInput = React.createClass({
    handleChange: function (e) {
        var value = $.trim(e.target.value)
        this.setState({value: value});

        if (typeof this.props.onChange === 'function') {
            this.props.onChange(value)
        }
    },
    getInitialState: function () {
        return {value: ''}
    },
    render: function () {
        return (
            <div className="input-row">
                <div className="input-group">
                    <span className="input-group-addon">
                        <label htmlFor={this.props.id} className="control-label">{this.props.inputName}</label>
                    </span>
                    <input type={this.props.type || 'text'}
                           id={this.props.id}
                           name={this.props.name}
                           value={this.state.value}
                           className='form-control'
                           placeholder={this.props.placeholder}
                           maxLength={this.props.maxLength}
                           minLength={this.props.minLength}
                           readOnly={this.props.readOnly}
                           onChange={this.handleChange}
                    />
                </div>
            </div>
        );
    }
});

/**
 * 输入框文本组件，只读输入框
 */
Global.component.TextInput = React.createClass({
    getInitialState: function () {
        return {
            value: '',
            text: this.props.text
        }
    },
    componentWillReceiveProps: function (nextProps) {
        this.setState(nextProps);
    },
    render: function () {
        return (
            <div className="input-row">
                <div className="input-group">
                    <span className="input-group-addon">
                        <label className="form-label">{this.state.text}</label>
                    </span>
                    <span>{this.state.value}</span>
                </div>
            </div>
        );
    }
});

/**
 * 带左图标输入框组件
 */
Global.component.IconInput = React.createClass({
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

/**
 * 输入框组件
 */
Global.component.RegisterInput = React.createClass({
    handleChange: function (event) {
        this.setState({
            value: $.trim(event.target.value)
        });

        if (typeof this.props.onChange === 'function') {
            var temp = {};
            temp[event.target.name] = event.target.value
            this.props.onChange(temp);
        }
    },
    getInitialState: function () {
        return {
            value: this.props.value
        }
    },
    componentWillReceiveProps: function (nextProps) {
        this.setState(nextProps);
    },
    render: function () {
        return (
            <div className="input-row">
                <div className="input-group">
                    <span className="input-group-addon">
                        <label
                            htmlFor={this.props.id}
                            className="control-label"
                        >{this.props.inputName}</label>
                    </span>
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
                    {this.props.children}
                </div>
            </div>
        );
    }
});