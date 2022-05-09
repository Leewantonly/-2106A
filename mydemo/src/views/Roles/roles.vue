<template>
  <div>
    <MBX name1="权限管理" name2="角色列表" />
    <el-card class="mt16">
      <el-button type="primary" @click="addUser">添加角色</el-button>
      <el-table border class="mt16" :data="rolesData" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="scope">
            <div
              class="bigbox"
              v-for="item in scope.row.children"
              :key="item.id"
            >
              <div class="leftbox">
                <el-tag
                  effect="dark"
                  @close="delQx(scope.row.id, item.id, scope.row)"
                  closable
                  >{{ item.authName }}</el-tag
                >
              </div>
              <div class="rightbox">
                <div
                  class="box1"
                  v-for="item2 in item.children"
                  :key="item2.id"
                >
                  <div class="sbox1">
                    <el-tag
                      @close="delQx(scope.row.id, item2.id, scope.row)"
                      effect="dark"
                      type="success"
                      closable
                      >{{ item2.authName }}</el-tag
                    >
                  </div>
                  <div class="sbox2">
                    <div
                      class="sbox3"
                      v-for="item3 in item2.children"
                      :key="item3.id"
                    >
                      <el-tag
                        @close="delQx(scope.row.id, item3.id, scope.row)"
                        effect="dark"
                        type="warning"
                        closable
                        >{{ item3.authName }}</el-tag
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="角色名称" prop="roleName"> </el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              @click="editBtn(scope.row)"
              size="mini"
              type="primary"
              icon="el-icon-edit"
              >编辑</el-button
            >
            <el-button
              @click="delUser(scope.row)"
              size="mini"
              type="danger"
              icon="el-icon-delete"
              >删除</el-button
            >
            <el-button
              @click="fqQx(scope.row)"
              size="mini"
              type="warning"
              icon="el-icon-setting"
              >分配权限</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 添加角色 -->
    <el-dialog title="添加角色" :visible.sync="isAddMask">
      <el-form :model="addUserForm" :rules="addUserFormRules">
        <el-form-item label="角色名称" label-width="80px" prop="roleName">
          <el-input v-model="addUserForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" label-width="80px" prop="roleDesc">
          <el-input v-model="addUserForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isAddMask = false">取 消</el-button>
        <el-button type="primary" @click="addUserOk">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑模态框 -->

    <el-dialog title="编辑角色" :visible.sync="isEditMask">
      <el-form :model="editform" :rules="addUserFormRules">
        <el-form-item label="角色名称" label-width="80px" prop="roleName">
          <el-input v-model="editform.roleName"></el-input>
        </el-form-item>

        <el-form-item label="角色描述" label-width="80px" prop="roleDesc">
          <el-input v-model="editform.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUserOk">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 分配权限模态框 -->
    <el-dialog
      title="分配权限"
      :destroy-on-close="true"
      :visible.sync="isFpMask"
      width="40%"
    >
      <el-tree
        ref="treeData"
        :data="treeData"
        show-checkbox
        node-key="id"
        default-expand-all=""
        :default-checked-keys="checkAllArr"
        :props="defaultProps"
      >
      </el-tree>

      <span slot="footer" class="dialog-footer">
        <el-button @click="isFpMask = false">取 消</el-button>
        <el-button type="primary" @click="fpQxOk">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  data() {
    return {
      // 选中权限的数组
      checkAllArr: [],
      // 树组件配置
      defaultProps: {
        label: 'authName',
        children: 'children'
      },
      // 分配权限列表
      treeData: [],
      // 分配权限模态框
      isFpMask: false,
      // 编辑表单
      editform: {},
      // 编辑模态框
      isEditMask: false,
      // 添加角色模态框
      isAddMask: false,
      // 添加角色表单
      addUserForm: {},
      //   添加正则校验
      addUserFormRules: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        roleDesc: [
          { required: true, message: '请输入角色描述', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ]
      },
      // 角色列表
      rolesData: [],
      //   角色ID
      id: 0
    }
  },
  created() {
    this.getRolesData()
  },
  mounted() {},
  methods: {
    //   获取角色列表
    async getRolesData() {
      const res = await this.$API.userListApi()
      this.rolesData = res
    },
    // 添加角色
    addUser() {
      this.isAddMask = true
    },
    // 确定添加
    async addUserOk() {
      console.log(this.addUserForm)
      await this.$API.addUserNameApi(this.addUserForm)
      this.isAddMask = false
      this.getRolesData()
    },
    // 编辑按钮
    editBtn(val) {
      console.log(val)
      this.isEditMask = true
      this.editform = val
    },
    // 确定编辑
    async editUserOk() {
      await this.$API.editUserNameApi(this.editform)
      this.isEditMask = false
      this.getRolesData()
    },
    // 删除角色
    delUser(val) {
      this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await this.$API.deleteUserNameApi(val.id)
          this.getRolesData()
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
    // 分配权限
    async fqQx(val) {
      console.log(val)
      this.id = val.id
      this.isFpMask = true
      const res = await this.$API.getQXAllList()
      console.log(res)
      this.treeData = res
      this.checkAllArr = []
      this.getCheckall(val, this.checkAllArr)
      console.log(this.checkAllArr)
    },
    // 递归函数获取id
    getCheckall(val, checkAllArr) {
      if (!val.children) {
        return checkAllArr.push(val.id)
      } else {
        val.children.forEach((item) => {
          this.getCheckall(item, checkAllArr)
        })
      }
    },
    // 确定分配权限
    async fpQxOk() {
      // 全选中的数组
      const a = this.$refs.treeData.getCheckedKeys()
      // 半选中的数组
      const b = this.$refs.treeData.getHalfCheckedKeys()
      const c = [...a, ...b].join(',')
      console.log(c)
      const res = await this.$API.fpUserNameApi(this.id, c)
      console.log(res)
      this.isFpMask = false
      this.getRolesData()
    },

    // 删除用户权限
    async delQx(roleId, rightId, val) {
      const res = await this.$API.delUserQxApi(roleId, rightId)
      console.log(res)
      val.children = res
    }
  }
}
</script>
<style scoped lang="scss">
.el-tag {
  margin: 10px;
}
.bigbox {
  margin: 20px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .leftbox {
    width: 140px;
  }
  .rightbox {
    flex: 1;
    .box1 {
      display: flex;
      .sbox1 {
        width: 140px;
      }
      .sbox2 {
        flex: 1;
        display: flex;
        flex-wrap: wrap;
      }
    }
  }
}
</style>
