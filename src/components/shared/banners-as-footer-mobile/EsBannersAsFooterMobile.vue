<!-- eslint-disable -->
<template>
    <div class="banners-mobile d-lg-none d-md-none d-sm-none">
      <img v-for="(image, index) in mobileBanners" :src="image" alt="mobile banners" :key="index"/>
    </div>
</template>

<script lang="ts">
  import Vue from 'vue';

  export default Vue.extend({
    name: 'es-banners-as-footer-mobile',

    props: {
      mobileBanners: {
        default: Array,
        type: Array,
      },
    },
  });
</script>

<style scoped>
.banners-mobile img {
  width: 100%;
  margin: 20px 0 0 0;
}

</style>
