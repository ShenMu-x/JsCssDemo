<template>
  <div class="sortContView">
    <div
      class="cent-title"
      v-for="v in this.$store.getters.sortByView"
      :key="v.id"
    >
      <a href=""
        ><b>{{ v.title }}</b></a
      >
      ——— {{ v.viewNum }} 次浏览
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
div.sortContView {
  margin-top: 20px;
  width: 100%;
  padding: 20px;
  height: 600px;
  border-radius: 20px;

  div.cent-title {
    padding: 10px;
  }
}
</style>