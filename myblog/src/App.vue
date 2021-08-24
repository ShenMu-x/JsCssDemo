<template>
  <div>
    <!-- 背景图固定 -->
    <div id="appBGPic"></div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
  components: {},
};
</script>

<style  lang="less">
@cardBC: #e3ebf8;
@fontC: #101419;

@timerC: #586b7d;
@thing: #373b3f;
@thingHover: #bac1d6;
@heart: #aa383f;
@menu: #8998b6;
@btn: #409eff;
@btnHover: #154677;

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  font-size: 14px;
  color: @fontC;
}

body {
  width: 100%;
}

a {
  text-decoration: none;
  color: @fontC;
}

ul {
  list-style: none;
}

@media screen and (min-width: 768px) {
  .pc-screen {
    display: block;
  }

  .mb-screen {
    display: none;
  }
}

@media screen and (max-width: 768px) {
  .pc-screen {
    display: none;
  }

  .mb-screen {
    display: block;
  }
}
#appBGPic {
  background-image: url("./image/bg.jpg");
  background-position: center 50%;
  background-size: cover;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: -1000;
}

.useBgColor {
  background-color: @cardBC;
}

div.likemeCard,
div.sortContView,
div.contCard,
div.iViewCard,
div.aboutPage,
div.rmkColorBox {
  background-color: @cardBC;
}
</style>
