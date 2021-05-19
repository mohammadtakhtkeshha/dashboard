import axios from 'axios';
import contentUrl from 'utils/urls/content.urls';
import {
  cocdavcsrfauthHeader,
  chahauthHeader,
  authHeader,
  caauthHeader,
  cjajauthHeader,
  cjajcharsetauthHeader,
  cjajcsrfauthHeader,
  cjcdajcsrfauth,
} from 'utils/headers';
import { Method } from 'infrastructure/layout';

export function getDomainSource() {
  let url = contentUrl.domainSourceUrl;
  return axios.get(url);
}

export function getTags(setLoading) {
  let url = contentUrl.getTagsUrl;
  return Method({ method: 'get', url: url, headers: authHeader(), setLoading: setLoading });
}

export function getNewsCategory(setLoading) {
  let url = contentUrl.getNewsCategoryUrl;
  return Method({ method: 'get', url: url, headers: cjajcsrfauthHeader(), setLoading: setLoading });
}

export function uploadSingImg(file, setLoading) {
  const url = contentUrl.uploadSingImgUrl;
  return Method({ method: 'post', url: url, body: file, headers: cjcdajcsrfauth(file.name), setLoading: setLoading });
}

// export function uploadMultiImg(e,setLoading) {
//     let url = contentUrl.uploadMultiImgUrl;
//     // return axios.post(url, e, avcoAuthcdHeader(e));
//     return Method({method:'post',url:url,body:e,headers: avcoAuthcdHeader(e),setLoading:setLoading});
// }

export function uploadVideo(e, setLoading) {
  let url = contentUrl.uploadVideoUrl;
  return Method({ method: 'post', url: url, body: e, headers: cocdavcsrfauthHeader(e.name), setLoading: setLoading });
}

export function uploadVoice(e, setLoading) {
  let url = contentUrl.uploadVoiceUrl;
  return Method({ method: 'POST', url: url, headers: cocdavcsrfauthHeader(e.name), setLoading: setLoading, body: e });
}

// export function uploadMultiFile(e) {
//     let url = contentUrl.uploadFileUrl;
//     // return axios.post(url, e, avcoAuthcdHeader(e));
//     return Method({method:'POST',url:url,body:e, headers:avcoAuthcdHeader(e)});
// }

export function getContents(setLoading) {
  let url = contentUrl.getContentsUrl;
  return Method({ method: 'get', url: url, headers: authHeader(), setLoading: setLoading });
}

export function deleteContent(id, setLoading) {
  let url = contentUrl.deleteContentUrl(id);
  return Method({ method: 'delete', url: url, headers: chahauthHeader(), setLoading: setLoading });
}

export function getContent(id, setLoading) {
  let url = contentUrl.getContentUrl(id);
  return Method({ method: 'get', url: url, headers: authHeader(), setLoading: setLoading });
}

export function registerContent(content, setLoading) {
  let url = contentUrl.registerContentUrl;
  return Method({ method: 'post', url: url, headers: cjajcharsetauthHeader(), body: content, setLoading: setLoading });
}

export function editContent(content, id, setLoading) {
  let url = contentUrl.editContentUrl(id);
  return Method({ method: 'patch', url: url, headers: cjajauthHeader(), body: content, setLoading: setLoading });
}

export function getContentTypeList(setLoading) {
  let url = contentUrl.getContentTypeListUrl;
  return Method({ method: 'get', headers: authHeader(), url: url, setLoading: setLoading });
}

export function getStates(setLoading) {
  let url = contentUrl.getStatesUrl;
  return Method({ method: 'get', headers: authHeader(), url: url, setLoading: setLoading });
}

export function handleContentAction(action, selectedCheckBoxes, setLoading) {
  let urlDelete = contentUrl.contentActionDeleteUrl;
  let urlStatus = contentUrl.contentActionStatusUrl;
  const body = [];
  switch (action) {
    case 'deleted':
      for (let item of selectedCheckBoxes) {
        body.push({
          id: item,
          setdelete: 'deleted',
        });
      }
      return Method({ method: 'post', url: urlDelete, headers: caauthHeader(), body: body, setLoading: setLoading });
    case 'true':
      for (let item of selectedCheckBoxes) {
        body.push({
          id: item,
          setPublished: true,
        });
      }
      return Method({ method: 'post', url: urlStatus, headers: caauthHeader(), body: body, setLoading: setLoading });
    default:
      for (let item of selectedCheckBoxes) {
        body.push({
          id: item,
          setPublished: false,
        });
      }
      return Method({ method: 'post', url: urlStatus, headers: caauthHeader(), body: body, setLoading: setLoading });
  }
}
