import{request} from "./request";

//******************根据信息进行查询*************
export function getTeacherData(teachname,schoolname) {
    return request({
        url:`/api/MVCTest/teacher/get`,
        method:'post',
        params:{
        },
        data:{
            info:{
                schoolName:schoolname,
                name:teachname
            }
        }
    })
}


//****************根据id查询全部****************
// export function getTeacherData2(i) {
//     return request({
//         url:`/api/MVCTest/teacher/get/`+i,
//         // url:`/api/MVCTest/teacher/get`,
//         method:'get',
//         params:{
//             // "info":{
//             //     "schoolName":i
//             // }
//         }
//     })
// }
// ****************根据学校查全部*****************
export function getTeacherschAll(schoolname,schname) {
    return request({
        url:`/api/MVCTest/teacher/get`,
        // url:`/api/MVCTest/teacher/get`,
        method:'post',
        params:{
        },
        data:{
            info:{
                name:schname,
                schoolName:schoolname
            }
        }
    })
}
//****************增加信息****************
export function getTeacherinsert(i) {
    return request({
        url:`/api/MVCTest/teacher/insert`,
        // url:`/api/MVCTest/teacher/get`,
        method:'post',
        params:{
        },
        data:{
            infoList:[i]
        }
    })
}
//***************删除信息***************
export function getTeacherdelete(idList) {
    return request({
        // url:`/api/MVCTest/teacher/get/`+i,
        url:`/api/MVCTest/teacher/delete`,
        // ?infoIdList=${a}
        method:'post',
        params:{

        },
        data:{
            idList
        }
    })
}
//***********************修改信息************************
export function getTeacherupdata(teaupdata) {
    return request({
        // url:`/api/MVCTest/teacher/get/`+i,
        url:`/api/MVCTest/teacher/update`,
        method:'PUT',
        params:{
            // idList
        },
        data:{
            idList:[teaupdata.id],
            info:{
                realId: teaupdata.realId,
                name:teaupdata.name,
                teachCourseName:teaupdata.teachCourseName,
            }
        }
    })
}

