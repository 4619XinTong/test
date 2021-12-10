<template>
    <div class="in">
        <template v-if="!isShow">
        <template v-if="!isShows">
        <el-input v-model="studentName" placeholder="请输入查询姓名" clearable style="width: 280px"/>
        <el-button @click="Chaxun">查询</el-button>
        <el-button @click="isShows=!isShows">添加</el-button>
        <el-table
                :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                :default-sort="{prop:'date',order:'descending'}"
                  stripe style="width: 99%"
                  height="400" ref="multipleTable"
                  type="expand"
                  @selection-change="handleSelectionChange"
        >
        <el-table-column type="selection" width="55" />
        <el-table-column prop="name" label="姓名 "  />
        <el-table-column prop="realId" label="学号" />
        <el-table-column prop="gradeName" label="年级" />
        <el-table-column prop="className" label="班级"  />
        <el-table-column prop="classroomRealId" label="教室"  />
        <el-table-column fixed="right" label="操作" >
            <template   #default="props">
                <el-button type="text" size="small" @click="DeleteStudent(props.row.id)">删除✘</el-button>
                <el-button type="text" size="small" @click="updataStudent(props.row.id),isShow=!isShow">修改✎</el-button>
            </template>
        </el-table-column>
    </el-table>
            <el-pagination
                    style="text-align: center"
                    @current-change="current_change"
                    layout="total,prev, pager, next,jumper"
                    :total="total"
                    background
            >
            </el-pagination>
            <div style="margin-top: 20px">
                <el-button @click="fromdeletes(multipleSelection)">
                    删除全部选中
                </el-button>
                <el-button @click="toggleSelection()">取消选择</el-button>
            </div>

    </template>
    </template>
     <el-dialog v-model="isShow" title="修改提交"  >
                <el-form  ref="xiugai" :model="xiugai" :rules="rules">
                    <el-form-item label="姓名" width="120px" prop="xingming">
                        <el-input v-model="xiugai.xingming" :onkeyup="xiugai.xingming = xiugai.xingming.replace(/\s+/g,'')" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="学号" width="120px" prop="xuehao">
                        <el-input v-model.number="xiugai.xuehao"  autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="年级" width="120px" prop="nianji">
                        <el-select v-model="xiugai.nianji" placeholder="请选择年级">
                            <el-option label="一年级" value="一年级"></el-option>
                            <el-option label="二年级" value="二年级 "></el-option>
                            <el-option label="三年级" value="三年级 "></el-option>
                            <el-option label="四年级" value="四年级 "></el-option>
                            <el-option label="五年级" value="五年级 "></el-option>
                            <el-option label="六年级" value="六年级 "></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="班级" width="120px" prop="banji">
                        <el-select v-model="xiugai.banji" placeholder="请选择班级">
                            <el-option label="一班" value="一班"></el-option>
                            <el-option label="二班" value="二班 "></el-option>
                            <el-option label="三班" value="三班 "></el-option>
                            <el-option label="四班" value="四班 "></el-option>
                            <el-option label="五班" value="五班 "></el-option>
                            <el-option label="六班" value="六班"></el-option>

                        </el-select>
                    </el-form-item>
                    <el-form-item label="教室" width="120px" prop="jiaoshi">
                        <el-input v-model.number="xiugai.jiaoshi" autocomplete="off"></el-input>
                    </el-form-item>
                </el-form>
                <template #footer>
      <span class="dialog-footer">
        <el-button @click="quxiao">取消</el-button>
        <el-button type="primary" @click="xiugaitijiao()">提交</el-button
        >
      </span>
                </template>
     </el-dialog>
     <el-dialog v-model="isShows" title="添加学生">
                <el-form ref="xiugais" :model="xiugais" :rules="rules">
                    <el-form-item label="姓名" width="120px" prop="xingmings">
                        <el-input v-model.trim="xiugais.xingmings" :onkeyup="xiugais.xingmings = xiugais.xingmings.replace(/\s+/g,'')" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="学号" width="120px" prop="xuehaos">
                        <el-input v-model.number="xiugais.xuehaos"  autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="年级" width="120px" prop="nianjis">
                        <el-select v-model="xiugais.nianjis" placeholder="请选择年级" @click="quChong">
                            <el-option v-for="(item,i) in arr" :key="i" :label="item.gradeName" :value="item.gradeName" >
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="班级" width="120px" prop="banjis" >
                        <el-select v-model="xiugais.banjis" placeholder="请选择班级" @click="quChong1">
                            <el-option v-for="(item,i) in arr1" :key="i" :label="item.className" :value="item.className" >
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="教室" width="120px" prop="jiaoshis">
                        <el-input v-model.number="xiugais.jiaoshis" autocomplete="off"></el-input>
                    </el-form-item>
                </el-form>
                <template #footer>
                          <span class="dialog-footer">
                            <el-button @click="tianjiaquxiao">取消</el-button>
                            <el-button type="primary" @click="TianjiaTijiao">提交</el-button
                            >
                          </span>
                </template>
    </el-dialog>
    </div>
