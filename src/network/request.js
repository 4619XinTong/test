import axios from "axios";


export function request(config) {
         //1.船舰axios实例
        const instance = axios.create({
            baseURL:'/',
            timeout:5000,
            headers:{'X-Custom-Header': 'foobar'}
        })
        //2.axios的拦截器
        //全局拦截：axios.interceptors
        instance.interceptors.request.use(config =>{
            // console.log(config);
            return config
        },err =>{
            console.log(err);
        })


        //响应拦截
        instance.interceptors.response.use(res =>{
            // console.log(res);
            return res.data
        },err =>{
            // console.log(err);
            return err
        })

        //3.发送网络请求
        return instance(config)
}
