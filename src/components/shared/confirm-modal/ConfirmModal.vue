<template>
  <portal to="modal">
    <transition name="app_a-fade">
      <es-modal
        v-if="value"
        id="modal"
        :on-dismiss="onCancel"
        size="xs"
        intent="error"
        data-qa-pm="confirm-modal"
      >
        <div class="container es-address-modal mt-12">
          <div id="es-modal-dialog" class="es-confirm-modal">
            <div class="modal_header pr-6">
              <slot name="title" />
              <button type="button" class="mfp-close" @click.prevent="onCancel()" />
            </div>
            <div class="d-flex flex-column form-group">
              <slot name="message" />
            </div>
            <div class="d-flex justify-content-end">
              <div v-if="reverse">
                <a
                  v-if="confirmCta"
                  class="btn btn-sm btn-pill mr-2 my-4 px-4"
                  @click.prevent="onConfirm()"
                >
                  {{ confirmCta }}
                </a>
                <a
                  class="btn btn-sm btn-pink btn-pill text-white my-4 px-4"
                  @click.prevent="onCancel()"
                >
                  {{ cancelCta }}
                </a>
              </div>
              <div v-else>
                <a
                  v-if="cancelCta"
                  class="btn btn-sm btn-pill mr-2 my-4 px-4"
                  @click.prevent="onCancel()"
                >
                  {{ cancelCta }}
                </a>
                <a
                  v-if="confirmCta"
                  class="btn btn-sm btn-pink btn-pill text-white my-4 px-4"
                  @click.prevent="onConfirm()"
                >
                  {{ confirmCta }}
                </a>
              </div>
            </div>
          </div>
        </div>
      </es-modal>
    </transition>
  </portal>
</template>

<script lang="ts">
  import Vue from 'vue';

  export default Vue.extend({
    name: 'es-confirm-modal',

    props: {
      value: {
        required: true,
        type: Boolean,
      },
      cancelCta: {
        default: 'Nu, anuleaza',
        type: String,
      },
      confirmCta: {
        default: 'Da, seteaza',
        type: String,
      },
      reverse: {
        default: false,
        type: Boolean,
      },
    },

    methods: {
      onCancel() {
        this.$emit('input', false);
      },

      onConfirm() {
        this.$emit('on-confirm');
        this.$emit('input', false);
      },
    },
  });
</script>

<style scoped>
#es-modal-dialog {
  max-width: 500px;
}
</style>
