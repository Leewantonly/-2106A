<template>
  <div>
    <MBX name1="用户管理" name2="用户列表" />
    <el-card class="mt16">
      <el-row :gutter="10">
        <el-col :span="6">
          <el-input
            clearable
            @input="search"
            placeholder="请输入内容"
            v-model="queryInfo.query"
            class="input-with-select"
          >
            <el-button
              slot="append"
              @click="search"
              icon="el-icon-search"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="18">
          <el-button type="primary" @click="addUser">添加用户</el-button>
        </el-col>
      </el-row>
      <el-table class="mt16" border :data="userData" style="width: 100%">
        <el-table-column type="index" label="#"> </el-table-column>
        <el-table-column label="姓名" prop="username"> </el-table-column>
        <el-table-column label="邮箱" prop="email"> </el-table-column>
        <el-table-column label="电话" prop="mobile"> </el-table-column>
        <el-table-column label="角色" prop="role_name"> </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-switch
              @change="changeStatus(scope.row)"
              v-model="scope.row.mg_state"
              active-color="#13ce66"
              inactive-color="#ff4949"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              @click="editBtn(scope.row)"
              size="mini"
              type="primary"
              icon="el-icon-edit"
            ></el-button>
            <el-button
              @click="delUser(scope.row)"
              size="mini"
              type="danger"
              icon="el-icon-delete"
            ></el-button>
            <el-button
              @click="fqQx(scope.row)"
              size="mini"
              type="warning"
              icon="el-icon-setting"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        class="mt16"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[2, 4, 6, 8]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
    <!-- 添加用户模态框 -->
    <el-dialog title="添加用户" :visible.sync="isAddMask">
      <el-form :model="addForm" :rules="addFormRules">
        <el-form-item label="用户名" label-width="80px" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="80px" prop="password">
          <el-input v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="80px" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="80px" prop="mobile">
          <el-input v-model="addForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isAddMask = false">取 消</el-button>
        <el-button type="primary" @click="addUserOk">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑用户模态框 -->
    <el-dialog title="编辑用户" :visible.sync="isEditMask">
      <el-form :model="editForm" :rules="addFormRules">
        <el-form-item label="用户名" label-width="80px" prop="username">
          <el-input v-model="editForm.username" disabled=""></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="80px" prop="email">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" label-width="80px" prop="mobile">
          <el-input v-model="editForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isEditMask = false">取 消</el-button>
        <el-button type="primary" @click="editUserOk">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 分配权限模态框 -->
    <el-dialog title="分配角色" :visible.sync="isFpMask">
      <el-form :model="fpForm">
        <p>当前的用户：{{ fpForm.username }}</p>
        <p>当前的角色：{{ fpForm.role_name }}</p>
        <el-form-item label="分配新角色:">
          <el-select v-model="fpForm.rid" placeholder="请选择">
            <el-option
              v-for="item in userList"
              :key="item.id"
              :label="item.roleName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isFpMask = false">取 消</el-button>
        <el-button type="primary" @click="fpOk">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  name: '',
  components: {},
  data() {
    return {
      // 分配表单
      fpForm: {},
      // 分配角色模态框
      isFpMask: false,
      // 编辑用户表单
      editForm: {},
      // 编辑用户模态框
      isEditMask: false,
      // 添加用户表单
      addForm: {},
      // 添加用户正则校验
      addFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { min: 3, max: 20, message: '邮箱不合法', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { min: 11, max: 11, message: '长度在11位', trigger: 'blur' }
        ]
      },
      // 模态框
      isAddMask: false,
      // 总条数
      total: 0,
      // 请求用户参数
      queryInfo: {
        query: '',
        pagesize: 10,
        pagenum: 1
      },
      // 用户列表
      userData: [],
      // 角色列表
      userList: []
    }
  },
  created() {
    this.getUserData()
  },
  mounted() {},
  methods: {
    // 获取用户列表
    async getUserData() {
      const res = await this.$API.getUsersApi(this.queryInfo)
      console.log(res)
      const { total, users } = res
      this.total = total
      this.userData = users
    },
    // 每页多少条
    handleSizeChange(val) {
      this.queryInfo.pagesize = val
      this.getUserData()
    },
    // 当前页
    handleCurrentChange(val) {
      this.queryInfo.pagenum = val
      this.getUserData()
    },
    // 添加用户
    addUser() {
      this.isAddMask = true
    },
    // 确定添加
    async addUserOk() {
      const res = await this.$API.addUserApi(this.addForm)
      console.log(res)
      this.isAddMask = false
      this.getUserData()
    },
    // 搜索
    search: _.debounce(function () {
      this.getUserData()
    }, 1000),
    // 改变状态
    async changeStatus(val) {
      await this.$API.changeUserStatusApi(val.id, val.mg_state)
    },
    // 打开编辑模态框
    editBtn(val) {
      this.editForm = val
      this.isEditMask = true
    },
    // 确定编辑
    async editUserOk() {
      console.log(1)
      await this.$API.editUserApi(this.editForm)
      this.isEditMask = false
      this.getUserData()
    },
    // 删除用户
    delUser(val) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await this.$API.deleteUserApi(val.id)
          this.getUserData()
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
    // 分配角色
    async fqQx(val) {
      console.log(val.id)
      this.fpForm = val
      this.isFpMask = true
      const res = await this.$API.userListApi()
      console.log(res)
      this.userList = res
    },
    // 分配角色
    async fpOk() {
      const res = await this.$API.fpUserApi(this.fpForm)
      console.log(res)
      this.isFpMask = false
      this.getUserData()
    }
  }
}
</script>
<style scoped lang="scss"></style>
