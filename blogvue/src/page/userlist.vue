<!--  -->
<template>
  <div class="">
    <Header />
    <div style="margin: 0 auto; display: table" v-loading="loading">
      <el-table
        ref="filterTable"
        :data="tableData"
        style="width: 100%;text-angle"
      >
        <el-table-column label="头像" width="100">
          <template slot-scope="scope">
            <el-avatar size="large" :src="scope.row.avatar"></el-avatar>
          </template>
        </el-table-column>
        <el-table-column label="姓名" width="100">
          <template slot-scope="scope">
            <el-tag size="medium">{{ scope.row.username }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="email" label="邮箱" width="200">
        </el-table-column>
        <el-table-column prop="created" label="日期" width="200">
        </el-table-column>
        <el-table-column prop="status" label="权限" width="180">
          <template slot-scope="scope">
            <el-rate
              v-model="scope.row.status"
              disabled
              disabled-void-color="#f7ba2a"
              :colors="['#ffffff', '#F7BA2A', '#FF9900']"
            >
            </el-rate>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <!-- <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            > -->
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div style="text-align: center; padding: 20px 0">
      <el-pagination
        layout="prev, pager, next"
        :total="total"
        :current-page="currentpage"
        :page-size="pagesize"
        @current-change="pages"
        background
      >
      </el-pagination>
    </div>
    <el-dialog
      title="修改信息"
      :visible.sync="dialogVisible"
      width="40%"
      center
    >
      <el-form
        :model="ruleForm"
        ref="ruleForm"
        :rules="rules"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item prop="userName" class="itemwidth" label="用户">
          <el-input
            autocomplete="off"
            type="text"
            class="input"
            v-model="ruleForm.userName"
            placeholder="请输入用户名"
        /></el-form-item>
        <el-form-item prop="userPwd" class="itemwidth" label="密码">
          <el-input
            autocomplete="off"
            type="password"
            class="input"
            v-model="ruleForm.userPwd"
            maxlength="20"
            @keyup.enter="login"
            placeholder="请输入密码"
        /></el-form-item>
        <el-form-item prop="email" class="itemwidth" label="邮箱">
          <el-input
            autocomplete="off"
            type="email"
            class="input"
            v-model="ruleForm.email"
            maxlength="20"
            @keyup.enter="regina"
            placeholder="请输入邮箱"
          />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >提交</el-button
          >
          <el-button @click="dialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>

      <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSave">确 定</el-button>
      </span> -->
    </el-dialog>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import Header from "./header";
import { mapState } from "vuex";
export default {
  name: "userlist",
  //import引入的组件需要注入到对象中才能使用
  components: { Header },
  data() {
    var validatoremail = (rule, value, callback) => {
      // var MobileRegex = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      var MobileRegex = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
      if (value === "") {
        callback(new Error("请输入正确的邮箱"));
      } else if (!MobileRegex.test(value)) {
        callback(new Error("请输入正确的邮箱格式"));
      } else {
        callback();
      }
    };
    //这里存放数据
    return {
      loading: true,
      tableData: [],
      total: 0, //总条目数
      currentpage: 1, //当前页数
      pagesize: 5, //每页显示条目个数
      data: {}, //数据
      loading: true,

      ruleForm: {
        userName: "",
        userPwd: "",
        avatar: null,
        email: "",
        status: null,
      },
      rules: {
        //全部效验吧
        email: [
          {
            validator: validatoremail,
            trigger: "blur",
          },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"],
          },
          { required: true, message: "请输入正确的邮箱格式", trigger: "blur" },
        ],
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        userPwd: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
      dialogVisible: false,
    };
  },
  //监听属性 类似于data概念
  computed: {
    ...mapState(["userInfo"]),
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    pages(page) {
      let url = "/userList?currentPage=";
      this.$axios
        .get(url + page)
        .then((res) => {
          if (res.data.code == 200) {
            this.loading = false;
            this.tableData = res.data.data.records;
            this.total = res.data.data.total;
            this.currentpage = res.data.data.current;
            this.pagesize = res.data.data.size;
          } else {
            this.$message({
              message: res.data.msg,
              showClose: true,
              type: "error",
            });
          }
          // console.log(res);
        })
        .catch((err) => {
          // console.error(err);
          this.$message({
            message: res.data.msg,
            showClose: true,
            type: "error",
          });
        });
    },
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该用户？, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        if (row.status !== 0) {
          this.$axios
            .get(`/deleteUser?id=${row.id}&status=${this.userInfo.status}`)
            .then((res) => {
              if (res.data.code == 200) {
                this.$message({
                  message: res.data.msg,
                  showClose: true,
                  type: "success",
                });
                this.pages(1);
              } else {
                this.$message({
                  message: res.data.msg,
                  showClose: true,
                  type: "error",
                });
              }
            })
            .catch((err) => {
              this.$message({
                message: err,
                showClose: true,
                type: "error",
              });
            });
        } else {
          this.$message({
            message: "该账号不可删除",
            showClose: true,
            type: "error",
          });
        }
      });
      // console.log(row.id, row.status);
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    handleEdit(index, row) {
      console.log(row);
      this.dialogVisible = true;
      // this.resetForm.userName = row.username;
      // this.resetForm.avatar = row.avatar;
      this.resetForm.avatar = "123";
      this.resetForm.email = row.email;
      this.resetForm.status = row.status;
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.pages(1);
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
.img {
  width: 80px;
  border-radius: 50%;
}
</style>