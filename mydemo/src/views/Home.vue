<template>
  <div class="home">
    <el-container>
      <!-- 头部 -->
      <el-header>
        <img
          src="@/assets/logo.png"
          alt=""
        />
        <h2>积云教育后台管理系统</h2>
        <el-button type="info" @click="back">退出</el-button>
      </el-header>
      <el-container>
        <!-- 左侧导航 -->
        <el-aside :width="isPage ? '60px' : '200px'">
          <div class="boxs" @click="isPage = !isPage">{{isPage?"|||":"|&#12288;&#12288;&#12288;&#12288;|&#12288;&#12288;&#12288;&#12288;|"}}</div>
          <el-menu
            unique-opened
            :collapse-transition="false"
            :collapse="isPage"
            :default-active="$route.name"
            background-color="#333744"
            text-color="#fff"
            active-text-color="#ffd04b"
            router
          >
            <el-submenu
              :index="index + ''"
              v-for="(item, index) in leftData"
              :key="item.id"
            >
              <template slot="title">
                <i class="el-icon-s-check"></i>
                <span>{{ item.authName }}</span>
              </template>

              <el-menu-item
                :index="it.path"
                v-for="it in item.children"
                :key="it.id"
              >
                <i class="el-icon-document"></i>
                <span slot="title">{{ it.authName }}</span>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <!-- 右侧主题内容 -->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      // 折叠菜单
      isPage: false,
      // 左侧菜单数据
      leftData: []
    }
  },
  created() {
    // 左侧菜单接口
    this.$API.leftMenusApi().then((res) => {
      this.leftData = res
    })
  },
  methods: {
    // 退出登录
    back() {
      sessionStorage.removeItem('token')
      this.$router.push('/login')
    }
  }
}
</script>
<style lang="scss" scoped>
header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  align-items: center;
  img {
    width: 61px;
    margin-right: 20px;
  }
  button {
    width: 70px;
  }
  h2 {
    flex: 1;
    color: #fff;
    font-weight: 500;
  }
}
.el-menu {
  border: none;
}
.el-aside {
  min-height: 720px;
  background-color: #333744;
}
.boxs {
  font-size: 12px;
  text-align: center;
  color: #fff;
  background-color: #4a5064;
  padding: 4px 0;
}

.el-main {
  background-color: #e9eef3;
}
</style>
