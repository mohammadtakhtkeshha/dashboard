import {multiActionRequest} from "core/services/comment.service";
import {danger, success} from "methods/swal";

const body = (action, selectedCheckBoxes) => {
    let data = [];
    for (let id of selectedCheckBoxes) {
        switch (action) {
            case 'deleted':
                data.push({
                    "id": id,
                    "status": "deleted"
                })
                break;
            case 'block':
                data.push({
                    "id": id,
                    "status": false
                })
                break;
            default:
                data.push({
                    "id": id,
                    "status": true
                })
        }
    }
    return data;

}

export const multiAction = (t, action, appContext,commentStatus, publishedComments,unconfirmedComments,selectedCheckBoxes,handlePagination) => {
    appContext.setLoading(true);
    const data = body(action, selectedCheckBoxes);
    multiActionRequest(data, appContext.handleError,action).then((response) => {
        appContext.setLoading(false);
        selectedCheckBoxes.map((id) => {
            let comments=commentStatus === 'published' ? publishedComments : unconfirmedComments;
            if (action === 'delete') {
                const currentComment = comments.filter(comment => comment.cid === id);
                const currentIndex = comments.indexOf(currentComment[0]);
                comments.splice(currentIndex, 1);
                handlePagination(comments,true,true);
            } else {
                for (let i = 0; i <comments.length; i++) {
                    if (comments[i].cid === id) {
                        if(action === "block"){
                            comments[i].status = false;
                                unconfirmedComments.push(comments[i]);
                                const currentIndex=publishedComments.indexOf(comments[i]);
                                publishedComments.splice(currentIndex,1);
                                handlePagination(publishedComments,true,true,'published');
                                handlePagination(unconfirmedComments,true,true,'unconfirmed');
                        }else{
                            comments[i].status = true;
                                publishedComments.push(comments[i]);
                                const currentIndex=unconfirmedComments.indexOf(comments[i]);
                                unconfirmedComments.splice(currentIndex,1);
                                handlePagination(publishedComments,true,true,'published');
                                handlePagination(unconfirmedComments,true,true,'unconfirmed');
                        }
                    }
                }
            }
        });
        success(t('translation:successDone'), t('translation:ok'));
    });
}

export default {multiAction}
