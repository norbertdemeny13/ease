<template>
  <div class="es_pro-addresses-container content">
    <h4>{{ $t('generic.address') }}</h4>
    <div class="row">
      <div class="col-md-6">
        <div
          v-for="address in getAddresses"
          :key="address.id"
          :class="`${address.main ? 'active': ''} client-address-item`"
          @click.prevent="onSelect(address)"
        >
          <div class="address">
            <div>{{ getAddress(address) }}</div>
            <div v-if="address.main" class="mt-2">
              <span class="icon_check_alt" />
              <span class="ml-2">{{ $t('generic.main_address') }}</span>
            </div>
          </div>
          <div class="my-4">
            <a href="" class="my-4 mr-2" @click.prevent.stop="onEdit(address)">
              <i class="icon_pencil-edit" />
              {{ $t('generic.edit') }}
            </a>
            <a
              href=""
              class="my-4"
              @click.prevent.stop="onRemove(address)"
            >
              <div>
                <i class="icon_trash_alt" />
                {{ $t('generic.delete') }}
              </div>
            </a>
          </div>
        </div>
        <div class="d-flex justify-content-end">
          <button
            class="btn btn-sm btn-pink btn-pill my-4 px-6"
            @click.prevent="isAddressModalOpen = true"
          >
            {{ $t('generic.add') }}
          </button>
        </div>
      </div>
    </div>

    <es-address-modal
      v-if="isAddressModalOpen"
      v-model="isAddressModalOpen"
      :selected-address="selectedAddress"
      :is-massage-view="false"
    />

    <es-address-modal-edit
      v-if="isAddressModalEditOpen"
      v-model="isAddressModalEditOpen"
      :selected-address="selectedAddress"
      :is-masssage-view="false"
    />

    <es-confirm-modal v-model="isConfirmModalOpen" @on-confirm="onContinue()">
      <template slot="title">{{ getConfirmationModalTitle }}</template>
      <template slot="message">{{ getConfirmationModalMessage }}</template>
    </es-confirm-modal>

    <es-confirm-modal
      v-model="isAlertModalOpen"
      cta="Ok"
      @on-confirm="isAlertModalOpen = false"
    >
      <template slot="title">{{ $t('delete.default.address.title') }}</template>
      <template slot="message">{{ $t('delete.default.address.text') }}</template>
    </es-confirm-modal>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { mapActions, mapGetters } from 'vuex';
  import { AddressModal } from '@/components/shared/address-modal';
  import { Address } from '@/interfaces/Address';
  import AddressModalEdit from '@/components/shared/address-modal/AddressModalEdit.vue';

  export default Vue.extend({
    name: 'es-pro-addresses',

    components: {
      'es-address-modal': AddressModal,
      'es-address-modal-edit': AddressModalEdit,
    },

    data: () => ({
      isAlertModalOpen: false,
      isConfirmModalOpen: false,
      isAddressModalOpen: false,
      isAddressModalEditOpen: false,
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
      isAddressModalEditOpen(newVal) {
        if (!newVal) {
          this.fetchAddresses();
        }
      },
      isAddressModalOpen(newVal) {
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
              ${address.street_number}, ${this.$t(address.city.name)}`;
      },

      onEdit(address: Address): void {
        this.selectedAddress = address;
        this.isAddressModalEditOpen = true;
      },

      onSelect(address: Address): void {
        if (address.main) {
          return;
        }

        this.method = 'select';
        this.selectedAddress = address;
        this.modalTitle = this.$t('change.default.address.title').toString();
        this.modalMessage = `${this.$t('generic.set_question').toString()} ${this.getAddress(address)} ${this.$t('generic.set_primary_address').toString()}`;
        this.isConfirmModalOpen = true;
      },
      onRemove(address: Address): void {
        if (address.main) {
          this.isAlertModalOpen = true;
        } else {
          this.method = 'remove';
          this.selectedAddress = address;
          this.modalTitle = this.$t('generic.address_delete').toString();
          this.modalMessage = `${this.$t('generic.address_delete_question').toString()} ${this.getAddress(address)}?`;
          this.isConfirmModalOpen = true;
        }
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

  .address {
    max-width: 60%;
  }
</style>
