<template>
  <common>
    <div class="articleView" v-loading.fullscreen.lock="loading" slot="mainPart">
      <contCard
        page="article"
        :msg="msg"
        v-show="msg.id"
        :key="msg.id"
      ></contCard>
    </div>
  </common>
</template>

<script>
import common from "@/comp/common";
import contCard from "@/comp/contCard";
import { getArticle } from "@/utils/func";

export default {
  data() {
    return {
      msg: {},
      loading: true,
    };
  },
  components: {
    contCard,
    common,
  },
  created() {
    let id = parseInt(this.$route.query.id);
    let ls = this.$store.state.articles;

    let obj = ls.filter((v) => v.id === id)[0];
    if (!obj) {
    } else;
  },
  methods: {
    setData(promise) {
      this.loading = true;
      promise
        .then(
          (obj) => {
            this.msg = obj;
          },
          (err) => {
            alert("请求错误");
            this.$router.replace("/index");
          }
        )
        .finally(() => {
          this.loading = false;
        });
    },
  },
  computed: {},
  beforeRouteEnter(to, from, next) {
    next((vm) => vm.setData(getArticle(to.query.id)));
  },
  beforeRouteUpdate(to, from, next) {
    this.loading = true;
    getArticle(to.query.id)
      .then(
        (obj) => {
          this.msg = obj;
          next();
        },
        (err) => {
          alert("请求错误");
          this.$router.go(-1);
          next(false);
        }
      )
      .finally(() => {
        this.loading = false;
      });
  },
};
</script>

<style lang="less" scoped>
div.articleView {
  width: 100%;
}
</style>