<template>
  <div>
    <MBX name1="数据统计" name2="数据报表" />
    <el-card class="mt16">
      <div id="main" style="width: 800px; height: 400px"></div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  data() {
    return {}
  },
  created() {
    this.$API.getReportsApi().then((res) => {
      console.log(res)
      // 基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(document.getElementById('main'))
      myChart.setOption(res)
    })
  },
  mounted() {},
  methods: {}
}
</script>
<style scoped lang="scss"></style>
