<template>
  <div
    :class="[
      'es-toast',
      `es-toast--${intent}`,
    ]"
    data-qa-es="toast"
    role="alert"
    @mouseover="autoDismiss ? pauseTimer() : () => {}"
    @mouseout="autoDismiss ? startTimer() : () => {}"
  >
    <div class="es-toast__accent" />
    <div class="es-toast__wrapper">
      <span class="es-icon es-toast__icon">
        <i :class="`fa fa-${iconName}`" />
      </span>
      <div class="es-toast__content">
        <h3 class="es-toast__title">{{ headline }}</h3>

        <p class="font-size-14">{{ message }}</p>
      </div>
      <button
        class="es-toast__close"
        data-qa-es="toast__close"
        type="button"
        role="button"
        @click="onClose(id)"
      >
        <div class="es-toast__close-icon">
          <span><i class="fa fa-times" /></span>
        </div>
      </button>
    </div>
  </div>
</template>

<script>
  /* eslint-disable */
  export default {
    name: 'es-toast',

    props: {
      autoDismiss: {
        default: true,
        type: Boolean,
      },

      duration: {
        default: 5000,
        type: Number,
      },

      icon: {
        default: '',
        type: String,
      },

      id: {
        required: true,
        type: String,
      },

      intent: {
        default: 'info',
        type: String,
        validator: value => [
          'error',
          'info',
          'success',
          'warning',
        ].includes(value),
      },

      message: {
        required: true,
        type: String,
      },

      onDismiss: {
        default: () => {},
        type: Function,
      },

      title: {
        default: null,
        type: String,
      },
    }, // props

    data() {
      return {
        remainingDate: this.duration,
        startDate: null,
        timer: null,
      };
    }, // data

    computed: {
      headline() {
        const headline = this.title || this.intent;
        return headline.charAt(0).toUpperCase() + headline.slice(1);
      },

      iconName() {
        const icons = {
          error: 'exclamation',
          info: 'info',
          success: 'check',
          warning: 'exclamation-triangle',
        };

        return this.icon ? this.icon : icons[this.intent];
      }, // iconName
    }, // computed

    mounted() {
      if (this.autoDismiss) {
        this.startTimer();
      }
    }, // mounted

    methods: {
      pauseTimer() {
        clearTimeout(this.timer);
        this.remainingDate -= new Date() - this.startDate;
      }, // pauseTimer

      startTimer() {
        this.startDate = new Date();
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.onClose(this.id);
        }, this.remainingDate);
      }, // startTimer

      onClose(id) {
        clearTimeout(this.timer);
        this.$toasts.onToastDismiss(id, this.onDismiss);
      }, // onClose
    }, // methods
  };
</script>
