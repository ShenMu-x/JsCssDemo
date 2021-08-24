<template>
  <img :src="totop" alt="??" :class="totopCls" @click="handleTop" />
</template>

<script>
let throttle_fn = null;
let timer = null;
let rate = 100;
import { throttle } from "@/utils/func";
export default {
  data() {
    return {
      totop: "",
      totopCls: [],
    };
  },
  methods: {
    scrollHander() {
      if (window.innerWidth <= 768) {
        this.totop = require("../image/totopMB.png");
        this.totopCls = ["mb-screen", "totop", "hidden"];
        rate = 100;
        this.scrollHander = function (e) {
          let el = window;
          let y = el.pageYOffset !== undefined ? el.pageYOffset : el.scrollTop;
          console.log("mb", y);
          if (this.totopCls.length === 3 && y > 660) {
            this.totopCls = ["mb-screen", "totop"];
          } else if (this.totopCls.length === 2 && y < 660) {
            this.totopCls = ["mb-screen", "totop", "hidden"];
          }
        };
      } else {
        this.totop = require("../image/totopPC.png");
        this.totopCls = ["pc-screen", "totop", "hidden"];
        rate = 60;
        this.scrollHander = function (e) {
          let el = window;
          let y = el.pageYOffset !== undefined ? el.pageYOffset : el.scrollTop;
          console.log("pc", y);
          if (this.totopCls.length === 3 && y > 1000) {
            this.totopCls = ["pc-screen", "totop"];
          } else if (this.totopCls.length === 2 && y < 1000) {
            this.totopCls = ["pc-screen", "totop", "hidden"];
          }
        };
      }
    },
    handleTop() {
      cancelAnimationFrame(timer);
      timer = requestAnimationFrame(function fn() {
        var oTop =
          document.body.scrollTop || document.documentElement.scrollTop;
        if (oTop > 0) {
          scrollTo(0, oTop - rate);
          timer = requestAnimationFrame(fn);
        } else {
          cancelAnimationFrame(timer);
        }
      });
    },
  },
  created() {
    this.scrollHander();
  },
  mounted() {
    let that = this;
    if (!throttle_fn)
      throttle_fn = window.addEventListener(
        "scroll",
        throttle(() => {
          that.scrollHander();
        })
      );
  },
  destroyed() {
    window.removeEventListener("scroll", throttle_fn);
  },
};
</script>

<style lang="less" scoped>
@media screen and (max-width: 768px) {
  img.totop {
    position: fixed;
    bottom: 30px;
    right: 10px;
    height: 30px;
    width: 30px;
    transition-duration: 0.3s;
    transition-delay: 0s;
    transition-timing-function: ease-in-out;
  }
  .hidden {
    transform-origin: top center;
    transform: scaleY(0);
  }
}

@media screen and (min-width: 768px) {
  img.totop {
    position: fixed;
    top: 0;
    right: 30px;
    height: 690px;
    width: 60px;
    transition-duration: 1s;
    transition-delay: 0s;
    transition-timing-function: ease-in-out;
  }
  .hidden {
    transform: translateY(-100%);
  }
}
</style>