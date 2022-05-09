<template>
  <div>
    <MBX name1="商品管理" name2="商品分类" />
    <el-card class="mt16">
      <el-button type="primary" @click="addCate">添加分类</el-button>
      <el-table
        class="mt16"
        :data="goodsCateData"
        style="width: 100%"
        border
        row-key="cat_id"
      >
        <el-table-column type="index" label="#">
          <template slot-scope="scope">
            {{ scope.row.index }}
          </template>
        </el-table-column>
        <el-table-column label="分类名称" prop="cat_name"> </el-table-column>
        <el-table-column label="是否有效">
          <template slot-scope="scope">
            <i
              :class="
                scope.row.cat_deleted ? 'el-icon-error' : 'el-icon-success'
              "
              :style="scope.row.cat_deleted ? 'color:red' : 'color:green'"
            ></i>
          </template>
        </el-table-column>
        <el-table-column label="排序">
          <template slot-scope="scope">
            <el-tag
              effect="dark"
              size="mini"
              :type="
                scope.row.cat_level == 0
                  ? ''
                  : scope.row.cat_level == 1
                  ? 'success'
                  : 'warning'
              "
              >{{
                scope.row.cat_level == 0
                  ? '一级'
                  : scope.row.cat_level == 1
                  ? '二级'
                  : '三级'
              }}</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              @click="editCateBtn(scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="delCateBtn(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="mt16"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryGoodsCate.pagenum"
        :page-sizes="[2, 4, 6, 8]"
        :page-size="queryGoodsCate.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
    <!-- 编辑模态框 -->
    <el-dialog title="编辑分类" :visible.sync="isEditCateMask">
      <el-form :model="editForm" :rules="editFormRules">
        <el-form-item label="活动名称" label-width="80px" prop="cat_name">
          <el-input v-model="editForm.cat_name"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isEditCateMask = false">取 消</el-button>
        <el-button type="primary" @click="isEditCateOk">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 添加分类名称 -->
    <el-dialog title="添加分类名称" :visible.sync="isAddCateNameMask">
      <el-form :model="addForm">
        <el-form-item label="父类名称" label-width="80px">
          <el-input v-model="addForm.cat_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="父类分级" label-width="80px">
          <el-cascader
            v-model="checkall"
            :options="goodsCateData"
            :props="{
              expandTrigger: 'hover',
              checkStrictly: true,
              label: 'cat_name',
              children: 'children',
              value: 'cat_id'
            }"
            clearable
          ></el-cascader>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isAddCateNameMask = false">取 消</el-button>
        <el-button type="primary" @click="addCateOk">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  data() {
    return {
      // 总条数
      total: 0,
      // 选中的数组
      checkall: [],
      // 添加表单数据
      addForm: {
        cat_pid: 0,
        cat_name: '',
        cat_level: 0
      },
      // 添加模态框
      isAddCateNameMask: false,
      // 编辑表单数据
      editForm: {},
      //   表单验证
      editFormRules: {
        cat_name: [{ required: true, message: '不能为空', trigger: 'blur' }]
      },
      // 编辑模态框
      isEditCateMask: false,
      //   商品分类数据
      goodsCateData: [],
      //   请求商品分类
      queryGoodsCate: {
        type: 3,
        pagesize: 10,
        pagenum: 1
      }
    }
  },
  created() {
    this.getCategoriesData()
  },
  mounted() {},
  methods: {
    // 获取分类数据
    async getCategoriesData(val) {
      this.queryGoodsCate.type = val
      const res = await this.$API.GoodCcateApi(this.queryGoodsCate)

      console.log(res)
      const { total, result } = res
      console.log(total)
      this.total = total
      result.forEach((item, index) => {
        item.index = index + 1
      })
      this.goodsCateData = result
    },
    // 编辑
    editCateBtn(val) {
      this.editForm = val
      console.log(val)
      this.isEditCateMask = true
      this.getCategoriesData()
    },
    // 确定按钮
    async isEditCateOk() {
      const res = await this.$API.editCateApi(this.editForm)
      this.getCategoriesData()
      this.isEditCateMask = false
      console.log(res)
    },
    // 删除
    delCateBtn(val) {
      this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await this.$API.delCateApi(val.cat_id)
          this.getCategoriesData()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 添加分类
    addCate() {
      this.getCategoriesData(2)
      this.isAddCateNameMask = true
    },
    // 确定添加分类
    async addCateOk() {
      console.log(this.addForm)
      console.log(this.checkall)
      if (this.checkall.length === 0) {
        this.addForm.cat_pid = 0
        this.addForm.cat_level = 0
      } else {
        this.addForm.cat_pid = this.checkall[this.checkall.length - 1]
        this.addForm.cat_level = this.checkall.length
      }

      await this.$API.addCateApi(this.addForm)
      this.getCategoriesData()
      this.isAddCateNameMask = false
    },
    // 每页多少条
    handleSizeChange(val) {
      this.queryGoodsCate.pagesize = val
      this.getCategoriesData()
    },
    // 当前页
    handleCurrentChange(val) {
      this.queryGoodsCate.pagenum = val
      this.getCategoriesData()
    }
  }
}
</script>
<style scoped lang="scss"></style>
