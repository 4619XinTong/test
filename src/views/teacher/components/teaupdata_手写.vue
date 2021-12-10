<template>
    <div>
        <tr>
            <td>
                <input type="text" @blur="teanumber" placeholder="输入教资编号"  v-model="updataArray.uprealid">
            </td>
            <td>
                <input type="text" @blur="teaname" placeholder="输入姓名" v-model="updataArray.upname">
            </td>
            <td>
                <input type="text" @blur="teateach" placeholder="输入科目" v-model="updataArray.upteachname">
            </td>
            <td>
                <button @click="upsubmit">提交</button>
                <button @click="upcancel(can)">取消</button>
            </td>
        </tr>
        <tr class="updatanext">
            <td><span v-if="teaflag1">教资编号为7~8位数字 !</span></td>
            <td><span v-if="teaflag2">姓名只能为中文 !</span></td>
            <td><span v-if="teaflag3">输入的学科不存在 !</span></td>
            <td></td>
        </tr>
    </div>

</template>

<script>
    import {getTeacherupdata} from "../../../network/teacher";

    export default {
        name: "teaupdata",
        props: ['teaupdataid']
        ,
        data(){
            return{

                updataArray:{
                    uprealid:"",
                    upname:"",
                    upteachname:"",
                },
                can:null,
                teaflag1:false,
                teaflag2:false,
                teaflag3:false,
                allteaflag:false,
            }
        },
        methods:{
            upsubmit(){
                if (this.updataArray.uprealid!=''&&
                this.upname!=''&&
                this.upteachname!=''&&
                this.teaflag1!=true &&
                this.teaflag2!=true &&
                this.teaflag3!=true ){
                    getTeacherupdata(this.teaupdataid,this.updataArray).then(res =>{
                        alert(this.upname+"老师的信息修改成功")
                        this.$router.replace('/student');
                    }).catch(err =>{
                    })
                }else {
                    alert('信息填写不完整，修改失败！')
                }
            },
            upcancel(can) {
                this.$emit('upcancel',can)
                this.teaflag1=false
                this.teaflag2=false
                this.teaflag3=false
            },
            teanumber(){
                if (/[\d]{7}/.test(this.updataArray.uprealid)){
                    this.teaflag1=false
                }else {
                    this.teaflag1=true
                }
            },
            teaname(){
                if (/^[\u4e00-\u9fa5]{1,20}/.test(this.updataArray.upname)){
                    this.teaflag2=false
                }else {
                    this.teaflag2=true
                }
            },
            teateach(){
                if (this.updataArray.upteachname=="美术"||
                    this.updataArray.upteachname=="语文"||
                    this.updataArray.upteachname=="数学"||
                    this.updataArray.upteachname=="英语"||
                    this.updataArray.upteachname=="品德"||
                    this.updataArray.upteachname=="科学"){
                    this.teaflag3=false
                }else {
                    this.teaflag3=true
                }
            }
        },
    }
</script>

<style scoped>
    tr{
        height: 60px;
        color: #0022ff;
        width: 80%;
        display: flex;
        align-items:center;/*垂直居中*/
        margin-left: 9%;
        background-color: white;
    }
    tr:nth-of-type(1){
        border-radius: 10px 10px 0  0;
        box-shadow: #9d9595 2px 1px;
    }
    tr:nth-of-type(2){
        border-radius: 0  0 10px 10px;
        box-shadow: #9d9595 2px 1px;
    }
    tr td{

        flex: 1;
        align-items:center;/*垂直居中*/
        justify-content: center;/*水平居中*/
        text-align: center;
    }
    tr td input{
        width: 100px;
    }
    tr td button{
        height: 30px;
        width: 55px;
        margin-left: 3px;
        border-radius:10px;
        box-shadow: #b0afaf 1px 2px;
    }
    tr td button:nth-of-type(1){
        background-color: red;
    }
    .updatanext{
        height: 10px;
    }
    .updatanext td{
        font-size: 12px;
        position: relative;
        bottom: 11px;
        color: red;
    }
</style>