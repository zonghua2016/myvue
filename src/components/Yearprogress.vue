<template>
    <div class="yearprogress">
        <progress :percent="percent" active :activeColor="barcolor" />
    </div>
</template>
<script>
export default {
  props: {
    percent: {
      type: Number,
      default: 0
    }
  },
  computed: {
    barcolor() {
      let per = parseInt(this.percent);

      switch (true) {
        case per > 30 && per < 50:
          return "#f9df2d";
          break;
        case per > 50 && per < 80:
          return "#eba329";
          break;
        case per > 80 && per <= 100:
          return "#d0500b";
          break;
        default:
          return "#09ba07";
          break;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
