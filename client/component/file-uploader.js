/**
 * 下拉列表
 */
var Select = Global.component.Select;
/**
 * 请求地址
 */
var URL = Global.URLS.ACCOUNT;
/**
 * 链接地址
 */
var LINK = Global.LINK;

/**
 * 上传组件
 *
 */
Global.component.FileUploader = React.createClass({
    getInitialState: function () {
        return {
            creditTypes: [
                '请选择',
                'B1+身份证(必传)',
                'C1+信用报告(必传)',
                'D8+收入证明(必传)',
                'F7+居住地址证明(必传)',
                'E8+工作证明(必传)',
                'J3+学历证明',
                'H1+房产证明',
                'I1+购车证明',
                'B3+结婚证明',
                'M1+其它'
            ],
            info: []
        };
    },
    componentDidMount: function () {
        this.init(this.props.uploadUrl);
    },
    componentWillReceiveProps: function (nextProps) {
        if (nextProps.url === URL.PERSON_INFO.GET_LOAN_CREDIT_MATERIAL) {
            if (!(nextProps.info instanceof Object)) {
                delete nextProps.info;
            }
            this.setState(nextProps);
        }
    },
    init: function (url) {
        /**
         * 低端浏览器给出提示
         */
        if (!WebUploader.Uploader.support()) {
            alert('Web Uploader 不支持您的浏览器！如果你使用的是IE浏览器，请尝试升级 flash 播放器');
            throw new Error('WebUploader does not support the browser you are using.');
        }

        var $ = jQuery;
        var $wrap = $('#uploader');
        /**
         * 图片容器
         */
        var $queue = $('#fileList').appendTo($('#dragArea'));
        /**
         * 状态栏，包括进度和控制按钮
         * @type {any}
         */
        var $statusBar = $('#statusBar');
        /**
         * 文件总体选择信息
         * @type {any}
         */
        var $info = $('#info');
        /**
         * 上传按钮
         * @type {any}
         */
        var $upload = $('#uploadBtn');
        /**
         * 没选择文件之前的内容
         * @type {any}
         */
        var $placeHolder = $('#dndArea');
        /**
         * 总体进度条
         */
        var $progress = $('#progress').hide();
        /**
         * 添加的文件数量
         * @type {number}
         */
        var fileCount = 0;
        /**
         * 添加的文件总大小
         * @type {number}
         */
        var fileSize = 0;
        /**
         * 优化retina, 在retina下这个值是2
         * @type {any}
         */
        var ratio = window.devicePixelRatio || 1;
        /**
         * 缩略图大小
         * @type {number}
         */
        var thumbnailWidth = 110 * ratio;
        var thumbnailHeight = 110 * ratio;
        /**
         * 可能有pedding, ready, uploading, confirm, done.
         * @type {string}
         */
        var state = 'pedding';
        /**
         * 所有文件的进度信息，key为file id
         * @type {{}}
         */
        var percentages = {};
        /**
         * 检查css渐变属性的兼容性
         */
        var supportTransition = (function () {
            var s = document.createElement('p').style,
                r = 'transition' in s ||
                    'WebkitTransition' in s ||
                    'MozTransition' in s ||
                    'msTransition' in s ||
                    'OTransition' in s;
            s = null;
            return r;
        })();

        /**
         * WebUploader实例实例化
         */
        var uploader = this.uploader = WebUploader.create({
            /**
             * 上传按钮
             */
            pick: {
                id: '#filePicker',
                label: '点击选择图片'
            },
            /**
             * 拖拽区域
             */
            dnd: '#dragArea',
            /**
             * 指定监听paste事件的容器
             */
            paste: document.body,
            /**
             * 指定接受哪些类型的文件
             */
            accept: {
                title: 'Images',
                extensions: 'jpg,jpeg,bmp,png',
                mimeTypes: 'image/*'
            },
            /**
             * 设置文件上传域的name
             */
            fileVal: "files",
            /**
             * swf文件路径
             */
            swf: '../lib/webuploader/0.1.5/js/Uploader.swf',
            /**
             * 否禁掉整个页面的拖拽功能，如果不禁用，图片拖进来的时候会默认被浏览器打开
             */
            disableGlobalDnd: true,
            /**
             * 是否开启分片上传
             */
            chunked: false,
            /**
             * 文件接收服务端
             */
            server: url,
            /**
             * 验证文件总数量
             */
            fileNumLimit: 1,
            /**
             * 验证单个文件大小是否超出限制, 超出则不允许加入队列
             */
            fileSingleSizeLimit: 1024 * 1024
        });

        /**
         * 进度显示-事件绑定
         * @param file
         * @param percentage
         */
        uploader.onUploadProgress = function (file, percentage) {
            $('#' + file.id).find('.progress span').css('width', percentage * 100 + '%');
            percentages[file.id][1] = percentage;
            updateTotalProgress();
        };

        /**
         * 当文件被加入队列以后触发
         * @param file
         */
        uploader.onFileQueued = function (file) {
            fileCount++;
            fileSize += file.size;

            if (fileCount === 1) {
                $placeHolder.addClass('element-invisible');
                $statusBar.show();
            }

            addFile(file);
            setState('ready');
            updateTotalProgress();
        };
        /**
         * 当文件被移除队列后触发
         * @param file
         */
        uploader.onFileDequeued = function (file) {
            fileCount--;
            fileSize -= file.size;

            if (!fileCount) {
                setState('pedding');
            }

            removeFile(file);
            updateTotalProgress();

        };
        /**
         * 监听所有事件
         */
        uploader.on('all', function (type) {
            switch (type) {
                case 'uploadFinished':
                    setState('confirm');
                    break;

                case 'startUpload':
                    setState('uploading');
                    break;

                case 'stopUpload':
                    setState('paused');
                    break;

            }
        });
        /**
         * 错误事件监听
         * @param code
         */
        uploader.onError = function (code) {
            alert(code);
        };

        $upload.on('click', function () {
            if ($(this).hasClass('disabled')) {
                return false;
            }

            if (state === 'uploading') {
                uploader.stop();
            } else if ($('#creditMaterialType').val() === '请选择') {
                alert('您还没有选择证件类型');
            } else {
                uploader.upload();
            }
        });

        $info.on('click', '.retry', function () {
            uploader.retry();
        });

        $info.on('click', '.ignore', function () {
            alert('todo');
        });

        $upload.addClass('state-' + state);

        /**
         * 当有文件添加进来时执行，负责view的创建
         * @param file
         */
        function addFile(file) {
            var $li = $('<li id="' + file.id + '">' +
                    '<p class="title">' + file.name + '</p>' +
                    '<p class="imgWrap"></p>' +
                    '<p class="progress"><span></span></p>' +
                    '</li>'),

                $btns = $('<div class="file-panel">' +
                    '<span class="cancel">删除</span>' +
                    '<span class="rotateRight">向右旋转</span>' +
                    '<span class="rotateLeft">向左旋转</span></div>').appendTo($li),
                $prgress = $li.find('p.progress span'),
                $wrap = $li.find('p.imgWrap'),
                $info = $('<p class="error"></p>'),

                showError = function (code) {
                    switch (code) {
                        case 'exceed_size':
                            text = '文件大小超出';
                            break;

                        case 'interrupt':
                            text = '上传暂停';
                            break;

                        default:
                            text = '上传失败，请重试';
                            break;
                    }

                    $info.text(text).appendTo($li);
                };

            if (file.getStatus() === 'invalid') {
                showError(file.statusText);
            } else {
                // @todo lazyload
                $wrap.text('预览中');
                uploader.makeThumb(file, function (error, src) {
                    if (error) {
                        $wrap.text('不能预览');
                        return;
                    }

                    var img = $('<img src="' + src + '">');
                    $wrap.empty().append(img);
                }, thumbnailWidth, thumbnailHeight);

                percentages[file.id] = [file.size, 0];
                file.rotation = 0;
            }

            file.on('statuschange', function (cur, prev) {
                if (prev === 'progress') {
                    $prgress.hide().width(0);
                } else if (prev === 'queued') {
                    $li.off('mouseenter mouseleave');
                    $btns.remove();
                }

                // 成功
                if (cur === 'error' || cur === 'invalid') {
                    console.log(file.statusText);
                    showError(file.statusText);
                    percentages[file.id][1] = 1;
                } else if (cur === 'interrupt') {
                    showError('interrupt');
                } else if (cur === 'queued') {
                    percentages[file.id][1] = 0;
                } else if (cur === 'progress') {
                    $info.remove();
                    $prgress.css('display', 'block');
                } else if (cur === 'complete') {
                    $li.append('<span class="success"></span>');
                }

                $li.removeClass('state-' + prev).addClass('state-' + cur);
            });

            $li.on('mouseenter', function () {
                $btns.stop().animate({height: 30});
            });

            $li.on('mouseleave', function () {
                $btns.stop().animate({height: 0});
            });

            $btns.on('click', 'span', function () {
                var index = $(this).index(),
                    deg;

                switch (index) {
                    case 0:
                        uploader.removeFile(file);
                        return;

                    case 1:
                        file.rotation += 90;
                        break;

                    case 2:
                        file.rotation -= 90;
                        break;
                }

                if (supportTransition) {
                    deg = 'rotate(' + file.rotation + 'deg)';
                    $wrap.css({
                        '-webkit-transform': deg,
                        '-mos-transform': deg,
                        '-o-transform': deg,
                        'transform': deg
                    });
                } else {
                    $wrap.css('filter', 'progid:DXImageTransform.Microsoft.BasicImage(rotation=' + (~~((file.rotation / 90) % 4 + 4) % 4) + ')');
                }


            });

            $li.appendTo($queue);
        }

        /**
         * 负责view的销毁
         * @param file
         */
        function removeFile(file) {
            var $li = $('#' + file.id);

            delete percentages[file.id];
            updateTotalProgress();
            $li.off().find('.file-panel').off().end().remove();
        }

        function updateTotalProgress() {
            var loaded = 0,
                total = 0,
                spans = $progress.children(),
                percent;

            $.each(percentages, function (k, v) {
                total += v[0];
                loaded += v[0] * v[1];
            });

            percent = total ? loaded / total : 0;

            spans.eq(0).text(Math.round(percent * 100) + '%');
            spans.eq(1).css('width', Math.round(percent * 100) + '%');
            updateStatus();
        }

        function updateStatus() {
            var text = '', stats;

            if (state === 'ready') {
                text = '选中' + fileCount + '张图片，共' +
                    WebUploader.formatSize(fileSize) + '。';
            } else if (state === 'confirm') {
                stats = uploader.getStats();
                if (stats.uploadFailNum) {
                    text = '已成功上传' + stats.successNum + '张照片至XX相册，' +
                        stats.uploadFailNum + '张照片上传失败，<a class="retry" href="#">重新上传</a>失败图片或<a class="ignore" href="#">忽略</a>'
                }

            } else {
                stats = uploader.getStats();
                text = '共' + fileCount + '张（' +
                    WebUploader.formatSize(fileSize) +
                    '），已上传' + stats.successNum + '张';

                if (stats.uploadFailNum) {
                    text += '，失败' + stats.uploadFailNum + '张';
                }
            }
            $info.html(text);
        }

        function setState(val) {
            var file, stats;

            if (val === state) {
                return;
            }

            $upload.removeClass('state-' + state);
            $upload.addClass('state-' + val);
            state = val;

            switch (state) {
                case 'pedding':
                    $placeHolder.removeClass('element-invisible');
                    $queue.parent().removeClass('filled');
                    $queue.hide();
                    $statusBar.addClass('element-invisible');
                    uploader.refresh();
                    break;

                case 'ready':
                    $placeHolder.addClass('element-invisible');
                    $('#addFiles').removeClass('element-invisible');
                    $queue.parent().addClass('filled');
                    $queue.show();
                    $statusBar.removeClass('element-invisible');
                    uploader.refresh();
                    break;

                case 'uploading':
                    $('#addFiles').addClass('element-invisible');
                    $progress.show();
                    $upload.text('暂停上传');
                    break;

                case 'paused':
                    $progress.show();
                    $upload.text('继续上传');
                    break;

                case 'confirm':
                    $progress.hide();
                    $upload.text('开始上传').addClass('disabled');

                    stats = uploader.getStats();
                    if (stats.successNum && !stats.uploadFailNum) {
                        setState('finish');
                        return;
                    }
                    break;
                case 'finish':
                    stats = uploader.getStats();
                    if (stats.successNum) {
                        alert('上传成功');
                        location.reload();
                    } else {
                        // 没有成功的图片，重设
                        state = 'done';
                        location.reload();
                    }
                    break;
            }
            updateStatus();
        }
    },
    handleChange: function (e) {
        this.uploader.options.formData = {
            'creditMaterialType': e.target.value,
            'bizType': 'loanCreditMaterial'
        };
        this.uploader.refresh();
    },
    getTypeText: function (type) {
        switch (type) {
            case 'B1':
                return '身份证';
            case 'C1':
                return '信用报告';
            case 'D8':
                return '收入证明';
            case 'F7':
                return '居住地址证明';
            case 'E8':
                return '工作证明';
            case 'J3':
                return '学历证明';
            case 'H1':
                return '房产证明';
            case 'I1':
                return '购车证明';
            case 'B3':
                return '结婚证明';
            case 'M1':
                return '其它';
        }
    },
    getFormatTime: function (time) {
        return time.split(' ')[0];
    },
    getFileList: function (list) {
        return list.map(function (item) {
            return (
                <tr>
                    <td>
                        <img width="100" height="100"
                             src={'/account/showPic?bizType=loanCreditMaterial&name=' + item.fileName}/>
                    </td>
                    <td>{this.getTypeText(item.materialType)}</td>
                    <td>{(item.fileSize / 1024).toFixed(3) + 'k'}</td>
                    <td>{this.getFormatTime(item.uploadTime)}</td>
                    <td>
                        <button type="button"
                                onClick={this.creditMaterialDelete.bind(this, item.id)}>
                            <i className="fa fa-trash-o"/>
                        </button>
                    </td>
                </tr>
            );
        }, this);
    },
    creditMaterialDelete: function (id, e) {
        $.post(URL.PERSON_INFO.DELETE_CREDIT_MATERIAL, {id: id}).done(function (result) {
            if (result === 1) {
                alert('删除成功');
                this.props.queryData();
            }
        }.bind(this));
    },
    render: function () {
        return (
            <section>
                <div className="credit-desc">
                    <p>*说明：个人借款必传资料包括<span>身份证明、信用报告、收入证明、居住地证明、工作证明</span></p>
                    <p>加分资料包括：房产证明、购车证明、学历证明、结婚证明、其他等</p>
                    <Select
                        name="creditMaterialType"
                        className="form-control"
                        list={this.state.creditTypes}
                        mark="+"
                        callBack={this.handleChange.bind(this)}
                    />
                </div>
                <div className="form-group">
                    <div id="uploader">
                        <div id="dragArea" className="queue-list">
                            <div className="placeholder" id="dndArea">
                                <button type="button" id="filePicker" className="webuploader-container"/>
                                <p>或将照片拖到这里，单次最多可选1张</p>
                            </div>
                            <ul id="fileList" className="file-list"/>
                        </div>
                        <div id="statusBar" className="statusBar">
                            <div id="progress" className="progress">
                                <span className="text">0%</span>
                                <span className="percentage"/>
                            </div>
                            <div id="info" className="info"> 共0张（0B），已上传0张</div>
                            <div className="btns">
                                <button type="button" id="uploadBtn" className="uploadBtn state-pedding">开始上传</button>
                            </div>
                        </div>
                    </div>
                    <table className="table table-hover">
                        <thead>
                        <tr>
                            <th>图片</th>
                            <th>类型</th>
                            <th>文件大小</th>
                            <th>上传日期</th>
                            <th>操作</th>
                        </tr>
                        </thead>
                        <tbody>{this.getFileList(this.state.info)}</tbody>
                    </table>
                </div>
            </section>
        );
    }
});