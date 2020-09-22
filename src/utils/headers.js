import storage from "libraries/local-storage";

export const authHeader = {
    headers: {
        Authorization: storage.get(process.env.REACT_APP_TOKEN_KEY),
    }
}
export const ahchauthHeader = {
    headers: {
        'Accept': 'application/hal+json',
        'Content-Type': 'application/hal+json',
        'Authorization': storage.get(process.env.REACT_APP_TOKEN_KEY)
    }
};
export const aacaauthHeader = {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': storage.get(process.env.REACT_APP_TOKEN_KEY),
    }
};
export const caauthHeader = {
    headers: {
        "Content-Type": "application/json",
        'Authorization': storage.get(process.env.REACT_APP_TOKEN_KEY),
    }
};
export const chauthHeader = {
    headers: {
        'Content-Type': "application/hal+json",
        'Authorization': storage.get(process.env.REACT_APP_TOKEN_KEY),
    }
};
export const avcoAuthcdHeader = (img) => {
    return {
        headers: {
            'Accept': 'application/vnd.api+json',
            'Content-Type': 'application/octet-stream',
            'Authorization': storage.get(process.env.REACT_APP_TOKEN_KEY),
            "Content-Disposition": `file;filename="${img.name}"`,
        }
    }
};
export const aacaAuthauHeader =  {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': storage.get(process.env.REACT_APP_TOKEN_KEY),
            // 'Accept-Charset': 'utf-8',
    }
};

export default {authHeader, ahchauthHeader, aacaauthHeader, caauthHeader, chauthHeader, avcoAuthcdHeader,aacaAuthauHeader};
