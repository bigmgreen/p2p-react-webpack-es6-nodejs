/**
 * 链接地址
 */
var LINK = Global.LINK;
/**
 * 所有页面面包屑导航
 */
Global.component.Breadcrumb = window.Breadcrumb = React.createClass({
    render: function () {
        return (
            <ul className="breadcrumb">
                <li>
                    <a href={LINK.INDEX}>{this.props.index}</a>
                </li>
                <li className="active">{this.props.pageName}</li>
            </ul>
        );
    }
});