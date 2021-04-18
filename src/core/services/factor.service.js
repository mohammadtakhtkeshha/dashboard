import {Method} from "infrastructure/layout";
import {registerTermUrl} from "utils/urls/term.urls";
import {aacaauthHeader,cmHeader} from "utils/headers";

export const getFactors = (handleError,clientId) => {
    let formData = new FormData();
    formData.append('userId', clientId);
    return Method({
        url:'http://crm.webrbp.ir/listInvoices.php',
        method:'post',
        headers:cmHeader,
        body:formData,
        handleError:handleError
    });
}

export function registerTerm (term,handleError) {
    return Method({
        url:registerTermUrl,
        method:'post',
        headers:aacaauthHeader,
        body:term,
        handleError:handleError
    });
}

