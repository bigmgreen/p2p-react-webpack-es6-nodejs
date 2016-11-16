/**
 * 头部组件
 */
var Header = Global.component.Header;
/**
 * 底部组件
 */
var Footer = Global.component.Footer;
/**
 * 面包屑组件
 */
var Breadcrumb = Global.component.Breadcrumb;
/**
 * 左菜单组件
 */
var AccountLeft = Global.component.AccountLeft;
/**
 * 输入框组件
 */
var Input = Global.component.Input;
/**
 * 标签页组件
 */
var Tab = Global.component.Tab;
/**
 * 单选列表
 */
var Radios = Global.component.Radios;
/**
 * 下拉列表
 */
var Select = Global.component.Select;
/**
 * 上传组件
 */
var FileUploader = Global.component.FileUploader;
/**
 * 区域下拉列表
 */
var RegionSelect = Global.component.RegionSelect;
/**
 * 请求地址
 */
var URL = Global.URLS.ACCOUNT;
/**
 * 链接地址
 */
var LINK = Global.LINK;

/**
 * mixins
 */
var Mixins = {
    /**
     * 数据提交函数
     * @param form 提交的表单
     * @param url 提交地址
     */
    submit: function (form, url) {
        $.post(url, $(form).serialize(), function (result) {
            if (result === true) {
                alert('保存成功');
            } else {
                alert('保存失败');
            }
        });
    }
}

/**
 * 个人信息
 */
