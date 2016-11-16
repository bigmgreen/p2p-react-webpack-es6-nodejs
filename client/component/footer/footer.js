import './footer.css';
import {LINK} from '../../common/js/global';
/**
 * 底部组件
 */
export default class Footer extends React.Component {
    render() {
        return (
            <div className="footer">
                <div className="footer-wrap">
                    <div className="footer-info">
                        <div className="footer-info-left">
                            <dl>
                                <dt>了解我们</dt>
                                <dd><a href={LINK.ABOUT_US.CONTENT + '?aboutUs'}>&gt;&nbsp;关于我们</a></dd>
                            </dl>
                            <dl>
                                <dt>法律保障</dt>
                                <dd><a href={LINK.OTHER.INSURANCE}>&gt;&nbsp;安全保障 </a></dd>
                            </dl>
                            <dl>
                                <dt>加入我们</dt>
                                <dd><a href={LINK.ABOUT_US.CONTENT + '?contactUs'}>&gt;&nbsp;联系我们</a></dd>
                            </dl>
                            <dl>
                                <dt>帮助中心</dt>
                                <dd><a href={LINK.OTHER.HELP}>&gt;&nbsp;帮助中心</a></dd>
                            </dl>
                        </div>
                        <div className="footer-info-right">
                            <ul>
                                <li>
                                    <span>中科柏诚服务热线</span>
                                    <strong className="footer-info-phone">4444-5555-00</strong>
                                    <span>周一至周五：8:30-18:00</span>
                                </li>
                                <li>
                                    <img className="footer-code" src="../../static/common/img/weixin.png"/>
                                    <span>扫一扫，马上关注</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="footer-copy-right">
                        <p>
                            <span>版权所有&copy;2016</span>
                            <span>中科柏诚</span>
                            <span>|</span>
                            <span>京ICP备 140588888号-1</span>
                            <span>|</span>
                            <span>地址：北京市朝阳xxxxx</span>
                        </p>
                        <div className="fd_c1">
                            <img src="../../static/common/img/3_128.png"/>
                            <img src="../../static/common/img/3_130.png"/>
                            <img src="../../static/common/img/3_132.png"/>
                            <img src="../../static/common/img/3_134.png"/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}