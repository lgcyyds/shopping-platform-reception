import axios from "axios";
import nprogress from "nprogress";
import "nprogress/nprogress.css";
import store from '@/store'
const requests = axios.create({
    baseURL:'/api',
    timeout:5000
});

requests.interceptors.request.use((config)=>{
    nprogress.start();
    if(store.state.detail.UUID_token){
        //给请求头添加字段
        config.headers.userTempId=store.state.detail.UUID_token
    }
    if(store.state.user.token){
        config.headers.token=store.state.user.token
    }
    return config;
})

requests.interceptors.response.use((res)=>{
    nprogress.done();
    return res.data
},(error)=>{
    return Promise.reject(new Error('false'));
})

export default requests;