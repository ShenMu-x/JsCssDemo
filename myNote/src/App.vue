<template>
  <div>
    <!-- keep-alive 组件缓存，本处仅为学习使用 -->
    <keep-alive :include="['Home', 'About', 'Detail']">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  /* height: 100vh; */
  min-height: 100vh;
  height: auto;
  width: 100vw;
  /* background-color: aliceblue; */
  font-size: calc(100vw / 375);
}

.grid {
  width: 100vw;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-columns: 3;
  gap: 10rem;
}

.c-1 {
  grid-column: span 1;
}

.c-2 {
  grid-column-end: span 2;
}

.c-3 {
  grid-column-end: span 3;
}

@media screen and (min-width: 1024px) {
  .lg-c-1 {
    grid-column: span 1;
  }
  .lg-c-2 {
    grid-column: span 2;
  }
  .lg-c-3 {
    grid-column: span 3;
  }
}

@media screen and (max-width: 1024px) {
  .md-c-1 {
    grid-column: span 1;
  }
  .md-c-2 {
    grid-column: span 2;
  }
  .md-c-3 {
    grid-column: span 3;
  }
}

@media screen and (max-width: 500px) {
  /* 500px 手机尺寸 */
  .sm-c-1 {
    grid-column: span 1;
  }
  .sm-c-2 {
    grid-column: span 2;
  }
  .sm-c-3 {
    grid-column: span 3;
  }
}
</style>