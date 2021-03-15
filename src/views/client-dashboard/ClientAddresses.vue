<template>
  <div class="es_client-addresses-container content">
    <h4>Adrese</h4>
    <div class="row">
      <div class="col-md-8">
        <div v-for="address in getAddresses" :key="address.id" :class="`${address.main ? 'active': ''} client-address-item`">
          <div>
            <span>{{ address.street_name }}</span>, Nr.
            <span>{{ address.street_number }}</span>, {{ address.city.name }}
          </div>
          <div class="my-4">
            <a href="" class="my-4 mr-2" @click.prevent="isAddressModalOpen = true">
              <i class="icon_pencil-edit" />
              Editeaza
            </a>
            <a href="" class="my-4" @click.prevent>
              <i class="icon_trash_alt" />
              Sterge
            </a>
          </div>
        </div>
        <div class="d-flex justify-content-end">
          <button
            class="btn btn-sm btn-pink btn-pill my-4 px-6"
          >
            Adauga
          </button>
        </div>
      </div>
    </div>
    <es-address-modal
      v-if="isAddressModalOpen"
      v-model="isAddressModalOpen"
      :is-massage-view="true"
    />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { mapActions, mapGetters } from 'vuex';
  import { AddressModalComplete } from '@/components/shared/address-modal';

  export default Vue.extend({
    name: 'es-client-addresses',

    components: {
      'es-address-modal': AddressModalComplete,
    },

    data: () => ({
      isAddressModalOpen: false,
    }),
    computed: {
      ...mapGetters({ getAddresses: 'address/getAddresses' }),
    },
    created() {
      this.fetchAddresses();
    },
    methods: {
      ...mapActions({ fetchAddresses: 'address/fetchAddresses' }),
    },
  });
</script>

<style type="text/scss">
  .client-address-item {
    align-items: center;
    border: 1px solid #cccccc;
    display: flex;
    justify-content: space-between;
    padding: 16px;
    margin: 8px 0;
    border-radius: 8px;
  }

  .client-address-item.active,
  .client-address-item:hover {
    border: 1px solid #d00078;
    cursor: pointer;
  }
</style>
