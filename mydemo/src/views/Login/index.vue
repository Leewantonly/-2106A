<template>
  <div class="login">
    <div class="mask">
      <div class="imgbox">
        <img src="../../assets/logo.png" alt="" />
      </div>
      <el-form :model="loginForm" ref="loginFormRef" :rules="loginFormRules">
        <el-form-item prop="username">
          <el-input
            prefix-icon="iconfont icon-account"
            v-model="loginForm.username"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            prefix-icon="iconfont icon-tianchongxing-"
            type="password"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item class="btnbox">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  data() {
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      loginFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  created() {},
  mounted() {},
  methods: {
    // 登录
    login() {
      this.$refs.loginFormRef.validate(async (valid) => {
        if (valid) {
          const res = await this.$API.loginApi(this.loginForm)
          console.log(res)
          sessionStorage.setItem('token', res.token)
          this.$router.push('Home')
        } else {
          return false
        }
      })
    },
    // 重置表单
    reset() {
      console.log(1)
      this.$refs.loginFormRef.resetFields()
    }
  }
}
</script>
<style scoped lang="scss">
.login {
  width: 100%;
  height: 100%;
  background-color: #2b4b6b;
  display: flex;
  justify-content: center;
  align-items: center;
  .mask {
    padding: 100px 20px 0 20px;
    width: 400px;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 0 3px 3px #fff;
    position: relative;
    min-width: 400px;
    .imgbox {
      z-index: 99;
      border-radius: 50%;
      border: 10px solid #fff;
      overflow: hidden;
      position: absolute;
      top: -70px;
      left: 50%;
      transform: translate(-50%, 0);
      background-color: #eee;
      box-shadow: 0 0 2px 2px #fff;
      img {
        width: 120px;
        height: 120px;
      }
    }
    .btnbox {
      text-align: right;
    }
  }
}
</style>
