import { success, danger } from 'methods/swal';
import i18next from 'i18next';

export const showNotificationMethod = async history => {
  if (history.location.search !== '') {
    const locationArr = history.location.search.split('&');
    const messageArr = locationArr[1].split('=');
    const message = atob(messageArr[1]);
    let alertedMessage = '';
    let successOrFailed = true;
    switch (message) {
      case 'payment success':
        alertedMessage = i18next.t('tickets:payment success');
        successOrFailed = true;
        break;
      case 'invoice not submitted':
        alertedMessage = i18next.t('tickets:invoice not submitted');
        successOrFailed = false;
        break;
      case 'payment not authorized':
        alertedMessage = i18next.t('tickets:payment not authorized');
        successOrFailed = false;
        break;
      case 'payment waiting':
        alertedMessage = i18next.t('tickets:payment waiting');
        successOrFailed = false;
        break;
      case 'internal error':
        alertedMessage = i18next.t('tickets:internal error');
        successOrFailed = false;
        break;
      case 'cancelled by user':
        alertedMessage = i18next.t('tickets:cancelled by user');
        successOrFailed = false;
        break;
      case 'number not validate':
        alertedMessage = i18next.t('tickets:number not validate');
        successOrFailed = false;
        break;
      case 'low credit':
        alertedMessage = i18next.t('tickets:low credit');
        successOrFailed = false;
        break;
      case 'wrong password':
        alertedMessage = i18next.t('tickets:wrong password');
        successOrFailed = false;
        break;
      case 'too many reauests':
        alertedMessage = i18next.t('tickets:too many reauests');
        successOrFailed = false;
        break;
      case 'too many payments':
        alertedMessage = i18next.t('tickets:too many payments');
        successOrFailed = false;
        break;
      case 'not allowed price':
        alertedMessage = i18next.t('tickets:not allowed price');
        successOrFailed = false;
        break;
      case 'unauthorized provider':
        alertedMessage = i18next.t('tickets:unauthorized provider');
        successOrFailed = false;
        break;
      case 'switch error':
        alertedMessage = i18next.t('tickets:switch error');
        successOrFailed = false;
        break;
      case 'unavailable card':
        alertedMessage = i18next.t('tickets:unavailable card');
        successOrFailed = false;
        break;
      default:
        //unpredicted error
        alertedMessage = i18next.t('tickets:unpredicted error');
        successOrFailed = false;
    }
    successOrFailed ? success(alertedMessage, i18next.t('translation:ok')) : danger(alertedMessage, i18next.t('translation:ok'));
    history.replace({ search: '' });
  }
};
