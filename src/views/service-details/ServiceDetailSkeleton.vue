<!-- eslint-disable -->
<template>
  <es-skeleton class="es_service-details-container my-4">
    <div class="row">
      <div class="col-6">
        <es-skeleton-item class="mb-4" height="350px" width="80%" />
      </div>
      <div class="col-6">
        <es-skeleton-item class="mb-4" height="16px" width="60%" />
        <es-skeleton-item class="mb-4" width="30%" />
        <es-skeleton-item class="mb-4" height="14px" width="40%" />
        <es-skeleton-item class="mb-4" height="50px" width="60%" />
        <es-skeleton-item class="mb-4 ml-2" width="25%" />
        <div class="row">
          <div class="col-5"></div>
          <es-skeleton-item class="col-2 mb-4" height="30px" width="20%" />
        </div>
      </div>
    </div>
  </es-skeleton>
</template>

<script lang="ts">
  import Vue from 'vue';

  export default Vue.extend({
    name: 'es-service-details-skeleton',
  });
</script>