var PersonalInfo = React.createClass({
    mixins: [Mixins],
    getInitialState: function () {

        /**
         * 自动生成入学年份的数据
         * @type {string[]}
         */
        var topEduStartYearList = ['请选择'];
        for (var i = new Date().getFullYear(); i >= 1992; i--) {
            topEduStartYearList.push(i + '+' + i + '年');
        }

        return {
            appUser: {
                realName: null,
                idCardNo: null,
                mobile: null
            },
            info: {
                totalCreditLimit: null,
                avaliableCreditLimit: null,
                creditPoint: null,
                gender: null,
                topEduSchool: null,
                telephone: null,
                qq: null,
                homeTownAddr: null,
                residenceAddr: null,
                residencePostCode: null,
                /**
                 * 最高学历
                 */
                topEducation: null,
                /**
                 * 入学年份
                 */
                topEduStartYear: null,
                /**
                 * 婚姻状况
                 */
                hasMarried: null,
                /**
                 * 子女状况
                 */
                hasChild: null,
                /**
                 * 户籍地址 省
                 */
                homeTownProvince: null,
                /**
                 * 户籍地址 市
                 */
                homeTownCity: null,
                /**
                 * 户籍地址 县
                 */
                homeTownCounty: null,
                /**
                 * 现在地址 省
                 */
                residenceProvince: null,
                /**
                 * 现在地址 市
                 */
                residenceCity: null,
                /**
                 * 现在地址 县
                 */
                residenceCounty: null
            },
            topEducationList: [
                '请选择', '80+博士', '70+硕士', '60+本科', '50+大专', '40+高中', '30+中专', '20+初中', '10+小学', '90+其他'
            ],
            topEduStartYearList: topEduStartYearList
        }
    },
    componentWillReceiveProps: function (nextProps) {
        if (nextProps.url === URL.PERSON_INFO.GET_PERSONAL_INFO) {
            if (!(nextProps.info instanceof Object)) {
                delete nextProps.info;
            }
            this.setState(nextProps);
        }
    },
    componentDidMount: function () {
        $('#personalInfoFrom').validate({
            rules: {
                topEduSchool: {
                    required: true,
                    maxlength: 30,
                    isSpecialCode: true
                },
                topEducation: {
                    isSelected: true
                },
                topEduStartYear: {
                    isSelected: true
                },
                hasMarried: {
                    required: true
                },
                hasChild: {
                    required: true
                },
                mobile: {
                    required: true,
                    maxlength: 11,
                    isMobilePhone: true
                },
                telephone: {
                    required: true,
                    maxlength: 20,
                    isTel: true
                },
                qq: {
                    required: true,
                    maxlength: 12,
                    isQQ: true
                },
                homeTownAddr: {
                    required: true,
                },
                residenceAddr: {
                    required: true,
                },
                residencePostCode: {
                    required: true,
                    maxlength: 6,
                    isZipCode: true
                },
                homeTownProvince: {
                    isSelected: true
                },
                homeTownCity: {
                    isSelected: true
                },
                homeTownCounty: {
                    isSelected: true
                },
                residenceProvince: {
                    isSelected: true
                },
                residenceCity: {
                    isSelected: true
                },
                residenceCounty: {
                    isSelected: true
                }
            },
            submitHandler: function (form) {
                this.submit(form, URL.PERSON_INFO.SAVE_PERSONAL_INFO);
                return false;
            }.bind(this)
        });
    },
    render: function () {
        var info = this.state.info;
        var appUser = this.state.appUser;

        return (
            <form id="personalInfoFrom" className="bsdForm">
                <input type="hidden" name="totalCreditLimit" value={info.totalCreditLimit || 0}/>
                <input type="hidden" name="avaliableCreditLimit" value={info.avaliableCreditLimit || 0}/>
                <input type="hidden" name="creditPoint" value={info.creditPoint || 0}/>
                <Input {...{
                    inputName: '姓名：',
                    name: 'realName',
                    value: appUser.realName,
                    maxLength: 14,
                    minLength: 2,
                    readOnly: true
                }}/>
                <Input {...{
                    inputName: '身份证号码：',
                    name: 'cardNo',
                    value: appUser.idCardNo,
                    readOnly: true
                }}/>
                <div className="form-group">
                    <label className="control-label">性别：</label>
                    <div>
                        <input type="radio" id="man" checked={info.gender === true && true} disabled="disabled"/>
                        <label htmlFor="man">男</label>
                        <input type="radio" id="woman" checked={info.gender === false && true} disabled="disabled"/>
                        <label htmlFor="woman">女</label>
                    </div>
                </div>
                <div className="form-group">
                    <label className="text-danger">*性别从身份证信息中获取，不可修改</label>
                </div>
                <div className="form-group">
                    <label htmlFor="topEducation" className="control-label">最高学历：</label>
                    <div>
                        <Select
                            selected={info.topEducation}
                            name="topEducation"
                            className="form-control"
                            title="请选择最高学历"
                            list={this.state.topEducationList}
                            mark="+"
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="topEduStartYear" className="control-label">入学年份：</label>
                    <div>
                        <Select
                            selected={info.topEduStartYear}
                            name="topEduStartYear"
                            className="form-control"
                            title="请选择入学年份"
                            list={this.state.topEduStartYearList}
                            mark="+"
                        />
                    </div>
                </div>
                <Input {...{
                    inputName: '毕业院校：',
                    id: 'topEduSchool',
                    name: 'topEduSchool',
                    value: info.topEduSchool,
                    maxLength: 30
                }}/>
                <div className="form-group">
                    <label className="control-label">婚姻状况：</label>
                    <div>
                        <Radios
                            list={[
                                {
                                    value: false,
                                    title: '请选择婚姻状况',
                                    text: '未婚'
                                },
                                {
                                    value: true,
                                    title: '请选择婚姻状况',
                                    text: '已婚'
                                }
                            ]}
                            name='hasMarried'
                            selectedValue={info.hasMarried}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label className="control-label">子女状况：</label>
                    <div>
                        <Radios
                            list={[
                                {
                                    value: false,
                                    title: '请选择子女状况',
                                    text: '无子女'
                                },
                                {
                                    value: true,
                                    title: '请选择子女状况',
                                    text: '有子女'
                                }
                            ]}
                            name='hasChild'
                            selectedValue={info.hasChild}
                        />
                    </div>
                </div>
                <Input {...{
                    inputName: '手机：',
                    id: 'mobile',
                    value: appUser.mobile,
                    name: 'mobile',
                    maxLength: 11
                }}/>
                <Input {...{
                    inputName: '固定电话：',
                    id: 'telephone',
                    name: 'telephone',
                    value: info.telephone,
                    maxLength: 20
                }}/>
                <Input {...{
                    inputName: 'QQ：',
                    id: 'qq',
                    name: 'qq',
                    value: info.qq,
                    maxLength: 12
                }}/>
                <div className="form-group">
                    <label htmlFor="homeTownProvince" className="control-label">户籍地址：</label>
                    <RegionSelect
                        province={info.homeTownProvince}
                        city={info.homeTownCity}
                        county={info.homeTownCounty}
                        provinceName="homeTownProvince"
                        cityName="homeTownCity"
                        countyName="homeTownCounty"
                    />
                </div>
                <Input {...{
                    id: 'homeTownAddr',
                    name: 'homeTownAddr',
                    value: info.homeTownAddr,
                    maxLength: 64
                }}/>

                <div className="form-group">
                    <label htmlFor="residenceProvince" className="control-label">现在地址：</label>
                    <RegionSelect
                        province={info.residenceProvince}
                        city={info.residenceCity}
                        county={info.residenceCounty}
                        provinceName="residenceProvince"
                        cityName="residenceCity"
                        countyName="residenceCounty"
                    />
                </div>
                <Input {...{
                    inputName: '',
                    id: 'residenceAddr',
                    name: 'residenceAddr',
                    value: info.residenceAddr,
                    maxLength: 64
                }}/>
                <Input {...{
                    inputName: '邮政编码：',
                    id: 'residencePostCode',
                    name: 'residencePostCode',
                    value: info.residencePostCode,
                    maxLength: 6
                }}/>
                <div className="form-group text-center">
                    <button type="submit" className="btn btn-success">保存</button>
                </div>
            </form>
        );
    }
});

/**
 * 工作信息
 */
