import {
  getPublishedCommentsUrl,
  getUnConfirmedCommentsUrl,
  deleteCommentUrl,
  multiActionStatusUrl,
  multiActionDeleteUrl,
  editCommentUrl,
} from 'utils/urls/comment.url';
import { Method } from 'infrastructure/layout';
import { authHeader, cjcsrfauthHeader } from 'utils/headers';

export function getPublishedComments(setLoading) {
  return Method({ method: 'get', url: getPublishedCommentsUrl, headers: authHeader(), setLoading: setLoading });
}

export function getUnconfirmedComments(setLoading) {
  return Method({ method: 'get', url: getUnConfirmedCommentsUrl, headers: authHeader(), setLoading: setLoading });
}

export function deleteComment(id, setLoading) {
  return Method({ method: 'delete', url: deleteCommentUrl(id), headers: authHeader(), setLoading: setLoading });
}

export function getComment(id, setLoading) {
  return Method({ method: 'get', url: editCommentUrl(id), headers: authHeader(), setLoading: setLoading });
}

export function editComment(id, body, setLoading) {
  return Method({ method: 'patch', url: editCommentUrl(id), body: body, headers: cjcsrfauthHeader(), setLoading: setLoading });
}

export function multiActionRequest(data, setLoading, action) {
  let url = action === 'delete' ? multiActionDeleteUrl : multiActionStatusUrl;
  return Method({ method: 'post', url: url, headers: cjcsrfauthHeader(), body: data, setLoading: setLoading });
}
