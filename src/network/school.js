import{request} from "./request";


//对首页的网络请求
//****************查询学校***************
export  function  getSchoolMultidata(schoolname) {
    return request({
        url:`/api/MVCTest/school/get`,
        method:'post',           //请求方式
        params:{                //传入值
        },
        data:{
            info:{
                name:schoolname
            }
        }
    })
}

//*************更新学校名称****************
export  function  getSchoolUpdata(schoolname,schoolid) {
    return request({
        url:`/api/MVCTest/school/update`,
        method:'PUT',           //请求方式
        params:{                //传入值
        },
        data:{
            idList:schoolid,
            info:{
                name:schoolname
            },
        }
    })
}
//*******************增加学校*****************
export  function  getSchoolinsert(schoolname) {
    return request({
        url:`/api/MVCTest/school/insert`,
        method:'POST',           //请求方式
        params:{                //传入值
        },
        data:{
            info:{
                name:schoolname
            },
        }
    })
}