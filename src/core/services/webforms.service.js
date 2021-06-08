import { Method } from 'infrastructure/layout';
import {
    addFormUrl,
    addElementUrl,
    getFormsUrl,
    getElementsUrl,
} from 'utils/urls/webforms.urls';
import {
    cjauthHeader, authHeader
} from 'utils/headers';

export const addForm = (setLoading,body) => {
    return Method({ method:"post",url: addFormUrl, headers: cjauthHeader(), setLoading: setLoading,body:body });
};

export const addElement = (setLoading,body) => {
    return Method({ method:"post",url: addElementUrl, headers: cjauthHeader(), setLoading: setLoading,body:body });
};

export const getFormsList = (setLoading) => {
    return Method({ method:"get",url: getFormsUrl, headers: authHeader(), setLoading: setLoading });
};

export const getElementsList = (setLoading,form) => {
    return Method({ method:"get",url: getElementsUrl(form), headers: authHeader(), setLoading: setLoading });
}

