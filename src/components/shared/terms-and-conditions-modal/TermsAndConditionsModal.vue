<template>
  <portal to="modal">
    <es-modal
      id="modal"
      size="sm"
      :on-dismiss="() => $emit('is-open', false)"
    >
      <div class="container mt-12">
        <div id="es-modal-dialog" class="es-request-phone-validation-modal">
          <div class="modal_header">
            <h3>{{ $t('generic.accept_terms_and_conditions') }}</h3>
            <button type="button" class="mfp-close" @click.prevent="$emit('is-open', false)" />
          </div>
          <div class="terms-and-conditions-container">
            <h2>{{ $t('platform_access_agreement_title') }}</h2>
            <p>{{ $t('platform_access_agreement_body') }}</p>
            <div class="row text-center">
              <div class="col">
                <button class="btn btn-sm btn-pink" @click="$emit('on-accept')">
                  {{ $t('generic.agree') }}
                </button>
              </div>
              <div class="col">
                <button class="btn btn-sm btn-secondary" @click="$emit('is-open', false)">
                  {{ $t('generic.do_not_agree') }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </es-modal>
  </portal>
</template>

<script lang="ts">
  import Vue, { PropType } from 'vue';

  export default Vue.extend({
    name: 'es-terms-and-conditions-modal',

    model: {
      prop: 'is-open',
      event: 'is-open',
    },

    props: {
      isOpen: {
        required: true,
        type: Boolean as PropType<boolean>,
      },
    },

    /* eslint-disable */
    data: () => ({}),
  });
</script>

<style scoped>
#es-modal-dialog {
  height: 550px;
  max-width: 600px;
  overflow: scroll;
}
</style>