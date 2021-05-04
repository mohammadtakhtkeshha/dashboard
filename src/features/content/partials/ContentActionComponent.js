import {handleContentAction} from "core/services/content.service";
import {multiAction} from "../Index.js";
import {warning} from "methods/swal"

const doAction = (action,selectedCheckBoxes,appContext,contentsContext) => {
    if (action === 'delete') {
        handleContentAction('deleted', selectedCheckBoxes, appContext.handleError).then(() => {
            const currentContents = multiAction(selectedCheckBoxes, contentsContext.contents, 'delete');
            contentsContext.handlePagination(currentContents, true,'deletedSuccessfully');
        });

    } else if (action === 'block') {
        handleContentAction('false', selectedCheckBoxes, appContext.handleError).then(() => {
            const currentContents = multiAction(selectedCheckBoxes, contentsContext.contents, 'false');
            contentsContext.handlePagination(currentContents, true,'successDone');
        });
    } else {
        handleContentAction('true', selectedCheckBoxes, appContext.handleError).then(() => {
            const currentContents = multiAction(selectedCheckBoxes, contentsContext.contents, 'true');
            contentsContext.handlePagination(currentContents, 'successDone');
        });
    }
}

export const doActionMethod = (e,t,selectedCheckBoxes,appContext,contentsContext) =>{
    const action = e.currentTarget.value;
    warning(t('translation:sureQuestion'), t('translation:ok'), t('translation:cancel'), t('translation:notDone'),function () {
        doAction(action,selectedCheckBoxes,appContext,contentsContext)
    });

}
