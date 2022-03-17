<!-- eslint-disable -->
<template>
    <div class="banners-mobile d-lg-none d-md-none d-sm-none">
      <img v-for="(image, index) in images" :src="image.src" :alt="image.alt" :key="index" />
    </div>
</template>

<script lang="ts">
  import Vue from 'vue';

  export default Vue.extend({
    name: 'es-banners-as-footer-mobile',
    data: () => ({
      /* eslint-disable */
      images: [
        { src: require('@/assets/jpg/ease_safe.jpeg'), alt: 'Ease safe' },
        { src: require('@/assets/jpg/Nails_Top_Brands.jpeg'), alt: 'Nails Top Brands' },
        { src: require('@/assets/jpg/Nails_Top_Brands.jpeg'), alt: 'Nails Voesh' },
        { src: require('@/assets/jpg/ease_certified.jpeg'), alt: 'Ease Certified' },
      ],
    }),
  });
</script>

<style scoped>
.banners-mobile img {
  width: 100%;
}

</style>