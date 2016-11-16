/**
 * 下拉组件
 */
var Select = Global.component.Select;
/**
 * 区域数据
 */
var REGION = Global.REGION;

/**
 * 区域组件下拉列表
 *
 * @className: html标签的class属性
 * @selected: [] 需要选中的省市县的编码
 * @provinceName: 省
 * @cityName: 市
 * @countyName: 县
 */
Global.component.RegionSelect = React.createClass({
    getInitialState: function () {
        return {
            className: null,
            province: null,
            city: null,
            county: null,
            provinceName: null,
            cityName: null,
            countyName: null
        }
    },
    componentWillReceiveProps: function (nextProps) {
        this.setState(nextProps);
    },
    /**
     * 区域数据筛选
     * @param filter 需要过滤的值
     * @param data  原数据
     * @param len  需要过滤的值的偏移位数
     * @returns {Array} 过滤后的数据
     */
    filterRegionData: function (filter, data, len) {

        if (typeof filter === 'boolean') {
            if (data[0] !== '请选择') {
                data.unshift('请选择');
            }
            return data;
        }

        len = len || 2;

        var temp = ['请选择']
        var mark = String(filter).slice(0, len);
        var i = 0;
        var length = (data instanceof Array) ? data.length : 0;

        while (i < length) {
            if (String(data[i]).slice(0, len) === mark) {
                temp.push(data[i]);
            }
            i++;
        }
        return temp;
    },
    /**
     * 下拉列表事件处理
     * @param mark 转换后的标示
     * @param nextMark 转换后的标示（需要触发级联效应）
     */
    handleChange: function (mark, nextMark, e) {

        var temp = {};
        temp[mark] = e.target.value;
        if (typeof nextMark === 'string') {
            temp[nextMark] = this.filterRegionData(temp[mark], REGION.CITY);
        }
        this.setState(temp);
    },
    render: function () {
        return (
            <span>
                <Select
                    selected={this.state.province}
                    name={this.state.provinceName}
                    className={"form-control " + this.state.className}
                    list={this.filterRegionData(false, REGION.PROVINCE)}
                    mark=","
                    callBack={this.handleChange.bind(this, 'province', 'city')}
                />
                <Select
                    selected={this.state.city}
                    name={this.state.cityName}
                    className={"form-control " + this.state.className}
                    list={this.filterRegionData(this.state.province, REGION.CITY)}
                    mark=","
                    callBack={this.handleChange.bind(this, 'city', null)}
                />
                <Select
                    selected={this.state.county}
                    name={this.state.countyName}
                    className={"form-control " + this.state.className}
                    list={this.filterRegionData(this.state.city, REGION.COUNTY, 4)}
                    mark=","
                />
            </span>
        );
    }
});