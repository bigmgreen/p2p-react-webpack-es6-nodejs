//定义数组保存特殊字符
var AllNumIsSame = new Array("’", "”", "!", "@", "#", "$", "%", "^", "&", "*", "."," ",",","。","，","/","\\","'","\"","\“",":",";","：","；","‘","<",">","{","}","[","]","《","》","|");
//方法实现
function CheckChar(code) {
	//初始化
	var IsTrueORfalse = false;
	//循环进行判断信息
	for (var i = 0; i < AllNumIsSame.length; i++) {
		//判断如果包含锁定义数组包含的字符特提示为true
		if (code.indexOf(AllNumIsSame[i]) != -1) {
			IsTrueORfalse = true;
			break;
		}
	}
	//如果为true特提示为true否则为false
	if (IsTrueORfalse == true) {
		return false;
	} else {
		return true;
	}
}