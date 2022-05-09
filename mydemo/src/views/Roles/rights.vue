<template>
  <div>
    <MBX name1="权限管理" name2="权限列表" />
    <el-card class="mt16">
      <el-table border :data="rightsData" style="width: 100%">
        <el-table-column type="index" label="#"> </el-table-column>
        <el-table-column label="权限名称" prop="authName"> </el-table-column>
        <el-table-column label="路径" prop="path"> </el-table-column>
        <el-table-column label="权限等级">
          <template slot-scope="scope">
            <el-tag
              size="mini"
              :type="
                scope.row.level === '0'
                  ? ''
                  : scope.row.level === '1'
                  ? 'success'
                  : 'warning'
              "
              >{{
                scope.row.level === '0'
                  ? '一级'
                  : scope.row.level === '1'
                  ? '二级'
                  : '三级'
              }}</el-tag
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  data() {
    return {
      rightsData: []
    }
  },
  created() {
    this.$API.getQXAllList('list').then((res) => {
      console.log(res)
      this.rightsData = res
    })
  },
  mounted() {},
  methods: {}
}
</script>
<style scoped lang="scss"></style>
