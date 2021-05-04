import {getPublishedCommentsUrl,getUnConfirmedCommentsUrl,deleteCommentUrl,
    multiActionStatusUrl,multiActionDeleteUrl,editCommentUrl} from "utils/urls/comment.url";
import {Method} from "infrastructure/layout";
import {authHeader, cjcsrfauthHeader} from "utils/headers";

export function getPublishedComments(handleError) {
    return Method({method:'get',url:getPublishedCommentsUrl,headers: authHeader(),handleError:handleError});
}

export function getUnconfirmedComments(handleError) {
    return Method({method:'get',url:getUnConfirmedCommentsUrl,headers: authHeader(),handleError:handleError});
}

export function deleteComment(id,handleError) {
   return Method({method:'delete',url:deleteCommentUrl(id),headers: authHeader(),handleError:handleError});

}

export function getComment(id,handleError) {
    return Method({method:'get',url:editCommentUrl(id), headers:authHeader(),handleError:handleError});

}

export function editComment(id,body,handleError){
    return Method({method:'patch',url:editCommentUrl(id),body: body, headers:cjcsrfauthHeader(),handleError:handleError});
}

export function multiActionRequest(data,handleError,action) {
    let url = action === "delete" ? multiActionDeleteUrl : multiActionStatusUrl;
    return Method({method:'post',url:url,headers: cjcsrfauthHeader(),body:data,handleError:handleError});
}

export default {getPublishedComments, deleteComment,getComment,editComment};
