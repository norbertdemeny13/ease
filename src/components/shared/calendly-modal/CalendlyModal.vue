<template>
  <portal to="modal">
    <es-modal
      id="modal"
      size="md"
      :on-dismiss="() => $emit('close')"
    >
      <div class="container es-calendly-modal mt-12 calendly-modal" @click="$emit('close')">
        <div @click.stop>
          <vue-calendly url="https://calendly.com/easeapp/interviu?hide_gdpr_banner=1" :style="{ height: '700px' }" />
        </div>
      </div>
    </es-modal>
  </portal>
</template>

<script lang="ts">
  /* eslint-disable */
  import Vue from 'vue';

  export default Vue.extend({
    name: 'es-calendly-modal',
  })
</script>