export const isObjectEmpty = (obj) => {
    for (let key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

export const offsetLeft=(el)=> {
    let rect = el?.getBoundingClientRect(),
        scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    return rect?.left + scrollLeft;
}

export const stripHtml=(html) => {
    // Create a new div element
    let temporalDivElement = document.createElement("div");
    // Set the HTML content with the providen
    temporalDivElement.innerHTML = html;
    // Retrieve the text property of the element (cross-browser support)
    return temporalDivElement.textContent || temporalDivElement.innerText || "";
}

export default {isObjectEmpty,offsetLeft}
