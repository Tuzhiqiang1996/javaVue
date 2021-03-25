<!-- 上传 -->
<template>
  <div class="">
    <Header />
    <div class="up">
      <div class="log">
        <el-upload
          class="upload-demo"
          drag
          ref="upload"
          action="https://jsonplaceholder.typicode.com/posts/"
          multiple
          :on-success="up"
          :auto-upload="false"
          :on-change="handleChange"
          :file-list="fileList"
          :on-remove="handleRemove"
          :before-upload="beforeUpload"
          :on-preview="handlePreview"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">
            只能上传jpg/png文件，且不超过500kb
          </div>
        </el-upload>
      </div>
      <div>
        <el-button @click="btn"> an</el-button>
      </div>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

import Header from "../page/header";
import { mapState } from "vuex";
export default {
  name: "",
  //import引入的组件需要注入到对象中才能使用
  components: { Header },
  props: [],
  data() {
    //这里存放数据
    return {
      fileList: [],
      uploadData: [],
      ee: [],
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    up(response, file, fileList) {
      console.log(response, file, fileList);
      let reader = new FileReader();
      reader.readAsText(file.raw);
      reader.onload = (e) => {
        this.uploadData = [];
        this.uploadData = JSON.parse(e.target.result);
        this.ee = e.target.result;
        console.log(e.target.result);
      };
    },
    handleChange(file, fileList) {
      //   this.fileList = file.raw;
      this.fileList = fileList.slice(-1);
      if (file.raw.type == "application/json") {
        this.$message({
          message: "上传json文件成功",
          showClose: true,
          type: "success",
        });
      } else {
        this.$message({
          message: file.raw.type,
          showClose: true,
          type: "info",
        });
      }
      console.log(file);
      console.log(fileList);

      console.log("123");
    },
    btn() {
      console.log(this.fileList);
      console.log(this.uploadData);
      console.log(this.ee);
    //   this.$refs.upload.submit(); //手动上传

      this.$axios
        .post("http://127.0.0.1:8090/usableID",  {email:"123123",once:123131}
        // .post("orderadd",   this.ee

        ,{ Header: {
            "X-CK-Appid":"10012bf742",//请求的APPid,可以为请求设备的名称,
            "Content-Type":"application/json",
            "Content-Length":255
        } }

        )
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.error(err);
        });
    },
    beforeUpload(file) {
      console.log(file);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
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
.up {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
}
.log {
  display: flex;
  justify-content: center;
  height: 300px;
  width: 400px;
  align-items: center;
  background: #fff;
}
</style>