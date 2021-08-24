<template>
    <common>
      <div class="aboutPage" slot="mainPart">
        <p>ABOUT</p>
      </div>
    </common>
</template>

<script>
import common from "@/comp/common";
export default {
  data() {
    return {
      content: "",
      converter: null,
    };
  },
  created() {
    let showdown = require("showdown");
    this.converter = new showdown.Converter();
  },
  computed: {
    convertCont() {
      if (this.converter) return this.converter.makeHtml(this.content);
      return "";
    },
  },
  components: {
    common,
  },
};
</script>

<style lang="less" scoped>
div.aboutPage {
  height: 100px;
  width: 100%;
}
</style>