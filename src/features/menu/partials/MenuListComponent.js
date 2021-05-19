import {deleteMenu} from 'core/services/menu.service';
import {success} from 'methods/swal';
import i18next from 'i18next';
import {saveDragDropChanges} from "core/services/menu.service";

export const deleteMenuMethod = (id, setLoading, getMenus) => {
    setLoading(true);
    deleteMenu(id, setLoading).then(response => {
        setLoading(false);
        getMenus();
        success(i18next.t('translation:deletedSuccessfully'), i18next.t('translation:ok'));
    });
};

export const saveChangesMethod = (setLoading, menus, type) => {
    setLoading(true);
    saveDragDropChanges(type, setLoading, menus).then(response => {
        setLoading(false);
        success(i18next.t('translation:registeredChanges'), i18next.t('translation:ok'));
    });
};
