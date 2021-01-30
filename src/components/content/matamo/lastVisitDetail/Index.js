import {getLastVisit} from "core/services/matamo.service";
import {chunkItem, handleTotalPage} from "structure/layout";

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
