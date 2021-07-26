
/* 进度条组件 */

<template>
  <div class="container">
    <div class="process-bar" :style="barStyle">
      <div class="process-bar-complete" :style="compeledStyle"></div>
    </div>
    <div class="process-show">{{ completedPerc }}%</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pix: 0,
    };
  },
  props: {
    num: {
      type: Number,
      require: true,
    },

    completed: {
      type: Number,
      default: 0,
    },
    name:{
      type: String,
    }
  },
  computed: {
    barStyle() {
      return { width: "300px" };
    },
    completedPerc() {
      if (this.num == 0) return 0;
      let s = ((this.completed / this.num) * 100).toString().split(".");
      if (s[1] && s[1].length >= 1) s = s[0] + "." + s[1].slice(0, 1);
      else s = s.join("");
      this.pix = parseFloat(s);
      return s;
    },
    compeledStyle() {
      return {
        width: `${this.pix}%`,
      };
    },
  },
  methods: {

  },
  mounted() {},
};
</script>

<style scoped>
div.container {
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
  /* height: 20px; */
  height: 10rem;
  width: 100%;
  /* font-size: 4rem; */
}
div.process-bar {
  height: 5px;
  flex: 1;
  background-color: #777;
}
div.process-show {
  width: 60px;
  text-align: right;
}
div.process-bar-complete {
  height: 5px;
  background-color: rgba(255, 120, 30, 0.685);
}
</style>