import {getLastVisit} from "core/services/matamo.service";
import {chunkItem, handleTotalPage} from "infrastructure/layout";
import moment from "jalali-moment";


export const handlePaginationMethod = (items, setChunks, setTotalPage,setMostSeen) => {
    setMostSeen(items)
    const chunks = chunkItem(items)
    setChunks(chunks)
    const totalPage = handleTotalPage(items)
    setTotalPage(totalPage)
}

export const getMostSeenContentMethod = (appContext,handlePagination) => {
    appContext.setLoading(true)
    const params = {
        'module': 'API',
        'method': 'Live.getLastVisitsDetails',
        'idSite': '2',
        'period': 'day',
        'date': '2021-01-22',
        'format': 'JSON',
        'token_auth': '653b84ff84cdf3caee8d154809173949',
        'force_api_session': '1',
    }
    getLastVisit(appContext.handleError,params).then(response => {
        appContext.setLoading(false)
        handlePagination(response.data)
    })
}

export const getYearMonthDayWeek = (date) => {//جمعه 22 ژانویهٔ 2021
    const dateArray = date.split(' ');
    return {year:dateArray[0],month:dateArray[1],date:dateArray[2],day:dateArray[3]}
}

export const getFormatedDate = (date) => {//{year:2021,month:ژانویهٔ,date:22,day:جمعه}
    const dateObject=getYearMonthDayWeek(date)
    const formatedDate = `${dateObject.year}/${dateObject.month}/${dateObject.date}`
    return {formated:formatedDate,day:dateObject.day}
}

export const getShamsiDate = (currentDate) => {
    // const dateAndDay = getFormatedDate(date)
    // let shamsiDate= moment(dateAndDay.formated, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD'); // 1367/11/04
    // let day= dateAndDay.day
    // const currentTimDe = moment.from('04/1367/11', 'fa', 'DD/YYYY/MM');
    // const currentTimDe.format()
    // return `${shamsiDate} ${day}`
}

// export const getMiladiDate = (date) => { //1989/01/24
//     let miladi=moment(date, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD'); // 1367/11/04
//     return miladi
// }
