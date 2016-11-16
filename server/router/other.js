module.exports = function (app) {
    // 活动中心
    app.get('/activity', function (req, res) {
        res.json({
            nowActivity: [],
            futureActivity: [
                {
                    title: '理财高手过招，强者得力！(你是理财高手、快手、豪手?专享奖金等你来抢！)',
                    link: 'http://www.baidu.com',
                    date: '2014年04月01日-2016年12月31日',
                    content: '这里是个大图片'
                },
                {
                    title: '理财高手过招，强者得力！(你是理财高手、快手、豪手?专享奖金等你来抢！)',
                    link: 'http://www.baidu.com',
                    date: '2014年04月01日-2016年12月31日',
                    content: '这里是个大图片'
                },
                {
                    title: '理财高手过招，强者得力！(你是理财高手、快手、豪手?专享奖金等你来抢！)',
                    link: 'http://www.baidu.com',
                    date: '2014年04月01日-2016年12月31日',
                    content: '这里是个大图片'
                },
                {
                    title: '理财高手过招，强者得力！(你是理财高手、快手、豪手?专享奖金等你来抢！)',
                    link: 'http://www.baidu.com',
                    date: '2014年04月01日-2016年12月31日',
                    content: '这里是个大图片'
                }
            ],
            oldActivity: [
                {
                    title: '理财高手过招，强者得力！(你是理财高手、快手、豪手?专享奖金等你来抢！)',
                    link: 'http://www.baidu.com',
                    date: '2014年04月01日-2016年12月31日',
                    content: '这里是个大图片'
                }, {
                    title: '理财高手过招，强者得力！(你是理财高手、快手、豪手?专享奖金等你来抢！)',
                    link: 'http://www.baidu.com',
                    date: '2014年04月01日-2016年12月31日',
                    content: '这里是个大图片'
                },
                {
                    title: '理财高手过招，强者得力！(你是理财高手、快手、豪手?专享奖金等你来抢！)',
                    link: 'http://www.baidu.com',
                    date: '2014年04月01日-2016年12月31日',
                    content: '这里是个大图片'
                },
                {
                    title: '理财高手过招，强者得力！(你是理财高手、快手、豪手?专享奖金等你来抢！)',
                    link: 'http://www.baidu.com',
                    date: '2014年04月01日-2016年12月31日',
                    content: '这里是个大图片'
                }
            ]
        });
    });

    // 安全保障
    app.get('/insurance', function (req, res) {
        res.json({
            list: [
                {
                    title: '风险控制保障',
                    content: '借款前期严格审核'
                },
                {
                    title: '风险保障计划',
                    content: '为保障所有客户的共同利益，有效控制风险，火柴头特设专款专用账户——“风险准备金“账户，切实保障火柴头客户的资金安全。'
                },
                {
                    title: '账户安全',
                    content: '政府有关部门及行业组织有效管理与指导。'
                }
            ]
        });
    });

    // 帮助中心
    app.get('/help', function (req, res) {
        res.json({
            list: [
                {
                    title: '如何投资',
                    content: '通常大学毕业后的职场新人处于事业起步阶段，没有储蓄，也不好意思再“啃老”，租房、生活开销、工作应酬等全部需要用工资来解决。如果不好好做计划，入不敷出也是常有的事。转眼数年后，谈恋爱、成家之时，买房置业的压力也随之而来，这时候才发现口袋空空如也。'
                },
                {
                    title: '投资流程',
                    content: '为维护公司股东权益，规范投资基金运作，提高投资收益，防范投资风险，根据国家有关投资的法律、法规和公司内部系列规章制度（包括公司章程、投资管理办法、项目评审实施细则等）制定本流程。'
                }
            ]
        });
    });
}
