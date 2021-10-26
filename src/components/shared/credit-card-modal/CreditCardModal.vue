<!-- eslint-disable -->
<template>
  <portal to="modal">
    <es-modal
      id="modal"
      size="sm"
      :on-dismiss="() => $emit('is-open', false)"
    >
      <div class="container es-login-modal mt-12">
        <div id="es-modal-dialog" class="es-card-modal">
          <div class="modal_header">
            <h3>{{ $t('generic.add_card') }}</h3>
            <button class="mfp-close" @click="$emit('is-open', false)"></button>
          </div>
          <div class="credit-card-wrapper mt-4">
            <es-payment
              class="mt-4"
              :is-fetching="isFetching"
              @on-add-card="$emit('is-open', false)"
              @on-cancel="showAddPayment = false"
              :is-authenticated="true"
            />
          </div>
        </div>
      </div>
    </es-modal>
  </portal>
</template>

<script lang="ts">
  /* eslint-disable */
  import Vue, { PropType } from 'vue';
  import { mapGetters } from 'vuex';
  import { Payment } from '@/components/shared/payment';
  import { nanoid } from 'nanoid';

  export default Vue.extend({
    name: 'es-credit-card-modal',

    model: {
      prop: 'is-open',
      event: 'is-open',
    }, // model

    props: {
      isOpen: {
        required: true,
        type: Boolean as PropType<boolean>,
      },
    },

    components: {
      'es-payment': Payment,
    },

    computed: {
      ...mapGetters({
        isFetching: 'cards/isFetching',
      }),
    },
  });
</script>
