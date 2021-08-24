<template>
  <div class="likemeCard">
    <p>LIKE ME</p>
    <div class="box">
      <font-awesome-icon :icon="['fas', 'heart']" size="2x"></font-awesome-icon>
      <span v-if="likeCount < 10e14">{{ likeCount }}</span>
      <span v-else>{{ -1 + 10e14 }}+</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      likeCount: 888888888,
    };
  },
};
</script>

<style lang="less" scoped>
div.likemeCard {
  margin-top: 20px;
  width: 100%;
  padding: 20px;
  color: #aa383f;
  border-radius: 20px;

  p {
    text-align: center;
    font-size: 1rem;
  }

  span {
    font-size: 2rem;
    margin-left: 10px;
  }

  div.box {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>