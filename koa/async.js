
const play = (i,callback)=>{
    const data =[
        {
            key:'第一关通关了'
        },
        {
            key:'第二关通关了'
        },
        {
            key:'第三关通关了'
        }
    ];

   return new Promise((resolve,reject)=>{
    setTimeout(()=>{
        // callback(data[i].key);
        resolve(data[i].key);
    },500);
   })

}


//es7 
// await只能配合着async来用，await后边必须跟一个promise
const run = async()=>{
    let res = await play(0);
    console.log(res);
    let key2 = await play(1);
    console.log(key2)
    let key3 = await play(2);
    console.log(key3)
}
run();
// console.log(run());


// es6
// console.log(play(0));
// play(0).then(res =>{
//     console.log(res);
//     return play(1)
// }).then(res =>{
//     console.log(res);
//     return play(2);
// }).then(res => {
//     console.log(res);
// })


//es5 
// play(0,(key1)=>{
//     console.log(key1);
//     play(1,(key2)=>{
//         console.log(key2);
//         play(2,(key3)=>{
//             console.log(key3)
//         })
//     })
// })




