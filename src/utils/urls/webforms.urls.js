const baseUrl = process.env.REACT_APP_API_URL;

export const addFormUrl = `${baseUrl}/api/rest/webform/add/form`;

export const addElementUrl = `${baseUrl}/webform/add/fields`;

export const getFormsUrl = `${baseUrl}/webform/list?_format=json`;

export const getElementsUrl = (form) => {
    return `${baseUrl}/webform/fields/${form}`;
}


