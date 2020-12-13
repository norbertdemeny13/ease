<template>
  <div
    :class="{
      'es-skeleton': true,
      [`es-skeleton--border`]: border,
      [`es-skeleton--padding-${padding}`]: padding,
    }"
  >
    <div class="es-skeleton__animation" />
    <!-- @slot Content slot -->
    <slot />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';

  export default Vue.extend({
    name: 'es-skeleton',

    props: {
      border: {
        default: false,
        type: Boolean,
      },

      padding: {
        default: null,
        type: String,
        validator: value => [
          'xs',
          'sm',
          'md',
        ].includes(value),
      },
    }, // props
  });
</script>
