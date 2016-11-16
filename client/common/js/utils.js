var Utils = {
    /*  格式化金额   */
    formatAmount: function (amount) {
        num = Number(amount);
        if (isNaN(num)) {
            return '请输入数字';
        }

        var reg = /(?=(?!\b)(\d{3})+$)/g;
        var result = null;
        if (num >= 10000) {
            result = String(num / 10000).replace(reg, ',') + '万元';
        } else {
            result = String(num).replace(reg, ',') + '元';
        }
        return result;
    },
    /*  根据期限时间和期限单位返回期限信息  */
    formatTerm: function (termCount, termUnit) {

        if (!termCount || !termUnit) {
            return
        }

        termCount = parseInt(termCount);
        termUnit = parseInt(termUnit);

        if (isNaN(termCount) || isNaN(termUnit)) {
            throw new TypeError('传入的参数不能转换为数字');
        }

        switch (termUnit) {
            case 1:
                return termCount + '天';
            case 2:
                return termCount + '周';
            case 3:
                return termCount + '个月';
        }
    },
    /*  根据期限单位数字返回期限单位字符  */
    getTermUnit: function (termUnit) {

        if (!termUnit) {
            return
        }

        termUnit = parseInt(termUnit);

        if (isNaN(termUnit)) {
            throw new TypeError('传入的参数不能转换为数字');
        }

        switch (termUnit) {
            case 1:
                return '天';
            case 2:
                return '周';
            case 3:
                return '个月';
        }
    },
    /*  根据产品id返回还款方式  */
    formatProductId: function (productId) {

        if (!productId) {
            return
        }

        productId = parseInt(productId);

        if (isNaN(productId)) {
            throw new TypeError('传入的参数不能转换为数字');
        }

        switch (productId) {
            case 1:
                return '按月付息，到期还本';
            case 2:
                return '一次性还本付息';
            case 3:
                return '等额本息';
        }
    },
    /*  打开协议或者服务条款   */
    openServiceItems: function (url) {
        url = '../../component/agreement/' + url + '.html';
        window.open(url, '', 'height=580,width=720,toolbar=no,menubar=no,scrollbars=no,resizable=false,location=no,status=no');
    },
    /*  倒计时  */
    countDown: function (el, step) {
        if (step <= 0) {
            el.setState({
                text: '获取验证码',
                disabled: false
            });
            return;
        }
        setTimeout(function () {
            el.setState({
                text: --step + 's后再获取'
            });
            Utils.countDown(el, step);
        }, 1000);
    },
    /*   解析url后面的查询字符串为json对象   */
    queryStrToJson: function () {
        // 去掉？号
        var queryStr = decodeURIComponent(location.search).replace('?', '');
        var arr = queryStr.split('&');
        var len = arr.length;
        var result = {};
        for (var i = 0; i < len; i++) {
            var obj = arr[i].split('=');
            result[obj[0]] = obj[1];
        }
        return result;
    },
    /*   毫秒转日期       */
    getMsToDate: function (ms, separator, isFull) {
        separator = separator || '-';
        var date = new Date(ms);

        var month = parseInt(date.getMonth()) + 1;
        month = month < 10 ? ('0' + month) : month;
        var day = parseInt(date.getDate()) + 1;
        day = day < 10 ? ('0' + day) : day;
        var str = date.getFullYear() + separator + month + separator + day;
        if (isFull) {
            var hours = date.getHours() < 10 ? ('0' + date.getHours()) : date.getHours();
            var min = date.getMinutes() < 10 ? ('0' + date.getMinutes()) : date.getMinutes();
            var sec = date.getSeconds() < 10 ? ('0' + date.getSeconds()) : date.getSeconds();
            str += ' ' + hours + separator + min + separator + sec;
        }
        return str;
    },
    /*   检查用户是否在线   */
    checkLoginStatus: function (callBack, modal) {
        modal = modal || 'loginModal';
        $.get(Global.URLS.GET_USER + '?' + (+new Date()), function (result) {
            if (result.appUser instanceof Object) {
                callBack && callBack();
            } else {
                $('#' + modal).modal('show');
            }
        });
    },
    /*   获取公司性质   */
    getOfficeType: function (officeType) {
        officeType = parseInt(officeType);
        if (isNaN(officeType)) {
            return '请输入数字';
        }
        switch (officeType) {
            case 1:
                return '机关事业单位';
            case 2:
                return '国营';
            case 3:
                return '民营';
            case 4:
                return '三资企业';
            case 5:
                return '其他';
        }
    },
    /*   获取担任职务   */
    getOffPosition: function (position) {
        position = parseInt(position);
        if (isNaN(position)) {
            return '请输入数字';
        }
        switch (position) {
            case 1:
                return '管理、技术、行政岗位';
            case 2:
                return '销售岗位';
            case 3:
                return '其他基层服务岗位';
        }
    },
    /*   获取公司规模   */
    getOfficeSize: function (officeSize) {
        officeSize = parseInt(officeSize);
        if (isNaN(officeSize)) {
            return '请输入数字';
        }
        switch (officeSize) {
            case 1:
                return '20人以下';
            case 2:
                return '20-99人';
            case 3:
                return '100-499人';
            case 4:
                return '500-999人';
            case 5:
                return '1000-9999人';
            case 6:
                return '10000人以上';
        }
    },
    /*  获取借款人学历  */
    getTopEducation: function (topEducation) {
        topEducation = parseInt(topEducation);
        if (isNaN(topEducation)) {
            return '请输入数字';
        }
        switch (topEducation) {
            case 0:
                return '--';
            case 10:
                return '小学';
            case 20:
                return '初中';
            case 30:
                return '中专';
            case 40:
                return '高中';
            case 50:
                return '大专';
            case 60:
                return '本科';
            case 70:
                return '硕士';
            case 80:
                return '博士';
            case 90:
                return '其他';
        }
    },
    /*   通过地区编号获取地区名称   */
    getRegionById: function (province, city, county) {
        province = parseInt(province);

        function getStr(val, option) {
            var len = option.length;
            for (var i = 0; i < len; i++) {
                var o = option[i].split(',');
                if (val == o[0]) {
                    return o[1];
                }
            }
        }

        var region = Global.REGION;
        var provinceName = getStr(province, region.PROVINCE);
        var cityName = getStr(city, region.CITY);
        var countyName = getStr(county, region.COUNTY);

        //直辖市不算做省
        switch (province) {
            case 110000:
            case 120000:
            case 310000:
            case 500000:
                return cityName + countyName;
            default:
                return provinceName + cityName + countyName;
        }
    },
    /*   获取房屋类型  */
    getHousingType: function (housingType) {
        housingType = parseInt(housingType);
        if (isNaN(housingType)) {
            return '请输入数字';
        }
        switch (housingType) {
            case 1:
                return '无房';
            case 2:
                return '有房无贷款';
            case 3:
                return '有房有贷款';
        }
    },
    /*   获取房屋类型  */
    getCarValue: function (carValue) {
        carValue = parseInt(carValue);
        if (isNaN(carValue)) {
            return '请输入数字';
        }
        switch (carValue) {
            case 0:
                return '--';
            case 1:
                return '30万以上且有贷';
            case 2:
                return '30万以下且有贷';
            case 3:
                return '30万以上且无贷款';
            case 4:
                return '30万以下且无贷款';
        }
    },
    /*   获取用户账户余额  TODO 可能被废弃  */
    getAccountInfo: function (userId, target) {
        $.getJSON('/account/query?' + (+new Date()),
            {userId: userId}, function (result) {
                target.setState({
                    cash: (typeof result.cash !== 'number') && 0
                });
            }
        );
    },
    /*    获取用户余额      */
    getUserCash: function (callBack) {
        $.get('/account/queryCash?' + (+new Date())).done(callBack);
    },
    /*   截取url后面的查询字符串   */
    getUrlQueryStr: function () {
        return location.search.replace('?', '/');
    },
    /**
     * 获取关于我们列表项的id
     * @param type 被计算部分
     */
    getAboutDetailId: function () {
        return parseInt(location.search.replace('?', '').split('-')[1]) || 0;
    },
    /**
     * 截取url后面的查询字符串的值
     * @returns {void|XML|string|*}
     */
    getUrlQueryValue: function () {
        return location.search.replace('?', '');
    },
    /*   截取url后面hash   */
    getUrlFromHash: function () {
        return location.hash.replace('#', '/');
    },
    /*   截取hash值   */
    getHashValue: function () {

        return location.hash.replace('#', '');
    },
    /*   刷新验证码   */
    freshImgCode: function (e) {
        var src = e.target.src;
        var index = src.indexOf('?');
        if (index === -1) {
            e.target.src = src + '?' + (+new Date);
        } else {
            e.target.src = src.substr(0, index) + '?' + (+new Date);
        }
    },
    /*   返回156****3250类型格式的字符   */
    getPhoneStr: function (phone) {
        if (phone.length < 11) {
            throw '电话号码长度不够11位';
        }

        return phone.substring(0, 3) + "****" + phone.substring(8, 11);
    },
    /*   根据标类型返回个人或者企业的标详情地址   */
    getInvestUrl: function (loan) {
        if (loan.loanType == 1) {
            /* 个人标  */
            return Global.LINK.PERSON_INVEST_DETAIL + '?' + loan.loanId;
        } else if (loan.loanType == 2) {
            return Global.LINK.ENTERPRISE_INVEST_DETAIL + '?' + loan.loanId;
        }
    },
    /*    获取红包金额      */
    getRedMoneyByWay: function (way, amount) {
        if (parseInt(way) === 1) {
            return amount + '%';
        } else {
            return amount + '元';
        }
    },
    /*    获取红包名称      */
    getRedMoneyNameByWay: function (way) {
        switch (parseInt(way)) {
            case 0:
                return '代金券';
            case 1:
                return '加息券';
            case 2:
                return '体验金';
            case 3:
                return '现金红包';
        }
    },
    /*    获取生效时间,过期时间     */
    getRedMoneyDateByWay: function (way, date) {
        if (parseInt(way) === 3) {
            return '无有效期';
        } else {
            return date;
        }
    },
    /*    获取最小投资额     */
    getRedMoneyRequirement: function (requirement) {
        if (typeof requirement === 'number') {
            return requirement + '元';
        } else {
            return '无限制';
        }
    },
    /*    获取状态     */
    getRedMoneyStatus: function (status) {
        switch (parseInt(status)) {
            case 20:
                return '未使用';
            case 30:
                return '已使用';
            case 40:
                return '已过期';
        }
    },
    /*    获取状态     */
    getRedMoneyAmountByWay: function (redMoneyAmount, redMoneyOpen, redMoneyWay) {

        if (typeof redMoneyAmount === 'number') {
            if (redMoneyOpen === true) {
                switch (parseInt(redMoneyWay)) {
                    case 0:
                    case 2:
                    case 3:
                        return redMoneyAmount + '元红包1个';
                    case 1:
                        return redMoneyAmount + '%红包1个';
                }
            } else {
                return redMoneyAmount + '积分';
            }
        } else {
            return '无';
        }
    },
    /*     根据消息类型返回消息类型的文字    */
    getMessageType: function (type) {
        var obj = {
            '101': '投资冻结',
            '102': '新回款',
            '103': '资金解冻',
            '104': '出借成功',
            '105': '留言回复',
            '199': '其他',
            '201': '成功满额',
            '202': '审核未通过',
            '203': '借款项目未满额',
            '204': '还款提醒',
            '205': '逾期通知',
            '206': '审核通过',
            '207': '债权转出',
            '208': '债权买入',
            '209': '债权卖出',
            '210': '新还款',
            '299': '其他',
            '301': '其他'
        };
        return obj[type] === undefined ? '站内信' : obj[type];
    },
    /*     根据产品id获取期数     */
    getPeriodsByProductId: function (loan) {
        if (loan.productId == 2) {
            return 0;
        } else {
            return loan.repayedTermCount / loan.termCount;
        }
    },
    /*      根据标状态返回借款状态    */
    getBorrowStatusByStatus: function (status) {
        switch (parseInt(status)) {
            case 285:
                return '等待用户确认';
            case 280:
                return '等待开标';
            default:
                return '审核中';
        }
    },
    /*     获取当期已还总额     */
    getRepaidTotal: function (loan) {
        return (loan.repaidAmount + loan.overDueFee + loan.overDueInterest);
    },
    /*     获取应还金额     */
    getRepaymentMoney: function (loan) {
        return (loan.plannedTermAmount + loan.overDueFee + loan.overDueInterest);
    },
    /*    根据红包种类获取年化利率  */
    getRateByWay: function (loan) {
        return (loan.way === 1 ? loan.annualInterestRate + loan.addInterest : loan.annualInterestRate);
    },
    /*    返回待收本息  */
    getCollectInterest: function (loan) {
        return (loan.toBeCollectedRedmoneyInterest + loan.nextPhaseInterest + loan.nextPhasePrincipal)
    },
    /*    根据推送id获取推送方式文字      */
    getPushTextByWap: function (hobby) {

        if (typeof hobby.push_way !== 'string') {
            return;
        }


        var str = '';
        if (hobby.push_way.indexOf('#1#') > -1) {
            str = '站内信 ';
        }
        if (hobby.push_way.indexOf('#2#') > -1) {
            str += '邮件 ';
        }
        if (hobby.push_way.indexOf('#3#') > -1) {
            str += '短信';
        }
        return str;
    },
    /**
     * 格式化日期类型以适应WdatePicker.js插件
     * @param date
     * @returns {string}
     */
    getStringFromDate: function (date) {

        if (typeof date !== 'string') {
            return '';
        }

        return date.split(' ')[0].replace(/-/g, '/');
    }
};