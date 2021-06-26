import { Method } from 'infrastructure/layout';
import {
    addFormUrl,
    addElementUrl,
    editElementUrl,
    getFormsUrl,
    deleteFormUrl,
    editFormUrl,
    deleteElementUrl,
    getSubmissionsUrl,
    deleteSubmissionUrl,
    getElementsUrl,
} from 'utils/urls/webforms.urls';
import {
    cjauthHeader, authHeader
} from 'utils/headers';

export const addForm = (setLoading,body) => {
    return Method({ method:"post",url: addFormUrl, headers: cjauthHeader(), setLoading: setLoading,body:body });
};

export const editForm = (setLoading,body) => {
    return Method({ method:"PATCH",url: editFormUrl, headers: cjauthHeader(), setLoading: setLoading,body:body });
};

export const addElement = (setLoading,body) => {
    return Method({ method:"post",url: addElementUrl, headers: cjauthHeader(), setLoading: setLoading,body:body });
};

export const editElement = (setLoading,body) => {
    return Method({ method:"PATCH",url: editElementUrl, headers: cjauthHeader(), setLoading: setLoading,body:body });
};

export const deleteForm = (setLoading,body) => {
    return Method({ method:"POST",url: deleteFormUrl, headers: cjauthHeader(), setLoading: setLoading,body:body });
};

export const deleteElement = (setLoading,body) => {
    return Method({ method:"POST",url: deleteElementUrl, headers: cjauthHeader(), setLoading: setLoading,body:body });
};

export const getFormsList = (setLoading) => {
    return Method({ method:"get",url: getFormsUrl, headers: authHeader(), setLoading: setLoading });
};

export const getElementsList = (setLoading,form_id) => {
    return Method({ method:"get",url: getElementsUrl(form_id), headers: authHeader(), setLoading: setLoading });
}

export const getSubmissionsList = (setLoading,form_id) => {
    return Method({ method:"get",url: getSubmissionsUrl(form_id), headers: cjauthHeader(), setLoading: setLoading });
}

export const deleteSubmission = (setLoading,body) => {
    return Method({ method:"POST",url: deleteSubmissionUrl, headers: cjauthHeader(), setLoading: setLoading,body:body });
}