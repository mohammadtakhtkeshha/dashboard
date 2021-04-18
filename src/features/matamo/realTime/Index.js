import {getLastVisit, getLiveVisits} from "core/services/matamo.service";
import {chunkItem, handleTotalPage} from "infrastructure/layout";

export const visitsDetailsMethod = (appContext,setVisitsDetails) => {
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
        setVisitsDetails(response.data)
    })
}

export const get30MinutesVisitsMethod = (appContext,setLast30Minutes) => {
    appContext.setLoading(true)
    const params = {
        'module': 'API',
        'method': 'Live.getCounters',
        'idSite': '2',
        'lastMinutes': '30',
        'format': 'JSON',
        'token_auth': '653b84ff84cdf3caee8d154809173949',
        'force_api_session': '1',
    }
    getLiveVisits(appContext.handleError,params).then(response => {
        appContext.setLoading(false)
        setLast30Minutes(response.data)
    })
}

export const get24OursVisitsMethod = (appContext,setLast24Ours) => {
    appContext.setLoading(true)
    const params = {
        'module': 'API',
        'method': 'Live.getCounters',
        'idSite': '2',
        'lastMinutes': '1440',
        'format': 'JSON',
        'token_auth': '653b84ff84cdf3caee8d154809173949',
        'force_api_session': '1',
    }
    getLiveVisits(appContext.handleError,params).then(response => {
        appContext.setLoading(false)
        setLast24Ours(response.data)
    })
}


