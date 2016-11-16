/**
 * 标签页组件
 * tabItemIds 标签页标题集合
 * tabItem  功能块集合
 * className  外部定义样式
 * {
 *      container：null,
 *      header：null,
 *      title：null,
 *      content：null,
 *      item：null
 * }
 * index 设置默认选中的元素的序号
 * TODO 有使用到Jquery  理想状态是不依赖JQ
 *
 */
Global.component.Tab = React.createClass({
    handleClick: function (e) {

        /**
         * 点击不在button上时的处理
         */
        var target = $(e.target);
        if (e.target.nodeName.toLowerCase() === 'button') {
            target = $(e.target);
        } else {
            target = $(e.target).parents('button');
        }

        /***
         * 移除前一个激活样式
         */
        $(target.siblings('.active').data('tab-target')).removeClass('active');
        target.siblings('.active').removeClass('active');

        /***
         * 增加后一个激活样式
         */
        target.addClass('active');
        $(target.data('tab-target')).addClass('active');

        /**
         *在一个会话内保持标签页的状态
         */
        if (sessionStorage instanceof Object) {
            sessionStorage.setItem('react-tab-index' + location.pathname.split('/').pop(), target.data('tab-index'));
        }
    },
    handleClickWithCallBack: function (callBack, e) {
        /**
         * 执行切换时的回调
         */
        typeof callBack === 'function' && callBack();
        this.handleClick(e);
    },
    componentDidMount: function () {

        var index = 0;
        if (sessionStorage instanceof Object) {
            index = parseInt(sessionStorage.getItem('react-tab-index' + location.pathname.split('/').pop())) || 0;
        }
        //设置默认选中的元素的序号
        $('[data-tab-target]').eq(index).trigger('click');

    },
    render: function () {

        /**
         * 每个按钮绑定的事件
         */
        var tabItemClick = this.props.tabItemClick;
        var tabItemIds = this.props.tabItemIds;
        var tabItemIcon = this.props.tabItemIcon || new Array(tabItemIds.length);
        var tabItem = this.props.tabItem;
        var className = this.props.className;
        return (
            <section className={className.container}>
                <header className={className.header}>
                    {tabItemIds.map(function (item, index) {
                        var id = Object.keys(item)[0];
                        return (
                            <button
                                className={className.title}
                                data-tab-target={'#' + id}
                                data-tab-index={index}
                                type="button"
                                onClick={tabItemClick instanceof Object ?
                                    this.handleClickWithCallBack.bind(this, tabItemClick[index]) :
                                    this.handleClick.bind(this)}
                            >
                                {tabItemIcon[index] && tabItemIcon[index][id]}
                                {tabItemIds[index][id]}
                            </button>
                        );

                    }.bind(this))}
                </header>
                <div className={className.content}>
                    {tabItemIds.map(function (item, index) {

                        return (
                            <div id={Object.keys(item)[0]}
                                 className={className.item}
                            >{tabItem[index][Object.keys(item)[0]]}</div>
                        );

                    })}
                </div>
            </section>
        );
    }
});