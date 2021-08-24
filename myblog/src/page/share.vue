<template>
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
</template>

<script>
import common from "@/comp/common";
import contCard from "@/comp/contCard";
export default {
  data() {
    return {};
  },
  computed: {
    centList() {
      if (this.$route.query.category === "生活间") {
        return this.$store.getters.live;
      } else if (this.$route.query.category === "杂评区") {
        return this.$store.getters.other;
      }
      return this.$store.getters.work;
    },
  },
  components: {
    contCard,
    common,
  },
};
</script>

<style lang="less" scoped>
</style>