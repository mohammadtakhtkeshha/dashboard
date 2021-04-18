import {Method} from "infrastructure/layout";


export const baseUrlMatamo = 'https://foroshgahsaz.ir/matomo/index.php'

export const getSiteSearchKeywords = (handleError,params) => {
    return Method({method:'GET',url:baseUrlMatamo,handleError:handleError,params:params});
}

export const getLiveVisits = (handleError,params) => {
    return Method({method:'get',url:baseUrlMatamo,handleError:handleError,params:params});
}

export const getDevices = (handleError,params) => {
    return Method({method:'GET',url:baseUrlMatamo,params:params,handleError:handleError});
    // return Method({method:'GET',url:'https://foroshgahsaz.ir/matomo/index.php?module=API&method=DevicesDetection.getType&idSite=2&period=day&date=yesterday&format=JSON&token_auth=653b84ff84cdf3caee8d154809173949&force_api_session=1',handleError:handleError});
}

export const getModelDevices = (handleError,params) => {
    return Method({method:'GET',url:baseUrlMatamo,params:params,handleError:handleError});
}

export const getResolution = (handleError,params) => {
    return Method({method:'GET',url:baseUrlMatamo,params:params,handleError:handleError});
}

export const getLastVisit = (handleError,params) => {
    return Method({method:'get',url:baseUrlMatamo,handleError:handleError,params:params});
}

export const getVisitsSummary = (handleError) => {
    return Method({method:'get',url:baseUrlMatamo,handleError:handleError});
}

export const mostVisited = (handleError,params) => {
    return Method({method:'get',url:baseUrlMatamo,handleError:handleError,params:params});
}

export const getLastSeen = (handleError,params) => {
    return Method({method:'get',url:baseUrlMatamo,handleError:handleError,params:params});
}


