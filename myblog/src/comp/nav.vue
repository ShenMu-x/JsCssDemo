<template>
  <div class="header">
    <el-row class="header-row">
      <!-- pc端界面 -->
      <el-col :span="20" :offset="1" class="pc-screen">
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          background-color="#101419"
          text-color="#fff"
          active-text-color="#8998B6"
        >
          <el-menu-item index="index">
            <font-awesome-icon :icon="['fas', 'home']" size="lg" />
            首页
          </el-menu-item>
          <el-submenu index="share">
            <template slot="title"
              ><font-awesome-icon :icon="['fas', 'pen-square']" size="lg" />
              类别</template
            >
            <el-menu-item index="工作间">工作间</el-menu-item>
            <el-menu-item index="生活间">生活间</el-menu-item>
            <el-menu-item index="杂评区">杂评区</el-menu-item>
          </el-submenu>
          <el-menu-item index="remark"
            ><font-awesome-icon :icon="['fas', 'comment-dots']" size="lg" />
            留言簿</el-menu-item
          >
          <el-menu-item index="about">
            <font-awesome-icon
              :icon="['fas', 'address-card']"
              size="lg"
            ></font-awesome-icon>
            关于我</el-menu-item
          >
          <el-menu-item index="editor">
            <font-awesome-icon
              :icon="['fas', 'address-card']"
              size="lg"
            ></font-awesome-icon>
            编辑器</el-menu-item
          >
          <!-- <ul class="loginPart">
            <el-input v-model="input" placeholder="请输入内容"></el-input>
          </ul> -->
          <!-- <ul class="loginPart">
            <li @click="loginIn(0)">注册</li>
            <li @click="loginIn(1)">登录</li>
          </ul> -->
        </el-menu>
      </el-col>
      <!-- 移动端界面 -->
      <el-col :span="2" :offset="1" class="mb-screen">
        <font-awesome-icon
          :icon="['fas', 'bars']"
          size="lg"
          class="bars-icon"
          @click="handleMenu"
        />
        <el-menu
          :class="['el-menu-demo', { none: !showMenu }]"
          :default-active="activeIndex"
          mode="vertical"
          @select="handleSelect"
          background-color="#101419"
          text-color="#fff"
          active-text-color="#8998B6"
        >
          <el-menu-item index="index"
            ><font-awesome-icon :icon="['fas', 'home']" size="lg" />
            首页</el-menu-item
          >
          <el-submenu index="share">
            <template slot="title"
              ><font-awesome-icon :icon="['fas', 'pen-square']" size="lg" />
              类别</template
            >
            <el-menu-item index="工作间">工作间</el-menu-item>
            <el-menu-item index="生活间">生活间</el-menu-item>
            <el-menu-item index="杂评区">杂评区</el-menu-item>
          </el-submenu>
          <el-menu-item index="remark"
            ><font-awesome-icon :icon="['fas', 'comment-dots']" size="lg" />
            留言簿</el-menu-item
          >
          <el-menu-item index="about">
            <font-awesome-icon
              :icon="['fas', 'address-card']"
              size="lg"
            ></font-awesome-icon>
            关于我</el-menu-item
          >
          <!-- <el-menu-item index="login-0">
            <font-awesome-icon
              :icon="['fas', 'registered']"
              size="lg"
            ></font-awesome-icon>
            注册</el-menu-item
          >
          <el-menu-item index="login-1">
            <font-awesome-icon
              :icon="['fas', 'sign-in-alt']"
              size="lg"
            ></font-awesome-icon>
            登录</el-menu-item
          > -->
        </el-menu>
      </el-col>
      <el-col :span="20" class="mb-screen">
        <el-input v-model="input" placeholder="请输入内容"></el-input>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: "1",
      input: "",
      showMenu: false,
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      if (["index", "remark", "about","editor"].includes(key)) {
        console.log(this.$router.currentRoute.name === key);
        if(this.$router.currentRoute.name === key) return;
        key = "/" + key;
        this.$router.push({
          path: key,
          query: {},
        });
      } else if (key.indexOf("login") !== -1) {
        let n = parseInt(key[key.length - 1]);
        if (n === 0 || n === 1) {
          this.$router.push({
            path: '/login',
            query: {
              type: n,
            },
          });
        }
      } else if (keyPath[0] === "share") {
        this.$router.push({
          path: `/share`,
          query: {
            category: key,
          },
        });
      }
      this.showMenu = false; // 针对移动端
    },
    handleMenu() {
      this.showMenu = !this.showMenu;
    },
    loginIn(num) {
      if (num === 0 || num === 1) {
        this.$router.push({
          path: "/login",
          query: {
            type: num,
          },
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.header-row {
  background-color: #101419;
  color: #fff;
  height: 60px;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0;
  position: fixed;
  top: 0;
  z-index: 20;
}

.linker {
  color: #fff;
}

.pc-screen {
  .el-menu {
    opacity: 0.8;
    .el-menu-demo {
      display: flex;
      justify-content: center;
    }
  }
  .el-menu.el-menu--horizontal {
    border-bottom: 0;
  }
  ul.loginPart {
    float: right;
    display: flex;
    text-decoration: none;
    list-style: none;
    height: 60px;
    align-items: center;
    li:nth-of-type(1)::after {
      content: "|";
      font-family: Arial, sans-serif;
      display: inline-block;
      padding-left: 10px;
    }

    li {
      padding: 5px;
      font-size: 14px;
    }
  }
}

.mb-screen {
  .el-menu {
    width: 90vw;
    margin-left: 0;
    padding-left: 0vw;
    position: absolute;
    top: 65px;
  }
}

.none {
  display: none;
}
</style>