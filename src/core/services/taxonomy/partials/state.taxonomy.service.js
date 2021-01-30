import {Method} from "structure/layout";
import {getTaxonomyImagesUrl,registerStateUrl,editStateUrl,deleteTerm,getDeleteEditTermUrl} from "utils/urls/taxonomy.urls";
import {authHeader, cjajauhthHeader, cjcsrfauthHeader} from "utils/headers";

export function getStates(handleError) {
    const config = {
        headers:{
            "Authorization":"Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjE4YTVlNjNmNjAzZDA0ZTg0NDczYzI1ZGI2Y2ViZWRhMGQwMjgzYzJhNmM0NDJjNGZjMzdlNTZhNDJiZDQzNmUxMDFlMDJlODBhZDA2NTQ0In0.eyJhdWQiOiIyNjYzYjU5Ny1mYTYzLTQxOTEtOWM3NS01YjM2ZTAxYzdmY2EiLCJqdGkiOiIxOGE1ZTYzZjYwM2QwNGU4NDQ3M2MyNWRiNmNlYmVkYTBkMDI4M2MyYTZjNDQyYzRmYzM3ZTU2YTQyYmQ0MzZlMTAxZTAyZTgwYWQwNjU0NCIsImlhdCI6MTYxMDAzMzM3NSwibmJmIjoxNjEwMDMzMzc1LCJleHAiOjE2MTE2MzMzNzUsInN1YiI6IjEiLCJzY29wZXMiOlsiYXV0aGVudGljYXRlZCIsInJlc3RfdXNlciJdfQ.YxR6SxKKw1fWwJUJv9pv9HRmFttN_QRHPy53qTBu_yZ-CZIJFpWCUgcvwqrqyacmI_D-CnaZ7yEL01Beeqo74Bqkh0bD5zrcEynvKYhWWwktQHjnKlVpU8c6p_c7knhWEVWFjKKF1MjMyvt7XGa2TvA1tVgtAeLGkNiCOvLwJ5i7VPZtpb88IoNpv77fWmBI5VchivlzGVsD00D8PpF-TVbF17WJ0sEIeoN8LSrU9MyPZ_CN7n0UV5tuSnSbkS1Dn5pB2C6w4xY5NL6OzygVE01U_H8Fi5Svf4rJ8kTUf21uvB-s-0p8_IXSSoWkfVaSqcvgH34VQ7kMUZuD7e3UIw"
        }
    }
    return Method({method:'get',url:getTaxonomyImagesUrl, headers:config,handleError:handleError});
}

export function getState(id,handleError) {
    return Method({method:'get',url:getDeleteEditTermUrl(id), headers:authHeader,handleError:handleError});
}

export function registerState(handleError,body,openForm) {
    const url = openForm.id === "" ? registerStateUrl : editStateUrl(openForm.id)
    const method = openForm.id === "" ? "post":"patch"
    return Method({method:method,url:url,body:body, headers:cjcsrfauthHeader,handleError:handleError});
}

export function deleteState(id,handleError) {
    return Method({method:"DELETE",url:deleteTerm(id), headers:cjcsrfauthHeader,handleError:handleError});
}
