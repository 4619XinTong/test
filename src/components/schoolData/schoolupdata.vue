<template>
    <el-dialog title="学校名称更新"
               :model-value="dialogFormVisible"
               :before-close="opendialog"
    >
        <el-form :model="schfrom"
                 :rules="rules"
                 ref="schfrom"
                 label-width="100px"
                 style="padding:0 0 5% 15%;"
        >
            <el-form-item label="学校名称：" prop="schoolname">
                <el-input style="display: inline-block;width: 300px;" v-model="schfrom.schoolname"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('schfrom')">更新名称</el-button>
                <el-button @click="resetForm('schfrom')">还原名称</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script>
    import {getSchoolUpdata} from "../../network/school";

    export default {
        name: "teaupdata",
        data(){
            return{
                dialogFormVisible:true,
                schfrom:{
                    schoolname:this.$store.state.schoolname
                },
                rules: {
                    schoolname: [
                        { required: true, message: '请输入学校姓名', trigger: 'blur' },
                        { pattern:/^[\u4e00-\u9fa5]{1,50}$/, message: '学校名称只能为中文', trigger: 'blur' }
                    ],

                }
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert(this.$store.state.schoolid)
                        getSchoolUpdata(this.schfrom.schoolname,[this.$store.state.schoolid]).then(res=>{
                            alert('学校'+this.schfrom.schoolname+'的校名成功!,系统即将重启');
                            this.$router.go(0)
                        })
                    } else {
                        console.log('老师信息更新失败!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            opendialog(){
                this.$confirm('确认关闭？')
                    .then(res=> {
                        this.$emit('opendialog',false)
                    })
                    .catch(err=> {});
            },
        },
        created() {
        }
    }
</script>

<style scoped>

</style>