var LINK = Global.LINK.ABOUT_US;
/**
 * 关于我们模块的左菜单
 */
Global.component.AboutLeft = window.AboutLeft = React.createClass({
    componentDidMount: function (nextProps) {
        this.setState(nextProps, function () {
            var url = location.href.split('/').pop();
            $('[data-about-left="true"]').find('a').each(function () {

                var str = $(this).attr('href').split('/').pop();

                if (url.split('?').shift() === 'detail.html') {
                    if (str.split('?').pop() === url.split('?').pop().split('-').shift()) {
                        $(this).addClass('active');
                        return false;
                    }
                } else {
                    if (url.indexOf(str) > -1) {
                        $(this).addClass('active');
                        return false;
                    }
                }
            });
        });
    },
    render: function () {
        return (
            <div className="about-left">
                <aside>
                    <ul data-about-left="true">
                        <li>
                            <a href={LINK.CONTENT + '?aboutUs'}>关于我们</a>
                        </li>
                        <li>
                            <a href={LINK.LIST + '?notices'}>公司公告</a>
                        </li>
                        <li>
                            <a href={LINK.LIST + '?mediaReports'}>媒体报道</a>
                        </li>
                        <li>
                            <a href={LINK.CONTENT + '?partners'}>合作伙伴</a>
                        </li>
                        <li>
                            <a href={LINK.CONTENT + '?contactUs'}>联系我们</a>
                        </li>
                    </ul>
                </aside>
            </div>
        );
    }
});