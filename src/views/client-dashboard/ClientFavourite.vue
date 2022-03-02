<template>
  <div class="es_client-favourite-container content">
    <h2>{{ $t('generic.saved_elites') }}</h2>
    <div v-if="getEliteFavorites.length" class="row">
      <div
        v-for="(item, i) in getEliteFavorites"
        :key="`${item.id}-${i}`"
        class="col-md-2 d-flex flex-column align-items-start"
        @click="$router.push(`/pro/${item.id}`)"
      >
        <figure class="mb-0 d-flex justify-content-start">
          <img
            v-if="item.avatar_path"
            :class="`radius-50 m-1 ${item.located_in_current_users_city ? '' : 'disabled'}`"
            :src="item.avatar_path"
            alt=""
          >
          <img
            v-else
            :class="`radius-50 m-1 ${item.located_in_current_users_city ? '' : 'disabled'}`"
            src="@/assets/svg/pro-placeholder.svg"
            alt=""
          >
        </figure>
        <span class="text-center">{{ item.first_name }}</span>
        <div class="d-flex align-items-center">
          <i class="icon_star" /><span class="mt-1 ml-2">{{ Number(item.rating) > 0 ? item.rating : '0.0' }}</span>
        </div>
      </div>
    </div>
    <div v-else class="row mt-10">
      <div class="col-md-6">
        <div class="d-flex flex-column">
          <h4>{{ $t('views.client_dashboard.favourite_elite.no_favourite_title') }}</h4>
          <p>{{ $t('views.client_dashboard.favourite_elite.no_favourite_description') }}</p>
        </div>
        <div class="d-flex justify-content-start">
          <button
            class="btn btn-sm btn-pink btn-pill ml-2 my-4 px-4"
            @click="$router.push('rezervarile-mele')"
          >
            {{ $t('generic.my_reservations') }}
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
    name: 'es-client-favourite',

    created() {
      this.fetchEliteFavorites();
    },

    computed: {
      ...mapGetters({
        getEliteFavorites: 'elite/getEliteFavorites',
      }),
    },

    methods: {
      ...mapActions({
        fetchEliteFavorites: 'elite/fetchEliteFavorites',
      }),
    },
  });
</script>

<style type="text/css" scoped>
  i.icon_star {
    color: #fad055;
    font-size: 1.3rem;
  }

  img.disabled {
    background-color: #000;
    opacity: 0.4;
  }

    img {
    width: 120px;
    height: 120px;
  }

@media (max-width: 767px) {
  img {
    width: 100px;
    height: 100px;
  }
}
</style>
