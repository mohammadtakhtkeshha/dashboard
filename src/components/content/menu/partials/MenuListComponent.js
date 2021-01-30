import {deleteMenu} from "core/services/menu.service"
import {success} from "methods/swal"

export const deleteMenuMethod = (id, t, appContext,getMenus) => {
    appContext.setLoading(true)
    deleteMenu(id, appContext.handleError).then(response => {
        appContext.setLoading(false)
        getMenus()
        success(t('translation:deletedSuccessfully'), t('translation:ok'))
    })
}


