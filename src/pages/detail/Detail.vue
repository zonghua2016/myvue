<template>
  <!-- <web-view :src="viewSrc"></web-view> -->
  <div class="container">
    <div class="top">
      <img mode="aspectFill" class="cover" :src="movieDetail.cover" >
      <div class="infos">
        <img mode="aspectFit" class="moviecover" :src="movieDetail.cover" >
        <div class="txt">
          <h2 class="textover">{{movieDetail.title}}</h2>
          <p class="rate">
            <Rate :value="movieDetail.aver" v-show="movieDetail.aver!=0" />
            <span>{{movieDetail.aver}}分</span>
          </p>
          <p>
            导演：{{movieDetail.directors}}
          </p>
          <p>
            演员：
            <span v-for="(item, index) in movieDetail.casts" :key="index">
              {{item.name}}{{item.name_en}}/
            </span>
          </p>
          <p>
            时长：{{movieDetail.durations}}
          </p>
          <p>
            语言：{{movieDetail.languages}}
          </p>
        </div>
      </div>
    </div>
    <div class="bodyer">
      <h2 class="margintitle">所属频道</h2>
      <div class="tags">
        <i v-for="(item, index) in movieDetail.tags" :key="index">{{item}}</i>
      </div>
      <h2 class="margintitle">{{movieDetail.title}}的剧情简介</h2>
      <div class="summary">
        {{movieDetail.summary}}
      </div>
    </div>
  </div>
</template>

<script>
import config from "@/utils/config";
import Rate from "@/components/Rate";
export default {
  data() {
    return {
      movieDetail: {},
      viewSrc: ''
    };
  },
  onShow() {
    console.log(this.$root.$mp.query.id);
    // this.viewSrc = 'http://www.baidu.com/?word=' + this.$root.$mp.query.id
    this._getDetailById();
    
  },
  methods: {
    _getDetailById() {
      let id = this.$root.$mp.query.id,
        _this = this;
      this.movieDetail = {};
      wx.showLoading({
        title: "加载中"
      });
      wx.request({
        url: `${config.host}/v2/movie/subject/${id}`,
        method: "GET",
        header: {
          "Content-Type": "json"
        },
        success(res) {
          if (res.statusCode === 200) {
            console.log(res);
            let data = res.data;
            _this.movieDetail = {
              title: data.title,
              cover: data.images.large,
              year: data.year,
              aver: data.rating.average === 0 ? "暂无评" : data.rating.average,
              languages: data.languages,
              durations: data.durations[0],
              tags: data.tags,
              genres: data.genres,
              trailers: {
                cover: data.trailers[0].medium,
                url: data.trailers[0].resource_url
              },
              casts: data.casts,
              countries: data.countries.join("/"),
              photos: data.photos,
              summary: data.summary,
              directors: data.directors[0].name
            };
            wx.hideLoading();
          }
        }
      });
    }
  },
  components: {
    Rate
  }
};
</script>
<style lang="scss" scoped>
.container {
  padding: 0;
  .top {
    position: relative;
    width: 100%;
    height: 220px;
    .cover {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      filter: blur(8px);
    }
    .infos {
      display: flex;
      justify-content: flex-start;
      position: absolute;
      bottom: 5px;
      left: 0;
      right: 0;
      z-index: 9;
      .moviecover {
        width: 160px !important;
        height: 160px !important;
        border-radius: 4px;
        margin: auto 6px;
      }
      .txt {
        font-size: 14px;
        line-height: 1.5;
        color: #fff;
        h2 {
          font-size: 18px;
          font-weight: bold;
        }
        .rate {
          color: #f38d32;
        }
      }
    }
  }
  .bodyer {
    width: 100%;
    .tags {
      margin: 5px;
      padding: 5px;
      i {
        background-color: #effaf0;
        border: 1px solid #42bd56;
        display: inline-block;
        margin-right: 10px;
        font-size: 13px;
        padding: 5px 10px;
        border-radius: 15px;
        margin-bottom: 10px;
        color: #42bd56;
      }
    }
    .summary {
      padding: 5px;
      font-size: 16px;
      text-indent: 2em;
    }
  }
}
</style>
