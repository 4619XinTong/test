<template>
    <div class="in" >
        <template v-if="!isShow">
            <template v-if="!isShows">
                <el-input v-model="xiugai.nianji" placeholder="请输入查年级" clearable style="width: 280px"/>
                <el-input v-model="xiugai.banji" placeholder="请输入查班级" clearable style="width: 280px"/>
                <el-button @click="ChaxunJiaoshi">查询</el-button>
                <el-button @click="TianjiaBanji,isShows=!isShows">添加</el-button>
                <el-table
                        :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                        :default-sort="{prop:'date',order:'descending'}"
                        stripe style="width: 99%" height="400"
                        ref="multipleTable"
                        type="expand" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" />
                    <el-table-column prop="gradeName" label="年级" />
                    <el-table-column prop="className" label="班级"  />
                    <el-table-column prop="realId" label="教室"  />
                    <el-table-column fixed="right" label="操作" >
                        <template   #default="props">
                            <el-button type="text" size="small" @click="DeleteBanji(props.row.id)">删除✘</el-button>
                            <el-button type="text" size="small" @click="updataBanji(props.row.realId,props.row.className,props.row.gradeName,props.row.id),isShow=!isShow">修改✎</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div style="margin-top: 20px">
                    <el-pagination
                            style="text-align: center"
                            @current-change="current_change"
                            layout="total,prev, pager, next,jumper"
                            :total="total"
                            background
                    >
                    </el-pagination>
                    <el-button @click="fromdeletes(multipleSelection)">
                        删除全部选中
                    </el-button>
                    <el-button @click="toggleSelection()">取消选择</el-button>
                </div>
            </template>
        </template>
        <div v-if="isShow">
            <el-dialog v-model="isShow" title="修改教室">
            <el-form ref="xiugai" :model="xiugai" :rules="rules">
                <el-form-item label="年级" width="120px" prop="nianji">
                    <el-input v-model="xiugai.nianji" placeholder="请输入年级" clearable style="width: 280px"/>
                </el-form-item>
                <el-form-item label="班级" width="120px" prop="banji">
                    <el-input v-model="xiugai.banji" placeholder="请输入班级" clearable style="width: 280px"/>
                </el-form-item>
                <el-form-item label="教室" width="120px" prop="jiaoshi">
                    <el-input v-model="xiugai.jiaoshi" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
      <span class="dialog-footer">
        <el-button @click="quxiao">取消</el-button>
        <el-button type="primary" @click="xiugaitijiaoJiaoshi">提交</el-button
        >
      </span>
            </template>
        </el-dialog>
        </div>
        <div v-if="isShows">
            <el-dialog v-model="isShows" title="添加教室">
                <el-form ref="xiugais" :model="xiugais" :rules="rules">
                    <el-form-item label="年级" width="120px" prop="nianjis">
                        <el-input v-model="xiugais.nianjis" placeholder="请输入年级" clearable style="width: 280px"/>
                    </el-form-item>
                    <el-form-item label="班级" width="120px" prop="banjis">
                        <el-input v-model="xiugais.banjis" placeholder="请输入班级" clearable style="width: 280px"/>
                    </el-form-item>
                    <el-form-item label="教室" width="120px" prop="jiaoshis">
                        <el-input v-model.number="xiugais.jiaoshis" autocomplete="off"></el-input>
                    </el-form-item>
                </el-form>
                <template #footer>
      <span class="dialog-footer">
        <el-button @click="Tianjiaquxiao">取消</el-button>
        <el-button type="primary" @click="TianjiaTijiaoJiaoshi">提交</el-button
        >
      </span>
                </template>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import {useStore} from 'vuex'
    import axios from 'axios'
    import {ElMessage, ElMessageBox} from "element-plus";
    import Router from "../../router";
    import { defineComponent } from 'vue'
    export default defineComponent({
        name: "Jiaoshi",
        data() {
            const banji = (rule, value, callback) => {
                if (!value) {
                    callback(new Error('不能为空'))
                }
                value = Number(value)
                if (typeof value === 'number' && !isNaN(value)) {
                    if (value < 100  || value >9999999999 ) {
                        callback(new Error('班级号长度最少3位'))
                    } else {
                        callback()
                    }
                } else {
                    callback(new Error('班级号为数字'))
                }
            }
            return {
                tableData: [],
                studentName:'',
                shuzi:'',
                total:30,  //默认数据总数
                pagesize:5,//每页数据条数
                currentPage:1,//默认开始页面
                multipleSelection:null,
                xiugai:{
                    nianji:'',
                    banji:'',
                    jiaoshi:''
                },
                xiugais:{
                    nianjis:'',
                    banjis:'',
                    jiaoshis:''
                },
                isShow:false,
                isShows:false,
                rules:{
                    nianji:[
                        {
                            required: true,
                            message: '请输入年级',
                            trigger: 'blur',
                        },
                        {
                            required: true,
                            pattern:/^[\u4e00-\u9fa5]{2,10}/,
                            message:'年级为中文,长度为2-10位'
                        },
                    ],
                    banji:[
                        {
                            required: true,
                            message: '请输入班级',
                            trigger: 'blur',
                        },
                        {
                            required: true,
                            pattern:/^[\u4e00-\u9fa5]{2,10}/,
                            message:'年级为中文,长度为2-10位'
                        },
                    ],
                    jiaoshi:[
                        {
                            required: true,
                            validator: banji, // 自定义验证
                            trigger: 'blur'
                        }
                    ],
                    nianjis:[
                        {
                            required: true,
                            message: '请输入年级',
                            trigger: 'blur',
                        },
                        {
                            required: true,
                            pattern:/^[\u4e00-\u9fa5]{2,10}/,
                            message:'年级为中文,长度为2-10位'
                        },
                    ],
                    banjis:[
                        {
                            required: true,
                            message: '请输入班级',
                            trigger: 'blur',
                        },
                        {
                            required: true,
                            pattern:/^[\u4e00-\u9fa5]{2,10}/,
                            message:'班级为中文,长度为2-10位'
                        },
                    ],
                    jiaoshis:[
                        {
                            required: true,
                            validator: banji, // 自定义验证
                            trigger: 'blur'
                        }
                    ],
                }
            }
        },
        mounted() {
            const store = useStore()
            //查询学校为。。。的请求
            axios.post(`http://localhost:8080/Jiaoshi/get`, {
                    "info": {
                        schoolName: store.state.schoolname
                    }
                }
            ).then(
                response => {
                    this.tableData = response.data.data
                    this.total=this.tableData.length
                    //console.log(this.tableData)
                },
                error => {
                    console.log('请求失败', error.message,)
                },)
        },
        methods:{
            //查询
            ChaxunJiaoshi(){
                axios.post(`http://localhost:8080/Jiaoshi/get`,{
                        "info": {
                            "gradeName": this.xiugai.nianji,
                            "className":this.xiugai.banji,
                            schoolName: this.$store.state.schoolname
                        }
                    }
                ).then(
                    response => {
                        // console.log('请求成功', response.data.data)
                        if (response.data.data == 0 ) {
                            ElMessage({
                                type: 'success',
                                message: '数据不存在',
                            })
                        }   else {
                            this.tableData=(response.data.data)
                            ElMessage({
                                type: 'success',
                                message: '查询成功',
                            })
                            // console.log("数据是"+students.list)
                        }
                    },
                    error => {
                        console.log('请求失败', error.message,)
                    },
                )},
            //删除
            DeleteBanji(id){
                //console.log(id)
                ElMessageBox.confirm(
                    '确定要删除么',
                    '请问',
                    {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                    }
                ).then(() => {
                    axios.post(`http://localhost:8080/Jiaoshi/delete`,{
                        idList:
                            [id]
                    }).then(
                        response => {
                            if (response.data.data == null) {
                                ElMessage({
                                    type: 'success',
                                    message: '删除成功',
                                })
                                Router.replace({
                                    path: '/back2'
                                })
                            }
                        }),error => {
                        console.log('请求失败', error.message,)
                    }
                })
                    .catch(() => {
                        ElMessage({
                            type: 'info',
                            message: '删除失败',
                        })
                    })
            },
            //修改
            updataBanji(realId,className,gradeName,id) {
                //console.log(realId,className,gradeName,id)
                axios.post(`http://localhost:8080/Jiaoshi/get`, {
                    "info": {
                        "gradeName":gradeName,
                        "className":className,
                        "realId":realId
                    }
                }).then(response => {
                    //console.log('请求成功', response.config.data)
                    this.xiugai.nianji=gradeName
                    this.xiugai.banji=className
                    this.xiugai.jiaoshi=realId
                    this.shuzi=id
                }, error => {
                    console.log('请求失败', error.message,)
                })
            },
            xiugaitijiaoJiaoshi(){
                if (this.xiugai.nianji==''||this.xiugai.banji==''||this.xiugai.jiaoshi==''){
                    alert('请输入完整!')
                }else {
                    //console.log(this.shuzi, this.xiugai.nianji, this.xiugai.banji, this.xiugai.jiaoshi, this.$store.state.schoolname)
                    axios.put(`http://localhost:8080/Jiaoshi/update`, {
                        "idList": [
                            this.shuzi
                        ],
                        "info": {
                            "gradeName": this.xiugai.nianji,
                            "className": this.xiugai.banji,
                            "realId": this.xiugai.jiaoshi,
                            "schoolName": this.$store.state.schoolname
                        }
                    }).then(
                        response => {
                            //console.log('请求成功', response.data)
                            ElMessage({
                                message: '修改成功',
                                type: 'success',
                            })
                            Router.replace({
                                path: '/back2'
                            })
                        }, error => {
                            console.log('请求失败', error.message,)
                        })
                }
            },
            quxiao(){
                ElMessage('修改取消'),
                Router.replace({
                    path: '/back2'
                })
            },
            Tianjiaquxiao(){
                ElMessage('添加取消'),
                    Router.replace({
                        path: '/back2'
                    })
            },
            TianjiaTijiaoJiaoshi(){
                if (this.xiugais.nianjis==''||this.xiugais.banjis==''||this.xiugais.jiaoshis==''){
                    alert('请输入完整!')
                }else {
                axios.post(`http://localhost:8080/Jiaoshi/insert`, {
                    "infoList":[
                        {
                            "gradeName":this.xiugais.nianjis,
                            "className":this.xiugais.banjis,
                            "realId":this.xiugais.jiaoshis,
                            "schoolName":this.$store.state.schoolname
                        }
                    ]
                })
                    .then(function (response) {
                        //console.log(response);
                        ElMessage({
                            message: '添加成功',
                            type: 'success',
                        })
                        Router.replace({
                            path:'/back2'
                        })
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }},
            //删除选中
            fromdeletes(mult){
                let b=[]
                this.$confirm('您确定要删除学生的信息么，删除后所有信息都会消失', '注意', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    for (let i = 0; i < mult.length; i++) {
                        b = [mult[i].id]
                        //console.log(b)
                        axios.post(`http://localhost:8080/Jiaoshi/delete`,{
                            idList: b
                        }).then(
                            response => {
                                if (response.data.data == null) {
                                    ElMessage({
                                        type: 'success',
                                        message: '删除成功',
                                    })
                                    Router.replace({
                                        path: '/back2'
                                    })
                                }
                            }), error => {
                            console.log('请求失败', error.message,)
                        }
                    }
                })
                    .catch(() => {
                        ElMessage({
                            type: 'info',
                            message: '删除失败',
                        })
                    })
            },
            toggleSelection() {
                this.$refs.multipleTable.clearSelection()
            },
            handleSelectionChange(val) {
                this.multipleSelection = val
            },
            current_change:function(currentPage){
                this.currentPage = currentPage;
            }
        }
    })
</script>

<style scoped>
    .in{
        margin-left: 50px;
    }
</style>
