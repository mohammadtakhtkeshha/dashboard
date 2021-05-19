import moment from "moment-jalaali";

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

export const toHtml = (message) => {
    message = message.replaceAll("&lt;", "<");
    message = message.replaceAll("&gt;", ">");
    message = message.replaceAll("&amp;lt;", "<");
    message = message.replaceAll("&amp;amp;lt;", "<");
    message = message.replaceAll("&amp;gt;", ">");
    message = message.replaceAll("&amp;amp;gt;", "<");
    message = message.replaceAll("&nbsp;", " ");
    message = message.replaceAll("&amp;nbsp;", " ");
    return message
}

export const formatDayToEnd = (date) => {
   let da= moment(date, 'YYYY/DD/MM').format('YYYY/MM/DD')
    return da
}

export const toShamsiDate = (date) => {
    let shamsi = moment(date, 'YYYY/M/D').format('jYYYY/jM/jD')
    return shamsi //1392/6/31
}

export const toMiladiDate = (date) => {
    let miladi = moment(date, 'jYYYY/jM/jD').format('YYYY/M/D')
    let englishMiladi = toEnglishDigits(miladi)
    return englishMiladi //1989/01/24
}

export const reverseDateString = (string) => {
    const arrayString = string.split("/")
    const date = arrayString.reverse().join("/")
    return date
}

export const removeHourFromMiladiDate = (date) => {
    const currentDate = date.split(' ').shift()
    return currentDate
}

export const convertDashToSlashInDate = (date) => {
    const currentDate = date.split('-')
    const updatedDated = currentDate.join('/')
    return updatedDated
}

export const toEnglishDigits = (string) => {
    const persianNumbers = ["۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹", "۰"]
    const arabicNumbers = ["١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩", "٠"]
    const englishNumbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]
    let str = string !== null ? string.toString() : null
    if (str === null) {
        return null
    } else {
        return str.split('').map(c => englishNumbers[persianNumbers.indexOf(c)] ||
            englishNumbers[arabicNumbers.indexOf(c)] || c).join("")
    }
}

export const reverseDate = (str) => {
    return str.split("/").reverse().join("/");
}

export default {isObjectEmpty, offsetLeft}
