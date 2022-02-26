<template>
  <div class="es_pro-addresses-container content">
    <h2>{{ $t('generic.address') }}</h2>
    <div class="row">
      <div class="col-md-4">
        <div class="form-group">
          <label>{{ $t('generic.address_complete') }}</label>
          <input
            v-model="user.address"
            type="text"
            class="form-control"
            name="number"
          >
        </div>
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label>{{ $t('generic.city') }}</label>
              <input
                v-model="user.city"
                type="text"
                class="form-control"
                name="number"
              >
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label>{{ $t('generic.postal_code') }}</label>
              <input
                v-model="user.postal_code"
                type="text"
                class="form-control"
                name="number"
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-4">
        <div class="d-flex justify-content-start">
          <button
            class="btn btn-sm btn-pink btn-pill my-4 px-6"
            @click="onSave"
          >
            {{ $t('generic.save') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  /* eslint-disable */
  import Vue from 'vue';
  import { mapActions, mapGetters } from 'vuex';
  import { isEqual } from 'lodash-es';

  export default Vue.extend({
    name: 'es-pro-addresses',

    data: () => ({
      user: {
        address: '',
        city: '',
        postal_code: '',
      },
    }),
    computed: {
      ...mapGetters({
        getUser: 'session/getUser',
      }),
    },
    created() {
      this.user = { ...this.getUser };
    },
    watch: {
      getUser(newVal, oldVal) {
        if (!isEqual(newVal, oldVal)) {
          this.$toasts.toast({
            id: 'update-toast',
            title: this.$t('toast.success_title'),
            message: this.$t('toast.account_update'),
            intent: 'success',
          });
        }
      },
    },
    methods: {
      ...mapActions({
        updateElite: 'session/updateElite',
      }),
      onSave() {
        this.updateElite(this.$data);
      },
    },
  });
</script>
