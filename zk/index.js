var aa = function () {
    console.log(this)// 原来指的是window，改变之后10
    console.log(arguments); //伪数组，有数组的长度，但是没有数组的方法
    return this.a + ',' + Array.prototype.slice.call(arguments);
}


var a = 10;
var obj = {
    a: 20
}

Function.prototype.myBind = function(ctx){
    //1.改变this指向 ，返回值是一个函数
    console.log(arguments);
    console.log(this);
    var that = this;  //保存一份原来的this
    // 把aa的this指向改变成obj
    var outarg = Array.prototype.slice.call(arguments,1); //外边的参数
    console.log(outarg);
    function func(){
        var inarg = Array.prototype.slice.call(arguments);
        console.log(inarg);
        return that.apply(ctx,outarg.concat(inarg))
    }
    return func;
}
// aa.myBind(obj,2,3)(4,5,6);

// connect()()
//  aa.myBind()  == func
// Array.prototype.myBind


var arr = [1,2,3,4,5];
Array.prototype.myReduce = function(callback,initval){
    console.log(callback);
    console.log(initval);
    console.log(this);
    var startval = initval !== undefined ? initval : this[0]; //初始值
    var startInd = initval !== undefined ? 0 :1;
    for(var i = startInd; i < this.length;i++){
        startval =  callback(startval,this[i])
    }
    return startval;

}

console.log(arr.myReduce((prev,cur)=> prev + cur));

// arr.reduce();

