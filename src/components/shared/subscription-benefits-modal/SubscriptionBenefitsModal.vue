<!-- eslint-disable -->
<template>
  <portal to="modal">
    <es-modal
      id="modal"
      size="sm"
      :on-dismiss="() => $emit('is-open', false)"
    >
      <div class="container es-login-modal mt-12">
        <div id="es-modal-dialog" class="es-subscription-benefits-modal">
          <div class="modal_header">
            <h3>{{ $t('views.subscriptions.benefits') }}</h3>
            <button class="mfp-close" @click="$emit('is-open', false)"></button>
          </div>
          <ul class="pricing-plan-features">
            <li v-for="(benefit, i) in benefits" :key="i"><i class="icon_check" />{{ $t(benefit) }}</li>
          </ul>
        </div>
      </div>
    </es-modal>
  </portal>
</template>

<script lang="ts">
  /* eslint-disable */
  import Vue, { PropType } from 'vue';

  export default Vue.extend({
    name: 'es-subscription-benefits-modal',

    model: {
      prop: 'is-open',
      event: 'is-open',
    }, // model

    props: {
      isOpen: {
        required: true,
        type: Boolean as PropType<boolean>,
      },
      benefits: {
        required: true,
        type: Array as PropType<string[]>,
      },
    },
  });
</script>
