import {deleteMenu, saveDragDropChanges} from "core/services/menu.service"
import {success} from "methods/swal"

export const deleteMenuMethod = (id, t, appContext, getMenus) => {
    appContext.setLoading(true)
    deleteMenu(id, appContext.handleError).then(response => {
        appContext.setLoading(false)
        getMenus()
        success(t('translation:deletedSuccessfully'), t('translation:ok'))
    })
}

export const saveChangesMethod = (t,appContext, menus, type) => {
    appContext.setLoading(true)
    saveDragDropChanges(type, appContext.handleError, menus).then(response => {
        appContext.setLoading(false)
        success(t('translation:registeredChanges'), t('translation:ok'))

    })
}


