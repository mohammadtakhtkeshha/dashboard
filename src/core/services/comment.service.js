import axios from "axios";
import tagUrl from 'utils/urls/tag.urls';
import {getPublishedCommentsUrl,getUnConfirmedCommentsUrl,deleteCommentUrl,
    multiActionStatusUrl,multiActionDeleteUrl,editCommentUrl} from "utils/urls/comment.url";
import {Method} from "infrastructure/layout";
import {authHeader,cjcsrfauthHeader} from "utils/headers";
import storage from "libraries/local-storage";

const auth = storage.get(process.env.REACT_APP_TOKEN_KEY)

export function getPublishedComments(handleError) {
    return Method({method:'get',url:getPublishedCommentsUrl,headers: authHeader(auth),handleError:handleError});
}

export function getUnconfirmedComments(handleError) {
    return Method({method:'get',url:getUnConfirmedCommentsUrl,headers: authHeader(auth),handleError:handleError});
}

export function addComment(body) {
    let url = tagUrl.addCommentUrl;
    const config = {
        headers: {
            'Content-Type': 'application/hal+json',
            'Authorization': storage.get(process.env.REACT_APP_TOKEN_KEY),
            'Accept': 'application/hal+json',
        }
    };
    return axios.post(url, body, config);
}

export function deleteComment(id,handleError) {
   return Method({method:'delete',url:deleteCommentUrl(id),headers: authHeader(auth),handleError:handleError});

}

export function getComment(id,handleError) {
    return Method({method:'get',url:editCommentUrl(id), headers:authHeader(auth),handleError:handleError});

}

export function editComment(id,body,handleError){
    return Method({method:'patch',url:editCommentUrl(id),body: body, headers:cjcsrfauthHeader,handleError:handleError});
}

export function multiActionRequest(data,handleError,action) {
    let url = action === "delete" ? multiActionDeleteUrl : multiActionStatusUrl;
    return Method({method:'post',url:url,headers: cjcsrfauthHeader,body:data,handleError:handleError});
}

export default {getPublishedComments, addComment, deleteComment,getComment,editComment};
