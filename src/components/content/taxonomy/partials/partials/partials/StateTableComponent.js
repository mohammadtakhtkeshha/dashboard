import {deleteState} from "core/services/taxonomy/partials/state.taxonomy.service";
import {success} from "methods/swal";
import {getStatesMethod} from "../Index.js"

export const deleteStateMethod = (id, t, states, appContext, setStates, handlePagination, setIds,getStates) => {
    appContext.setLoading(true)
    deleteState(id, appContext.handleError).then(response => {
        appContext.setLoading(false)
        getStates()
        // getStatesMethod(appContext.handleError, setStates, handlePagination, setIds)
        success(t('translation:deletedSuccessfully'), t('translation:ok'))
    })
}
