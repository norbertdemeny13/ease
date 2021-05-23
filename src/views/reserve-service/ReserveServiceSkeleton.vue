<!-- eslint-disable -->
<template>
  <es-skeleton class="es_service-details-container my-4">
    <div class="row">
      <div class="col-6 d-flex flex-column align-items-center text-center">
        <es-skeleton-item class="mb-4" height="350px" width="80%" />
        <es-skeleton-item class="mb-4" height="16px" width="60%" />
        <es-skeleton-item class="mb-4" height="14px" width="40%" />
      </div>
      <div class="col-6">
        <es-skeleton-item class="row mb-4" height="16px" width="40%" />
        <div class="row"><es-skeleton-item class="col-3 mb-2" height="14px" width="40%" /></div>
        <div class="row mb-2">
          <es-skeleton-item v-for="i in 3" :key="i" class="col-3 mr-2 my-2" height="40px" width="100%" />
        </div>
        <div class="row"><es-skeleton-item class="col-3 mb-2" height="14px" width="40%" /></div>
        <div class="row mb-2">
          <es-skeleton-item v-for="i in 3" :key="i" class="col-3 mr-2 my-2" height="40px" width="100%" />
        </div>
        <div class="row"><es-skeleton-item class="col-3 mb-2" height="14px" width="40%" /></div>
        <div class="row mb-2">
          <es-skeleton-item v-for="i in 2" :key="i" class="col-3 mr-2 my-2" height="40px" width="100%" />
        </div>
      </div>
      </div>
    </div>
  </es-skeleton>
</template>

<script lang="ts">
  import Vue from 'vue';

  export default Vue.extend({
    name: 'es-reserve-service-skeleton',
  });
</script>
