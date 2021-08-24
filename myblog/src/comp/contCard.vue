<template>
  <div class="contCard">
    <h2>{{ title }}</h2>
    <div class="detail">
      <span>
        <font-awesome-icon
          :icon="['fas', 'clock']"
          size="sm"
        ></font-awesome-icon>
        {{ time }} 发布
      </span>
      <span>
        <font-awesome-icon :icon="['fas', 'eye']" size="sm"></font-awesome-icon>
        {{ viewNum }} 浏览
      </span>
      <span>
        <font-awesome-icon
          :icon="['fas', 'comments']"
          size="sm"
        ></font-awesome-icon>
        {{ comtNum }} 评论
      </span>
      <span>
        <font-awesome-icon
          :icon="['fas', 'heart']"
          size="sm"
        ></font-awesome-icon>
        {{ likeNum }} 喜欢
      </span>
      <span>
        <font-awesome-icon
          :icon="['fas', 'star']"
          size="sm"
        ></font-awesome-icon>
        {{ starNum }} 收藏
      </span>
    </div>

    <div class="tag">
      {{ category }}
      <div class="tag-deco pc-screen"></div>
    </div>

    <div class="cent-box" v-if="page === 'index'">
      <div class="interview">{{ interview }}</div>
      <div alt="文章配图" :style="imageStyle" class="image"></div>
    </div>

    <div class="cent-box" v-if="page === 'article'">
      <div class="content" v-html="content"></div>
    </div>

    <div class="timeball pc-screen">
      <p class="month">{{ time | getMonth }}</p>
      <p class="date">{{ time | getDate }}</p>
    </div>

    <button
      tag="div"
      class="tocontent"
      v-if="page === 'index'"
      @click="toarticle"
    >
      阅读全文>>>
    </button>
  </div>
</template>

<script>
import { TimeFun } from "@/utils/func";
export default {
  data() {
    return {
      title: "",
      time: "",
      viewNum: "",
      comtNum: "",
      likeNum: "",
      starNum: "",
      interview: "",
      image: "",
      category: "",
      content: "",
    };
  },
  props: ["msg", "page"],
  computed: {
    imageStyle() {
      if (this.image) {
        return {
          "background-image": `url(${this.image})`,
        };
      }
      return { display: "none" };
    },
  },
  filters: {
    getMonth(value) {
      return `${value.split("-")[1]}月`;
    },
    getDate(value) {
      return `${value.split("-")[2]}`;
    },
  },
  created() {
    this.id = this.msg.id;
    this.title = this.msg.title;
    this.time = TimeFun.getFmatDate(this.msg.time);
    this.viewNum = this.msg.viewNum;
    this.comtNum = this.msg.comtNum;
    this.likeNum = this.msg.likeNum;
    this.starNum = this.msg.starNum;
    this.interview = this.msg.interview;
    this.image = this.msg.image;
    this.category = this.msg.category;
    this.content = this.msg.content;
  },
  methods: {
    toarticle() {
      this.$store.state.bus.$emit("toarticle", this.id);
    },
  },
};
</script>

<style lang="less" scoped>
div.contCard {
  border-radius: 20px;
  width: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;
  position: relative;

  div.timeball {
    position: absolute;
    top: -7px;
    left: -10px;
    height: 36px;
    width: 36px;
    border-radius: 50%;
    background-color: #586b7d;
    box-shadow: #586b7d 0 0 5px 20px;
    color: #fff;
    font-family: Arial, Helvetica, sans-serif;

    p {
      width: 36px;
      text-align: center;
    }
    p.date {
      font-size: 32px;
      line-height: 24px;
    }

    p.month {
      line-height: 12px;
      margin-bottom: 5px;
    }
  }

  div.tag {
    height: 35px;
    width: 100px;
    background-color: #586b7d;
    color: #fff;
    font-weight: bold;
    text-align: right;
    line-height: 35px;
    letter-spacing: 5px;
    position: relative;
    margin: 10px 0;
    padding-right: 20px;
    align-self: flex-start;
  }

  div.tag-deco {
    height: 20px;
    width: 20px;
    background-color: #373b3f;
    clip-path: polygon(0 0, 100% 0, 100% 80%);
  }

  div.detail {
    display: flex;
    font-size: 14px;
    justify-content: center;
    flex-flow: row wrap;
    padding: 5px;

    span {
      display: flex;
      align-items: center;
      white-space: nowrap;
      line-height: 1.2em;
    }

    span:nth-of-type(n + 2)::before {
      content: "·";
      font-size: 26px;
      margin: 0 3px;
      transform: translateY(-2px);
    }
  }

  div.cent-box {
    width: 100%;
    overflow: hidden;

    .interview {
      height: 20px;
      margin-bottom: 10px;
      word-break: break-all;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    .image {
      width: 100%;
      height: 0;
      padding-bottom: 50%;
      overflow: hidden;
      background-position: center center;
      background-repeat: no-repeat;
      -webkit-background-size: cover;
      -moz-background-size: cover;
      background-size: cover;
      border-radius: 10px;
    }
  }

  .tocontent {
    border: none;
    margin-top: 10px;
    padding: 5px 10px;
    background-color: #586b7d;
    color: #fff;
    border-radius: 5px;
    font-size: 12px;
  }
}

@media screen and (max-width: 768px) {
  div.contCard {
    padding: 20px 5px;
  }

  div.cent-box {
    padding: 0px 10px 0px;
  }

  div.tag {
    left: -8px;
  }
}

@media screen and (min-width: 768px) {
  div.contCard {
    padding: 20px;
  }

  div.cent-box {
    padding: 10px 40px 0px;
  }

  div.tag {
    left: -40px;
  }
}
</style>