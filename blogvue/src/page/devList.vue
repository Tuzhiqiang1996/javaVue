<!--  -->
<template>
  <div class="">
    <Header />
    <div style="margin: 0 auto; display: table">
      <el-table
        ref="filterTable"
        style="width: 960px"
        :data="tableData"
        height="524"
        stripe
        border
        v-loading="loading"
      >
        <!-- <el-table-column prop="id" label="Id" width="80"> </el-table-column> -->
        <el-table-column
          prop="sn"
          show-overflow-tooltip
          fixed
          label="序列号"
          width="120"
        >
        </el-table-column>
        <el-table-column
          prop="orderId"
          show-overflow-tooltip
          label="订单id"
          width="80"
        >
        </el-table-column>
        <el-table-column
          prop="deviceid"
          show-overflow-tooltip
          label="设备id"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="addr1"
          show-overflow-tooltip
          label="秘钥A"
          width="150"
        >
        </el-table-column>
        <el-table-column
          prop="addr2"
          show-overflow-tooltip
          label="秘钥B"
          width="150"
        >
        </el-table-column>
        <el-table-column
          prop="createtime"
          show-overflow-tooltip
          label="创建时间"
          width="50"
        >
        </el-table-column>
        <!-- prop="testResult" -->
        <el-table-column label="测试结果" width="80" fixed="right">
          <template slot-scope="scope">
            <el-tag
              :type="
                scope.row.testResult == 1
                  ? 'success'
                  : scope.row.testResult == 0
                  ? 'info'
                  : 'danger'
              "
              disable-transitions
              >{{
                scope.row.testResult == 1
                  ? "成功"
                  : scope.row.testResult == 0
                  ? "未测试"
                  : "失败"
              }}</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column
          prop="testDatetime"
          show-overflow-tooltip
          label="测试时间"
          width="120"
        >
        </el-table-column>
        <el-table-column
          prop="checkResult"
          show-overflow-tooltip
          label="检查结果"
          width="80"
          fixed="right"
        >
          <template slot-scope="scope">
            <el-tag
              :type="
                scope.row.testResult == 1
                  ? 'success'
                  : scope.row.testResult == 0
                  ? 'info'
                  : 'danger'
              "
              disable-transitions
              >{{
                scope.row.testResult == 1
                  ? "成功"
                  : scope.row.testResult == 0
                  ? "未测试"
                  : "失败"
              }}</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column
          prop="checkDatetime"
          show-overflow-tooltip
          label="检查时间"
          width="50"
        >
        </el-table-column>
        <el-table-column
          prop="checkCount"
          show-overflow-tooltip
          label="检查次数"
          width="50"
        >
        </el-table-column>
      </el-table>
    </div>
    <div>
      <div style="text-align: center; padding: 20px 0">
        <el-pagination
          layout="prev, pager, next"
          :total="total"
          :current-page="currentpage"
          :page-size="pagesize"
          @current-change="page"
          background
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import Header from "./header";
export default {
  name: "devList",
  //import引入的组件需要注入到对象中才能使用
  components: { Header },
  props: [],
  data() {
    //这里存放数据
    return {
      loading: true,
      tableData: [],
      total: 0, //总条目数
      currentpage: 1, //当前页数
      pagesize: 5, //每页显示条目个数
      data: {}, //数据
      loading: true,
      formData: {
        sn: "",
        orderId: "",
        deviceid: "",
        addr1: "",
        addr2: "",
        createtime: "",
        testResult: "",
        testDatetime: "",
        checkResult: "",
        checkDatetime: "",
        checkCount: "",
      },
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    page(num) {
      let url = "/devList?currentPage=";
      this.$axios
        .get(url + num)
        .then((res) => {
          const { code, data } = res.data;
          if (code == 200) {
            console.log(data);
            this.loading = false;
            this.tableData = data.records;
            this.total = data.total;
            this.currentpage = data.current;
            this.pagesize = data.size;
            this.$nextTick(() => {
              this.$refs.filterTable.bodyWrapper.scrollTop = 0;
            });
          } else {
            this.$message({
              message: res.data.msg,
              showClose: true,
              type: "error",
            });
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.page(1);
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
</style>