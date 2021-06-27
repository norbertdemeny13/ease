<template>
  <div class="es_client-subscriptions-container content">
    <div class="row">
      <div class="col-md-6">
        <h4>Abonamente</h4>
        <div class="d-flex justify-content-end">
          <button
            class="btn btn-sm btn-pink btn-pill my-4 px-6"
            @click="$router.push('/abonamente')"
          >
            Activeaza un abonament
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { mapActions, mapGetters } from 'vuex';

  export default Vue.extend({
    name: 'es-client-subscriptions',

    computed: {
      ...mapGetters({
        getActiveSubscriptions: 'subscriptions/getActiveSubscriptions',
      }),
    },

    created() {
      this.fetchActiveSubscriptions();
    },

    methods: {
      ...mapActions({
        fetchActiveSubscriptions: 'subscriptions/fetchActiveSubscriptions',
      }),
    },
  });
</script>
