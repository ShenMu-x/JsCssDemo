<template>
  <div>
    <common>
      <template slot="mainPart">
        <contCard
          v-for="v in centList"
          :key="v.id"
          :msg="v"
          page="index"
        ></contCard>
      </template>
    </common>
    <scrollTop></scrollTop>
  </div>
</template>

<script>
import contCard from "@/comp/contCard";
import common from "@/comp/common";
import scrollTop from "@/comp/scrollTop";
export default {
  data() {
    return {};
  },
  methods: {},
  components: {
    contCard,
    common,
    scrollTop,
  },
  computed: {
    centList() {
      return this.$store.state.articles;
    },
  },
};
</script>

<style  lang="less"  scoped>
</style>