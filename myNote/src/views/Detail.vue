<template>
  <div class="detailcontainer">
    <!-- 表单 -->
    <div
      :class="[{ 'black-deactive': notAddMode }, 'black']"
      @click="changeAddMode"
    ></div>
    <div :class="[{ 'form-deactive': notAddMode }, 'form']">
      <div class="form-box">
        <div class="form-title">Add a Task</div>
        <div class="form-main">
          <label class="must_inp"
            >Task Name :
            <input type="text" v-model.trim.lazy="msg" id="inputMsg"
          /></label>
          <label class="must_inp">
            Task Time :
            <label
              ><input
                type="radio"
                v-model="choose"
                :value="today"
              />today</label
            >
            <label
              ><input
                type="radio"
                v-model="choose"
                :value="tomorrow"
              />tomorrow</label
            >
          </label>
        </div>
        <button class="form-btn" @click="commit">COMMIT</button>
      </div>
    </div>

    <!-- 路由，返回主页,设置完全匹配时样式 -->
    <router-link tag="div" to="/" active-class="linker"></router-link>

    <!-- 信息展示 -->
    <div class="bar-box">
      <div class="title">{{ name }}</div>
      <div class="bar">
        <bar
          :num="this.tasks.length"
          :completed="this.tasks.filter((v) => v.completed).length"
          :name="name"
          class="bar"
        ></bar>
      </div>
    </div>

    <!-- 任务列表 -->
    <div class="task-box grid">
      <div class="taskls todayTask lg-c-3 md-c-3 sm-c-3">
        Today
        <template v-for="obj in todayTasks">
          <div :key="obj._KEY" class="task-inner-box">
            <label class="label">
              <input type="checkbox" v-model="obj.completed" />
              {{ obj.name }}
            </label>
            <button class="task-btn-delete" @click="toDelete(obj._KEY)">
              DELETE
            </button>
          </div>
        </template>
      </div>
      <div class="taskls tomorrTask lg-c-3 md-c-3 sm-c-3">
        Tomorrow
        <template v-for="obj in tomorTasks">
          <div :key="obj._KEY" class="task-inner-box">
            <label class="label">
              <input type="checkbox" v-model="obj.completed" />
              {{ obj.name }}
            </label>
            <button class="task-btn-delete" @click="toDelete(obj._KEY)">
              DELETE
            </button>
          </div>
        </template>
      </div>
    </div>

    <!-- 添加任务控件 -->
    <span class="icon-add" @click="changeAddMode">+</span>
  </div>
</template>


<script>
import bar from "@/comp/processBar";
import { today, tomorrow } from "@/utils/util.js";
export default {
  data() {
    return {
      name: "",
      tasks: [],
      num: 0,
      completed: 0,
      notAddMode: true,
      choose: "",
      msg: "",
      today: today,
      tomorrow: tomorrow,
    };
  },
  components: {
    bar,
  },
  computed: {
    todayTasks() {
      return this.tasks.filter((v) => v.date === today);
    },
    tomorTasks() {
      return this.tasks.filter((v) => v.date === tomorrow);
    },
  },
  created() {
    this.name = this.$route.params.name;
    this.tasks = this.$store.state.task[this.name];
  },
  watch: {},
  methods: {
    changeAddMode() {
      this.notAddMode = !this.notAddMode;
    },
    commit() {
      // console.log(this.name, this.msg, this.choose);
      if (this.msg.length == 0 || this.choose.length == 0) {
        alert("选项为必填项");
        return;
      }
      this.$store.commit({
        type: "addTask",
        name: this.name,
        msg: this.msg,
        date: this.choose,
      });

      this.msg = "";
      this.choose = "";
      this.notAddMode = true;
    },
    toDelete(key) {
      if (window.confirm("确认删除？")) {
        this.$store.commit({
          type: "removeTask",
          key: key,
          name: this.name,
        });
      }
    },
  },
  deactivated() {
    this.notAddMode = true;
  },
};
</script>

<style scoped>
.detailcontainer {
  font-family: "Courier New", Courier, monospace;
  min-height: 100vh;
  width: 100%;
  background-color: azure;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  font-size: 6rem;
}

.linker {
  display: block;
  align-self: flex-start;
  height: 20rem;
  width: 20rem;
  border: 10rem solid transparent;
  border-right: 20rem solid rgb(38, 63, 55);
  margin: 15rem;
}
span.icon-add {
  display: inline-block;
  height: 20rem;
  width: 20rem;
  background-color: rgb(90, 90, 90);
  color: rgb(255, 255, 255);
  border: 1px solid rgb(90, 90, 90);
  border-radius: 50%;
  font-size: 20rem;
  line-height: 20rem;
  text-align: center;
  flex: 1;
  position: absolute;
  right: 30rem;
  top: 15rem;
}
.bar-box {
  padding: 20rem 30rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
}
div.title {
  font-size: 20rem;
  font-weight: bold;
  margin-bottom: 5rem;
}

div.bar {
  min-width: 80%;
  max-width: 60%;
}

.task-box {
  width: 100%;
  padding: 10rem 30rem;
  flex: 1;
  grid-gap: 20rem;
}
.taskls {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex: 1;
  padding-bottom: 5rem;
}

.task-inner-box {
  border-bottom: 1px solid #555;
  height: 40rem;
  padding: 5rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.taskls .label {
  margin: 5rem;
}

.task-btn-delete {
  background: transparent;
  color: silver;
  height: fit-content;
  padding: 2px 5px;
  border: 1px solid rgba(192, 192, 192, 0.829);
}

div.black {
  position: absolute;
  overflow: hidden;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: #777;
  opacity: 0.5;
  z-index: 5;
}

@keyframes totop {
  to {
    transform: translate(-50%, -50%);
  }
}

@media screen and (min-width: 768px) {
  div.form {
    height: 500px;
    width: 600px;
    position: absolute;
    border-radius: 10px;
    background-color: #fff;
    z-index: 6;
    transform: translate(-50%, -40%);
    top: 50%;
    left: 50%;
    animation: totop 0.5s ease-out 0s 1 normal forwards;
  }
}

@media screen and (max-width: 768px) {
  div.form {
    height: 300rem;
    width: 340rem;
    position: absolute;
    border-radius: 10px;
    background-color: #fff;
    z-index: 6;
    transform: translate(-50%, -40%);
    top: 50%;
    left: 50%;
    animation: totop 0.5s ease-out 0s 1 normal forwards;
  }
}

.black-deactive {
  display: none;
}

.form-deactive {
  display: none;
}

.form-box {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 80%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 80%;
}

.form-title {
  font-size: 26px;
  font-weight: bold;
  height: 50px;
  line-height: 50px;
}

.form-main {
  display: flex;
  flex-direction: column;
  height: 100px;
  width: 100%;
  justify-content: space-around;
}
.form-main input {
  outline: none;
  margin: 2px;
  outline-style: none;
  border: 1px solid #777;
  margin-left: 5px;
}
.form-main > label {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.form-btn {
  height: 30px;
  padding: 0 10px;
  text-align: center;
  background-color: azure;
  border: 1px solid #999;
}

.must_inp::before {
  content: "*";
  color: red;
  font-size: 5px;
}
</style>
