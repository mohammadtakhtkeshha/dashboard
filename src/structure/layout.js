export function chunkItem(currentArray) {
    let newList=[];
    const perPage=5;
    for(let index = 0 ;index< currentArray.length ; index += perPage){
        let sliced = currentArray.slice(index,index+perPage);
        newList.push(sliced);
    }
    return newList;
}

export function handleTotalPage(currentArray) {
    return Math.ceil(currentArray.length/5)
}

export default {chunkItem, handleTotalPage};