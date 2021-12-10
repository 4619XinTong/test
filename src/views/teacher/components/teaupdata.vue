<template>
    <el-dialog title="老师信息更新"
               :model-value="dialogFormVisible"
               :before-close="opendialog"
    >
        <el-form :model="ruleForm"
                 :rules="rules"
                 ref="ruleForm"
                 label-width="100px"
                 style="padding-left:15%"
        >
            <el-form-item label="教资编号：" prop="realId">
                <el-input style="display: inline-block;width: 70%;" v-model="ruleForm.realId"></el-input>
            </el-form-item>
            <el-form-item label="老师姓名：" prop="name">
                <el-input style="display: inline-block;width: 70%;" v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="教学科目：" prop="teachCourseName">
                <el-input style="display: inline-block;width: 70%;" v-model="ruleForm.teachCourseName"></el-input>
            </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">更新信息</el-button>
            <el-button @click="resetForm('ruleForm')">还原信息</el-button>
        </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script>
    import {
        getTeacherupdata
    } from "../../../network/teacher";

    export default {
        name: "schoolupdata",
        data(){
            return{
                dialogFormVisible:true,
                ruleForm:{
                    id:this.$store.state.updatanum.id,
                    realId:this.$store.state.updatanum.realId,
                    name:this.$store.state.updatanum.name,
                    teachCourseName:this.$store.state.updatanum.teachCourseName,
                },
                rules: {
                    realId: [
                        { required: true, message: '请输入教资编号', trigger: 'blur' },
                        { pattern:/^[\d]{7,8}$/, message: '教资编号为 7 到 8 位数字', trigger: 'blur' }
                    ],
                    name: [
                        { required: true, message: '请输入教师姓名', trigger: 'blur' },
                        { pattern:/^[\u4e00-\u9fa5]{1,50}$/, message: '老师姓名只能为中文', trigger: 'blur' }
                    ],
                    teachCourseName: [
                        { required: true, message: '请输入教学科目', trigger: 'blur' },
                        { pattern:/^[语文|数学|英语|美术|品德|科学]{2,2}$/,message: '请输入正确的学科', trigger: 'blur' }
                    ],
                }
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        getTeacherupdata(this.ruleForm).then(res=>{
                            console.log(this.ruleForm);
                            alert('老师'+this.ruleForm.name+'的信息更新成功!');
                            this.$router.replace('/student')
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
                            this.$emit('submitForm',false)
                        })
                        .catch(err=> {

                        });
            },
        },
        created() {
        }
    }
</script>

<style scoped>

</style>