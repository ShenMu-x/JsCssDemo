<template>
  <div class="iViewCard">
    <div class="idImg"></div>
    <p>{{ username }}</p>
    <div class="contact">
      <a class="contact-way">
        <font-awesome-icon
          :icon="['fab', 'github']"
          size="lg"
        ></font-awesome-icon>
      </a>
      <a class="contact-way">
        <font-awesome-icon
          :icon="['fab', 'cuttlefish']"
          size="lg"
        ></font-awesome-icon>
      </a>
      <a class="contact-way">
        <font-awesome-icon
          :icon="['fab', 'weixin']"
          size="lg"
        ></font-awesome-icon>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "Floyee",
    };
  },
};
</script>

<style lang="less" scoped>
div.iViewCard {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 20px 10%;
  border-radius: 20px;
  div.idImg {
    width: 100%;
    height: 0;
    padding-bottom: 50%;
    overflow: hidden;
    background: url("../image/hello.jpg");
    background-position: center center;
    background-size: cover;
  }
  p {
    font-weight: bold;
    padding: 10px 0;
  }
  div.contact {
    width: 100%;
    display: flex;
    justify-content: space-around;

    a.contact-way {
      display: block;

      height: 40px;
      width: 40px;
      border-radius: 50%;
      line-height: 40px;
      text-align: center;
      background-color: #586b7d;
      color: #fff;
      transition-duration: 0.2s;
      position: relative;
    }

    a.contact-way:hover {
      background-color: #bac1d6;
      color: #586b7d;
    }

    a:nth-of-type(1):hover::before {
      content: "github";
      display: block;
      background: #586b7d;
      color: #fff;
      position: absolute;
      transform: translate(-10px, -120%);
      height: fit-content;
      line-height: 20px;
      padding: 3px 6px;
      width: 48px;
      border-radius: 4px;
      transition-duration: 0.2s;
    }

    a:nth-of-type(2):hover::before {
      content: "csdn";
      display: block;
      background: #586b7d;
      color: #fff;
      position: absolute;
      transform: translate(-10px, -120%);
      height: fit-content;
      line-height: 20px;
      padding: 3px 6px;
      width: 48px;
      border-radius: 4px;
    }

    a:nth-of-type(3):hover::before {
      content: "wechat";
      display: block;
      background: #586b7d;
      color: #fff;
      position: absolute;
      transform: translate(-10px, -120%);
      height: fit-content;
      line-height: 20px;
      width: 48px;
      padding: 3px 6px;
      border-radius: 4px;
    }

    a.contact-way:hover::after {
      content: "";
      display: block;
      background: #586b7d;
      position: absolute;
      height: 12px;
      width: 12px;
      clip-path: polygon(0 0, 0 100%, 100% 100%);
      transform: translate(14px, -54px) rotate(-45deg);
    }
  }
}
</style>