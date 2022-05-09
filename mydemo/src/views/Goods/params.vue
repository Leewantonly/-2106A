<template>
  <div>
    <MBX name1="商品管理" name2="参数列表" />
    <el-card class="mt16">
      <el-alert
        effect="dark"
        :closable="false"
        title="注意：只允许为第三级分类设置相关参数"
        type="error"
        show-icon
      >
      </el-alert>
      <el-form class="mt16">
        <el-form-item label="选择商品分类：">
          <el-cascader
            v-model="checkallArr"
            :options="goodsCateData"
            :props="{
              expandTrigger: 'hover',
              label: 'cat_name',
              childred: 'children',
              value: 'cat_id'
            }"
            @input="clearCate"
            @change="changeCate"
            clearable
          ></el-cascader>
        </el-form-item>
      </el-form>
      <el-tabs
        type="border-card"
        :before-leave="changeTabs"
        v-model="activeName"
      >
        <!-- 动态 -->
        <el-tab-pane label="动态参数" name="many">
          <el-button
            type="primary"
            size="mini"
            :disabled="isDisabled"
            @click="addCsBtn"
            >添加参数</el-button
          >
          <el-table border class="mt16" :data="paramsData" style="width: 100%">
            <el-table-column type="expand">
              <template slot-scope="scope">
                <el-tag
                  v-for="(item, index) in scope.row.attr_vals"
                  :key="index"
                  closable
                  :disable-transitions="false"
                  @close="handleClose(scope.row, index)"
                >
                  {{ item }}
                </el-tag>
                <el-input
                  class="input-new-tag"
                  v-if="scope.row.inputVisible"
                  v-model="scope.row.inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm(scope.row)"
                  @blur="handleInputConfirm(scope.row)"
                >
                </el-input>
                <el-button
                  v-else
                  class="button-new-tag"
                  size="small"
                  @click="showInput(scope.row)"
                  >+ New Tag</el-button
                >
              </template>
            </el-table-column>
            <el-table-column type="index" label="#"> </el-table-column>
            <el-table-column label="参数名称" prop="attr_name">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="primary"
                  icon="el-icon-edit"
                  @click="editBtn(scope.row)"
                  >修改</el-button
                >
                <el-button
                  size="mini"
                  type="danger"
                  icon="el-icon-delete"
                  @click="delBtn(scope.row)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="静态属性" name="only">
          <!-- 静态 -->
          <el-button
            type="primary"
            size="mini"
            :disabled="isDisabled"
            @click="addCsBtn"
            >添加属性</el-button
          >
          <el-table border class="mt16" :data="paramsData" style="width: 100%">
            <el-table-column type="expand">
              <template slot-scope="scope">
                <el-tag
                  v-for="(item, index) in scope.row.attr_vals"
                  :key="index"
                  closable
                  :disable-transitions="false"
                  @close="handleClose(scope.row, index)"
                >
                  {{ item }}
                </el-tag>
                <el-input
                  class="input-new-tag"
                  v-if="scope.row.inputVisible"
                  v-model="scope.row.inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm(scope.row)"
                  @blur="handleInputConfirm(scope.row)"
                >
                </el-input>
                <el-button
                  v-else
                  class="button-new-tag"
                  size="small"
                  @click="showInput(scope.row)"
                  >+ New Tag</el-button
                >
              </template>
            </el-table-column>
            <el-table-column type="index" label="#"> </el-table-column>
            <el-table-column label="属性名称" prop="attr_name">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="primary"
                  icon="el-icon-edit"
                  @click="editBtn(scope.row)"
                  >修改</el-button
                >
                <el-button
                  size="mini"
                  type="danger"
                  icon="el-icon-delete"
                  @click="delBtn(scope.row)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <!-- 添加参数模态框 -->
    <el-dialog
      :title="activeName === 'many' ? '添加动态参数' : '添加静态属性'"
      :visible.sync="isAddMask"
    >
      <el-form :model="addForm" :rules="addFormRules">
        <el-form-item
          prop="attr_name"
          :label="activeName === 'many' ? '动态参数' : '静态属性'"
          label-width="80px"
        >
          <el-input v-model="addForm.attr_name"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isAddMask = false">取 消</el-button>
        <el-button type="primary" @click="addOk">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改参数模态框 -->
    <el-dialog
      :title="activeName === 'many' ? '修改动态参数' : '修改静态属性'"
      :visible.sync="isEditCsMask"
    >
      <el-form :model="editDtCsForm" :rules="addFormRules">
        <el-form-item
          prop="attr_name"
          :label="activeName === 'many' ? '动态参数' : '静态属性'"
          label-width="80px"
        >
          <el-input v-model="editDtCsForm.attr_name"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isEditCsMask = false">取 消</el-button>
        <el-button type="primary" @click="addCsOk">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { Message } from 'element-ui'
