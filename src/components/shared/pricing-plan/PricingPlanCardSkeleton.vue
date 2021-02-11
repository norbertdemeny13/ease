<!-- eslint-disable -->
<template>
  <es-skeleton class="es_pricing-plan-card-skeleton my-4">
    <div class="row">
      <div :class="`col-12 ${times === 1 ? 'd-flex justify-content-center' : ''}`">
        <es-skeleton-item class="mb-2" height="16px" width="25%" />
      </div>
    </div>
    <div :class="`row ${times === 1 ? 'justify-content-center': ''}`">
      <div v-for="i in times" :key="i" class="col-lg-4 col-md-4 col-sm-4">
        <es-skeleton-item ratio="1:1" />
      </div>
    </div>
  </es-skeleton>
</template>

<script lang="ts">
  import Vue from 'vue';

  export default Vue.extend({
    name: 'es-price-plan-card-skeleton',
    props: {
      times: {
        default: 2,
        type: Number,
      },
    },
  });
</script>