var WorkInfo = React.createClass({
    mixins: [Mixins],
    getInitialState: function () {
        return {
            appUser: {
                userId: null
            },
            info: {
                officeName: null,
                officeProvice: null,
                officeCity: null,
                officeCounty: null,
                officeAddress: null,
                officePhone: null,
                officeJoinDate: null,
                department: null,
                position: null,
                officeType: null,
            },
            position: ['请选择', '1+管理、技术、行政岗位', '2+销售岗位', '3+其他基层服务岗位'],
            officeSize: ['请选择', '1+20人以下', '2+20-99人', '3+100-499人', '4+500-999人', '5+1000-9999人', '6+10000人']
        }
    },
    componentWillReceiveProps: function (nextProps) {
        if (nextProps.url === URL.PERSON_INFO.GET_WORD_INFO) {
            if (!(nextProps.info instanceof Object)) {
                delete nextProps.info;
            }
            this.setState(nextProps);
        }
    },
    componentDidMount: function () {
        $('#workInfoForm').validate({
            rules: {
                officeName: {
                    required: true,
                    maxlength: 60,
                    isSpecialCode: true
                },
                officeProvice: {
                    isSelected: true,
                },
                officeCity: {
                    isSelected: true,
                },
                officeCounty: {
                    isSelected: true,
                },
                officeAddress: {
                    required: true,
                    maxlength: 60,
                    isSpecialCode: true
                },
                officePhone: {
                    required: true,
                    maxlength: 12,
                    isMobilePhone: true
                },
                officeJoinDate: {
                    required: true,
                    date: true
                },
                department: {
                    required: true,
                    isSpecialCode: true
                },
                position: {
                    isSelected: true
                },
                officeType: {
                    required: true
                },
                officeSize: {
                    isSelected: true
                }
            },
            submitHandler: function (form) {
                this.submit(form, URL.PERSON_INFO.SAVE_WORD_INFO);
                return false;
            }.bind(this)
        });
    },
    render: function () {
        var info = this.state.info;
        var appUser = this.state.appUser;

        return (
            <form id="workInfoForm">
                <input type="hidden" name="userId" value={appUser.userId}/>
                <Input {...{
                    inputName: '单位全称：',
                    name: 'officeName',
                    value: info.officeName,
                    maxLength: 60
                }}/>

                <div className="form-group">
                    <label className="control-label">单位地址：</label>
                    <RegionSelect
                        province={info.officeProvice}
                        city={info.officeCity}
                        county={info.officeCounty}
                        provinceName="officeProvice"
                        cityName="officeCity"
                        countyName="officeCounty"
                    />
                </div>

                <Input {...{
                    name: 'officeAddress',
                    value: info.officeAddress,
                    maxLength: 60
                }}/>

                <Input {...{
                    inputName: '单位电话：',
                    name: 'officePhone',
                    value: info.officePhone,
                    maxLength: 12
                }}/>

                <div className="form-group">
                    <label className="control-label">进入单位时间：</label>
                    <div
                        dangerouslySetInnerHTML={{
                            __html: '<input type="text" class="form-control" value="' + Utils.getStringFromDate(info.officeJoinDate) + '" name="officeJoinDate" onfocus=WdatePicker({lang:"zh-cn"}); />'
                        }}
                    ></div>
                </div>

                <Input {...{
                    inputName: '所在部门：',
                    name: 'department',
                    value: info.department,
                    maxLength: 60
                }}/>

                <div className="form-group">
                    <label htmlFor="txtPositionValue" className="control-label">担任职位：</label>
                    <div>
                        <Select
                            selected={info.position}
                            name="position"
                            className="form-control"
                            title="请选择担任职位"
                            list={this.state.position}
                            mark="+"
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label className="control-label">单位性质：</label>
                    <div>
                        <Radios
                            list={[
                                {
                                    value: 1,
                                    title: '请选择单位性质',
                                    text: '机关及事业单位'
                                },
                                {
                                    value: 2,
                                    title: '请选择单位性质',
                                    text: '国营'
                                },
                                {
                                    value: 3,
                                    title: '请选择单位性质',
                                    text: '民营'
                                },
                                {
                                    value: 4,
                                    title: '请选择单位性质',
                                    text: '三资企业'
                                },
                                {
                                    value: 5,
                                    title: '请选择单位性质',
                                    text: '其他'
                                }
                            ]}
                            name='officeType'
                            selectedValue={info.officeType}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label className="control-label">公司规模：</label>
                    <div>
                        <Select
                            selected={info.officeSize}
                            name="officeSize"
                            className="form-control"
                            title="请选择公司规模"
                            list={this.state.officeSize}
                            mark="+"
                        />
                    </div>
                </div>
                <div className="form-group text-center">
                    <button type="submit" className="btn btn-success">保存</button>
                </div>
            </form>
        );
    }
});

/**
 * 财务信息
 */
