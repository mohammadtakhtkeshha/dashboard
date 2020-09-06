import Axios from 'axios';
import storage from './../libraries/local-storage';

export const Get = async (url, param) => {
    try {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                Authorization: token
            }
        };
        const res = await Axios({
            method: 'get',
            url,
            param,
            headers: config
        });
        return res;
    } catch (error) {
        return error.response;
    }
}

export const Post = async (url,headers,param)=>{
    try {
        const token= storage.get(process.env.tokenKey);
        const config ={
            headers:token
        }
      return await axios({
          method:'post',
          url,
          headers:config,
          param
      });
    }catch (e) {
        console.log(e);
        return e;
    }
}


