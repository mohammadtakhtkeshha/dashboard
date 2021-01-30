import {deleteState} from "core/services/taxonomy/partials/state.taxonomy.service";
import {success} from "methods/swal";

export const deleteStateFromTree = (id, states) => {
    states.map(function (child) {
            if (child.id === id) {
                const index = states.indexOf(child)
                states.splice(index, 1)
            }
            else {
                if (child.children && child.children.length > 0) {
                    deleteStateFromTree(id, child.children)
                }
            }
        }
    )
    return states;
}

export const deleteStateMethod = (id, t, states, appContext, setStates,getStates) => {
    appContext.setLoading(true)
    deleteState(id, appContext.handleError).then(response => {
    appContext.setLoading(false)
    const afterDeletedStates = deleteStateFromTree(id, states.children)
    setStates({
        id: 'root',
        title: t('taxonomy:states'), children: afterDeletedStates
    })
        getStates()
    success(t('translation:deletedSuccessfully'), t('translation:ok'))
    })
}