var FinancialInfo = React.createClass({
    mixins: [Mixins],
    getInitialState: function () {
        return {
            appUser: {
                userId: null
            },
            info: {
                monthlyIncome: null,
                payDay: null,
                payType: null,
                housingType: null,
                housingArea: null,
                monthlyHouseLoan: null,
                hasCar: null,
                carBrand: null,
                carValue: null,
                monthlyCarLoan: null,
                hasBond: null,
                bondValue: null
            },
            payType: ['请选择', '1+打卡', '2+现金'],
            housingType: ['请选择', '1+无房', '2+有房无贷款', '3+有房有贷款'],
            hasCar: ['请选择', 'true+有', 'false+无'],
            carValue: ['请选择', '1+30万以上且有贷', '2+30万以下且有贷', '3+30万以上且无贷款', '4+30万以下且无贷款'],
            hasBond: ['请选择', 'true+有', 'false+无'],
            housing: null,
            car: null,
            carVal: null,
            bond: null,
        }
    },
    componentWillReceiveProps: function (nextProps) {
        if (nextProps.url === URL.PERSON_INFO.GET_FINANCIAL_INFO) {
            if (!(nextProps.info instanceof Object)) {
                delete nextProps.info;
            } else {
                nextProps.housing = nextProps.info.housingType;
                nextProps.car = nextProps.info.hasCar;
                nextProps.carVal = nextProps.info.carValue;
                nextProps.bond = nextProps.info.hasBond;
            }
            this.setState(nextProps);
        }
    },
    componentDidMount: function () {
        $('#financialInfoInfoFrom').validate({
            submitHandler: function (form) {
                this.submit(form, URL.PERSON_INFO.SAVE_FINANCIAL_INFO);
                return false;
            }.bind(this)
        });
    },
    handleChange: function (key, e) {
        var temp = {};
        temp[key] = e.target.value;
        this.setState(temp);
    },
    _getCarInfo: function (info) {
        var carInfo = [];
        if (String(this.state.car) === String(true)) {
            carInfo.push(
                <Input {...{
                    inputName: '汽车品牌：',
                    name: 'carBrand',
                    value: info.carBrand,
                    maxLength: 15,
                    className: 'required',
                    onChange: this.getChildValue.bind(this)
                }}/>
            );
            carInfo.push(
                <div className="form-group">
                    <label htmlFor="carValue" className="control-label">汽车价值：</label>
                    <div>
                        <Select
                            selected={info.carValue}
                            name="carValue"
                            className="form-control isSelected"
                            title="请选择汽车价值"
                            list={this.state.carValue}
                            mark="+"
                            callBack={this.handleChange.bind(this, 'carVal')}
                        />
                    </div>
                </div>
            );
            if (parseInt(this.state.carVal) < 3) {
                carInfo.push(
                    <Input {...{
                        inputName: '月供(元)：',
                        name: 'monthlyCarLoan',
                        value: info.monthlyCarLoan,
                        maxLength: 10,
                        className: 'required nonnegativeInteger',
                        onChange: this.getChildValue.bind(this)
                    }}/>
                );
            }
        }
        return carInfo;
    },
    _getBondInfo: function (info) {
        if (String(this.state.bond) === String(true)) {
            return (
                <Input {...{
                    inputName: '证券价值(元)：',
                    name: 'bondValue',
                    value: info.bondValue,
                    maxLength: 10,
                    className: 'required',
                    onChange: this.getChildValue.bind(this)
                }}/>
            );
        }
    },
    _getHouseInfo: function (info) {
        var houseInfo = [];
        if (parseInt(this.state.housing) === 2 || parseInt(this.state.housing) === 3) {
            houseInfo.push(
                <Input {...{
                    inputName: '房产面积(平方米)：',
                    name: 'housingArea',
                    value: info.housingArea,
                    maxLength: 8,
                    className: 'required',
                    onChange: this.getChildValue.bind(this)
                }}/>
            );

            if (parseInt(this.state.housing) === 3) {
                houseInfo.push(
                    <Input {...{
                        inputName: '月供(元)：',
                        name: 'monthlyHouseLoan',
                        value: info.monthlyHouseLoan,
                        maxLength: 10,
                        className: 'required',
                        onChange: this.getChildValue.bind(this)
                    }}/>
                );
            }
        }
        return houseInfo;
    },
    /**
     * 取得子元素的值
     * @param state 子元素传回来的对象
     */
    getChildValue: function (state) {
        this.setState(state);
    },
    render: function () {
        var info = this.state.info;
        var appUser = this.state.appUser;

        return (
            <form id="financialInfoInfoFrom">
                <input type="hidden" name="userId" value={appUser.userId}/>
                <Input {...{
                    inputName: '个人月收入(元)：',
                    name: 'monthlyIncome',
                    value: info.monthlyIncome,
                    maxLength: 10,
                    className: 'required',
                    onChange: this.getChildValue.bind(this)
                }}/>
                <Input {...{
                    inputName: '发薪日(日)：',
                    name: 'payDay',
                    value: info.payDay,
                    maxLength: 31,
                    minLength: 1,
                    className: 'required',
                    onChange: this.getChildValue.bind(this)
                }}/>

                <div className="form-group">
                    <label htmlFor="payType" className="control-label">发薪方式：</label>
                    <div>
                        <Select
                            selected={info.payType}
                            name="payType"
                            className="form-control isSelected"
                            title="请选择发薪方式"
                            list={this.state.payType}
                            mark="+"
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="housingType" className="control-label">住房种类：</label>
                    <div>
                        <Select
                            selected={info.housingType}
                            name="housingType"
                            className="form-control isSelected"
                            title="请选择住房种类"
                            list={this.state.housingType}
                            mark="+"
                            callBack={this.handleChange.bind(this, 'housing')}
                        />
                    </div>
                </div>
                {this._getHouseInfo(info)}

                <div className="form-group">
                    <label htmlFor="hasCar" className="control-label">名下有无汽车：</label>
                    <div>
                        <Select
                            selected={info.hasCar}
                            name="hasCar"
                            className="form-control isSelected"
                            title="请选择有无汽车"
                            list={this.state.hasCar}
                            mark="+"
                            callBack={this.handleChange.bind(this, 'car')}
                        />
                    </div>
                </div>
                {this._getCarInfo(info)}

                <div className="form-group">
                    <label htmlFor="hasBond" className="control-label">名下有无证券：</label>
                    <div>
                        <Select
                            selected={info.hasBond}
                            name="hasBond"
                            className="form-control isSelected"
                            title="请选择有无证券"
                            list={this.state.hasBond}
                            mark="+"
                            callBack={this.handleChange.bind(this, 'bond')}
                        />
                    </div>
                </div>
                {this._getBondInfo(info)}

                <div className="form-group text-center">
                    <button type="submit" className="btn btn-success">保存</button>
                </div>
            </form>
        );
    }
});

