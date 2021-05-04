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


