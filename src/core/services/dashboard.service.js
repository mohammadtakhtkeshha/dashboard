import { authHeader, xcsrfCtAppJ } from 'utils/headers';
import {
  getTenNumberOfCommentsUrl,
  getUsersUrl,
  getTenNumberOfUsersUrl,
  getTenNumberOfContentsUrl,
  getContentLisUrl,
  getCommentChartUrl,
} from 'utils/urls/dashboard.urls';
import { Method } from 'infrastructure/layout.js';

export function getContentList(setLoading) {
  return Method({ method: 'get', url: getContentLisUrl, header: authHeader(), setLoading: setLoading });
}

export function getTenNumberOfContents(setLoading) {
  return Method({ method: 'get', url: getTenNumberOfContentsUrl, headers: xcsrfCtAppJ, setLoading: setLoading });
}

export function getTenNumberOfUsers(setLoading) {
  return Method({ method: 'get', url: getTenNumberOfUsersUrl, headers: authHeader(), setLoading: setLoading });
}

export function getUsers(setLoading) {
  return Method({ method: 'get', url: getUsersUrl, headers: xcsrfCtAppJ, setLoading: setLoading });
}

export function getTenNumberOfComments(setLoading) {
  return Method({ method: 'get', url: getTenNumberOfCommentsUrl, headers: authHeader(), setLoading: setLoading });
}

export function getCommentChart(setLoading) {
  return Method({ method: 'get', url: getCommentChartUrl, headers: xcsrfCtAppJ, setLoading: setLoading });
}