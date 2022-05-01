<template>
  <div
    :aria-hidden="ariaHidden"
    :aria-labelledby="headerId"
    :class="{
      'es-modal': true,
      [`es-modal--${size}`]: true,
      'es-modal--borders': borders,
    }"
    aria-modal="true"
    data-qa-es="modal"
    role="dialog"
    tabindex="-1"
    @click.self="onDismiss()"
    @keydown.esc="onDismiss()"
  >
    <slot />
  </div>
</template>

<script>
  export default {
    name: 'es-modal',

    props: {
      borders: {
        default: false,
        type: Boolean,
      },

      id: {
        required: true,
        type: [String, Number],
      },

      isDismissable: {
        default: true,
        type: Boolean,
      },

      onDismiss: {
        required: true,
        type: Function,
      },

      size: {
        default: 'sm',
        type: String,
        validator: value => [
          'xs',
          'sm',
          'md',
          'lg',
          'xl',
          'fullscreen',
        ].includes(value),
      },
    }, // props

    data: () => ({
      ariaHidden: true,
    }), // data

    created() {
      const body = document.querySelector('body');
      body.style.overflow = 'hidden';
    },

    beforeDestroy() {
      const body = document.querySelector('body');
      body.style.overflow = 'auto';
    },

    computed: {
      headerId() {
        return `${this.id}-header`;
      },

      bodyId() {
        return `${this.id}-body`;
      },
    }, // computed

    mounted() {
      this.ariaHidden = false;
    }, // mounted
  };
</script>
