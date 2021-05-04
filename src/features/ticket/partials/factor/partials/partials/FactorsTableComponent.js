import {success, danger} from "methods/swal";

export const showNotificationMethod = async (t, history) => {
    if (history.location.search !== "") {
        const locationArr = history.location.search.split('&')
        const messageArr = locationArr[1].split('=')
        const message = atob(messageArr[1])
        let alertedMessage = ''
        let successOrFailed = true
        switch (message) {
            case 'payment success':
                alertedMessage = t('tickets:payment success')
                successOrFailed = true
                break;
            case 'invoice not submitted':
                alertedMessage = t('tickets:invoice not submitted')
                successOrFailed = false
                break;
            case 'payment not authorized':
                alertedMessage = t('tickets:payment not authorized')
                successOrFailed = false
                break;
            case 'payment waiting':
                alertedMessage = t('tickets:payment waiting')
                successOrFailed = false
                break;
            case 'internal error':
                alertedMessage = t('tickets:internal error')
                successOrFailed = false
                break;
            case 'cancelled by user':
                alertedMessage = t('tickets:cancelled by user')
                successOrFailed = false
                break;
            case 'number not validate':
                alertedMessage = t('tickets:number not validate')
                successOrFailed = false
                break;
            case 'low credit':
                alertedMessage = t('tickets:low credit')
                successOrFailed = false
                break;
            case 'wrong password':
                alertedMessage = t('tickets:wrong password')
                successOrFailed = false
                break;
            case 'too many reauests':
                alertedMessage = t('tickets:too many reauests')
                successOrFailed = false
                break;
            case 'too many payments':
                alertedMessage = t('tickets:too many payments')
                successOrFailed = false
                break;
            case 'not allowed price':
                alertedMessage = t('tickets:not allowed price')
                successOrFailed = false
                break;
            case 'unauthorized provider':
                alertedMessage = t('tickets:unauthorized provider')
                successOrFailed = false
                break;
            case 'switch error':
                alertedMessage = t('tickets:switch error')
                successOrFailed = false
                break;
            case 'unavailable card':
                alertedMessage = t('tickets:unavailable card')
                successOrFailed = false
                break;
            default://unpredicted error
                alertedMessage = t('tickets:unpredicted error')
                successOrFailed = false
        }
        successOrFailed ? success(alertedMessage, t('translation:ok')) : danger(alertedMessage, t('translation:ok'))
        history.replace({search: ""})
    }
}
