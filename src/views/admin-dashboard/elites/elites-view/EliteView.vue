<!-- eslint-disable -->
<template>
  <div>

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

    <template v-if="getSelectedElite">
      <!-- First Row -->
      <b-row>
        <b-col
          cols="12"
          xl="9"
          lg="8"
          md="7"
        >
          <user-view-user-info-card :user-data="getSelectedElite" />
        </b-col>
        <b-col
          cols="12"
          md="5"
          xl="3"
          lg="4"
        >
          <user-view-user-plan-card :user-data="getSelectedElite" />
        </b-col>
      </b-row>

      <b-row>
        <b-col
          cols="12"
          lg="6"
        >
          <es-elite-services
            :user-data="getSelectedElite"
            disabled
          />
        </b-col>
        <b-col
          cols="12"
          lg="6"
        >
          <es-elite-documents :user-data="getSelectedElite" disabled />
        </b-col>
      </b-row>

      <reviews :reviews="getSelectedElite.reviews" />
    </template>

  </div>
</template>

<script>
  /* eslint-disable */
  import { mapActions, mapGetters } from 'vuex';
  import { store } from '@/store';
  import { router } from '@/router';
  import { ref, onUnmounted } from '@vue/composition-api';
  import {
    BRow, BCol, BAlert, BLink,
  } from 'bootstrap-vue';
  import Reviews from './Reviews';
  import EliteServices from './EliteServices';
  import EliteDocuments from './EliteDocuments';
  import userStoreModule from '../eliteStoreModule';
  import UserViewUserInfoCard from './EliteViewUserInfoCard.vue';
  import UserViewUserPlanCard from './EliteViewUserPlanCard.vue';
  import UserViewUserTimelineCard from './EliteViewUserTimelineCard.vue';
  import UserViewUserPermissionsCard from './EliteViewUserPermissionsCard.vue';

  export default {
    components: {
      BRow,
      BCol,
      BAlert,
      BLink,
      'reviews': Reviews,

      // Local Components
      'es-elite-services': EliteServices,
      'es-elite-documents': EliteDocuments,
      UserViewUserInfoCard,
      UserViewUserPlanCard,
      UserViewUserTimelineCard,
      UserViewUserPermissionsCard,
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