</template>

<script>
    import {useStore} from 'vuex'
    import axios from 'axios'
    import {ElMessage, ElMessageBox} from "element-plus";
    import Router from "../../router";
    import { defineComponent, } from 'vue'

    export default defineComponent( {
        name: "student",
        data() {
            const validateAcquaintance = (rule, value, callback) => {
                if (!value) {
                    callback(new Error('不能为空'))
                }
                value = Number(value)
                if (typeof value === 'number' && !isNaN(value)) {
                    if (value < 1000000000 || value >9999999999 ) {
                        callback(new Error('学号长度为10位'))
                    } else {
                        callback()
                    }
                } else {
                    callback(new Error('学号为数字'))
                }
            }
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
                arr:[],
                arr1:[],
                options: [],
                shuzi:'',
                total:30,  //默认数据总数
                pagesize:5,//每页数据条数
                currentPage:1,//默认开始页面
                xiugai:{
                    xingming:'',
                    xuehao:'',
                    nianji:'',
                    banji:'',
                    jiaoshi:''
                },
                xiugais:{
                    xingmings:'',
                    xuehaos:'',
                    nianjis:'',
                    banjis:'',
                    jiaoshis:''
                },
                isShow:false,
                isShows:false,
                multipleSelection:null,
                rules:{
                    xingming:[
                        {
                            required: true,
                            message: '请输入姓名',
                            trigger: 'blur',
                        },
                        {
                            required: true,
                            pattern:/^[\u4e00-\u9fa5_a-zA-Z]{2,10}/,
                            message:'姓名为中文或者英文,长度为2-10位'
                        },
                    ],
                    xuehao:[
                        {
                            required: true,
                            validator: validateAcquaintance, // 自定义验证
                            trigger: 'blur'
                        }
                    ],
                    nianji:[
                        {
                            required: true,
                            message: '请输入年级',
                            trigger: 'change'
                        }
                    ],
                    banji:[
                        {
                            required: true,
                            message: '请输入班级',
                            trigger: 'change'
                        }
                    ],
                    jiaoshi:[
                        {
                            required: true,
                            validator: banji, // 自定义验证
                            trigger: 'blur'
                        }
                    ],
                    xingmings:[
                        {
                            required: true,
                            message: '请输入姓名',
                            trigger: 'blur',
                        },
                        {
                            required: true,
                          pattern:/^[\u4e00-\u9fa5_a-zA-Z]{2,10}/,
                            message:'姓名为中文或者英文,长度为2-10位'
                        },

                    ],
                    xuehaos:[
                        {
                            required: true,
                            validator: validateAcquaintance, // 自定义验证
                            trigger: 'blur'
                        }
                    ],
                    nianjis:[
                        {
                            required: true,
                            message: '请输入年级',
                            trigger: 'blur',
                        }
                    ],
                    banjis:[
                        {
                            required: true,
                            message: '请输入班级',
                            trigger: 'change'
                        }
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
            axios.post(`http://localhost:8080/students/get`, {
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
            axios.post(`http://localhost:8080/classRooms/get`, {
                    "info": {
                        schoolName: store.state.schoolname
                    }
                }
            ).then(
                response => {
                    this.options=response.data.data
                    // console.log(this.options)
                    // console.log('value+'+this.options.gradeName)
                    // console.log('label+'+this.options.gradeName)
                    // console.log(this.tableData)
                },
                error => {
                    console.log('请求失败', error.message,)
                },)
        },
        created() {
            this.total=this.tableData.length;
        },
        methods:{
            //查询
            Chaxun(){
            axios.post(`http://localhost:8080/students/get`,{
                    "info": {
                        "name": this.studentName,
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
                DeleteStudent(id){
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
                    axios.delete(`http://localhost:8080/students/delete/${id}`).then(
                        response => {
                            if (response.data.data == null) {
                                ElMessage({
                                    type: 'success',
                                    message: '删除成功',
                                })
                                Router.replace({
                                    path: '/back'
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
             updataStudent(id) {
                //console.log(id)
                 axios.get(`http://localhost:8080/students/get/${id}`).then(
                    response => {
                        //console.log('请求成功', response.data.data)
                        this.xiugai.xingming=response.data.data.name
                        this.xiugai.xuehao=response.data.data.realId
                        this.xiugai.nianji=response.data.data.gradeName
                        this.xiugai.banji=response.data.data.className
                        this.xiugai.jiaoshi=response.data.data.classroomRealId
                        this.shuzi=response.data.data.id
                    }, error => {
                        console.log('请求失败', error.message,)
                    })
            },
            xiugaitijiao(){
                //console.log(this.shuzi,this.xiugai.xingming,this.xiugai.xuehao,this.xiugai.nianji, this.xiugai.banji,this.xiugai.jiaoshi,this.$store.state.schoolname)
                if (this.xiugai.xingming==''||this.xiugai.xuehao==''||this.xiugai.nianji==''||this.xiugai.banji==''||this.xiugai.jiaoshi==''){
                    alert('请输入完整!')
                }else {
                axios.put(`http://localhost:8080/students/update`, {
                    "idList": [
                        this.shuzi
                    ],
                    "info": {
                        "name": this.xiugai.xingming,
                        "realId": this.xiugai.xuehao,
                        "gradeName": this.xiugai.nianji,
                        "className": this.xiugai.banji,
                        "classroomRealId": this.xiugai.jiaoshi,
                        "schoolName": this.$store.state.schoolname
                    }
                }).then(
                    response => {
                        console.log('请求成功', response.data)
                        ElMessage({
                            message: '修改成功',
                            type: 'success',
                        })
                        //alert('修改成功')
                        Router.replace({
                            path: '/back'
                        })
                    }, error => {
                        console.log('请求失败', error.message,)
                    })
                }
            },
            quxiao(){
                ElMessage('修改取消'),
                Router.replace({
                    path: '/back'
                })
            },
            tianjiaquxiao(){
                ElMessage('添加取消'),
                    Router.replace({
                        path: '/back'
                    })
            },
            TianjiaTijiao(){
                if (this.xiugais.xingmings==''||this.xiugais.xuehaos==''||this.xiugais.nianjis==''||this.xiugais.banjis==''||this.xiugais.jiaoshis==''){
                    alert('请输入完整!')
                }else {
                    axios.post(`http://localhost:8080/students/insert`, {
                        "infoList":[
                            {
                                "name":this.xiugais.xingmings,
                                "realId": this.xiugais.xuehaos,
                                "gradeName":this.xiugais.nianjis,
                                "className":this.xiugais.banjis,
                                "classroomRealId":this.xiugais.jiaoshis,
                                "schoolName":this.$store.state.schoolname
                            }
                        ]
                    })
                        .then(function (response) {
                            //console.log(response.data.status);
                            if (response.data.status==500){
                                ElMessage.error({
                                    message: `添加失败`,
                                })
                            }else {
                                ElMessage({
                                    message: '添加成功',
                                    type: 'success',
                                })
                            }

                            Router.replace({
                                path:'/back'
                            })
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
            }
            },
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
                         axios.delete(`http://localhost:8080/students/delete/${b}`).then(
                             response => {
                                 if (response.data.data == null) {
                                     ElMessage({
                                         type: 'success',
                                         message: '删除成功',
                                    })
                                     Router.replace({
                                         path: '/back'
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
            handleChange(value) {
                console.log(value);
            },
            toggleSelection() {
                this.$refs.multipleTable.clearSelection()
            },
            handleSelectionChange(val) {
                this.multipleSelection = val
            },
            current_change:function(currentPage){
                this.currentPage = currentPage;
            },
            //去重
            quChong() {
                let arr =this.options
                //console.log(arr);
                //console.log('--------------------');
                let arr1 = this.unique(arr);
                //console.log(arr1);
                this.arr=arr1
            },
            unique(arr) {
                const res = new Map();
                return arr.filter((arr) => !res.has(arr.gradeName) && res.set(arr.gradeName));
            },
            quChong1() {
                this.options.gradeName = this.xiugais.nianjis
                //console.log(this.$store.state.schoolName)
                axios.post(`http://localhost:8080/classRooms/get`, {
                        "info": {
                            "gradeName": this.options.gradeName,
                            schoolName: this.$store.state.schoolname
                        }
                    }
                ).then(
                    response => {
                        this.arr1 = response.data.data
                        //console.log(this.arr1)
                        //console.log('value+' + this.arr1.gradeName)
                        //console.log('label+' + this.arr1.gradeName)
                    },
                    error => {
                        //console.log('请求失败', error.message,)
                    },)
            }
        },
        })
</script>

<style scoped>
.in{
    margin-left: 50px;
}
</style>
