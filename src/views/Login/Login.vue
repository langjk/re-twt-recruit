<script setup lang="ts">
    import { inject,ref } from 'vue';
    import { useRouter } from 'vue-router'
    import http from '@/utils/http'
    import { useStore } from 'vuex';
    const store = useStore(); 
type gloVar = {
    TWT:string,
    lightTWT:string
}
const globalVars:gloVar = inject<gloVar>('globalVars')!;
const TWT:string = globalVars.TWT;
    const router = useRouter();
    const account = ref('')
    const password = ref('')

    const loginCheck = () => {
        http.post("/v1/user/login",
        {account:account.value,password:password.value, })
        .then((res:{code:number,result:any})=>{
            if(res.code == 200){ 
                store.commit('SET_USER_TYPE', res.result.accountType); 
                localStorage.setItem('token', res.result.token);
                localStorage.setItem('accountType', res.result.accountType);
                if(res.result.accountType == 1){
                    store.commit('SET_USER_INFO', res.result.name); 
                    localStorage.setItem('nickname', res.result.name);
                    localStorage.setItem('uid', res.result.uid);
                    localStorage.setItem('major', res.result.major);
                    localStorage.setItem('grade', res.result.uid.slice(2,4) + '级');
                    localStorage.setItem('department', res.result.department);
                    localStorage.setItem('telephone', res.result.telephone);
                    localStorage.setItem('email', res.result.email);
                    localStorage.setItem('campus', res.result.campus);
                }
                else if(res.result.accountType > 1){
                    store.commit('SET_USER_SCALE', res.result.scale); 
                    store.commit('SET_CLUB_NAME', res.result.name);  
                    store.commit('SET_USER_INFO', res.result.name);  
                    localStorage.setItem('clubId',res.result.clubId);
                    localStorage.setItem('scale',res.result.scale);
                    localStorage.setItem('clubName', res.result.name);
                    localStorage.setItem('nickname', res.result.name);
                }
                router.push("/");
            }
        });
    }
</script>
<template>
    <div class="container">
        <el-header>
            <el-row class="slogan ">
                <img src="@/assets/logo.png" alt="twt" style="height:100%">
                <span class="title TWT">TWT</span>
                <span class="title STUDIO"> STUDIO</span>
            </el-row>
        </el-header>
        <el-main>
            <el-col class="login-box" justify="center">
                <div class="loginTitle">登录</div>
                <div class="hintText">用户名</div>
                <el-input v-model="account" placeholder="学号/社团简写"></el-input>
                <div class="hintText">密码</div>
                <el-input v-model="password" placeholder="密码" show-password></el-input>
                <el-button class="button" @click="loginCheck()">登录</el-button>
                <div class="reg">
                    <el-button link class="text register" onclick="window.open('https://i.twt.edu.cn/#/create')">注册</el-button>
                    <el-button link class="text" onclick="window.open('https://i.twt.edu.cn/#/login')">忘记密码</el-button>
                </div>
                <div class="hint">
                    1.组织账号申请方式请见首页帮助<br>
                    2.组织账号与个人天外天账号均可在此登录，但个人账号招募管理权限需先从组织账号添加。
                </div>
            </el-col>
        </el-main>
    </div>
</template>
<style scoped>
.container{
    background-image: url(@/assets/cover_bg.jpg);
    background-size:100% 100%;
    height: 100vh;
    width: 100vw;
    position: absolute;
    display: flex;
    flex-direction: column;
}
.title {
    cursor: default;
    font-size: 23px;
    line-height: 52px;
    color: v-bind(TWT);
}
.slogan{
    height:42px;
    margin:49px 0 0 57px;
}
.TWT {
    font-weight: 800;
    margin-left:20px;
}
.STUDIO {
    font-weight: 350;
    margin-left:10px;
}
.hintText{
    height: 25px;
    font-size: 18px;
    font-weight: 400;
    color: #444444;
    margin-top:27px;
}
.login-box{
    width: 550px;
    height: 650px;
    background: #FFFFFF;
    box-shadow: 0px 8px 20px 0px rgba(92, 92, 92, 0.2);
    margin:60px auto 0 auto;
    padding:100px 60px 50px 60px;
    align-content: center;
    border-radius: 10px;
    align-content: center;
}
.loginTitle{
    text-align: center;
    height: 46px;
    font-size: 34px;
    font-weight: bold;
    color: #00A1E9;
    margin-bottom:60px;
}
.button{
    height: 36px;
    background: v-bind(TWT);
    border-radius: 5px;
    font-size: 16px;
    font-weight: bold;
    color: #FFFFFF;
    margin-top:48px;
    width:100%;
}
.reg{
    display:flex;
    justify-content: flex-end;
    margin:auto;
}
.reg .text{
    font-size: 14px;
    margin-top:15px;
    border:none !important; 
}
.register{
    color: v-bind(TWT);
    margin-right:10px;
}
.hint{
    height: 54px;
    font-size: 14px;
    color: #A6A6A6;
    line-height: 20px;
    margin:auto;
    margin-top:50px;
}
</style>