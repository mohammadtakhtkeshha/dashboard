import moment from "jalali-moment";

export const isObjectEmpty = (obj) => {
    for (let key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

export const offsetLeft = (el) => {
    let rect = el?.getBoundingClientRect(),
        scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    return rect?.left + scrollLeft;
}

export const stripHtml = (html) => {
    // Create a new div element
    let temporalDivElement = document.createElement("div");
    // Set the HTML content with the providen
    temporalDivElement.innerHTML = html;
    // Retrieve the text property of the element (cross-browser support)
    return temporalDivElement.textContent || temporalDivElement.innerText || "";
}

export const toShamsiDate = (date) => {//1989/01/24
    let shamsi = moment(date, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD'); // 1367/11/04
    return shamsi
}

export const toMiladiDate = (date) => { //1989/01/24
    let miladi = moment(date, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD'); // 1367/11/04
    return miladi
}

export const reverseDateString = (string) => {
    const arrayString = string.split("/")
    const date=arrayString.reverse().join("/")
    debugger
    return date
}

export const getJustDate = (date,reverse) => {debugger
    const dateArray = date.split(" ")
    for(let item of dateArray){
        if(item.includes('/')){
            if(reverse){
                const date=reverseDateString(item)
                return date
            }else{
                return item
            }
        }
    }
}



export default {isObjectEmpty, offsetLeft}
