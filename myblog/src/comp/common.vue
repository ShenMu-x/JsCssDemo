<template>
  <div class="container">
    <!-- 导航栏 -->
    <myNav></myNav>
    <!-- 头部个人信息 -->
    <header class="headerbox">
      <div class="usermsg">
        <img class="avatar" :src="avatarURL" alt="avatar" />
        <div class="interview">{{ interview }}</div>
      </div>
    </header>
    <!-- 左右分列布局 -->
    <main class="content">
      <div class="main-cent">
        <!-- slot 插入主体 -->
        <slot name="mainPart"></slot>
      </div>
      <div class="main-slide">
        <iViewCard></iViewCard>
        <likeMe></likeMe>
        <sortCont></sortCont>
      </div>
    </main>
    <!-- 尾注 -->
    <footer>
      <footerMsg></footerMsg>
    </footer>
  </div>
</template>

<script>
import footerMsg from "@/comp/footer";
import myNav from "@/comp/nav";
import iViewCard from "@/comp/iViewCard";
import likeMe from "@/comp/likeMeCard";
import sortCont from "@/comp/sortContView";

export default {
  data() {
    return {
      username: "Floyee",
      avatarURL:
        "https://tse1-mm.cn.bing.net/th/id/R-C.f002df31d8051c7c60711b919ca53fcc?rik=lMTpaL806kXvUQ&riu=http%3a%2f%2fwww.wenyu77.com%2fuploads%2fimg1%2f20200714%2fedb763cb6e70e0d985bc0babc502d44f.jpg&ehk=VPSf%2fDx0jmT2ZYHo00fJJdnOnzcPjqoZjzkl%2bBe%2bQXM%3d&risl=&pid=ImgRaw&r=0",
      interview: "hello world!",
    };
  },
  computed: {},
  methods: {
    toarticle(id) {
      this.$router.push({
        path: "/article",
        query: {
          id,
        },
      });
    },
  },
  components: {
    footerMsg,
    myNav,
    iViewCard,
    likeMe,
    sortCont,
  },
  created() {
    let that = this;
    this.$store.state.bus.$on("toarticle", that.toarticle);
  },
};
</script>

<style  lang="less"  scoped>
div.container {
  overflow: hidden;
  width: 100%;
}

.headerbox {
  height: 650px;
  background: url("../image/topbg.jpg") no-repeat;
  background-position: center 50%;
  background-size: cover;
  position: relative;
  z-index: -1;

  .usermsg {
    height: auto;
    padding: 20px;

    position: absolute;
    background-color: #fdfffee1;
    border-radius: 20px;
    display: flex;

    justify-content: space-evenly;
    align-items: center;
    animation: upper 0.8s ease-in-out 0s 1 normal forwards;

    .avatar {
      clip-path: circle();
      height: 100px;
      width: 100px;
    }

    .interview {
      font-size: 24px;
      mask-image: -webkit-gradient(
        linear,
        0 0,
        0 bottom,
        from(yellow),
        to(rgba(0, 0, 255, 0))
      );
    }
    @keyframes upper {
      from {
        transform: translate(-50%, 0%);
      }
      to {
        transform: translate(-50%, -75%);
      }
    }
  }
}

main.content::after {
  content: "";
  display: block;
  clear: both;
}

main.content {
  div.main-cent {
    background-color: rgba(255, 255, 255, 0.658);
    float: left;
  }

  div.main-slide {
    background-color: rgba(255, 255, 255, 0.74);
    float: right;
  }
}

@media screen and (max-width: 1070px) {
  div.main-cent,
  div.main-slide {
    width: 100%;
  }
  div.main-slide {
    margin-top: 20px;
  }
}

@media screen and (min-width: 1070px) {
  div.main-cent {
    width: 65%;
  }

  div.main-slide {
    width: 33%;
    margin-left: 15px;
  }
}

@media screen and (max-width: 768px) {
  main.content {
    margin-top: -400px;
    padding: 0 20px;
  }
  .usermsg {
    flex-direction: row;
    top: 200px;
    left: 50%;
    width: 90%;
  }
}

@media screen and (min-width: 768px) {
  main.content {
    margin-top: 80px;
    padding: 0 10%;
  }
  .usermsg {
    flex-direction: column;
    top: 100%;
    left: 50%;
    width: 65%;
  }
}
</style>