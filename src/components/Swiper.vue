<template>
<div class="swiper">
    <swiper 
        :swiperList="swiperList" 
        :indicator-dots="true"
        :autoplay="true" 
        :circular="true" 
        :duration="1000"
        previous-margin="5px"
        next-margin="5px">
        <div v-for="(top, imgindex) in swiperList" :key="imgindex">
            <swiper-item style="background: rgba(234, 81, 73,.2);">
                <img v-for="(img, index) in top" :src="img.src" class="slide-image" :key="index" />
            </swiper-item>
        </div>
    </swiper>
</div>
    
</template>
<script>
export default {
  props: {
    swiperList: {
      type: Array,
      default: []
    }
  },
  data() {
    return {};
  }
};
</script>
<style lang="scss" scoped>
.swiper {
  width: 100%;
  padding: 0;
  swiper-item {
    display: flex;
    justify-content: space-around;
    .slide-image {
      width: 30%;
      height: 150px;
    }
  }
}
</style>
