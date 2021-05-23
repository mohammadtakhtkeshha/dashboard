import { Method } from 'infrastructure/layout';
import {
    addFormUrl,
    addElementUrl,
} from 'utils/urls/webforms.urls';
import {
    cjcsrfauthHeader,
    cjauthHeader
} from 'utils/headers';

export const addForm = (setLoading,body) => {
    return Method({ method:"post",url: addFormUrl, headers: cjauthHeader(), setLoading: setLoading,body:body });
};


export const addElement = (setLoading,body) => {
    return Method({ method:"post",url: addElementUrl, headers: cjcsrfauthHeader(), setLoading: setLoading,body:body });
};

