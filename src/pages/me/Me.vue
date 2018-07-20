<template>
  <div class="container">
    <div class="userinfo" @click="login" open-type="getUserInfo">
      <img :src="userInfo.avatarUrl" alt="">
      <p>{{userInfo.nickName}}</p>
    </div>
    <div class="progress">
      <yearprogress :percent="percent" />
      <p>{{year}}年已经过去了{{day}}天，{{percent}}%</p>
    </div>
    <button @click="scanBook" class="btn">添加图片</button>
    <p>
      获取手机型号：<switch :checked="phone" @change="getphone"/>
      <span>{{phone}}</span>
    </p>
    <p>
      获取地理位置：<switch :checked="geo" @change="getgeo"/>
      <span>{{geo}}</span>
    </p>
    <!-- <button v-show="userInfo" open-type="getUserInfo" @getuserinfo="bindGetUserInfo" @click="getUserInfo1">获取权限</button> -->
  </div>
</template>

<script>
import { showSuccess, get, post } from "@/utils/index";
import qcloud from "wafer2-client-sdk";
import config from "@/utils/config";
import yearprogress from "@/components/Yearprogress";
import getresdata from "@/utils/demo";
export default {
  data() {
    return {
      userInfo: {
        avatarUrl: "../../../static/imgs/nologin.png",
        nickName: "点击登录"
      },
      phone: "",
      geo: ""
    };
  },
  onShow() {
    let user = wx.getStorageSync("userInfo");
    if (user) {
      this.userInfo = wx.getStorageSync("userInfo");
    }
  },
  mounted() {
    // 一进来看看用户是否授权过
  },
  methods: {
    getphone(e) {
      console.log("开始获取手机型号");
      if (e.target.value) {
        const phoneInfo = wx.getSystemInfoSync();
        this.phone = phoneInfo.model;
        console.log(phoneInfo);
      } else {
        this.phone = "";
      }
    },
    getgeo(e) {
      // http://api.map.baidu.com/geocoder/v2/?location=35.658651,139.745415&output=json&pois=1&ak=您的ak //GET请求
      const ak = "hroghMOlQmZM5aV2UxyZ1GFubGA2Fsly";
      if (e.target.value) {
        wx.getLocation({
          success: geo => {
            console.log(geo);
            let location = {
              longitude: geo.longitude,
              latitude: geo.latitude
            };
            wx.request({
              url: `http://api.map.baidu.com/geocoder/v2/?location=${
                location.latitude
              },${location.longitude}&output=json&pois=1&ak=${ak}`,
              success: res => {
                let geoData = res.data.result;
                if (res.data.status === 0) {
                  this.geo =
                    geoData.addressComponent.country +
                    geoData.formatted_address;
                } else {
                  this.geo = "未知地点";
                }
              }
            });
          }
        });
      } else {
        this.geo = "";
      }
    },
    login() {
      this.getSetting();
    },
    getSetting() {
      let user = wx.getStorageSync("userInfo");
      let _this = this;
      if (!user) {
        wx.getSetting({
          success: function(res) {
            if (res.authSetting["scope.userInfo"]) {
              wx.getUserInfo({
                success: function(res) {
                  _this.userInfo = res.userInfo;
                  console.log(res.userInfo);

                  wx.setStorageSync("userInfo", res.userInfo);
                  showSuccess("登录成功");

                  // let resdata = getresdata(res.iv, res.encryptedData);
                  // console.log(resdata);
                  //获取openId
                },
                fail(err) {
                  console.log("登录失败", err);
                }
              });
            } else {
              console.log("用户还未授权过");
            }
          }
        });
      } else {
        this.userInfo = user;
      }
    },
    getUserInfo1() {
      console.log("click事件首先触发");
      // 判断小程序的API，回调，参数，组件等是否在当前版本可用。  为false 提醒用户升级微信版本
      // console.log(wx.canIUse('button.open-type.getUserInfo'))
      if (wx.canIUse("button.open-type.getUserInfo")) {
        // 用户版本可用
      } else {
        console.log("请升级微信版本");
      }
    },
    bindGetUserInfo(e) {
      // console.log(e.mp.detail.rawData)
      if (e.mp.detail.rawData) {
        //用户按了允许授权按钮
        console.log("用户按了允许授权按钮");
      } else {
        //用户按了拒绝按钮
        console.log("用户按了拒绝按钮");
      }
    },
    scanBook() {
      let _this = this;
      wx.scanCode({
        success: res => {
          console.log(res);
          if (res.result) {
            console.log(res.result);
            _this.addBook(res.result);
          }
        }
      });
    },
    async addBook(result) {
      let url = `/point/list/page/1/tagid/0`;
      const res = await get(url);
      console.log(res);
      if (res.errno === 0 && res.data.list) {
        showSuccess("添加成功");
      }
    },
    isLeapYear() {
      const year = new Date().getFullYear();
      if (year % 400 === 0) {
        return true;
      } else if (year % 4 === 0 && year % 100 !== 0) {
        return true;
      } else {
        return false;
      }
    },
    getDayOfYear() {
      return this.isLeapYear() ? 366 : 365;
    }
  },
  computed: {
    year() {
      return new Date().getFullYear();
    },
    day() {
      let start = new Date();
      start.setMonth(0);
      start.setDate(1);
      let offset = new Date().getTime() - start.getTime();
      return parseInt(offset / 1000 / 60 / 60 / 24) + 1;
    },
    percent() {
      return (this.day * 100 / this.getDayOfYear()).toFixed(1);
    }
  },
  components: {
    yearprogress
  }
};
</script>
<style lang="scss" scoped>
.container {
  padding: 0 30rpx;
  .userinfo {
    margin-top: 100rpx;
    text-align: center;
    img {
      width: 150rpx;
      height: 150rpx;
      margin: 20rpx;
      border-radius: 50%;
    }
  }
}
.btn {
  color: #fff;
  background: #ea5a49;
  margin-bottom: 10px;
  padding-left: 15px;
  border-radius: 2px;
  font-size: 16px;
  line-height: 40px;
  height: 40px;
}
.btn:active {
  background: #fa5a49;
}
.progress {
  width: 80%;
  margin: 20px auto;
  yearprogress {
    margin-bottom: 10px;
  }
  p {
    font-size: 18px;
    line-height: 40px;
  }
}
p {
  font-size: 18px;
  line-height: 40px;
  margin-bottom: 10px;
}
</style>
