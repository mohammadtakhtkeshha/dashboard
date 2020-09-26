const baseUrl =process.env.REACT_APP_API_URL;

export const registerTermUrl = `${baseUrl}/taxonomy/term?_format=json`;

export const deleteTermUrl = (id)=>{
    return `${baseUrl}/taxonomy/term/${id}?_format=hal_json`;
}

export default {registerTermUrl,deleteTermUrl};