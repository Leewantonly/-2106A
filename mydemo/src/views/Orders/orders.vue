<template>
  <div>
    <MBX name1="订单管理" name2="订单列表" />
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
      </el-row>
      <el-table
        border
        class="mt16"
        :data="orderData"
        stripe
        style="width: 100%"
      >
        <el-table-column type="index" label="#"> </el-table-column>
        <el-table-column label="订单编号" prop="order_number"></el-table-column>
        <el-table-column label="订单价格" prop="order_price"></el-table-column>
        <el-table-column label="是否付款">
          <template slot-scope="scope">
            <el-tag
              size="mini"
              effect="light"
              :type="scope.row.pay_status === '0' ? 'danger' : ''"
              >{{ scope.row.pay_status === '0' ? '未付款' : '已付款' }}</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column label="是否发货" prop="is_send"></el-table-column>
        <el-table-column label="下单时间">
          <template slot-scope="scope">
            {{ scope.row.create_time | GLQ }}
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
              @click="wlxx(scope.row)"
              size="mini"
              type="success"
              icon="el-icon-location-outline"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="mt16"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
    <!-- 物流信息 -->
    <el-dialog title="物流进度" :visible.sync="isWlMask">
      <el-timeline :reverse="false">
        <el-timeline-item
          v-for="(item, index) in wlxxData"
          :key="index"
          :timestamp="item.time"
          :icon="item.icon"
          :color="item.color"
        >
          {{ item.context }}
        </el-timeline-item>
      </el-timeline>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isWlMask = false">取 消</el-button>
        <el-button type="primary" @click="isWlMask = false">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改地址 -->
    <el-dialog
      title="修改地址"
      :visible.sync="isEditCityMask"
      @close="clerEditForm"
    >
      <el-form :model="editForm">
        <el-form-item label="省市区/县" label-width="80px">
          <el-cascader
            class="cityInput"
            v-model="checkAll"
            :options="city"
            :props="{
              expandTrigger: 'hover',
              label: 'label',
              children: 'children',
              value: 'value'
            }"
            @change="handleChange"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="详细地址" label-width="80px">
          <el-input v-model="editForm.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isEditCityMask = false">取 消</el-button>
        <el-button type="primary" @click="editOk">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import _ from 'lodash'
import city from '@/provinces-china/city'
import { Message } from 'element-ui'
import wxll from '@/wlxx/wlxx'

export default {
  name: '',
  components: {},
  data() {
    return {
      // 物流信息
      wlxxData: wxll.data,
      // 级联框数据
      city,
      // 级联框选中的数组
      checkAll: [],
      // 修改地址表单
      editForm: {},
      // 修改地址模态框
      isEditCityMask: false,
      // 物流模态框
      isWlMask: false,
      // 请求参数
      queryInfo: {
        query: '',
        pagesize: 10,
        pagenum: 1
      },
      //   订单数据
      orderData: [],
      //   总条数
      total: 0
    }
  },
  created() {
    this.getOrderData()
  },
  mounted() {
    console.log(this.wlxxData)
  },
  methods: {
    // 清空编辑表单
    clerEditForm() {
      this.checkAll = []
      this.editForm = {}
    },
    // 修改地址
    editOk() {
      this.isEditCityMask = false
      Message({
        type: 'success',
        message: '修改成功!'
      })
    },
    // 级联触发事件
    handleChange() {
      console.log(1)
    },
    //   获取订单数据列表
    async getOrderData() {
      const res = await this.$API.getOrderApi(this.queryInfo)
      console.log(res)
      const { total, goods } = res
      this.total = total
      this.orderData = goods
    },
    //   搜索
    search: _.debounce(function () {
      this.getOrderData()
    }, 300),
    // 每页多少条
    handleSizeChange(val) {
      this.queryInfo.pagesize = val
      this.getOrderData()
    },
    // 当前页
    handleCurrentChange(val) {
      this.queryInfo.pagenum = val
      this.getOrderData()
    },
    // 点击打开物流信息模态框
    wlxx() {
      this.isWlMask = true
    },
    // 打开修改地址模态框
    editBtn() {
      this.isEditCityMask = true
    }
  }
}
</script>
<style scoped lang="scss">
.cityInput {
  width: 100%;
}
</style>
