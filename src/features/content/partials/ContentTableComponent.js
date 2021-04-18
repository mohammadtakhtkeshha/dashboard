import {warning} from "methods/swal";
import contentService from "core/services/content.service";

export const isCheckedHandlerMethod = (e,content,setSelectedCheckBoxes,selectedCheckBoxes) =>{
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
const deleteContent = (id,appContext,contentsContext) => {
    contentService.deleteContent(id,appContext.handleError).then((response) => {
        let newContents = contentsContext.contents.filter(content => content.nid !== id);
        contentsContext.handlePagination(newContents,true, 'deletedSuccessfully');
    });
};

export const confirmDeleteHandlerMethod = (e,t,appContext,contentsContext) =>{
    let id = e.currentTarget.value;
    warning(t('translation:sureQuestion'), t('translation:ok'), t('translation:cancel'), t('translation:notDone'), function () {
        deleteContent(id,appContext,contentsContext)
    });
}

export const allCheckboxHandlerMethod = (e,contentsContext,page,setSelectedCheckBoxes) =>{
    const isChecked = e.currentTarget.checked;
    const currentchunkCheckBox = contentsContext.chunkContents[page];
    const ids = currentchunkCheckBox.map(content => content.nid);
    isChecked ? setSelectedCheckBoxes([...ids]) : setSelectedCheckBoxes([]);
}
