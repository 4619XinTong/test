<template>
    <div class="bombody">
        <div class="inbombody">
           <h2>学校名称注册</h2>
            <p>输入您要注册的学校名称:</p>
            <input type="text" placeholder="学校名称" v-model="schoolname" @blur="notnull">
            <p class="notnull" v-if="notnullflag">学校名称不能为空 !</p>
        <div>
            <button @click="openclose">返回</button>
            <button @click="logschool">注册</button>
        </div>
        </div>
    </div>
</template>

<script>
    import {getSchoolinsert} from "../../network/school";

    export default {
        name: "SchoolName",
        data(){
            return{
                schoolname:'',
                notnullflag:false,
            }
        },
        methods:{
            logschool(){
                if (this.schoolname!=''){
                    getSchoolinsert(this.schoolname).then(res =>{
                        alert(this.schoolname+"注册成功！")
                        this.$router.go(0)
                    }).catch(err =>{
                        alert("登陆失败，不存在该学校")
                    })
                }else {
                    this.notnullflag=true
                }
            },
            openclose(){
                this.$router.go(0)
            },
            notnull(){
                if(this.schoolname==''){
                    this.notnullflag=true
                }else {
                    this.notnullflag=false
                }
            }
        },


    }
</script>

<style scoped>
    .bombody{
        position:absolute;
        width:100%;
        height:100%;
        display: flex;
        background-color: #e9e9e9;
        align-items:center;/*垂直居中*/
        justify-content: center;/*水平居中*/
        text-align: center;
    }
    .inbombody{
        padding-top: 20px;
        text-align: center;
        float: initial;
        background-color: white;
        width: 400px;
        height: 230px;
        border: 1px solid #d6d5d5;
        box-shadow: #6e6969 1px 1px 1px;
        border-radius:8px;
        line-height: 40px;
    }
    .inbombody p{
        float: left;
        padding-left:25px ;
    }
    .inbombody input{
        width: 350px;
        height: 40px;
        border-radius:5px;
        border: 2px solid #36A7F2;
    }
    .inbombody button{
        font-size: 14px;
        height: 30px;
        width: 50px;
        float: right;
        margin:30px 20px 0 0px;
    }
    .notnull{
        color: red;
        font-size: 14px;
    }
</style>