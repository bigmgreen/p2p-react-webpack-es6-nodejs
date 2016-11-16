Global.component.Modal = window.Modal = React.createClass({
    getInitialState: function () {
        return {
            id: this.props.id,//弹窗id
            titleId: this.props.titleId,//标题id
            bodyId: this.props.bodyId,//内容id用于外部赋值
            isBig: this.props.isBig,//大弹窗还是小弹窗
            title: this.props.title,//弹窗标题
            showHead: this.props.showHead,//是否显示头部
            showFoot: this.props.showFoot,//是否显示底部
            okBtn: this.props.okBtn,//确认按钮,
            okBtnText: this.props.okBtnText || '确认',//确认按钮显示文本
            callBack: this.props.callBack,//确认按钮回调函数
            body: this.props.body//中间内容，由外部动态添加
        };
    },
    shouldComponentUpdate: function () {
        return false;
    },
    render: function () {

        var dialog = this.state.isBig ? 'modal-dialog' : 'modal-dialog modal-sm';

        var head = this.state.showHead ? (
            <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal">
                    <span>×</span>
                </button>
                <h4 id={this.state.titleId} className="modal-title">{this.state.title}</h4>
            </div>
        ) : null;

        var foot = this.state.showFoot ? (
            <div className="modal-footer">
                {this.state.okBtn ? (
                    <button type="button" className="btn btn-primary" onClick={this.state.callBack.bind(this)}>
                        {this.state.okBtnText}</button>) : null}
                <button type="button" className="btn btn-default" data-dismiss="modal">关闭</button>
            </div>
        ) : null;

        return (
            <div id={this.state.id} className="modal fade" tabIndex="-1">
                <div className={dialog}>
                    <div className="modal-content">
                        {head}
                        <div id={this.state.bodyId} className="modal-body">{this.state.body}</div>
                        {foot}
                    </div>
                </div>
            </div>
        );
    }
});