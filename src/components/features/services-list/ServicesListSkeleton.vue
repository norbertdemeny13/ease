<!-- eslint-disable -->
<template>
  <es-skeleton class="es_services-list-container my-4">
    <div class="row">
      <div class="col-12">
        <es-skeleton-item class="mb-4" width="8%" />
      </div>
      <div class="col-12">
        <es-skeleton-item class="mb-4" width="16%" />
      </div>
        <div v-for="i in 4" :key="i" class="col-xl-3 col-lg-4 col-md-4 col-sm-4">
         <es-skeleton-item ratio="16:9" />
       </div>
    </div>
  </es-skeleton>
</template>

<script lang="ts">
  import Vue from 'vue';

  export default Vue.extend({
    name: 'es-services-list-skeleton',
  });
</script>
