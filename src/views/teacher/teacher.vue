<template>
    <div class="Allbody">
        <div class="teainput">
            <el-input  placeholder="输入老师姓名：例如：××" v-model="teachname" type="text" style="width: 300px;"></el-input>
            <el-button  @click="teaclick">查询</el-button>
            <el-button  @click="teainsert">添加</el-button>
        </div>

        <!--         ******************************显示全部老师信息******************************-->
        <!--                :default-sort => prop：哪一列进行排序 order排列方式sortable:正序；-->
        <el-table
                ref="multipleTable"
                :data="teadataall.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                stripe
                style="width:99%"
                :default-sort="{prop:'realId',order:'sortable'}"
                tooltip-effect="dark"
                height="400px"
                @selection-change="handleSelectionChange"
                class="buttable"
        >
                <el-table-column
                        class="buttable-column"
                        type="selection"
                        >
                </el-table-column>
                <el-table-column
                        class="buttable-column"
                        prop="realId"
                        label="教资编号"
                        >
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="姓名"
                        >
                </el-table-column>
            <el-table-column
                    prop="teachCourseName"
                    label="教学科目"
                    >
            </el-table-column>
            <el-table-column
                    width="250"
                    label="操作">
                <template #default="scope">
                    <el-button type="text" size="small" @click="teadelete(scope.row.id)">删除✘</el-button>
                    <el-button type="text" size="small" @click="updatateach(scope.row)">修改✎</el-button>
                </template>
            </el-table-column>
        </el-table>
<!--      *********  分页组件***********-->
            <el-pagination
                    style="text-align: center"
                    @current-change="current_change"
                    layout="total,prev, pager, next, jumper"
                    :page-size="pagesize"
                    :total="total"
                    background
            >
            </el-pagination>
        <!-- ***************   弹窗更新信息********************-->
        <div v-if="updataflag">
            <teaupdata @submitForm="issubmitForm"></teaupdata>
        </div>
<!--        *******************全选删除********************-->
        <div style="margin-top: 20px">
            <el-button @click="fromdelete(multipleSelection)">删除全部选中</el-button>
            <el-button @click="toggleSelection()">取消选择</el-button>
        </div>
<!--              ******************添加老师的信息****************     -->
        <div v-show="insertflag">
            <teacherinsert @submitForm="issubmitForm"></teacherinsert>
        </div>
    </div>
</template>
<script>
    import teaupdata from "./components/teaupdata";
    import teacherinsert from "./components/teacherinsert";
    import {
        getTeacherdelete,
        getTeacherschAll
    } from "../../network/teacher";
    export default {
        name: "teacher",
        components:{
            teaupdata,
            teacherinsert,
        },
        props:{
            schoolname:String
        },
        data(){
            return{
                //输入的老师的姓名
                teachname:'',
                //老师全部信息
                teadataall:[],
                //添加信息弹窗
                insertflag:false,
                //更新弹窗
                updataflag:false,
                // 储存选中的数据的数
                multipleSelection:null,
                //*******分页所用数据*********
                total:20,  //默认数据总数
                pagesize:5,//每页数据条数
                currentPage:1,//默认开始页面

            }
        },
        created(){

            //*********************根据学校查询全部**********************
            getTeacherschAll(this.$store.state.schoolname).then(res =>{
                this.teadataall=res.data
                //**********获取老师的个数返给分页个数********************
                this.total=this.teadataall.length;
            }).catch(err =>{
                console.log("请求失败");
            })

        },
        methods: {
            //element 删除和编辑
            handleEdit(index, row) {
                console.log(index, row);
            },
            handleDelete(index, row) {
                console.log(index, row);
            },
            //清空所有选中项
            toggleSelection() {
                this.$refs.multipleTable.clearSelection()
            },
            handleSelectionChange(val) {
                this.multipleSelection = val
            },
            //**************************根据姓名查询单个*****************************
            teaclick() {
                getTeacherschAll(this.$store.state.schoolname, this.teachname).then(res => {
                    this.teadataall = res.data
                    //**********获取老师的个数返给分页个数********************
                    this.total=this.teadataall.length;
                }).catch(err => {
                    console.log("请求失败");
                })
            },
            //***************删除信息****************************
            teadelete(a) {
                let b = [a]
                this.$confirm('您确定要删除老师的信息么，删除后所有信息都会消失', '注意', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    // 正常跳转
                    getTeacherdelete(b).then(res => {
                        this.$message.success("老师的信息删除成功")
                        this.$router.replace('/student');
                    }).catch(err => {
                        alert("删除失败！")
                    })
                }).catch(() => {
                    // 如果取消跳转地址栏会变化，这时保持地址栏不变
                    // window.history.go(1)
                    this.$router.replace('/teacher')
                })
            },
            teainsert() {
                this.insertflag = true
            },
            //*******************删除全部选中信息*****************************
            fromdelete(mult) {
                let b = []
                if (mult!=null){
                this.$confirm('您确定要删除老师的信息么，删除后所有信息都会消失', '注意', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    // 正常跳转
                    for (let i = 0; i < mult.length; i++) {
                        b = [mult[i].id]

                            getTeacherdelete(b).then(res => {
                                this.$message.success("老师： " + mult[i].name + " 的信息删除成功")
                                this.$router.replace('/student');
                            }).catch(err => {
                                alert("删除失败！")
                            })
                    }
                }).catch(() => {
                    // 如果取消跳转地址栏会变化，这时保持地址栏不变
                    // window.history.go(1)
                    this.$router.replace('/teacher')
                })
                }else {
                    this.$message({
                        showClose: true,
                        message: '请选中数据！',
                        type: 'warning'
                    });
                }
            },
            //***************隐藏添加信息弹窗*****************
            issubmitForm() {
                this.insertflag = false
                this.updataflag = false
            },
            //******************更新信息***********
            updatateach(tea) {
                this.$store.commit('thisupdatanum', tea)
                this.updataflag = true
            },
            //**********分页所需要的1************
            current_change: function (currentPage) {
                this.currentPage = currentPage
            },
            //**********分页所需要的2************
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
        },
        computed:{
        }

    }
</script>

<style scoped>
    *{
        list-style: none;
    }
    div{
        background-color: #fff;
    }
    .teainput{
        /*text-align: center;*/
    }
    .buttable{
    }
    .Allbody{
        margin-left: 50px;
    }
</style>