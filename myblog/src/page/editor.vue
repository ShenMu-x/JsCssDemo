<template>
  <div class="editorView">
    <el-row class="edit-header">
      <el-col :span="4"
        ><button class="btn back" @click="back">返回</button></el-col
      >
      <el-col :span="20"
        ><el-input
          placeholder="请输入标题"
          v-model="title"
          clearable
          :maxlength="15"
          show-word-limit
        ></el-input
      ></el-col>
    </el-row>
    <el-row class="edit-header">
      <el-col :span="4"
        ><button class="btn save" @click="save">保存文章</button></el-col
      >
      <el-col :span="20"
        ><el-input
          placeholder="请输入简介"
          v-model="interview"
          clearable
          :maxlength="15"
          show-word-limit
        ></el-input
      ></el-col>
    </el-row>
    <el-row class="edit-header">
      <el-col :span="4"
        ><button class="btn output" @click="output">发布文章</button></el-col
      >
      <el-col :span="3">
        <div class="btn-upload" @click="uploadImg">
          <input
            type="file"
            multiple
            accept="image/png, image/jpeg, image/jpg"
            @change="handleFiles"
            ref="inpimg"
            v-show="false"
          />
          上传
        </div>
      </el-col>
      <el-col :span="17">
        <el-input placeholder="输入标题图片网址" v-model="imgurl">
          <template slot="prepend">Http://</template>
        </el-input>
      </el-col>
    </el-row>

    <el-row class="main-editor" :gutter="20">
      <el-col :span="12">
        <div class="showbox">
          <textarea name="text" class="textarea" v-model="content"></textarea>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="showbox" v-html="convertCont"></div
      ></el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      interview: "",
      imgurl: "",
      content: "",
      converter: null,
      title: "",
      port: "http://" + window.location.host + "/port/",
      src: "",
    };
  },
  created() {
    let showdown = require("showdown");
    this.converter = new showdown.Converter();
  },
  computed: {
    convertCont() {
      if (this.converter) {
        let cont = this.converter.makeHtml(this.content);
        let atc = this.$store.state.articles;
        atc[atc.length - 1].content = cont;
        return cont;
      }
      return "";
    },
  },
  methods: {
    uploadImg() {
      this.$refs.inpimg.click();
    },
    handleFiles(e) {
      var formData = new FormData();
      formData.append("img", this.$refs.inpimg.files[0]);
      console.log(this.$refs.inpimg.files[0].name);
      this.imgurl = "127.0.0.1/upload/" + this.$refs.inpimg.files[0].name;
    },
    back() {
      this.$router.go(-1);
    },
    save() {
      const h = this.$createElement;
      this.$message({
        message: h("p", null, [h("span", null, "已保存")]),
        type: "success",
        duration: 1000,
      });
    },
    output() {
      const h = this.$createElement;
      setTimeout(() => {
        this.$router.replace({ path: "/index" });
        // console.log(this.$router)
      }, 1020);
      this.$message({
        message: h("p", null, [h("span", null, "已发布")]),
        type: "success",
        duration: 1000,
      });
    },
  },
};
</script>

<style lang="less" scoped>
div.editorView {
  width: 100%;
  height: 100%;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
}
.el-row {
  padding: 10px 0;
}
.edit-header {
  button.btn {
    height: 40px;
    width: 80%;
    border-radius: 10px;
    line-height: 20px;
    text-align: center;
  }

  .inp-title {
    font-weight: bold;
  }

  .btn-upload {
    width: 90%;
    height: 40px;
    line-height: 40px;
    background-color: #409eff;
    border: 1px solid #e4e4e4;
    color: #fff;
    text-align: center;
    border-radius: 5px;
    padding: 0 20px;
    transition-duration: 0.2s;
    position: relative;
  }

  .btn-upload:hover {
    background-color: #154677;
  }
}

.main-editor {
  .showbox {
    height: 500px;
    width: 100%;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 10px;
    padding: 5px 10px;
    overflow-y: auto;

    .textarea {
      width: 100%;
      height: 99%;
      border: none;
      resize: none;
      outline: none;
      font-size: 16px;
    }
  }
}

.right {
  float: right;
}
</style>