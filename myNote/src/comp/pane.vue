
/* 面板组件 */

<template>
  <router-link :to="'/Detail/'+title" tag="div">
    <div
      class="pane-container"
      @mouseover="changeMode()"
      @mouseleave="initMode()"
    >
      <div class="icon-div">
        <span>△</span>
      </div>
      <div class="task-show">
        <span> {{ tasks.num }} Tasks</span>
        <h1>{{ title }}</h1>
      </div>
      <bar :num="tasks.num" :completed="tasks.completed"></bar>
    </div>
  </router-link>
</template>

<script>
import bar from "@/comp/processBar";
export default {
  data() {
    return {
      paneName: "default",
    };
  },
  props: {
    title: {
      type: String,
      require: true,
    },
    id: {
      type: Number,
    },
    tasks: {
      type: Object,
    },
  },
  components: {
    bar,
  },
  methods: {
    changeMode() {
      this.$emit("changeColor", this.id);
    },
    initMode() {
      this.$emit("initMode", -1);
    },
  },
};
</script>

<style scoped >

div.pane-container {
  /* 固定了宽度 */
  /* width: 400px; */
  height: 100%;
  background-color: white;
  color: #999;
  border-radius: 20px;
  transition: 0.2s;
  display: flex;
  flex-direction: column;
  padding: 20px;
  position: relative;
  font-size: 5rem;
}


div.icon-div > span {
  display: inline-block;
  height: 50px;
  width: 50px;
  border: 1px solid rgb(189, 189, 189);
  border-radius: 50%;
  font-size: 40px;
  line-height: 50px;
  text-align: center;
}

div.pane-container:hover {
  box-shadow: 0 0 20px #999;
}

div.icon-div {
  flex: 4;
}
div.task-show {
  flex: 1;
}
bar {
  flex: 1;
}
</style>