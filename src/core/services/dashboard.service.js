import {authHeader,xcsrfCtAppJ} from "utils/headers";
import {getTenNumberOfCommentsUrl,getUsersUrl,getTenNumberOfUsersUrl,getTenNumberOfContentsUrl,getContentLisUrl,getCommentChartUrl} from "utils/urls/dashboard.urls";
import {Method} from "infrastructure/layout.js";
import {get} from "libraries/local-storage";

const auth = get(process.env.REACT_APP_TOKEN_KEY)

export function getContentList(handleError) {
    return Method({method:'get',url:getContentLisUrl,header: authHeader(auth),handleError:handleError});
}

export function getTenNumberOfContents(handleError) {
    return Method({method:'get',url:getTenNumberOfContentsUrl, headers:xcsrfCtAppJ,handleError:handleError});
}

export function getTenNumberOfUsers(handleError) {
    return Method({method:'get',url:getTenNumberOfUsersUrl, headers:authHeader(auth),handleError:handleError});

}

export function getUsers(handleError) {
    return Method({method:'get',url:getUsersUrl, headers:xcsrfCtAppJ,handleError:handleError});

}

export function getTenNumberOfComments(handleError) {
    return Method({method:'get',url:getTenNumberOfCommentsUrl, headers:authHeader(auth),handleError:handleError});
}

export function getCommentChart(handleError) {
    return Method({method:'get',url:getCommentChartUrl, headers:xcsrfCtAppJ,handleError:handleError});
}

export default {
    getContentList,
    getTenNumberOfContents,
    getTenNumberOfUsers,
    getUsers,
    getTenNumberOfComments,
    getCommentChart
}
