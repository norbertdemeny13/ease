<template>
  <div class="es_client-addresses-container content">
    <h4>Adrese</h4>
    <div class="row">
      <div class="col-md-8">
        <div
          v-for="address in getAddresses"
          :key="address.id"
          :class="`${address.main ? 'active': ''} client-address-item`"
          @click.prevent="onSelect(address)"
        >
          <div>
            <div>{{ getAddress(address) }}</div>
            <div v-if="address.main" class="mt-2">
              <span class="icon_check_alt" />
              <span class="ml-2">Adresa principala</span>
            </div>
          </div>
          <div class="my-4">
            <a href="" class="my-4 mr-2" @click.prevent.stop="onEdit(address)">
              <i class="icon_pencil-edit" />
              Editeaza
            </a>
            <a href="" class="my-4" @click.prevent.stop="onRemove(address)">
              <i class="icon_trash_alt" />
              Sterge
            </a>
          </div>
        </div>
        <div class="d-flex justify-content-end">
          <button
            class="btn btn-sm btn-pink btn-pill my-4 px-6"
            @click.prevent="isAddressModalOpen = true"
          >
            Adauga
          </button>
        </div>
      </div>
    </div>
    <es-address-modal-complete
      v-if="isAddressModalCompleteOpen"
      v-model="isAddressModalCompleteOpen"
      :selected-address="selectedAddress"
    />

    <es-address-modal
      v-if="isAddressModalOpen"
      v-model="isAddressModalOpen"
      :is-massage-view="false"
    />
    <es-confirm-modal v-model="isConfirmModalOpen" @on-confirm="onContinue()">
      <template slot="title">{{ getConfirmationModalTitle }}</template>
      <template slot="message">{{ getConfirmationModalMessage }}</template>
    </es-confirm-modal>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { mapActions, mapGetters } from 'vuex';
  import { AddressModal, AddressModalComplete } from '@/components/shared/address-modal';
  import { Address } from '@/interfaces/Address';

  export default Vue.extend({
    name: 'es-client-addresses',

    components: {
      'es-address-modal': AddressModal,
      'es-address-modal-complete': AddressModalComplete,
    },

    data: () => ({
      isConfirmModalOpen: false,
      isAddressModalCompleteOpen: false,
      isAddressModalOpen: false,
      selectedAddress: {} as Address,
      modalTitle: '',
      modalMessage: '',
      method: '',
    }),

    computed: {
      ...mapGetters({ getAddresses: 'address/getAddresses' }),

      getConfirmationModalTitle(): string {
        return this.modalTitle;
      },

      getConfirmationModalMessage(): string {
        return this.modalMessage;
      },
    },

    watch: {
      isAddressModalCompleteOpen(newVal) {
        if (!newVal) {
          this.fetchAddresses();
        }
      },
    },

    created() {
      this.fetchAddresses();
    },

    methods: {
      ...mapActions({
        fetchAddresses: 'address/fetchAddresses',
        removeAddress: 'address/removeAddress',
        setDefaultAddress: 'address/setDefaultAddress',
      }),

      getAddress(address: Address): string {
        return `${address.street_name}, Nr.
              ${address.street_number}, ${address.city.name}`;
      },

      onEdit(address: Address): void {
        this.selectedAddress = address;
        this.isAddressModalCompleteOpen = true;
      },

      onSelect(address: Address): void {
        if (address.main) {
          return;
        }

        this.method = 'select';
        this.selectedAddress = address;
        this.modalTitle = 'Schimbare adresa primara';
        this.modalMessage = `Vrei sa setezi ${this.getAddress(address)} ca si adresa primara?`;
        this.isConfirmModalOpen = true;
      },

      onRemove(address: Address): void {
        this.method = 'remove';
        this.selectedAddress = address;
        this.modalTitle = 'Stergere adresa';
        this.modalMessage = `Vrei sa stergi adresa ${this.getAddress(address)}?`;
        this.isConfirmModalOpen = true;
      },

      async onContinue() {
        if (this.method === 'select') {
          await this.setDefaultAddress(this.selectedAddress.id);
        }

        if (this.method === 'remove') {
          await this.removeAddress(this.selectedAddress.id);
        }

        await this.fetchAddresses();
      },
    },
  });
</script>

<style type="text/scss">
  .client-address-item {
    align-items: center;
    border: 1px solid #cccccc;
    border-radius: 8px;
    display: flex;
    justify-content: space-between;
    margin: 8px 0;
    padding: 8px;
  }

  .client-address-item.active,
  .client-address-item:hover {
    border: 1px solid #d00078;
    cursor: pointer;
  }
</style>
