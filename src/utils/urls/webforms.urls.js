const baseUrl = process.env.REACT_APP_API_URL;

export const addFormUrl = `${baseUrl}/api/rest/webform/add/form`;

export const editFormUrl = `${baseUrl}/form/edit`;

export const addElementUrl = `${baseUrl}/webform/add/fields`;

export const editElementUrl = `${baseUrl}/webform/fields/edit`;

export const getFormsUrl = `${baseUrl}/webform/list?_format=json`;

export const deleteFormUrl = `${baseUrl}/forms/delete`;

export const deleteElementUrl = `${baseUrl}/webform/fields/delete`;

export const deleteSubmissionUrl = `${baseUrl}/webform/submission/delete`;

export const getSubmissionsUrl = (form_id) => {
    return `${baseUrl}/webform/submission/${form_id}`;
}

export const getElementsUrl = (form) => {
    return `${baseUrl}/webform/fields/${form}`;
};

export const requiredUrl = `${baseUrl}/webform/fields/req`;

export const downloadUrl = form_id => {
    return `${baseUrl}/webform/submission/csv/${form_id}`
};




