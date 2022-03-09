<!-- eslint-disable -->
<template>
  <component :is="getSelectedElite === undefined ? 'div' : 'b-card'">

    <!-- Alert: No item found -->
    <b-alert
      variant="danger"
      :show="getSelectedElite === undefined"
    >
      <h4 class="alert-heading">
        Error fetching user data
      </h4>
      <div class="alert-body">
        No user found with this user id. Check
        <b-link
          class="alert-link"
          :to="{ name: 'apps-users-list'}"
        >
          User List
        </b-link>
        for other users.
      </div>
    </b-alert>

    <b-tabs
      v-if="getSelectedElite"
      pills
    >

      <!-- Tab: Account -->
      <b-tab active>
        <template #title>
          <feather-icon
            icon="UserIcon"
            size="16"
            class="mr-0 mr-sm-50"
          />
          <span class="d-none d-sm-inline">Account</span>
        </template>
        <user-edit-tab-account
          :user-data="getSelectedElite"
          class="mt-2 pt-75"
        />
      </b-tab>

      <!-- Tab: Information -->
      <b-tab>
        <template #title>
          <feather-icon
            icon="InfoIcon"
            size="16"
            class="mr-0 mr-sm-50"
          />
          <span class="d-none d-sm-inline">Information</span>
        </template>
        <user-edit-tab-information class="mt-2 pt-75" />
      </b-tab>

      <!-- Tab: Social -->
      <b-tab>
        <template #title>
          <feather-icon
            icon="Share2Icon"
            size="16"
            class="mr-0 mr-sm-50"
          />
          <span class="d-none d-sm-inline">Social</span>
        </template>
        <user-edit-tab-social class="mt-2 pt-75" />
      </b-tab>
    </b-tabs>
  </component>
</template>

<script>
  /* eslint-disable */
  import { mapActions, mapGetters } from 'vuex';
  import {
    BTab, BTabs, BCard, BAlert, BLink,
  } from 'bootstrap-vue'
  import { ref, onUnmounted } from '@vue/composition-api'
  import router from '@/router'
  import store from '@/store'
  import userStoreModule from '../eliteStoreModule'
  import UserEditTabAccount from './EliteEditTabAccount.vue'
  import UserEditTabInformation from './EliteEditTabInformation.vue'
  import UserEditTabSocial from './EliteEditTabSocial.vue'

  export default {
    components: {
      BTab,
      BTabs,
      BCard,
      BAlert,
      BLink,

      UserEditTabAccount,
      UserEditTabInformation,
      UserEditTabSocial,
    },

    computed: {
      ...mapGetters({
        getSelectedElite: 'admin/getSelectedElite',
      }),
    },

    created() {
      const eliteId = this.$router.currentRoute.params.id;
      this.fetchElites(eliteId);
    },

    methods: {
      ...mapActions({
        fetchElites: 'admin/fetchElite',
      }),
    },
  }
</script>

<style>

</style>
