import {Method} from "infrastructure/layout";
import {
    registerStateUrl,
    editStateUrl,
    deleteTerm,
    getDeleteEditTermUrl,
    getTaxonomyTermUrl
} from "utils/urls/taxonomy.urls";
import {authHeader, cjcsrfauthHeader} from "utils/headers";


export function getStates(handleError, type) {
    return Method({method: 'get', url: getTaxonomyTermUrl(type), headers: authHeader(), handleError: handleError});
}

export function getState(id, handleError) {
    return Method({method: 'get', url: getDeleteEditTermUrl(id), headers: authHeader, handleError: handleError});
}

export function registerState(handleError, body, openForm) {
    const url = openForm.id === "" ? registerStateUrl : editStateUrl(openForm.id)
    const method = openForm.id === "" ? "post" : "patch"
    return Method({method: method, url: url, body: body, headers: cjcsrfauthHeader, handleError: handleError});
}

export function deleteState(id, handleError) {
    return Method({method: "DELETE", url: deleteTerm(id), headers: cjcsrfauthHeader, handleError: handleError});
}
