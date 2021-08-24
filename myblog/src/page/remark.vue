<template>
  <common>
    <div class="remarkView" slot="mainPart">
      <div class="rmkColorBox">
        <h2>留言簿</h2>
        <p class="inter">你有什么想说的呢w</p>
        <img :src="require('@/image/remark.png')" alt="" />
      </div>

      <div class="rmkColorBox form">
        <el-form ref="form" :model="form" label-width="40px">
          <el-form-item label="昵称">
            <el-input
              placeholder="请输入昵称"
              v-model="form.nickname"
              clearable
              :maxlength="6"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="评论">
            <el-input
              type="textarea"
              :rows="5"
              placeholder="请输入内容"
              v-model="form.remark"
            >
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="send">发表留言</el-button>
            <el-button @click="reset">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="rmkColorBox">
        <ul>
          <li class="remarks" v-for="rmk in remarks" :key="rmk.id">
            <p class="nickname">{{ rmk.nickname }}</p>
            <p class="timeTag">{{ rmk.time | fmt }}</p>
            <p>{{ rmk.remark }}</p>
          </li>
          <button class="loadBtn toload" v-if="canLoad" @click="getRmks">
            点击加载更多评论
          </button>
          <button class="loadBtn noload" v-else>暂无更多评论</button>
        </ul>
      </div>
    </div>
  </common>
</template>

<script>
import common from "@/comp/common";
import { TimeFun, getRemarks } from "@/utils/func";

let page = 0;
const size = 2;

export default {
  data() {
    return {
      form: {
        remark: "",
        nickname: "游客",
      },

      remarks: [],
      canLoad: true,
    };
  },
  methods: {
    send() {
      this.remarks.push({
        id: Math.random() * 100000 + 6,
        remark: this.form.remark,
        nickname: this.form.nickname,
        time: Date.now(),
      });
    },
    reset() {
      console.log("reset");
      this.form.remark = "";
      this.form.nickname = "游客";
    },
    getRmks() {
      getRemarks({ page, size })
        .then((obj) => {
          page++;
          this.remarks.push(...obj.data);
          this.canLoad = obj.end;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    this.getRmks();
  },
  filters: {
    fmt(value) {
      return TimeFun.getFmatTime_S(value);
    },
  },
  components: {
    common,
  },
};
</script>

<style lang="less" scoped>
div.remarkView {
  width: 100%;
  h2 {
    text-align: center;
  }

  .rmkColorBox {
    border-radius: 20px;
    padding: 30px;
    padding-bottom: 10px;
    margin-bottom: 20px;
    p.inter {
      padding: 10px 0;
      font-size: 16px;
    }
    img {
      width: 100%;
    }

    h2 {
      padding-bottom: 10px;
    }

    li.remarks {
      border-bottom: 1px solid silver;
      padding: 10px 0;

      .nickname {
        font-weight: bold;
      }

      .timeTag {
        font-size: 12px;
        color: rgb(167, 167, 167);
        margin: 5px 0;
      }
    }

    .loadBtn {
      width: 100%;
      border: 0;
      text-align: center;
      margin: 10px 0;
      padding: 5px 0;
      color: #fff;
      border-radius: 5px;
    }

    .toload {
      background-color: #409eff;
    }

    .toload:hover {
      background-color: #154677;
    }

    .noload {
      background-color: silver;
    }

    .none {
      display: none;
    }
  }
}
</style>