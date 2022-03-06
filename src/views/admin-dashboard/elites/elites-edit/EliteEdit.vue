<!-- eslint-disable -->
<template>
  <component :is="userData === undefined ? 'div' : 'b-card'">

    <!-- Alert: No item found -->
    <b-alert
      variant="danger"
      :show="userData === undefined"
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
      v-if="userData"
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
          :user-data="userData"
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
    setup() {
      const userData = {
        avatar:  '/img/1.9cba4a79.png',
        company: 'Wayne Enterprises',
        contact: '(829) 537-0057',
        country: 'USA',
        currentPlan: 'team',
        email: 'irena.dubrovna@wayne.com',
        fullName: 'Selina Kyle',
        id: 21,
        role: 'admin',
        status: 'active',
        username: 'catwomen1940',
      };

      return {
        userData,
      }
    },
  }
</script>

<style>

</style>
