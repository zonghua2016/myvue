<template>
    <div class="rate">
        <!-- ★☆ -->
        <span>☆☆☆☆☆</span>
        <div class="hollow" :style="style">★★★★★</div>
    </div>
</template>
<script>
export default {
  props: {
    value: {
      type: [Number, String],
      default: "0"
    }
  },
  computed: {
    style() {
      return `width: ${this.value / 2}em`;
    }
  }
};
</script>
<style lang="scss" scoped>
.rate {
  display: inline-block;
  position: relative;
  .hollow {
    position: absolute;
    display: inline-block;
    top: 0;
    left: 0;
    width: 0;
    overflow: hidden;
  }
}
</style>
