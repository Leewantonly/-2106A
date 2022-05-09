<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{ name1 }}</el-breadcrumb-item>
      <el-breadcrumb-item>{{ name2 }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    name1: {
      type: String
    },
    name2: {
      type: String
    }
  },

  components: {},
  data() {
    return {}
  },
  created() {},
  mounted() {},
  methods: {}
}
</script>
<style scoped lang="scss"></style>
