module.exports = {
    pages: {
        index:{
            //入口
            entry:'src/main.js'
        }
    },
    lintOnSave:false,//关闭语法检查

    //开启多个代理服务器
    devServer: {
        proxy: {
            '/api': {//   /api可以自定义
                target: 'http://114.55.246.169:8080',
                pathRewrite:{'^/api':''},//把请求资源带过去的api变成空
                ws: true,//用于支持websocked
                changeOrigin: true//不写默认值是true，用于控制请求头中的host值
            },
            '/students': {//   /atguigu可以自定义
                target: 'http://114.55.246.169:8080/MVCTest/student',
                pathRewrite:{'^/students':''},//把请求资源带过去的atguigu变成空
                // ws: true,//用于支持websocked
                // changeOrigin: true//不写默认值是true，用于控制请求头中的host值
            },
            '/classRooms': {//   /atguigu可以自定义
                target: 'http://114.55.246.169:8080/MVCTest/class',
                pathRewrite:{'^/classRooms':''},//把请求资源带过去的atguigu变成空
                // ws: true,//用于支持websocked
                // changeOrigin: true//不写默认值是true，用于控制请求头中的host值
            },
            '/Jiaoshi': {
                target: 'http://114.55.246.169:8080/MVCTest/classroom',
                pathRewrite:{'^/Jiaoshi':''},
                // ws: true,//用于支持websocked
                // changeOrigin: true//不写默认值是true，用于控制请求头中的host值
            },
        }
    }
}
