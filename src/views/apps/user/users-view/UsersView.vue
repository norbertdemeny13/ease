<!-- eslint-disable -->
<template>
  <div>

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

    <template v-if="userData">
      <!-- First Row -->
      <b-row>
        <b-col
          cols="12"
          xl="9"
          lg="8"
          md="7"
        >
          <user-view-user-info-card :user-data="userData" />
        </b-col>
        <b-col
          cols="12"
          md="5"
          xl="3"
          lg="4"
        >
          <user-view-user-plan-card />
        </b-col>
      </b-row>

      <b-row>
        <b-col
          cols="12"
          lg="6"
        >
          <user-view-user-timeline-card />
        </b-col>
        <b-col
          cols="12"
          lg="6"
        >
          <user-view-user-permissions-card />
        </b-col>
      </b-row>

      <invoice-list />
    </template>

  </div>
</template>

<script>
  /* eslint-disable */
  import { store } from '@/store'
  import { router } from '@/router'
  import { ref, onUnmounted } from '@vue/composition-api'
  import {
    BRow, BCol, BAlert, BLink,
  } from 'bootstrap-vue'
  import InvoiceList from '@/views/apps/invoice/invoice-list/InvoiceList.vue'
  import userStoreModule from '../userStoreModule'
  import UserViewUserInfoCard from './UserViewUserInfoCard.vue'
  import UserViewUserPlanCard from './UserViewUserPlanCard.vue'
  import UserViewUserTimelineCard from './UserViewUserTimelineCard.vue'
  import UserViewUserPermissionsCard from './UserViewUserPermissionsCard.vue'

  export default {
    components: {
      BRow,
      BCol,
      BAlert,
      BLink,

      // Local Components
      UserViewUserInfoCard,
      UserViewUserPlanCard,
      UserViewUserTimelineCard,
      UserViewUserPermissionsCard,

      InvoiceList,
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

      const USER_APP_STORE_MODULE_NAME = 'app-user'

      // Register module
      if (!store.hasModule(USER_APP_STORE_MODULE_NAME)) store.registerModule(USER_APP_STORE_MODULE_NAME, userStoreModule)

      // UnRegister on leave
      onUnmounted(() => {
        if (store.hasModule(USER_APP_STORE_MODULE_NAME)) store.unregisterModule(USER_APP_STORE_MODULE_NAME)
      })

      store.dispatch('app-user/fetchUser', { id: router.currentRoute.params.id })
        .then(response => { userData.value = response.data })
        .catch(error => {
          if (error.response.status === 404) {
            userData.value = undefined
          }
        })

      return {
        userData,
      }
    },
  }
</script>

<style>

</style>
