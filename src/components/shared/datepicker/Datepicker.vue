<script>
  import flatpickr from 'flatpickr';

  export default {
    name: 'es-datepicker',

    props: {
      options: {
        default: null,
        type: Object,
      },
    }, // props

    mounted() {
      this.flatpickr = flatpickr(this.$el, {
        altInput: true,
        altFormat: 'F j, Y',
        dateFormat: 'Z',
        ...this.options,
      });
    }, // mounted

    destroyed() {
      this.flatpickr.destroy();
    }, // destroyed

    render() {
      return this.$slots.default[0];
    }, // render
  };
</script>