/**
 * 联系人信息
 */
var ContactInfo = React.createClass({
    mixins: [Mixins],
    getInitialState: function () {
        var contact = {
            id: null,
            borrowerId: null,
            name: null,
            relationship: null,
            mobile: null,
            telephone: null,
            contactProvice: null,
            contactCity: null,
            contactCountry: null,
            contactAddress: null,
            isDisplay: true
        };
        return {
            appUser: {
                userId: null
            },
            info: {
                contact1: contact,
                contact2: contact,
                contact3: contact,
                contact4: contact,
                contact5: contact,
                contact6: contact
            }
        }
    },
    componentWillReceiveProps: function (nextProps) {
        if (nextProps.url === URL.PERSON_INFO.GET_CONTACT_INFO) {
            if (!(nextProps.info instanceof Object)) {
                delete nextProps.info;
            } else {
                if (!(nextProps.info.contact1 instanceof Object)) {
                    nextProps.info.contact1 = this.state.info.contact1;
                }
                if (!(nextProps.info.contact2 instanceof Object)) {
                    nextProps.info.contact2 = this.state.info.contact2;
                }
                if (!(nextProps.info.contact3 instanceof Object)) {
                    nextProps.info.contact3 = this.state.info.contact3;
                }
                if (!(nextProps.info.contact4 instanceof Object)) {
                    nextProps.info.contact4 = this.state.info.contact4;
                }
                if (!(nextProps.info.contact5 instanceof Object)) {
                    nextProps.info.contact5 = this.state.info.contact5;
                }
                if (!(nextProps.info.contact6 instanceof Object)) {
                    nextProps.info.contact6 = this.state.info.contact6;
                }
            }
            this.setState(nextProps);
        }
    },
    componentDidMount: function () {
        $('#contactFrom').validate({
            rules: {
                'contacts[0].name': {
                    required: true,
                    maxlength: 20,
                    isSpecialCode: true
                },
                'contacts[0].relationship': {
                    required: true
                },
                'contacts[0].mobile': {
                    required: true,
                    maxlength: 11,
                    isMobilePhone: true
                },
                'contacts[0].telephone': {
                    required: true,
                    maxlength: 13,
                    isTel: true
                },
                'contacts[0].contactProvice': {
                    isSelected: true
                },
                'contacts[0].contactCity': {
                    isSelected: true
                },
                'contacts[0].contactCountry': {
                    isSelected: true
                },
                'contacts[0].contactAddress': {
                    required: true,
                    maxlength: 64,
                },
                'contacts[1].name': {
                    required: true,
                    maxlength: 20,
                    isSpecialCode: true
                },
                'contacts[1].relationship': {
                    required: true
                },
                'contacts[1].mobile': {
                    required: true,
                    maxlength: 11,
                    isMobilePhone: true
                },
                'contacts[1].telephone': {
                    required: true,
                    maxlength: 13,
                    isTel: true
                },
                'contacts[1].contactProvice': {
                    isSelected: true
                },
                'contacts[1].contactCity': {
                    isSelected: true
                },
                'contacts[1].contactCountry': {
                    isSelected: true
                },
                'contacts[1].contactAddress': {
                    required: true,
                    maxlength: 64,
                },
                'contacts[2].name': {
                    required: true,
                    maxlength: 20,
                    isSpecialCode: true
                },
                'contacts[2].mobile': {
                    required: true,
                    maxlength: 11,
                    isMobilePhone: true
                },
                'contacts[2].telephone': {
                    required: true,
                    maxlength: 13,
                    isTel: true
                },
                'contacts[3].name': {
                    required: true,
                    maxlength: 20,
                    isSpecialCode: true
                },
                'contacts[3].mobile': {
                    required: true,
                    maxlength: 11,
                    isMobilePhone: true
                },
                'contacts[3].telephone': {
                    required: true,
                    maxlength: 13,
                    isTel: true
                },
                'contacts[4].name': {
                    required: true,
                    maxlength: 20,
                    isSpecialCode: true
                },
                'contacts[4].relationship': {
                    required: true
                },
                'contacts[4].mobile': {
                    required: true,
                    maxlength: 11,
                    isMobilePhone: true
                },
                'contacts[4].telephone': {
                    required: true,
                    maxlength: 13,
                    isTel: true
                },
                'contacts[4].contactProvice': {
                    isSelected: true
                },
                'contacts[4].contactCity': {
                    isSelected: true
                },
                'contacts[4].contactCountry': {
                    isSelected: true
                },
                'contacts[4].contactAddress': {
                    required: true,
                    maxlength: 64,
                },
                'contacts[5].name': {
                    required: true,
                    maxlength: 20,
                    isSpecialCode: true
                },
                'contacts[5].relationship': {
                    required: true
                },
                'contacts[5].mobile': {
                    required: true,
                    maxlength: 11,
                    isMobilePhone: true
                },
                'contacts[5].telephone': {
                    required: true,
                    maxlength: 13,
                    isTel: true
                },
                'contacts[5].contactProvice': {
                    isSelected: true
                },
                'contacts[5].contactCity': {
                    isSelected: true
                },
                'contacts[5].contactCountry': {
                    isSelected: true
                },
                'contacts[5].contactAddress': {
                    required: true,
                    maxlength: 64,
                }
            },
            submitHandler: function (form) {
                this.submit(form, URL.PERSON_INFO.SAVE_CONTACT_INFO);
                return false;
            }.bind(this)
        });
    },
    render: function () {
        var contact1 = this.state.info.contact1;
        var contact2 = this.state.info.contact2;
        var contact3 = this.state.info.contact3;
        var contact4 = this.state.info.contact4;
        var contact5 = this.state.info.contact5;
        var contact6 = this.state.info.contact6;
        return (
            <form id="contactFrom">
                <section>
                    <h4 className="text-center">--------------------家庭联系人--------------------</h4>
                    <input type="hidden" name="contacts[0].id" value={contact4.id}/>
                    <input type="hidden" name="contacts[0].borrowerId" value={this.state.appUser.userId}/>
                    <input type="hidden" name="contacts[0].isDisplay" value="1"/>
                    <Input {...{
                        inputName: '姓名：',
                        name: 'contacts[0].name',
                        value: contact4.name,
                        maxLength: 20
                    }}/>
                    <div className="form-group">
                        <label className="control-label">关系：</label>
                        <div>
                            <Radios
                                list={[
                                    {
                                        value: 100,
                                        title: '请选择家庭关系',
                                        text: '父母'
                                    },
                                    {
                                        value: 200,
                                        title: '请选择家庭关系',
                                        text: '配偶'
                                    },
                                    {
                                        value: 300,
                                        title: '请选择家庭关系',
                                        text: '子女'
                                    }
                                ]}
                                name='contacts[0].relationship'
                                selectedValue={contact4.relationship}
                            />
                        </div>
                    </div>
                    <Input {...{
                        inputName: '手机：',
                        name: 'contacts[0].mobile',
                        value: contact4.mobile,
                        maxLength: 11
                    }}/>
                    <Input {...{
                        inputName: '固定电话：',
                        name: 'contacts[0].telephone',
                        value: contact4.telephone,
                        maxLength: 13
                    }}/>
                    <div className="form-group">
                        <label htmlFor="contacts[0].contactProvice" className="control-label">现在地址：</label>
                        <RegionSelect
                            province={contact4.contactProvice}
                            city={contact4.contactCity}
                            county={contact4.contactCountry}
                            provinceName="contacts[0].contactProvice"
                            cityName="contacts[0].contactCity"
                            countyName="contacts[0].contactCountry"
                        />
                    </div>
                    <Input {...{
                        name: 'contacts[0].contactAddress',
                        value: contact4.contactAddress,
                        maxLength: 64
                    }}/>

                    <input type="hidden" name="contacts[1].id" value={contact1.id}/>
                    <input type="hidden" name="contacts[1].borrowerId" value={this.state.appUser.userId}/>
                    <input type="hidden" name="contacts[1].isDisplay" value="1"/>
                    <Input {...{
                        inputName: '姓名：',
                        name: 'contacts[1].name',
                        value: contact1.name,
                        maxLength: 20
                    }}/>
                    <div className="form-group">
                        <label className="control-label">关系：</label>
                        <div>
                            <Radios
                                list={[
                                    {
                                        value: 100,
                                        title: '请选择家庭关系',
                                        text: '父母'
                                    },
                                    {
                                        value: 200,
                                        title: '请选择家庭关系',
                                        text: '配偶'
                                    },
                                    {
                                        value: 300,
                                        title: '请选择家庭关系',
                                        text: '子女'
                                    }
                                ]}
                                name='contacts[1].relationship'
                                selectedValue={contact1.relationship}
                            />
                        </div>
                    </div>
                    <Input {...{
                        inputName: '手机：',
                        name: 'contacts[1].mobile',
                        value: contact1.mobile,
                        maxLength: 11
                    }}/>
                    <Input {...{
                        inputName: '固定电话：',
                        name: 'contacts[1].telephone',
                        value: contact1.telephone,
                        maxLength: 13
                    }}/>
                    <div className="form-group">
                        <label htmlFor="contacts[1].contactProvice" className="control-label">现在地址：</label>
                        <RegionSelect
                            province={contact1.contactProvice}
                            city={contact1.contactCity}
                            county={contact1.contactCountry}
                            provinceName="contacts[1].contactProvice"
                            cityName="contacts[1].contactCity"
                            countyName="contacts[1].contactCountry"
                        />
                    </div>
                    <Input {...{
                        name: 'contacts[1].contactAddress',
                        value: contact1.contactAddress,
                        maxLength: 64
                    }}/>
                </section>

                <section>
                    <h4 className="text-center">--------------------工作联系人--------------------</h4>
                    <input type="hidden" name="contacts[2].id" value={contact5.id}/>
                    <input type="hidden" name="contacts[2].borrowerId" value={this.state.appUser.userId}/>
                    <input type="hidden" name="contacts[2].isDisplay" value="1"/>
                    <Input {...{
                        inputName: '姓名：',
                        name: 'contacts[2].name',
                        value: contact5.name,
                        maxLength: 20
                    }}/>
                    <div className="form-group">
                        <label className="control-label">关系：</label>
                        <div>
                            <input type="radio" name="contacts[2].relationship" value="700" checked="checked"/>
                            <label>同事</label>
                        </div>
                    </div>
                    <Input {...{
                        inputName: '手机：',
                        name: 'contacts[2].mobile',
                        value: contact5.mobile,
                        maxLength: 11
                    }}/>
                    <Input {...{
                        inputName: '固定电话：',
                        name: 'contacts[2].telephone',
                        value: contact5.telephone,
                        maxLength: 11
                    }}/>

                    <input type="hidden" name="contacts[3].id" value={contact2.id}/>
                    <input type="hidden" name="contacts[3].borrowerId" value={this.state.appUser.userId}/>
                    <input type="hidden" name="contacts[3].isDisplay" value="1"/>
                    <Input {...{
                        inputName: '姓名：',
                        name: 'contacts[3].name',
                        value: contact2.name,
                        maxLength: 20
                    }}/>
                    <div className="form-group">
                        <label className="control-label">关系：</label>
                        <div>
                            <input type="radio" name="contacts[3].relationship" value="700" checked="checked"/>
                            <label>同事</label>
                        </div>
                    </div>
                    <Input {...{
                        inputName: '手机：',
                        name: 'contacts[3].mobile',
                        value: contact2.mobile,
                        maxLength: 11
                    }}/>
                    <Input {...{
                        inputName: '固定电话：',
                        name: 'contacts[3].telephone',
                        value: contact2.telephone,
                        maxLength: 11
                    }}/>
                </section>

                <section>
                    <h4 className="text-center">--------------------紧急联系人--------------------</h4>
                    <input type="hidden" name="contacts[4].id" value={contact6.id}/>
                    <input type="hidden" name="contacts[4].borrowerId" value={this.state.appUser.userId}/>
                    <input type="hidden" name="contacts[4].isDisplay" value="1"/>
                    <Input {...{
                        inputName: '姓名：',
                        name: 'contacts[4].name',
                        value: contact6.name,
                        maxLength: 20
                    }}/>
                    <div className="form-group">
                        <label className="control-label">关系：</label>
                        <div>
                            <Radios
                                list={[
                                    {
                                        value: 600,
                                        title: '请选择家庭关系',
                                        text: '亲属'
                                    },
                                    {
                                        value: 500,
                                        title: '请选择家庭关系',
                                        text: '朋友'
                                    },
                                    {
                                        value: 900,
                                        title: '请选择家庭关系',
                                        text: '其他'
                                    }
                                ]}
                                name='contacts[4].relationship'
                                selectedValue={contact6.relationship}
                            />
                        </div>
                    </div>
                    <Input {...{
                        inputName: '手机：',
                        name: 'contacts[4].mobile',
                        value: contact6.mobile,
                        maxLength: 11
                    }}/>
                    <Input {...{
                        inputName: '固定电话：',
                        name: 'contacts[4].telephone',
                        value: contact6.telephone,
                        maxLength: 11
                    }}/>
                    <div className="form-group">
                        <label htmlFor="contacts[4].contactProvice" className="control-label">现在地址：</label>
                        <RegionSelect
                            province={contact6.contactProvice}
                            city={contact6.contactCity}
                            county={contact6.contactCountry}
                            provinceName="contacts[4].contactProvice"
                            cityName="contacts[4].contactCity"
                            countyName="contacts[4].contactCountry"
                        />
                    </div>
                    <Input {...{
                        name: 'contacts[4].contactAddress',
                        value: contact6.contactAddress,
                        maxLength: 11
                    }}/>

                    <input type="hidden" name="contacts[5].id" value={contact3.id}/>
                    <input type="hidden" name="contacts[5].borrowerId" value={this.state.appUser.userId}/>
                    <input type="hidden" name="contacts[5].isDisplay" value="1"/>
                    <Input {...{
                        inputName: '姓名：',
                        name: 'contacts[5].name',
                        value: contact3.name,
                        maxLength: 20
                    }}/>
                    <div className="form-group">
                        <label className="control-label">关系：</label>
                        <div>
                            <Radios
                                list={[
                                    {
                                        value: 600,
                                        title: '请选择家庭关系',
                                        text: '亲属'
                                    },
                                    {
                                        value: 500,
                                        title: '请选择家庭关系',
                                        text: '朋友'
                                    },
                                    {
                                        value: 900,
                                        title: '请选择家庭关系',
                                        text: '其他'
                                    }
                                ]}
                                name='contacts[5].relationship'
                                selectedValue={contact3.relationship}
                            />
                        </div>
                    </div>
                    <Input {...{
                        inputName: '手机：',
                        name: 'contacts[5].mobile',
                        value: contact3.mobile,
                        maxLength: 11
                    }}/>
                    <Input {...{
                        inputName: '固定电话：',
                        name: 'contacts[5].telephone',
                        value: contact3.telephone,
                        maxLength: 11
                    }}/>
                    <div className="form-group">
                        <label htmlFor="contacts[5].contactProvice" className="control-label">现在地址：</label>
                        <RegionSelect
                            province={contact3.contactProvice}
                            city={contact3.contactCity}
                            county={contact3.contactCountry}
                            provinceName="contacts[5].contactProvice"
                            cityName="contacts[5].contactCity"
                            countyName="contacts[5].contactCountry"
                        />
                    </div>
                    <Input {...{
                        name: 'contacts[5].contactAddress',
                        value: contact3.contactAddress,
                        maxLength: 64
                    }}/>
                </section>
                <div className="form-group text-center">
                    <button type="submit" className="btn btn-success">保存</button>
                </div>
            </form>
        );
    }
});

