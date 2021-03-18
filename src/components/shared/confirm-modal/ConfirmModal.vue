<template>
  <portal to="modal">
    <transition name="app_a-fade">
      <es-modal
        v-if="value"
        id="modal"
        :on-dismiss="onCancel"
        intent="error"
        data-qa-pm="confirm-modal"
      >
        <div class="container es-address-modal mt-12">
          <div id="es-modal-dialog" class="es-confirm-modal">
            <div class="modal_header">
              <slot name="title" />
              <button type="button" class="mfp-close" @click.prevent="onCancel()" />
            </div>
            <div class="d-flex flex-column form-group">
              <slot name="message" />
            </div>
            <div class="d-flex justify-content-end">
              <a
                class="btn btn-sm btn-pink btn-pill mt-4 px-6"
                href=""
                @click.prevent="onConfirm()"
              >
                Confirma
              </a>
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
