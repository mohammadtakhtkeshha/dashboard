import {warning} from "methods/swal";
import {deleteContent} from "core/services/content.service";

export const isCheckedHandlerMethod = (e, content, setSelectedCheckBoxes, selectedCheckBoxes) => {
    let currentId = content.nid;
    if (e.currentTarget.checked) {
        setSelectedCheckBoxes(
            [...selectedCheckBoxes, currentId]
        );
    } else {
        let filteredSelected = selectedCheckBoxes.filter(item => item !== currentId);
        setSelectedCheckBoxes(
            [...filteredSelected]
        );
    }
}

const deleteContentMethod = (id,appContext,contentsContext) => {
    deleteContent(id,appContext.handleError).then((response) => {
        let newContents = contentsContext.contents.filter(content => content.nid !== id);
        contentsContext.handlePagination(newContents,true, 'deletedSuccessfully');
    });
};

export const confirmDeleteHandlerMethod = (e, t, appContext, contentsContext) => {
    let id = e.currentTarget.value;
    warning(t('translation:sureQuestion'), t('translation:ok'), t('translation:cancel'), t('translation:notDone'), function () {
        deleteContentMethod(id, appContext, contentsContext)
    });
}
