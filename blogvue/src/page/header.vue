<!-- 头部 -->
<template>
  <div class="header">
    <!-- <div class="user" @click="dialogVisible = true"> -->
    <div class="user" @click="userinfo">
      <el-avatar :size="100" :src="userInfo.avatar" @error="errorHandler">
        <img
          src="https://img2.woyaogexing.com/2020/04/10/2911e52acd544055ab7f434108037632!400x400.webp"
        />
      </el-avatar>
      <!-- <img :src="userInfo.avatar" alt="" class="img" /> -->
    </div>
    <div class="user">
      <h3>欢迎</h3>
      <p>{{ userInfo.username }}</p>
      <h3>来到TuTu的博客</h3>
    </div>

    <div class="user">
      <el-button @click="main"> 主页 </el-button>
      <el-button @click="edit">
        <el-link type="success">发表博客</el-link>
      </el-button>

      <el-button @click="btn"> 登出 </el-button>
      <!-- <el-button>
        <el-link type="success" href="/homeView">页面</el-link>
      </el-button> -->
      <el-button @click="user"> 用户列表 </el-button>
      <el-button @click="system"> 表格1 </el-button>
      <el-button @click="order"> 表格2 </el-button>
      <el-button @click="devlog"> 表格3 </el-button>
      <el-button @click="devlist"> 表格4 </el-button>
    </div>
    <el-dialog
      title="修改头像"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
      center
    >
      <el-upload
        class="avatar-uploader"
        action="/avatar"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <el-avatar :size="100" :src="userInfo.avatar" @error="errorHandler">
          <img
            src="https://img2.woyaogexing.com/2020/04/10/2911e52acd544055ab7f434108037632!400x400.webp"
          />
        </el-avatar>
        <!-- <img :src="userInfo.avatar" alt="" class="img" /> -->
        <!-- <img v-if="imageUrl" :src="imageUrl" class="avatar"> -->
        <!-- <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSave">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { mapState } from "vuex";

export default {
  name: "",
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      // userInfo:userInfo
      imageUrl: "",
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
    btn() {
      this.$confirm("退出, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$axios
            .get("/logout", {
              headers: {
                Authorization: localStorage.getItem("token"),
              },
            })
            .then((res) => {
              if (res.data.code == 200) {
                this.$store.commit("REMOVE_INFO");
                this.$router.push("/");
                // console.log("d", res);
                this.$message({
                  type: "success",
                  message: "退出成功!",
                });
              } else {
                this.$message({
                  type: "error",
                  message: "退出失败!",
                });
              }
            });
        })
        .catch((err) => {
          this.$message({
            type: "error",
            message: err,
          });
        });
    },
    main() {
      this.$router.push("/home");
    },
    edit() {
      this.$router.push("/edits");
    },
    user() {
      this.$router.push("/userlist");
    },
    system() {
      this.$router.push("/systemList");
    },
    order() {
      this.$router.push("/orderList");
    },
    devlog() {
      this.$router.push("/devlogList");
    },
    devlist() {
      this.$router.push("/devList");
    },
    userinfo() {
      this.$router.push('/userinfo')
    },
    errorHandler() {
      return true;
    },
    //上传
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      console.log(res, file);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      console.log(file);
      if (file.type.indexOf("image/") == -1) {
        this.$message.error(
          "文件格式错误，请上传图片类型,如：JPG，PNG后缀的文件。"
        );
        console.log(1);
      } else {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        console.log(reader.result);
        console.log(4);
        reader.onload = () => {
          this.imageUrl = file;
        };
      }
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
        console.log(2);
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
        console.log(3);
      }
      return isJPG && isLt2M;
    },
    handleClose() {},
    onSave() {
      let params = {
        avatarfile: this.imageUrl,
      };
      if (this.imageUrl) {
        console.log(this.imageUrl);
        this.dialogVisible = false;
        let formData = new FormData();

        formData.append("file", this.imageUrl);
        console.log(formData);
        this.$axios
          .post("/avatar", formData, {
              headers: {
                Authorization: localStorage.getItem("token"),
                "Content-Type": "application/json;charset=utf-8",
              },
            })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.error(err);
          });
      }
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    // console.log(this.userInfo);
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
.header {
  padding: 20px 0 20px 0;
}
.user {
  display: flex;
  justify-content: center;
  align-items: center;
}
.img {
  width: 100px;
  border-radius: 50%;
}
</style>