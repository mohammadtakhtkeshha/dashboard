import {Method} from "infrastructure/layout";
import {getSettingsUrl,addSettingsUrl} from "utils/urls/settings.urls"
import {authHeader,cjcsrfauthHeader} from "utils/headers"

export const getSettings = (handleError) => {
    return Method({method:'get',url:getSettingsUrl,headers: authHeader(),handleError:handleError});

}

export const addSettings = (body,handleError) => {
    return Method({method:'post',url:addSettingsUrl,headers: cjcsrfauthHeader(),handleError:handleError,body:body});
}
