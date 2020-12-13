<template>
  <div
    :class="{
      'es-skeleton__item': true,
      [`es-skeleton__item--${color}`]: true,
      [`es-skeleton__item--${ratio}`]: ratio,
      [`es-skeleton__item--${shape}`]: true,
    }"
    :style="{
      height,
      paddingBottom: localRatio,
      width,
    }"
  >
    <!-- @slot Content slot -->
    <slot />
  </div>
</template>

<script>
  export default {
    name: 'es-skeleton-item',

    props: {
      color: {
        default: 'light',
        type: String,
        validator: value => [
          'dark',
          'light',
        ].includes(value),
      },

      height: {
        default: '12px',
        type: String,
      },

      ratio: {
        default: null,
        type: String,
        validator: value => [
          '1:1',
          '4:3',
          '16:9',
          '21:9',
        ].includes(value),
      },

      shape: {
        default: 'rectangle',
        type: String,
        validator: value => [
          'circle',
          'rectangle',
        ].includes(value),
      },

      width: {
        default: '100%',
        type: String,
      },
    }, // props

    computed: {
      localHeight() {
        return this.ratio ? 0 : this.height;
      },

      localRatio() {
        if (!this.ratio) {
          return false;
        }

        const [x, y] = this.ratio.split(':');
        return `${(y / x) * 100}%`;
      },
    }, // computed
  };
</script>