var AccountRight = React.createClass({
    componentWillReceiveProps: function (nextProps) {
        this.setState(nextProps);
    },
    render: function () {
        return (
            <Tab
                className={{
                    container: 'account-right',
                    header: 'tab-header',
                    title: 'tab-button',
                    content: 'tab-content',
                    item: 'tab-item'
                }}
                tabItemIds={[
                    {personalInfo: '个人信息'},
                    {workInfo: '工作信息'},
                    {financialInfo: '财务信息'},
                    {contactInfo: '联系人信息'},
                    {creditMaterial: '上传资料'}
                ]}
                tabItemClick={[
                    this.props.queryData.bind(this, URL.PERSON_INFO.GET_PERSONAL_INFO),
                    this.props.queryData.bind(this, URL.PERSON_INFO.GET_WORD_INFO),
                    this.props.queryData.bind(this, URL.PERSON_INFO.GET_FINANCIAL_INFO),
                    this.props.queryData.bind(this, URL.PERSON_INFO.GET_CONTACT_INFO),
                    this.props.queryData.bind(this, URL.PERSON_INFO.GET_LOAN_CREDIT_MATERIAL)
                ]}
                tabItem={[
                    {personalInfo: <PersonalInfo  {...this.state} />},
                    {workInfo: <WorkInfo  {...this.state} />},
                    {financialInfo: <FinancialInfo  {...this.state} />},
                    {contactInfo: <ContactInfo  {...this.state} />},
                    {creditMaterial: <FileUploader {...this.state} uploadUrl={URL.PERSON_INFO.CREDIT_MATERIAL} />}
                ]}
            />
        );
    }
});

var App = React.createClass({
    queryData: function (url) {

        /**
         * 缓存上一次请求的地址
         */
        if (url) {
            this.url = url;
        }

        $.get(this.url, function (result) {
            this.setState({
                appUser: result.appUser,
                info: result.info,
                url: this.url
            });
        }.bind(this));
    },
    render: function () {
        return (
            <div>
                <Header {...this.state}/>
                <div className="page-container">
                    <Breadcrumb {...{
                        index: '首页',
                        pageName: '基本资料'
                    }}/>
                    <div className="clear-fix">
                        <AccountLeft {...this.state}/>
                        <AccountRight {...this.state} queryData={this.queryData}/>
                    </div>
                </div>
                <Footer {...this.state}/>
            </div>
        );
    }
});

ReactDOM.render(<App />, document.getElementById('app'));
