import axios from "axios";

export const ticketMethod = (option) => {debugger
    const ticketMethod = axios.create({
        baseURL: option.url
    })
    ticketMethod.interceptors.request.use(
        request => {
            request.method = option.method
            request.headers = option.headers?.headers
            request.params = option.params
            return request
        },
        error => {
            return Promise.reject(error)
        }
    )
    ticketMethod.interceptors.response.use(function (response) {
        if (response.data.result === 'error') {
            option.handleError && option.handleError(response.data.message);
            throw response.data.message
        } else {
            return response
        }
    }, function (e) {
        option.handleError && option.handleError(e);
        throw e;
    });
    return ticketMethod();
}
