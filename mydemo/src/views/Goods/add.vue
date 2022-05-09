<template>
  <div>
    <MBX name1="商品管理" name2="添加商品" />
    <el-card class="mt16">
      <el-alert
        title="消息提示的文案"
        center
        type="info"
        show-icon
        :closable="false"
      >
      </el-alert>
      <!-- 步骤条 -->
      <el-steps
        class="mt16"
        align-center
        :active="active * 1"
        finish-status="success"
      >
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
      <!-- tab -->
      <el-form :model="addGoodsForm" :rules="addGoodsFormRules" ref="addForm">
        <el-tabs
          tab-position="left"
          class="mt16"
          v-model="active"
          :before-leave="changeTabs"
        >
          <el-tab-pane label="基本信息">
            <el-form-item label="商品名称" prop="goods_name">
              <el-input v-model="addGoodsForm.goods_name"></el-input>
            </el-form-item>
            <el-form-item label="商品价格" prop="goods_price">
              <el-input v-model="addGoodsForm.goods_price"></el-input>
            </el-form-item>
            <el-form-item label="商品重量" prop="goods_weight">
              <el-input v-model="addGoodsForm.goods_weight"></el-input>
            </el-form-item>
            <el-form-item label="商品数量" prop="goods_number">
              <el-input v-model="addGoodsForm.goods_number"></el-input>
            </el-form-item>
            <el-form-item label="商品分类" prop="goods_cat">
              <el-cascader
                v-model="addGoodsForm.goods_cat"
                :options="goodsCateData"
                :props="{
                  expandTrigger: 'hover',
                  children: 'children',
                  label: 'cat_name',
                  value: 'cat_id'
                }"
              ></el-cascader>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品参数">
            <el-form-item
              :label="item1.attr_name"
              v-for="item1 in dongtai"
              :key="item1.id"
            >
              <el-checkbox-group v-model="item1.attr_vals">
                <el-checkbox
                  :label="item2"
                  v-for="(item2, index) in item1.attr_vals"
                  :key="index"
                ></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品属性">
            <el-form-item
              :label="item.attr_name"
              v-for="item in jingtai"
              :key="item.attr_id"
            >
              <el-input v-model="item.attr_vals"></el-input>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品图片">
            <el-upload
              action="http://www.ysqorz.top:8888/api/private/v1/upload"
              :headers="headers"
              list-type="picture-card"
              :on-remove="handleRemove"
              :on-success="handleSuccess"
              :auto-upload="false"
            >
              <i slot="default" class="el-icon-plus"></i>
              <div slot="file" slot-scope="{ file }">
                <img
                  class="el-upload-list__item-thumbnail"
                  :src="file.url"
                  alt=""
                />
              </div>
            </el-upload>
          </el-tab-pane>
          <el-tab-pane label="商品内容">
            <quill-editor v-model="addGoodsForm.goods_introduce"></quill-editor>
            <el-button type="primary" class="mt16" @click="addGoodsOk"
              >添加商品</el-button
            >
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { Message } from 'element-ui'
export default {
  name: '',
  components: {},
  data() {
    return {
      // 设置请求头
      headers: {
        Authorization: sessionStorage.getItem('token')
      },
      // 动态参数
      dongtai: [],
      // 静态参数
      jingtai: [],
      //   商品参数数据
      cateGoryiesData: [],
      // 商品分类数据
      goodsCateData: [],
      // 步骤条
      active: '0',
      //   添加商品表单
      addGoodsForm: {
        goods_name: '',
        goods_cat: '',
        goods_price: '',
        goods_number: '',
        goods_weight: '',
        goods_introduce: '',
        pics: '',
        attrs: ''
      },
      // 表单校验
      addGoodsFormRules: {
        goods_name: [{ required: true, message: '不能为空', trigger: 'blur' }],
        goods_cat: [{ required: true, message: '不能为空', trigger: 'blur' }],
        goods_price: [{ required: true, message: '不能为空', trigger: 'blur' }],
        goods_number: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        goods_weight: [{ required: true, message: '不能为空', trigger: 'blur' }]
      }
    }
  },
  created() {
    //   获取商品分类数据
    this.$API.GoodCcateApi().then((res) => {
      console.log(res)
      this.goodsCateData = res
    })
  },
  mounted() {},
  methods: {
    // 图片上传成功
    handleSuccess(res) {
      console.log(res)
    },
    // 图片删除
    handleRemove(res) {
      console.log(res)
    },
    // 切换tab时触发的钩子函数
    changeTabs() {
      if (this.addGoodsForm.goods_cat.length < 3) {
        Message({
          message: '只能选择三级分类',
          type: 'error'
        })
        return false
      } else {
        if (this.active === '0') {
          const id =
            this.addGoodsForm.goods_cat[this.addGoodsForm.goods_cat.length - 1]
          this.$API.getCateGoriesApi(id, 'many').then((res) => {
            res.forEach((item) => {
              item.attr_vals = item.attr_vals.split(',')
            })
            console.log(res)
            this.dongtai = res
          })
        } else if (this.active === '1') {
          const id =
            this.addGoodsForm.goods_cat[this.addGoodsForm.goods_cat.length - 1]
          this.$API.getCateGoriesApi(id, 'only').then((res) => {
            console.log(res)
            this.jingtai = res
          })
        }
      }
    },
    // 添加商品
    addGoodsOk() {
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          this.addGoodsForm.goods_cat = this.addGoodsForm.goods_cat.join(',')
          this.$API.addGoodsApi(this.addGoodsForm)
          this.$router.push('/goods')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
<style scoped lang="scss">
::v-deep .ql-editor {
  height: 300px;
}
</style>
