import{request} from "./request";


//对首页的网络请求

export  function  getHomeMultidata(id) {
return request({
    url:`/api/MVCTest/student/get/`+id,
    method:'get',           //请求方式
    params:{                //传入值
     },
})
}
