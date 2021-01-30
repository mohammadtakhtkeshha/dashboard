import storage from "libraries/local-storage";


// Content-Type:application/json => cj
// Content-Type:application/octet-stream => co
// Content-Disposition:file; filename="78456985.jpg" => cd
// Accept:application/json => aj
// Accept:application/vnd.api+json => av
// Accept-Charset:utf-8 => charset
// X-CSRF-Token:csrf => csrf
// Authorization:token => auth


export const authHeader = {
    headers: {
        'Authorization': storage.get(process.env.REACT_APP_TOKEN_KEY),
    }
}

export const cjcsrfauthHeader = {
    headers: {
        'Authorization': storage.get(process.env.REACT_APP_TOKEN_KEY),
        'X-CSRF-Token': storage.get(process.env.REACT_APP_CSRF),
        'Content-Type': 'application/json',
    }
}

export const cocdavcsrfauthHeader = (fileName) => {
    return {
        headers: {
            "Content-Type": "application/octet-stream",
            "Accept": "application/vnd.api+json",
            'Authorization': storage.get(process.env.REACT_APP_TOKEN_KEY),
            'X-CSRF-Token': storage.get(process.env.REACT_APP_CSRF),
            'Content-Disposition': `file;filename="${fileName}"`,
        }
    }
}

export const cjcdajcsrfauth = (fileName) => {
    return {
        headers: {
            "Content-Type": "application/octet-stream",
            "authorization": storage.get(process.env.REACT_APP_TOKEN_KEY),
            "Content-Disposition": `file;filename="${fileName}"`,
            "Accept": "application / vnd.api + json",
            "X-CSRF-Token": "q4QwUnOYtwx9Ehuclx2YINL_JL8HdGEEYQpMRCtjMgw"
        }
    }
}

export const cjajcharsetauthHeader = {
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Accept-Charset': 'utf-8',
        'X-CSRF-Token': storage.get(process.env.REACT_APP_CSRF),
        'Authorization': storage.get(process.env.REACT_APP_TOKEN_KEY)
    }
}

export const cjajcsrfauthHeader = {
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-CSRF-Token': storage.get(process.env.REACT_APP_CSRF),
        'Authorization': storage.get(process.env.REACT_APP_TOKEN_KEY)
    }
}

export const xcsrfCtAppJ = {//just-content-type
    'Content-Type': 'application/json',
}

export const ahchauthHeader = {
    headers: {
        'Accept': 'application/hal+json',
        'Content-Type': 'application/hal+json',
        'Authorization': storage.get(process.env.REACT_APP_TOKEN_KEY)
    }
}

export const aacaauthHeader = {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': storage.get(process.env.REACT_APP_TOKEN_KEY),
    }
}

export const caauthHeader = {
    headers: {
        "Content-Type": "application/json",
        'Authorization': storage.get(process.env.REACT_APP_TOKEN_KEY),
        'X-CSRF-Token': storage.get(process.env.REACT_APP_CSRF),
    }
}

export const chauthHeader = {
    headers: {
        'Content-Type': "application/json",
        'X-CSRF-Token': storage.get(process.env.REACT_APP_CSRF),
        'Authorization': storage.get(process.env.REACT_APP_TOKEN_KEY),
    }
}

export const avcoAuthcdHeader = (img, csrf) => {
    return {
        headers: {
            'Accept': 'application/vnd.api+json',
            'Content-Type': 'application/octet-stream',
            'X-CSRF-Token': 'Ps0HLxt_1Bz_qrApO_AYGwG_yilXrOWAVX4G2sQxFT0',
            "Content-Disposition": `file;filename="${img.name}"`,
            'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImU2YmU3Mjc4ZjUxZWI4ZjdkNjY2YWFlZDc1ODVlNGM3ZTNmNmU5MTQ5NmQyYjNlZTU4MzA1YTJiOGQ4MmVkYzJhZmMxOTY1YjMyM2E3NTlmIn0.eyJhdWQiOiI2ZmZiMDQyZS05ODhhLTQzN2ItOWUzMC1kYjUxNWE3MTljYzgiLCJqdGkiOiJlNmJlNzI3OGY1MWViOGY3ZDY2NmFhZWQ3NTg1ZTRjN2UzZjZlOTE0OTZkMmIzZWU1ODMwNWEyYjhkODJlZGMyYWZjMTk2NWIzMjNhNzU5ZiIsImlhdCI6MTYwNDkyMzkzMSwibmJmIjoxNjA0OTIzOTMxLCJleHAiOjE2MDU3MjM5MzEsInN1YiI6IjQ3Iiwic2NvcGVzIjpbImF1dGhlbnRpY2F0ZWQiLCJyZXN0X3VzZXIiXX0.dR0mRE7wDVv2eVChffi5l2LzeEz6Z_fkEWuRGix_H9fP70dc8XzwBrigHYLc0Z3BYYrSr0BedAlzyzs4KIzFzTV6eAFWKb-tmP36FhdLF0TUcCqWEdIK9OnfuSp1SEuLDsFCjmVpsydUDzBtZEuJUyxwIRytDsqpMSOfR9U6tAgf3yx6hoGIQPtZOmCvVycScFgKJfT-ux1JvWfHL9LDf0RLeKw3Qf8z7fJQvh_Bp3mEJ8SBpo_hpVGQ3jERJli--HEM_owlBpgr3r6EbvEia0wy6OHpiPC4Gy8AhafE94O7Mh6BM8XglfbwE1IzyrcWYQQiZwLRtS_S-k6aX5XteQ'
        }
    }
}

export const cjajauhthHeader = {
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': storage.get(process.env.REACT_APP_TOKEN_KEY)
    }
}

// export const aacaAuthauHeader = {
//     headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json',
//         'Authorization': storage.get(process.env.REACT_APP_TOKEN_KEY),
//     }
// }

export const ContentTypeAppJsonHeader = {//just-content-type
    'Content-Type': 'application/json'
}

// export default {
//     authHeader, ahchauthHeader, aacaauthHeader, caauthHeader, chauthHeader,
//     avcoAuthcdHeader, cjajauhthHeader, ContentTypeAppJsonHeader, xcsrfCtAppJ,
//     cjajcharsetauthHeader, cjajcsrfauthHeader
// };
