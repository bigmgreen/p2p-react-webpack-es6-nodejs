module.exports = function(app) {
    // 关于我们
    app.get('/about-us', function(req, res) {
        res.json({
            title: '关于我们',
            content: '中科柏诚科技（北京）股份有限公司是国内最为领先的互联网金融服务高新技术企业。公司核心团队是由资深金融人士、IT人士、互联网专业人士构成，骨干团队均具备丰富的海内外金融业、监管机构、国企、上市公司等从业背景。中科柏诚专注于互联网金融服务，是国内最为领先的和专业的互联网金融综合服务商。自成立以来获得国家高新技术企业认证、双软企业认证、ISO9001认 证；获得各类奖项、证书数十项；被各类主管机构、行业协会吸纳为会员单位。以最优质的品质和质量服务体系为客户提供最优质的服务。中科柏诚主要以咨询、监管支撑、软件开发、软件实施、SAAS（云金融）服务、IT运维、信息服务等为核心能力，为互联网金融领域提供最优质的产品与服务，支持各类金融机构践行普惠金融理念，推动中国互联网金融高速稳健发展。中科柏诚的互联网金融方案及专业产品与服务已广泛应用在银行、P2P等金融（准金融）机构及相关企业。'
        });
    });

    // 合作伙伴
    app.get('/friends', function(req, res) {
        res.json({
            title: '合作伙伴',
            content: '<p>民生银行</p><p>百度</p><p>天安金交所</p>'
        });
    });

    //联系我们
    app.get('/contact-us', function(req, res) {
        res.json({
            title: '联系我们',
            content: '<p>公司地址：北京市朝阳区团结湖南里15号恒祥大厦一层</p><p>公司主页：http://www.zkbc.net/</p>'
        });
    });

    //公司公告
    app.post('/notices', app.bodyParser, function(req, res) {
        res.json({
            pageView: {
                currentPage: req.body.currentPage * 1,
                pageCount: 10
            },
            url: 'notices',
            title: '公司公告',
            content: [{
                    title: '中秋加息公告',
                    id: 1,
                    issueTime: '2016-08-08'
                },
                {
                    title: '中秋加息公告',
                    id: 1,
                    issueTime: '2016-08-08'
                },
                {
                    title: '中秋加息公告',
                    id: 1,
                    issueTime: '2016-08-08'
                },
                {
                    title: '中秋加息公告',
                    id: 1,
                    issueTime: '2016-08-08'
                },
                {
                    title: '中秋加息公告',
                    id: 1,
                    issueTime: '2016-08-08'
                },
                {
                    title: '中秋加息公告',
                    id: 1,
                    issueTime: '2016-08-08'
                },
                {
                    title: '中秋加息公告',
                    id: 1,
                    issueTime: '2016-08-08'
                },
                {
                    title: '中秋加息公告',
                    id: 1,
                    issueTime: '2016-08-08'
                },
                {
                    title: '中秋加息公告',
                    id: 1,
                    issueTime: '2016-08-08'
                },
                {
                    title: '中秋加息公告',
                    id: 1,
                    issueTime: '2016-08-08'
                },
                {
                    title: '中秋加息公告',
                    id: 1,
                    issueTime: '2016-08-08'
                },
                {
                    title: '中秋加息公告',
                    id: 1,
                    issueTime: '2016-08-08'
                }
            ]
        });
    });

    //公司公告详情
    app.get('/notices_*', function(req, res) {
        // 解析前台传过来的参数[ 'notices', '7', '1' ] 
        //第一个是信息类型   第二个是传过来的当前页 第三个是信息id
        //第一个和第二个需要回显
        var url = req.url.replace('/', '').split('_');
        res.json({
            pageName: '公司公告',
            title: '公司公告详情',
            date: '2016-08-08',
            type: url[0],
            currentPage: url[1],
            content: '2014年国内网贷行业经历了“冰火两重天”的变化，P2P网贷平台的数量迎来井喷式增长；与此同时，网贷平台背后的诸多问题也逐渐暴露。2015年 3月两会期间，国务院总理李克强所做的政府工作报告对互联网新经济寄予厚望，报告中把互联网金融表述为“异军突起”，要求促进“互联网金融健康发展”。业 内人士认为，互联网金融将迎来发展的春天。'
        });
    });

    //媒体报道
    app.post('/media-reports', app.bodyParser, function(req, res) {
        res.json({
            pageView: {
                currentPage: req.body.currentPage,
                pageCount: 10
            },
            url: 'media-reports',
            title: '媒体报道',
            content: [{
                    title: '中秋加息公告',
                    id: 1,
                    issueTime: '2016-08-08'
                },
                {
                    title: '中秋加息公告',
                    id: 1,
                    issueTime: '2016-08-08'
                },
                {
                    title: '中秋加息公告',
                    id: 1,
                    issueTime: '2016-08-08'
                },
                {
                    title: '中秋加息公告',
                    id: 1,
                    issueTime: '2016-08-08'
                },
                {
                    title: '中秋加息公告',
                    id: 1,
                    issueTime: '2016-08-08'
                },
                {
                    title: '中秋加息公告',
                    id: 1,
                    issueTime: '2016-08-08'
                },
                {
                    title: '中秋加息公告',
                    id: 1,
                    issueTime: '2016-08-08'
                }
            ]
        });
    });

    //媒体报道
    app.get('/media-reports_*', function(req, res) {
        // 解析前台传过来的参数[ 'media-reports', '7', '1' ] 
        //第一个是信息类型   第二个是传过来的当前页 第三个是信息id
        //第一个和第二个需要回显
        var url = req.url.replace('/', '').split('_');
        res.json({
            pageName: '媒体报道',
            title: '媒体报道',
            date: '2016-08-08',
            type: url[0],
            currentPage: url[1],
            content: '2014年国内网贷行业经历了“冰火两重天”的变化，P2P网贷平台的数量迎来井喷式增长；与此同时，网贷平台背后的诸多问题也逐渐暴露。2015年 3月两会期间，国务院总理李克强所做的政府工作报告对互联网新经济寄予厚望，报告中把互联网金融表述为“异军突起”，要求促进“互联网金融健康发展”。业 内人士认为，互联网金融将迎来发展的春天。'
        });
    });
}