/**
 * 链接
 */
var LINK = Global.LINK.ACCOUNT;

/**
 * 账户中心左菜单  根据用户角色显示
 */
Global.component.AccountLeft = React.createClass({
    getInitialState: function () {
        return {
            appUser: {
                roles: null 
            }
        };
    },
    componentWillReceiveProps: function (nextProps) {
        this.setState(nextProps, function () {
            var url = location.pathname.split('/').pop();
            $('[data-account-left]').find('a').each(function () {

                var str = $(this).attr('href').split('/').pop();
                if (url.indexOf(str) > -1) {
                    $(this).addClass('active');
                    return false;
                }
            });
        });
    },
    render: function () {

        if (this.state.appUser.roles === Global.ROLE.PERSON) {
            return (
                <div data-account-left className="account-left">
                    <dl>
                        <dt>账户</dt>
                        <dd>
                            <a href={LINK.ACCOUNT}>账户概览</a>
                        </dd>
                        <dd>
                            <a href={LINK.PERSON_INFO}>基本资料</a>
                        </dd>
                        <dd>
                            <a href={LINK.ACCOUNT_SETTING}>账户设置</a>
                        </dd>
                        <dd>
                            <a href={LINK.MESSAGE_CENTER}>消息中心</a>
                        </dd>
                    </dl>
                    <dl>
                        <dt>交易</dt>
                        <dd>
                            <a href={LINK.INVEST_RECORD}>投资记录</a>
                        </dd>
                        <dd>
                            <a href={LINK.BORROW_RECORD}>借款记录</a>
                        </dd>
                        <dd>
                            <a href={LINK.DEBT_INDEX}>债权转让</a>
                        </dd>
                        <dd>
                            <a href={LINK.SESSION}>资金流水</a>
                        </dd>
                        <dd>
                            <a href={LINK.RECHARGE}>充值提现</a>
                        </dd>
                        <dd>
                            <a href={LINK.COLLECTION}>我的收藏</a>
                        </dd>
                    </dl>
                    <dl>
                        <dt>百宝箱</dt>
                        <dd>
                            <a href={LINK.SCORE}>我的积分</a>
                        </dd>
                        <dd>
                            <a href={LINK.SCORE_EXCHANGE}>积分兑换</a>
                        </dd>
                        <dd>
                            <a href={LINK.RED_MONEY}>我的红包</a>
                        </dd>
                        <dd>
                            <a href={LINK.INVITE_FRIENDS}>邀请好友</a>
                        </dd>
                        <dd>
                            <a href={LINK.HOBBY}>我的喜好</a>
                        </dd>
                    </dl>
                </div>
            );
        } else if (this.state.appUser.roles === Global.ROLE.ENTERPRISE) {
            return (
                <div data-account-left className="account-left">
                    <dl>
                        <dt>账户</dt>
                        <dd>
                            <a href={LINK.ACCOUNT}>账户概览</a>
                        </dd>
                        <dd>
                            <a href={LINK.ACCOUNT_SETTING}>账户设置</a>
                        </dd>
                        <dd>
                            <a href={LINK.MESSAGE_CENTER}>消息中心</a>
                        </dd>
                    </dl>
                    <dl>
                        <dt>交易</dt>
                        <dd>
                            <a href={LINK.BORROW_RECORD}>借款记录</a>
                        </dd>
                        <dd>
                            <a href={LINK.SESSION}>资金流水</a>
                        </dd>
                        <dd>
                            <a href={LINK.RECHARGE}>充值提现</a>
                        </dd>
                    </dl>
                </div>
            );
        } else {
            return false;
        }
    }
});