export default {
  name: '',
  components: {},
  data() {
    return {
      // 添加模态框
      isAddMask: false,
      // 添加参数表单
      addForm: {
        id: '',
        attr_name: '',
        attr_sel: ''
      },
      // 表单检验
      addFormRules: {
        attr_name: [{ required: true, message: '不能为空', trigger: 'blur' }]
      },
      // 修改参数表单
      editDtCsForm: {},
      // 修改动态模态框
      isEditCsMask: false,
      // 级联选则的数组
      checkallArr: [],
      // 参数列表
      paramsData: [],
      // 禁用按钮
      isDisabled: true,
      // 级联数据
      goodsCateData: [],
      // 判断是动态还是静态
      activeName: 'many'
    }
  },
  created() {},
  mounted() {
    this.getCateData()
  },
  methods: {
    // 编辑按钮
    editBtn(val) {
      console.log(val)
      this.editDtCsForm = val
      this.isEditCsMask = true
    },
    // 确定编辑
    async addCsOk() {
      // console.log(1)
      await this.$API.editComitParmasApi({
        id: this.editDtCsForm.cat_id,
        attrId: this.editDtCsForm.attr_id,
        attr_name: this.editDtCsForm.attr_name,
        attr_sel: this.editDtCsForm.attr_sel,
        attr_vals: this.editDtCsForm.attr_vals.join(',')
      })
      this.getCateData()
      this.isEditCsMask = false
    },
    // 添加tag事件
    showInput(row) {
      row.inputVisible = true
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    // 确定tag事件
    async handleInputConfirm(row) {
      if (row.inputValue.trim().length > 0) {
        row.attr_vals.push(row.inputValue)
        await this.$API.editComitParmasApi({
          id: this.checkallArr[this.checkallArr.length - 1],
          attrId: row.attr_id,
          attr_name: row.attr_name,
          attr_sel: row.attr_sel,
          attr_vals: row.attr_vals.join(',')
        })
      }
      row.inputVisible = false
      row.inputValue = ''
    },
    // tag删除按钮
    async handleClose(tag, index) {
      console.log(index)
      tag.attr_vals.splice(index, 1)
      console.log(tag)
      await this.$API.editComitParmasApi({
        id: this.checkallArr[this.checkallArr.length - 1],
        attrId: tag.attr_id,
        attr_name: tag.attr_name,
        attr_sel: tag.attr_sel,
        attr_vals: tag.attr_vals.join(',')
      })
    },
    // 清空级联框
    clearCate() {
      this.isDisabled = true
      this.paramsData = []
    },
    // 获取商品分类
    getCateData() {
      this.$API.GoodCcateApi(3).then((res) => {
        // console.log(res)
        this.goodsCateData = res
      })
    },
    // 获取参数列表
    async getParamsList() {
      this.isDisabled = false
      const res = await this.$API.getCateGoriesApi(
        this.checkallArr[this.checkallArr.length - 1],
        this.activeName
      )

      res.forEach((item) => {
        item.inputValue = ''
        item.inputVisible = false
        item.attr_vals =
          item.attr_vals.length > 0 ? item.attr_vals.split(',') : []
      })

      console.log(res)
      this.paramsData = res
    },
    // 级联分类
    changeCate() {
      if (this.checkallArr.length === 3) {
        this.getParamsList()
      } else {
        this.checkallArr = []
        Message({
          type: 'error',
          message: '只允许为三级分类设置参数'
        })
        return false
      }
    },
    // tab切换时触发的钩子函数
    changeTabs(val) {
      if (this.checkallArr.length === 3) {
        this.activeName = val
        this.getParamsList()
      }
    },

    // 删除按钮
    delBtn(val) {
      console.log(val)
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const res = await this.$API.deleteCsApi(val)
          console.log(res)
          this.getParamsList()
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
    // 添加按钮
    addCsBtn() {
      this.isAddMask = true
    },
    // 确定添加
    async addOk() {
      const id = this.checkallArr[this.checkallArr.length - 1]
      this.addForm.id = id
      if (this.activeName === 'many') {
        this.addForm.attr_sel = 'many'
      } else if (this.activeName === 'only') {
        this.addForm.attr_sel = 'only'
      }
      console.log(this.addForm)
      await this.$API.addCsSxApi(this.addForm)
      this.getParamsList()
      this.addForm.attr_name = ''
      this.isAddMask = false
    }
  }
}
</script>
<style scoped lang="scss">
.el-tag {
  margin: 6px 10px;
}
.input-new-tag {
  width: 80px;
}
</style>
