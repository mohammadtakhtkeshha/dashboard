import axios from 'axios';

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


/* description
@param(number) : (method,url,headers,body,handleError)
@return (object) :catch = errorHandler , try = response of request
*/

export const Method = async (option) => {
    try {
        return await axios({
            url:option.url,
            method:option.method,
            headers:option.headers?.headers,
            data:option.body
        });
    }catch (e) {
        option.handleError(e);
        throw e;
    }
}


export default {chunkItem, handleTotalPage,Method};