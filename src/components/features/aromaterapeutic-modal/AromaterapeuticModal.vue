<!-- eslint-disable -->
<template>
  <div id="modal-dialog" class="zoom-anim-dialog mfp-hide">
    <div class="small-dialog-header p-0">
      <figure>
        <img
          src="@/assets/png/aromaterapeutic@2x.png"
          data-src="@/assets/png/aromaterapeutic@2x.png"
          alt="Aromaterapeutic"
          class="img-fluid"
        >
      </figure>
    </div>
    <div class="content pb-1">
      <h3>{{ product.name }}</h3>
       <h6 class="mb-1">+ {{ product.price }} Lei/sedinta</h6>
       <p>{{ product.description }}</p>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';

  export default Vue.extend({
    name: 'es-massage-modal',

    props: {
      product: {
        type: Object,
        required: true,
      },
    },
  });
</script>
