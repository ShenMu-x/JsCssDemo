<template>
  <div class="container">
    <div
      :class="[
        'bgColor',
        'InitMode',
        { opacity0: mode != -1, opacity1: mode == -1 },
      ]"
    ></div>
    <div
      :class="[
        'bgColor',
        'redMode',
        { opacity0: mode != 0, opacity1: mode == 0 },
      ]"
    ></div>
    <div
      :class="[
        'bgColor',
        'greenMode',
        { opacity0: mode != 1, opacity1: mode == 1 },
      ]"
    ></div>
    <div
      :class="[
        'bgColor',
        'bludMode',
        {
          opacity0: mode != 2,
          opacity1: mode == 2,
        },
      ]"
    ></div>
    <header>
      <h1>TODO</h1>
    </header>
    <div class="showMsg">
      <span class="icon" v-if="sex == 'female'">👩‍🦰</span>
      <span class="icon" v-else>🧑</span>
      <h1>Hello,{{ userName }}.</h1>
      <p>It looks that you feel good today!</p>
      <p>You have {{ this.$store.getters.getTodayCount}} things to do today.</p>
    </div>
    <span class="panes-before">{{ date }}</span>
    <div class="panes grid">
      <!-- <div class="lg-c-1 md-c-3 sm-c-3">123</div>
      <div class="lg-c-1 md-c-3 sm-c-3">123</div>
      <div class="lg-c-1 md-c-3 sm-c-3">123</div> -->
      <template v-for="(v, i) in panename">
        <pane
          class="lg-c-1 md-c-3 sm-c-3"
          :title="v"
          :key="v"
          :id="i"
          :tasks="tasks[i]"
          @changeColor="changeColor"
          @initMode="initMode"
        ></pane>
      </template>
    </div>
  </div>
</template>

<script>
import pane from "@/comp/pane";
const bgStyleLs = [{}, {}, {}];
export default {
  data() {
    return {
      userName: "Floyee",
      panename: [],
      tasks: [],
      date: null,
      sex: "female",
      mode: -1,
    };
  },
  computed: {
    thingsNumber() {
      return 5;
    },
    RedStyle() {},
    bgStyle() {
      if (this.mode == -1) return {};
      else return bgStyleLs[this.mode];
    },
  },
  components: {
    pane,
  },
  created() {
    this.date = new Date().toDateString();
    let t = this.$store.state.task;
    this.panename = Object.keys(t);
    for (let i in this.panename) {
      this.tasks.push({
        num: t[this.panename[i]].length,
        completed: t[this.panename[i]].filter((v) => v.completed).length,
      });
    }
  },
  methods: {
    changeColor(id) {
      this.mode = id;
    },
    initMode() {
      this.mode = -1;
    },
  },
};
</script>

<style scoped>
div.container {
  min-height: 100vh;
  height: auto;
  width: 375rem;
  display: flex;
  flex-direction: column;
  color: white;
  font-size: 6rem;
}

.bgColor {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  transition: opacity 0.5s;
  z-index: -1;
}
.InitMode {
  background: linear-gradient(
    to bottom,
    rgba(252, 208, 12, 0.5),
    rgba(255, 169, 9, 0.9)
  );
}
.redMode {
  background: linear-gradient(
    to bottom,
    rgba(250, 208, 174, 0.801),
    rgba(184, 83, 25, 0.74)
  );
}
.greenMode {
  background: linear-gradient(
    to bottom,
    rgba(12, 222, 152, 0.658),
    rgba(13, 109, 18, 0.541)
  );
}
.bludMode {
  background: linear-gradient(
    to bottom,
    rgba(3, 149, 216, 0.5),
    rgba(56, 17, 197, 0.685)
  );
}
.opacity1 {
  opacity: 1;
}
.opacity0 {
  opacity: 0;
}

header {
  align-self: stretch;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 6rem;
  height: 30rem;
}

div.showMsg {
  height: 50rem;
  width: 100%;
  padding-left: 30rem;
}

span.icon {
  display: block;
  height: 10rem;
  width: 10rem;
  font-size: 10rem;
  line-height: 10rem;
  text-align: center;
}
div.panes {
  flex: 1;
  padding: 10rem 30rem;
}
span.panes-before {
  position: relative;
  margin: 10rem 30rem;
  margin-bottom: 0rem;
}
</style>