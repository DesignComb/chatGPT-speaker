import Axios from "axios";
import { errorCodeType } from '@/utils/axiosErrCode'

const baseURL = "";

const axios = Axios.create({
    baseURL,
    timeout: 120000, // 請求超時 120s // 因應 chatGPT api 時常 timeout 所以加到 2 分鐘
    headers:{
        // "Content-Type":"application/json",
    },
    // withCredentials:true
});

// 前置攔截器（發起請求之前的攔截）
axios.interceptors.request.use(
    (response) => {
        /**
         * 根據你的項目實際情況來對 config 做處理
         * 這裏對 config 不做任何處理，直接返回
         */
        return response;
    },
    (error) => {
        console.log(error.response.status)
        return Promise.reject(error);
    }
);

// 後置攔截器（獲取到響應時的攔截）
axios.interceptors.response.use(
    (response) => {
        /**
         * 根據你的項目實際情況來對 response 和 error 做處理
         * 這裏只返回 response 的 data
         */
        return response;
    },
    (error) => {
        if (error.response && error.response.data) {
            const code = error.response.status;
            const msg = error.response.data;
            console.log(`Code: ${code}, Message: ${msg}`);
            console.log(errorCodeType(code));
        } else {
            console.log(`${error}`);
        }
        return Promise.reject(error);
    }
);

export default axios;