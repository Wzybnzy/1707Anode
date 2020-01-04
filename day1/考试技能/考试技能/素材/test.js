// myBind函数测试用例
var func = function(){
	return this.a + Array.prototype.slice.call(arguments);
}

func.myBind(1,2,3)()
// 输出“undefined2,3"
func.myBind({a:1000}, 1,2,3)(4,5,6)
// 输出"10001,2,3,4,5,6"

/** myReduce函数测试用例 **/
var arr = [1,2,3,4]
var sum = arr.myReduce((prev, next)=>{
	console.log('pre:', prev, 'next:', next)
	return prev+next;
}, 1000)


// 输出
pre: 1000 next: 1
pre: 1001 next: 2
pre: 1003 next: 3
pre: 1006 next: 4

sum = 1010