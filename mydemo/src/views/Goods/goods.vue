<template>
  <div>
    <MBX name1="商品管理" name2="商品列表" />
    <el-card class="mt16">
      <el-row :gutter="10">
        <el-col :span="6">
          <el-input
            clearable
            @input="search"
            placeholder="请输入内容"
            v-model="queryGoods.query"
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
          <el-button type="primary" @click="addGoods">添加商品</el-button>
        </el-col>
      </el-row>
      <el-table class="mt16" border :data="goodsData" style="width: 100%">
        <el-table-column type="index" label="#"> </el-table-column>
        <el-table-column label="商品名称" prop="goods_name"></el-table-column>
        <el-table-column
          label="商品价格(元)"
          prop="goods_price"
        ></el-table-column>
        <el-table-column label="商品重量" prop="goods_weight"></el-table-column>
        <el-table-column label="创建时间">
          <template slot-scope="scope">
            {{ scope.row.add_time | GLQ }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              @click="editGoods(scope.row)"
              size="mini"
              type="primary"
              icon="el-icon-edit"
            ></el-button>
            <el-button
              @click="delGoods(scope.row)"
              size="mini"
              type="danger"
              icon="el-icon-delete"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        class="mt16"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryGoods.pagenum"
        :page-sizes="[10, 20, 300, 400]"
        :page-size="queryGoods.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
    <!-- 编辑模态框 -->
    <el-dialog title="编辑商品名" :visible.sync="isEditGoodsNameMask">
      <el-form :model="editForm" :rules="editFormRules">
        <el-form-item label="商品名称" label-width="80px" prop="goods_name">
          <el-input v-model="editForm.goods_name"></el-input>
        </el-form-item>
        <el-form-item label="商品价格" label-width="80px" prop="goods_price">
          <el-input v-model="editForm.goods_price"></el-input>
        </el-form-item>
        <el-form-item label="商品重量" label-width="80px" prop="goods_weight">
          <el-input v-model="editForm.goods_weight"></el-input>
        </el-form-item>
        <el-form-item label="商品数量" label-width="80px" prop="goods_number">
          <el-input v-model="editForm.goods_number"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isEditGoodsNameMask = false">取 消</el-button>
        <el-button type="primary" @click="editGoodsName">确 定</el-button>
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
      // 表单校验
      editFormRules: {
        goods_name: [{ required: true, message: '不能为空', trigger: 'blur' }],
        goods_cat: [{ required: true, message: '不能为空', trigger: 'blur' }],
        goods_price: [{ required: true, message: '不能为空', trigger: 'blur' }],
        goods_number: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        goods_weight: [{ required: true, message: '不能为空', trigger: 'blur' }]
      },

      // 编辑商品表单
      editForm: {},
      // 编辑模态框
      isEditGoodsNameMask: false,
      // 商品列表
      goodsData: [],
      // 商品总条数
      total: 0,
      // 请求商品列表
      queryGoods: {
        query: '',
        pagenum: 1,
        pagesize: 10
      }
    }
  },
  created() {
    this.getGoodsList()
  },
  mounted() {},
  methods: {
    //   获取商品列表
    async getGoodsList() {
      const res = await this.$API.getGoodsListApi(this.queryGoods)
      console.log(res)
      const { total, goods } = res
      this.total = total
      this.goodsData = goods
    },
    //   搜索商品
    search: _.debounce(function () {
      this.getGoodsList()
    }, 300),
    // 添加商品
    addGoods() {
      this.$router.push('/add')
    },
    // 每页多少条
    handleSizeChange(val) {
      this.queryGoods.pagesize = val
      this.getGoodsList()
    },
    // 当前页
    handleCurrentChange(val) {
      this.queryGoods.pagenum = val
      this.getGoodsList()
    },
    // 删除商品
    delGoods(val) {
      console.log(val)
      this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await this.$API.delGoodsApi(val.goods_id)
          this.getGoodsList()
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
    // 编辑商品
    editGoods(val) {
      console.log(val)
      this.editForm = val
      this.isEditGoodsNameMask = true
    },
    // 确定编辑
    async editGoodsName() {
      const res = await this.$API.editGoodsApi(this.editForm)
      console.log(res)
      this.getGoodsList()
    }
  }
}
</script>
<style scoped lang="scss"></style>
