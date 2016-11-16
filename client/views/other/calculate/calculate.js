var Breadcrumb = React.createClass({
    render: function () {
        return (
            <section className="page-top">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <ul className="breadcrumb">
                                <li>
                                    <a href="#">首页</a>
                                </li>
                                <li className="active">理财工具</li>
                            </ul>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <h1>投资计算器</h1>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
});
var Main = React.createClass({
    render: function () {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12 center">
                        <form id="form1" name="form1" method="post" className="form-horizontal">
                            <h3>投资收益计算器</h3>
                            <p>
                                <span>(注：实际收款中可能因为月偿还利息为非整数而产生几分钱的误差)</span>
                            </p>
                            <div className="form-group">
                                <label htmlFor="amount" className="col-sm-4 control-label">投入金额(元)</label>
                                <div className="col-sm-5">
                                    <div className="input-group input-group-icon">
                                        <span className="input-group-addon">
                                            <span className="icon">
                                                <i className="fa fa-cny"></i>
                                            </span>
                                        </span>
                                        <input name="amount" type="text" id="amount"
                                               onkeyup="value=value.replace(/[^\u4e00-\u9fa5\w]/g,'')"
                                               onbeforepaste="clipboardData.setData('text',clipboardData.getData('text').replace(/[\d]/g,''))"
                                               className="form-control required calcuInvestAmount"/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="rate" className="col-sm-4 control-label">预期年利率(%)</label>
                                <div className="col-sm-5">
                                    <div className="input-group input-group-icon">
                                        <input name="rate" type="text" id="rate" onkeyup="checkNum(this)"
                                               className="form-control required calcuRate"/>
                                        <span className="input-group-addon">%</span>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="loandeadline" className="col-sm-4 control-label">投资期限(个月)</label>
                                <div className="col-sm-5">
                                    <div className="input-group input-group-icon">
                                        <input name="loandeadline" type="text" id="loandeadline"
                                               onkeyup="value=value.replace(/[^\u4e00-\u9fa5\w]/g,'')"
                                               onbeforepaste="clipboardData.setData('text',clipboardData.getData('text').replace(/[\d]/g,''))"
                                               className="form-control required calcuInvestTerm"/>
                                        <span className="input-group-addon">个月</span>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="theType" className="col-sm-4 control-label">还款方式</label>
                                <div className="col-sm-5">
                                    <select className="form-control" id="theType">
                                        <option value="0">等额本息</option>
                                        <option value="1">按月付息,到期还本</option>
                                        <option value="2">一次性还本付息</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-sm-5 col-sm-offset-4">
                                    <input type="button" name="calculate-button"
                                           className="btn btn-success calcu-button" value="计算"/>
                                </div>
                            </div>
                            <div id="calculate-table">
                                <table className="table">
                                    <tr>
                                        <td>到期收益</td>
                                        <td>本息合计：
                                            <span id="lab-totalmomey"></span>
                                            元
                                        </td>
                                        <td>利息总收益：
                                            <span id="lab-income"></span>
                                            元
                                        </td>
                                        <td className="dn">投入金额：
                                            <span id="lab-amount"></span>
                                            元
                                        </td>
                                        <td className="dn">投资期限：
                                            <span id="lab-loandeadline"></span>
                                            个月
                                        </td>
                                        <td className="dn">年利率：
                                            <span id="lab-rate"></span>
                                            %
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="dn">每月还款额：
                                            <span id="lab-repay"></span>
                                            元
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            <div>
                                <h5 id="the_title">本息收款时间表</h5>
                                <table id="repayplan" className="table">
                                    <tr>
                                        <td align="center" bgcolor="#f6fbfe">期数</td>
                                        <td align="center" bgcolor="#f6fbfe">每月还款本息</td>
                                        <td align="center" bgcolor="#f6fbfe">应还本金</td>
                                        <td align="center" bgcolor="#f6fbfe">应还利息</td>
                                        <td align="center" bgcolor="#f6fbfe">剩余回款本息</td>
                                    </tr>
                                </table>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
});

React.render(
    <div>
        <Breadcrumb />
        <Main />
    </div>,
    document.getElementById('app'));


function cancer() {
    document.getElementById("amount").value = "";
    document.getElementById("loandeadline").value = "";
    document.getElementById("rate").value = "";
}

function invest_calc() {
    var amount = document.getElementById("amount").value;
    var rate = document.getElementById("rate").value;
    var loandeadline = document.getElementById("loandeadline").value;
    if (check_num(amount)) {
        if (check_num(rate)) {
            if (check_num(loandeadline)) {
                var table = document.getElementById("repayplan");
                var arr = table.getElementsByTagName("tr");
                for (var i = arr.length - 1; i > 0; i--) {
                    table.deleteRow(i);
                }
                var Deadline = parseInt(loandeadline);
                var datalist = new Array(Deadline);
                datalist = Calculate(amount, rate, loandeadline);
                document.getElementById("lab-amount").innerHTML = amount;
                document.getElementById("lab-loandeadline").innerHTML = loandeadline;
                document.getElementById("lab-rate").innerHTML = rate;
                document.getElementById("lab-amount").innerHTML = amount;
                for (var i = 0; i < Deadline; i++) {
                    var newTr = repayplan.insertRow(-1);
                    var newTd0 = newTr.insertCell(-1);
                    var newTd1 = newTr.insertCell(-1);
                    var newTd2 = newTr.insertCell(-1);
                    var newTd3 = newTr.insertCell(-1);
                    var newTd4 = newTr.insertCell(-1);
                    newTd0.align = "center";
                    newTd1.align = "center";
                    newTd2.align = "center";
                    newTd3.align = "center";
                    newTd4.align = "center";
                    // 这里修改与页面对应值
                    newTd0.innerHTML = datalist[i][0];
                    newTd1.innerHTML = datalist[i][1] + "元";
                    newTd2.innerHTML = datalist[i][3] + "元";
                    newTd3.innerHTML = datalist[i][2] + "元";
                    newTd4.innerHTML = datalist[i][4] + "元";
                }
            } else {
                document.getElementById("loandeadline").value = "";
                document.getElementById("loandeadline").focus();
            }
        } else {
            document.getElementById("rate").value = "";
            document.getElementById("rate").focus();
        }
    } else {
        document.getElementById("amount").value = "";
        document.getElementById("amount").focus();
    }
}

function Calculate(amount, rate, loandeadline) {
    var Deadline = parseInt(loandeadline);
    var Amount = parseFloat(amount);
    var Rate = parseFloat(rate) / 1200;
    var datalist = new Array(Deadline);
    var i;
    var a; // 偿还本息
    var b; // 偿还利息
    var c; // 偿还本金
    var d = Amount; // 剩余本金
    var TotalRate = (Amount * Deadline * Rate * Math.pow((1 + Rate), Deadline))
        / (Math.pow((1 + Rate), Deadline) - 1) - Amount;
    // 支付总利息
    TotalRate = Math.round(TotalRate * 100) / 100;
    var TotalRepay = TotalRate + Amount;
    TotalRepay = Math.round(TotalRepay * 100) / 100;
    a = TotalRepay / Deadline;
    // 支付总还款额
    a = Math.round(a * 100) / 100;
    for (i = 1; i <= Deadline; i++) {
        b = (Amount * Rate * (Math.pow((1 + Rate), Deadline) - Math.pow((1 + Rate),
                (i - 1))))
            / (Math.pow((1 + Rate), Deadline) - 1);
        b = Math.round(b * 100) / 100;
        c = a - b;
        c = Math.round(c * 100) / 100;
        d = a * (Deadline - i);
        d = Math.round(d * 100) / 100;
        if (i == Deadline) {
            c = c + d;
            b = b - d;
            c = Math.round(c * 100) / 100;
            b = Math.round(b * 100) / 100;
            d = 0;
        }
        ;
        var tempList = new Array([5]);
        tempList[0] = i;// 期数
        tempList[1] = a;// 偿还本息
        tempList[2] = b;// 偿还利息
        tempList[3] = c;// 偿还本金
        tempList[4] = d;// 剩余本金
        datalist[i - 1] = tempList;
    }
    lab_totalmomey = Math.round((Amount + TotalRate) * 100) / 100;
    document.getElementById("lab-income").innerHTML = TotalRate;
    document.getElementById("lab-totalmomey").innerHTML = lab_totalmomey;
    var lab_totalmomey = document.getElementById("lab-totalmomey").value;
    return datalist;
}

function check_num(num) {
    var re = /^[0-9]+(\.\d+)?$/;
    if (!re.test(num)) {
        return false;
    }
    return true;
}

function checkNum(obj) {
    //检查是否是非数字值
    if (isNaN(obj.value)) {
        var s = obj.value.toString();
        obj.value = s.substring(0, s.length - 1);
    }
    if (obj != null) {
        //检查小数点后是否对于两位
        if (obj.value.toString().split(".").length > 1 && obj.value.toString().split(".")[1].length > 2) {
            //alert("小数点多于两位！");
            var s = obj.value.toString();
            obj.value = s.substring(0, s.length - 1)
        }
    }
}

+function ($, app) {
    "use strict";
    app = app || {};
    app.initOptions = function () {//JQuery validation 兼容  Bootstrap输入框图标样式
        app.options = {
            highlight: function (element) {
                $(element).closest('.form-group').addClass('has-error');
            },
            unhighlight: function (element) {
                $(element).closest('.form-group').removeClass('has-error');
            },
            errorElement: 'span',
            errorClass: 'help-block',
            errorPlacement: function (error, element) {
                if (element.parent('.input-group').length) {
                    error.insertAfter(element.parent());
                } else {
                    error.insertAfter(element);
                }
            }
        };
    }
}(window.jQuery, window.app);

$(function () {
    app.initOptions();
    $('#form1').validate(app.options);

    $(".calcu-button")
        .click(
            function () {
                if (!$("#form1").valid()) {
                    return false;
                }

                var type = $("#theType").val();
                if (type == 0) {
                    $("#repayplan").show();
                    $("#the_title").show();
                    invest_calc();
                }

                if (type == 1) {
                    $("#repayplan").show();
                    $("#the_title").show();
                    var amount = $("#amount").val();
                    var loandeadline = $("#loandeadline").val();
                    var rate = $("#rate").val();

                    var sum = amount * rate * loandeadline / 100 / 12;
                    var sumfinal = sum.toFixed(2);

                    $("#lab-totalmomey").text(amount * 1 + sumfinal * 1);
                    //$("#lab-income").text(sumfinal);
                    // 每个月需要还的利息钱
                    var sumfinalEve = (sumfinal / loandeadline).toFixed(2);
                    var sumfinalInterest = (sumfinalEve * 12).toFixed(2);
                    $("#lab-income").text(sumfinal);

                    $("#repayplan").empty();
                    var objtitle = $("<tr style='height: 30px;'><td align='center' bgcolor='#f6fbfe'>期数</td><td align='center' bgcolor='#f6fbfe'>每月还款本息</td> <td align='center' bgcolor='#f6fbfe'>应还本金</td> <td align='center' bgcolor='#f6fbfe'>应还利息</td><td align='center' bgcolor='#f6fbfe'>剩余回款本息</td></tr>");
                    $("#repayplan").append(objtitle);
                    for (var i = 1; i < loandeadline; i++) {
                        var objbody = $(" <tr style='height: 30px;'>"
                            + " <td align='center' >" + i + "</td>"
                            + " <td align='center' >" + sumfinalEve + "元</td>"
                            + " <td align='center' >0元</td>"
                            + " <td align='center' >" + sumfinalEve + "元</td>"
                            + " <td align='center' >" + (amount * 1 + sumfinal * 1 - sumfinalEve * i).toFixed(2) + "元</td></tr>");
                        $("#repayplan").append(objbody);
                    }

                    var remainInterest = (sumfinal - (sumfinalEve * (loandeadline - 1))).toFixed(2);
                    var remainAmountAndInterest = sumfinalEve * 1 + amount * 1;
                    var objbody = $(" <tr style='height: 30px;'>"
                        + " <td align='center' >" + loandeadline + "</td>"
                        + " <td align='center' >" + remainAmountAndInterest + "元</td>"
                        + " <td align='center' >" + amount + "元</td>"
                        + " <td align='center' >" + sumfinalEve + "元</td>"
                        + " <td align='center' >" + 0 + "元</td></tr>");
                    $("#repayplan").append(objbody);
                }

                if (type == 2) {
                    var amount = $("#amount").val();
                    var loandeadline = $("#loandeadline").val();
                    var rate = $("#rate").val();
                    var sum = amount * rate / 100 * (loandeadline / 12);
                    var sumfinal = sum.toFixed(2);
                    $("#lab-totalmomey").text(amount * 1 + sumfinal * 1);
                    $("#lab-income").text(sumfinal);
                    $("#repayplan").hide();
                    $("#the_title").hide();
                }

            });
});
