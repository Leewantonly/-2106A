<template>
<div class="login">
   <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" class="loginbox">
     <img src="@/assets/logo.png" alt="" class="nameimmg">
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>

        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            show-password
            type="password"
            v-model="loginForm.password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>

        <!-- 按钮 -->
        <el-form-item class="buts">
          <el-button type="primary" @click="goLogin">登录</el-button>
          <el-button type="info">重置</el-button>
        </el-form-item>
      </el-form>
</div>

      
</template>

<script>
import {LoginApi} from '../../http/requst.js'
  export default {
  name: 'login',
  data() {
    return {
      //表单绑定的数据
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      //表单验证规则
      loginFormRules: {
        username: [
          //判空处理
          { required: true, message: '请输入用户名', trigger: 'blur' },
          //字符长度处理
          {
            min: 5,
            max: 20,
            message: '输入的用户长度必需要5~20位之间',
            trigger: 'blur'
          }
        ],
        password: [
          //判空处理
          { required: true, message: '请输入密码', trigger: 'blur' },
          //字符长度处理
          {
            min: 5,
            max: 20,
            message: '输入的密码长度必需要5~20位之间',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    //登录
    goLogin() {
      // console.log('login')
      this.$refs.loginFormRef.validate(async (valid) => {
        if (!valid) return false
        //开始调用后台登录接口
        const res = await LoginApi(this.loginForm)
        console.log('是否登录成功:', res)
        this.$router.push('/index')
      })
    }
  }
}
</script>
<style>
.login{
  width: 100%;
  height: 100vh;
  color: blue;
  background-color: #2b4b6b;
}
.loginbox{
  width: 400px;
  height: 300px;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50% , -50%);
  background-color: aliceblue;
}
.nameimmg{
  width: 90px;
  height: 90px;
  position: relative;
  left: 3%;
  top:-40px;
  background-color: #dddddd;
  border-radius: 50%;
}
.img{
  width: 100%;
  height:100%;

}
.buts{
  display: flex;
  justify-content: flex-end;
}
</style>
