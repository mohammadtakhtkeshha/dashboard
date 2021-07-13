import axios from 'axios';
import { danger } from 'methods/swal';
import { remove } from 'libraries/local-storage';
import i18next from 'i18next';
import history from 'configs/History';

export function chunkItem(currentArray) {
  let newList = [];
  const perPage = 30;
  for (let index = 0; index < currentArray.length; index += perPage) {
    let sliced = currentArray.slice(index, index + perPage);
    newList.push(sliced);
  }
  return newList;
}

export function handleTotalPage(currentArray) {
  return Math.ceil(currentArray.length / 30);
}

/* description
@param(number) : (method,url,headers,body,handleError)
@return (object) :catch = errorHandler , try = response of request
*/

export const Method = async option => {
  try {
    return await axios({
      url: option.url,
      method: option.method,
      headers: option.headers?.headers,
      data: option.body,
      params: option.params,
    });
  } catch (error) {
    let errorString;
    if (error.response?.status === 422) {
      if(error.response.data.message){
        errorString = error.response.data.message;
      }else{
        errorString = i18next.t('translation:incorrectData');
      }
    } else if (error.response?.status === 503) {
      errorString = i18next.t('translation:netError');
    } else if (error.response?.status === 401) {
      remove(process.env.REACT_APP_TOKEN_KEY);
      history.replace('/login');
      errorString = i18next.t('users:unauthorizedLogin');
    } else {
      errorString = error.toString();
    }
    danger(error ? errorString : i18next.t('translation:error'), i18next.t('translation:ok'));
    option.setLoading(false);
    throw error;
  }
};

export const handleErrorMethod = (t, error, setLoading, history) => {
  let errorString;
  if (error.response?.status === 422) {
    errorString = t('translation:incorrectData');
  } else if (error.response?.status === 503) {
    errorString = t('translation:netError');
  } else if (error.response?.status === 401) {
    remove(process.env.REACT_APP_TOKEN_KEY);
    history.replace('/login');
    errorString = t('users:unauthorizedLogin');
  } else {
    errorString = error.toString();
  }
  danger(error ? errorString : t('translation:error'), t('translation:ok'));
  setLoading(false);
};


export default { chunkItem, handleTotalPage, Method, handleErrorMethod };
