<template>
    <el-menu
    class="menu"
    mode="horizontal"
    default-active="/"
    :router="true"
    >
        <el-row class="TWT">
            <img src="@/assets/logo.png" alt="twt">
            <span class="title blue">天外天</span>
            <span class="title black">招募中心</span>
        </el-row>
        <el-menu-item class="items" index="/">首页推荐</el-menu-item>
        <el-menu-item class="items" index="/myapplication">我的申请</el-menu-item>
        <el-menu-item class="items" index="/applymanage">招募管理</el-menu-item>
        <el-menu-item class="items" index="/morehelp">更多帮助</el-menu-item>
        <div style="width:20%"></div>
        <el-sub-menu class="items"  index="">
            <template #title>
                <el-icon><User /></el-icon>
                langjc
            </template>
            <el-menu-item index="/myapplication">个人信息</el-menu-item>
            <el-menu-item index="2-2">退出登录</el-menu-item>
        </el-sub-menu>
    </el-menu>
</template>

<style scoped>
.menu{
    display: flex;
    height:82px;
}
.items{
    font-size:16px;
    width:120px;
}
.TWT{
    margin:0 27px 0 375px;
    height:100%;
}
.TWT img{
    height:100%
}
.title {
    cursor: default;
    font-size: 18px;
    line-height: 82px;
    font-weight: 500;
}
.black {
    color: #454545;
}
.blue {
    color: #00a1e9;
}
</style>