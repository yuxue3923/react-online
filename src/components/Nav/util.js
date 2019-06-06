function generateHolderArray(num){
    let arr = [];
    for(let i = 0;i< num;i++) arr.push(i);
    return arr
}
function mergeObjectArr(source,added,attr){
    if(added) return source.reduce((acc,curr,i)=>acc.concat([Object.assign({},curr,{[attr]:added[i]})]),[]);
    return source;
}
export {generateHolderArray,mergeObjectArr}