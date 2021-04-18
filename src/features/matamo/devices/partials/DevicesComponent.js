import {getDevices,getModelDevices,getResolution} from "core/services/matamo.service";
import {chunkItem, handleTotalPage} from "infrastructure/layout";

export const handlePaginationMethod = (items,setChunks,setTotalPage) => {
    const chunks = chunkItem(items)
    setChunks(chunks)
    const totalPage = handleTotalPage(items)
    setTotalPage(totalPage)
}

export const getDevicesMethod = (appContext,setDevices,handlePagination) => {
    const params = {
        'module': 'API',
        'method': 'DevicesDetection.getType',
        'idSite': '2',
        'period': 'day',
        'date': 'yesterday',
        'format': 'JSON',
        'token_auth': '653b84ff84cdf3caee8d154809173949',
        'force_api_session': '1',
    }
    appContext.setLoading(true)
    getDevices(appContext.handleError, params).then(response => {
        appContext.setLoading(false)
        setDevices(response.data)
        handlePagination(response.data)
    })

}

export const getModelDevicesMethod = (appContext,setModels,handlePagination) => {
    const params = {
        'module': 'API',
        'method': 'DevicesDetection.getModel',
        'idSite': '1',
        'period': 'year',
        'date': 'today',
        'format': 'JSON',
        'token_auth': '653b84ff84cdf3caee8d154809173949',
        'force_api_session': '1',
    }
    appContext.setLoading(true)
    getModelDevices(appContext.handleError, params).then(response => {
        appContext.setLoading(false)
        handlePagination(response.data)
        setModels(response.data)
    })
}

export const getResolutionMethod = (appContext, setResolutions,handlePagination) => {
    const params = {
        'module': 'API',
        'method': 'Resolution.getResolution',
        'idSite': '1',
        'period': 'year',
        'date': 'today',
        'format': 'JSON',
        'token_auth': '653b84ff84cdf3caee8d154809173949',
        'force_api_session': '1',
    }
    appContext.setLoading(true)
    getResolution(appContext.handleError, params).then(response => {
        appContext.setLoading(false)
        setResolutions(response.data)
        handlePagination(response.data)
    })
}
