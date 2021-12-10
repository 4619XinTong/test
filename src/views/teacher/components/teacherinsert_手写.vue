<template>
    <div class="insertdatain">
        <h3>添加老师的信息:</h3>
        <div>教资编号：<input type="text" @blur="teanumber" v-model="teaitem.realId">
            <span v-if="teaflag1" class="teasty">☒ 格式不正确，教资编号为大于7位的数字!</span>
            <span v-else-if="isteaflag1" style="color: green">☑</span>
        </div>
        <div>
            姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名： <input type="text" @blur="teaname" v-model="teaitem.name">
            <span v-if="teaflag2"  class="teasty">☒ 格式不正确，姓名只能是中文!</span>
            <span v-else-if="isteaflag2" style="color: green">☑</span>
        </div>
        <div>
            学&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;科：<input type="text" @blur="teateach" v-model="teaitem.teachCourseName">
            <span v-if="teaflag3" class="teasty">☒ 格式不正确，没有该学科!</span>
            <span v-else-if="isteaflag3" style="color: green">☑</span>
        </div>
        <div>
            学校名称：<input type="text" v-model="$store.state.schoolname"  readonly="readonly">
        </div>
        <div>
            <button class="buttea" @click="teaclean">返 回</button>
            <button class="buttea" @click="submittea">提 交</button>
        </div>
    </div>
</template>
<script>
    import {

        getTeacherinsert
    } from "../../../network/teacher";
    export default {
        data() {
            return {
                //弹窗标记
                //添加老师的信息信息储存
                teaitem:{
                    "id":"",
                    "realId":"",
                    "name":"",
                    "teachCourseName":"",
                    "schoolName":this.$store.state.schoolname,
                },
                // 错误提示1~3
                teaflag1:false,
                teaflag2:false,
                teaflag3:false,
                //错误提示的小角标1~3
                isteaflag1:false,
                isteaflag2:false,
                isteaflag3:false,
            }
        },
        methods:{
            //*********************************老师信息添加**************************
            submittea(){
                if (this.teaitem.realId!==''
                    && this.teaitem.name!=''
                    && this.teaitem.teachCourseName!=''
                    && this.teaitem.schoolName!=''
                    && this.teaflag1!=true
                    && this.teaflag2!=true
                    && this.teaflag3!=true){
                    console.log(this.teaitem);
                    getTeacherinsert(this.teaitem).then(res =>{
                        alert(this.teaitem.name+"老师的信息已添加成功")
                        this.$router.replace('/student');
                    }).catch(err =>{
                        alert("信息填写不完整，老师信息添加失败")
                    })
                }
                else {
                    alert("信息填写不完整，老师信息添加失败")
                }

            },
            teaclean(){
                this.$emit('teaclean')
            },
            teanumber(){
                if (/[\d]{7,8}/.test(this.teaitem.realId)){
                    this.teaflag1=false
                }else {
                    this.teaflag1=true
                    this.isteaflag1=true
                }
            },
            teaname(){
                if (/^[\u4e00-\u9fa5]{1,20}/.test(this.teaitem.name)){
                    this.teaflag2=false
                }else {
                    this.teaflag2=true
                    this.isteaflag2=true
                }
            },
            teateach(){
                if (this.teaitem.teachCourseName=="美术"||
                    this.teaitem.teachCourseName=="语文"||
                    this.teaitem.teachCourseName=="数学"||
                    this.teaitem.teachCourseName=="英语"||
                    this.teaitem.teachCourseName=="品德"||
                    this.teaitem.teachCourseName=="科学"){
                    this.teaflag3=false
                }else {
                    this.teaflag3=true
                    this.isteaflag3=true
                }
            },
            tealook(a){
                this.tabflag=false
            },
        },
        created() {
            this.teaitem.realId=''
            this.teaitem.name=''
            this.teaitem.teachCourseName=''
            this.teaitem.schoolName=this.$store.state.schoolname
        }
    };
</script>

<style scoped>
    .insertdatain div{
        margin: 20px 0px;
    }
    .insertdatain div span{
        position: absolute;
        margin-left: 10px;
    }
    .insertdatain .buttea{
        height: 25px;
        width: 50px;
        margin-left: 50px;
    }
    .insertdatain .teasty{
        color: red;
        font-size: 13px;
    }
</style>