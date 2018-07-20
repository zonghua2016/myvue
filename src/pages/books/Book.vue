<template>
  <div class="container">
    <Swiper :swiperList="swiperList" />
    <ul>
      <li v-for="movie in movieData" :key="movie.id">
        <div @click="detail(movie.id)">
          <img :src="movie.images.small" lazy-load="true">
          <p>{{movie.original_title}}</p>
          <p class="aver"><Rate :value="movie.rating.average" />{{movie.rating.average}}分</p>
        </div>
      </li>
    </ul>
    <div class="textfooter" v-show="!more">
      没有更多数据了~
    </div>
  </div>
</template>

<script>
// import { get, post } from "@/utils/index";
// import movie from "@/utils/movie";
import Rate from "@/components/Rate";
import Swiper from "@/components/Swiper";
import config from "@/utils/config";
export default {
  data() {
    return {
      movieData: [],
      page: 1,
      more: true,
      swiperNum: 9,
      swiperList: []
    };
  },
  onShow() {
    this._gethotmovie(true);
  },
  methods: {
    detail(id) {
      wx.navigateTo({
        url: "/pages/detail/main?id=" + id
      });
    },
    _gethotmovie(init, page) {
      wx.showNavigationBarLoading();
      let url = "v2/movie/in_theaters",
        _this = this;
      if (init) {
        this.page = 1;
        this.more = true;
      }
      wx.request({
        url: config.host + url,
        data: {
          start: (_this.page - 1) * 20
        },
        method: "GET",
        header: {
          "Content-Type": "json"
        },
        success: function(res) {
          if (res.errMsg === "request:ok") {
            let movies = res.data.subjects;
            if (movies.length > 0) {
              if (init) {
                let splist = [];
                _this.movieData = movies;
                for (let i = 0; i < _this.swiperNum; i++) {
                  let item = movies[i];
                  let swp = {
                    id: item.id,
                    src: item.images.large,
                    title: item.original_title
                  };
                  splist.push(swp);
                }
                _this.swiperList = [
                  splist.slice(0, 3),
                  splist.slice(3, 6),
                  splist.slice(6)
                ];
                console.log(_this.swiperList);
                wx.stopPullDownRefresh();
              } else {
                // 下拉刷新
                _this.movieData = _this.movieData.concat(movies);
              }
            } else {
              _this.more = false;
            }
            wx.hideNavigationBarLoading();
          }
        },
        fail(err) {
          console.log(err);
        }
      });
    }
  },
  onPullDownRefresh() {
    this._gethotmovie(true);
  },
  // 上拉触底
  onReachBottom() {
    if (!this.more) {
      return;
    }
    this.page += 1;
    this._gethotmovie();
  },
  // 页面滚动
  onPageScroll() {},
  components: {
    Rate,
    Swiper
  }
};
</script>
<style lang="scss" scoped>
.container {
  padding: 5px;
  li {
    display: inline-block;
    width: 30%;
    margin: 5px;
    img {
      width: 100%;
      height: 40vw;
      border-radius: 4px;
    }
    p {
      width: 80%;
      font-size: 16px;
      text-align: center;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      margin: 0 auto;
      &.aver {
        font-size: 14px;
        color: #f38d32;
      }
    }
  }
  .textfooter {
    text-align: center;
    font-size: 14px;
    color: gray;
  }
}
</style>
