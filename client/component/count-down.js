/**
 * 倒计时组件
 *
 *     totalMs  传入的毫秒数
 *     callBack  倒计时完成后的处理
 *
 */
Global.component.CountDown = window.CountDown = React.createClass({
    getInitialState: function () {
        return {
            day: 0,
            hour: 0,
            minute: 0,
            second: 0
        };
    },
    countDown: function (totalMs, callBack) {
        //转换成秒
        totalMs = (totalMs - (+new Date())) / 1000;

        var timer = setInterval(function () {
            totalMs--;
            /**        倒计时结束        */
            if (totalMs <= 0) {
                clearInterval(timer);
                callBack && callBack();
                return;
            }

            var day = Math.floor(totalMs / (60 * 60 * 24));
            var hour = Math.floor(totalMs / (60 * 60)) - (day * 24);

            var minute = Math.floor(totalMs / 60) - (day * 24 * 60) - (hour * 60);
            minute = minute <= 9 ? '0' + minute : minute;

            var second = Math.floor(totalMs) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
            second = second <= 9 ? '0' + second : second;

            this.setState({
                day: day,
                hour: hour,
                minute: minute,
                second: second
            });
        }.bind(this), 1000);
    },
    componentWillReceiveProps: function (nextProps) {
        this.countDown(nextProps.openTime, nextProps.callback);
    },
    render: function () {
        return (
            <div className="count-down">
                <span className="count-down-title">剩余时间：</span>
                <span className="count-down-val">{this.state.day}</span>
                <span className="count-down-unit">天</span>
                <span className="count-down-val">{this.state.hour}</span>
                <span className="count-down-unit">时</span>
                <span className="count-down-val">{this.state.minute}</span>
                <span className="count-down-unit">分</span>
                <span className="count-down-val">{this.state.second}</span>
                <span className="count-down-unit">秒</span>
            </div>
        );
    }
});