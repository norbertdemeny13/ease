/* eslint-disable vue/html-indent */
<template>
  <div class="es_elite-details-container bg_gray content">
    <a class="back-button" href="" @click.prevent="onBack()">
      {{ $t('generic.back') }}
    </a>
    <div class="container margin_30_20">
      <div class="row details-container p-4 mb-3">
        <div class="col-md-12 bg-white mb-3">
          <div class="row mt-2">
            <div class="col-md-3">
              <figure class="mb-0">
                <img
                  v-if="getElite.avatar_path"
                  :class="`radius-50 m-1 ${getElite.located_in_current_users_city ? '' : 'disabled'}`"
                  :src="getElite.avatar_path"
                  alt=""
                  width="150px"
                  height="150px"
                >
                <img
                  v-else
                  :class="`radius-50 m-1 ${getElite.located_in_current_users_city ? '' : 'disabled'}`"
                  src="@/assets/svg/pro-placeholder.svg"
                  alt=""
                  width="150px"
                  height="150px"
                >
              </figure>
            </div>
            <div class="col-md-8 info-container">
              <div class="favourite-container">
                <h3 class="mr-3 mb-0">{{ getEliteName }}</h3>
                <div v-if="getUserType !== 'elite'">
                  <i
                    v-if="getIsFavourite"
                    class="icon_heart"
                    @click="isFavourite ? onRemoveFavourite() : onAddFavourite()"
                    @mouseover="onHover = true"
                    @mouseleave="onHover = false"
                  />
                  <i
                    v-else
                    class="icon_heart_alt"
                    @mouseover="onHover = true"
                    @mouseleave="onHover = false"
                  />
                </div>
              </div>
              <div class="d-flex align-items-center">
                <i class="icon_star" /><span class="mt-1 ml-2">{{ Number(getElite.rating) > 0 ? getElite.rating : '0.0' }}</span>
              </div>
              <p>{{ getElite.last_booking }}</p>
              <div
                v-if="getElite.status === 'paused' || getElite.status === 'blocked'"
                role="alert"
                class="alert alert-danger"
              >
                <p>{{ $t('pro_status_is_blocked_or_paused') }}</p>
              </div>
              <div
                v-else-if="!getElite.located_in_current_users_city"
                role="alert"
                class="alert alert-danger"
              >
                <p>{{ $t('toast.wrong_service_address') }}</p>
              </div>
              <div v-else />
              <div class="d-flex justify-content-start">
                <button
                  :class="`btn btn-sm btn-pink btn-pill my-4 px-6 ${getElite.located_in_current_users_city ? '' : 'disabled'} ${getUserType === 'elite' ? 'disabled' : '' }`"
                  @click.prevent="onReserve"
                >
                  {{ $t('generic.reserve') }}
                </button>
              </div>
            </div>
          </div>
          <div class="my-2">
            <div class="row d-flex justify-content-between">
              <div class="bio-elite col-sm-12 col-md-12 mb-2">
                <h2>{{ $t('practician.bio') }}</h2>
                <p>{{ getElite.bio }}</p>
              </div>
              <div class="d-flex experience col-sm-12 col-md-3">
                <figure class="mb-0">
                  <img
                    src="@/assets/svg/experience.svg"
                    alt=""
                    width="20px"
                  >
                </figure>
                <div class="ml-2">
                  <h6 class="mb-0">{{ $t('views.pro_details.experience') }}</h6>
                  <p>{{ getElite.years_experience }} {{ getElite.years_experience > 1 ? 'ani' : 'an' }}</p>
                </div>
              </div>
              <div class="d-flex language col-sm-12 col-md-3">
                <figure class="mb-0">
                  <img
                    src="@/assets/svg/language.svg"
                    alt=""
                    width="20px"
                  >
                </figure>
                <div class="ml-2">
                  <h6 class="mb-0">{{ $t('views.pro_details.spoken_languages') }}</h6>
                  <p>{{ getElite.languages || '-' }}</p>
                </div>
              </div>
              <div class="d-flex certificate col-sm-12 col-md-6">
                <figure class="mb-0">
                  <img
                    src="@/assets/svg/certificate.svg"
                    alt=""
                    width="20px"
                  >
                </figure>
                <div class="ml-2">
                  <h6 class="mb-0">{{ $t('views.pro_details.certified') }}</h6>
                  <p>{{ getElite.certificates || '-' }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-12 bg-white ratings">
          <div v-if="getReviews.length" class="row">
            <div class="col-md-12">
              <div class="header-info">
                <h6>{{ $t('views.pro_details.reviews') }}</h6>
                <p>Rating {{ getElite.rating }} din 5 ({{ getReviews.length }})</p>
              </div>
              <div class="es_reviews-container">
                <div v-for="review in getReviews" :key="review.id" class="es_reviews-container__item">
                  <div class="item-header">
                    <div class="item-logo">{{ getInitials(review.reviewer_name) }}</div>
                    <div class="item-info ml-2">
                      <p class="user-name mb-0">{{ review.reviewer_name }}</p>
                      <p class="rate-message mb-0">{{ getFormattedDate(review.created_at) }}</p>
                    </div>
                  </div>
                  <div class="start-rating d-flex align-items-center">
                    <es-star-rating
                      v-model="review.rating"
                      :read-only="true"
                      :show-rating="false"
                      :star-size="20"
                      :increment="0.5"
                    />
                  </div>
                  <p class="mb-1 mt-2">{{ review.review }}</p>
                  <p class="rate-message mt-1">{{ review.service }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import { mapActions, mapGetters } from 'vuex';
  import { getZonedDate } from '@/utils/date-helpers';

  export default Vue.extend({
    name: 'es-elite-details',

    data: () => ({
      onHover: false,
      rating: 2,
    }),

    computed: {
      ...mapGetters({
        getUserType: 'session/getUserType',
        getElite: 'elite/getElite',
        getEliteFavorites: 'elite/getEliteFavorites',
        getEliteReviews: 'elite/getEliteReviews',
        isAuthenticated: 'session/isAuthenticated',
      }),
      getEliteName() {
        const firstName = this.getElite?.first_name;
        const lastName = this.getElite?.last_name;
        const fullName = firstName ? `${firstName} ${lastName?.substr(0, 1)}.` : '';
        const displayName = this.getElite?.display_name;
        return displayName || fullName;
      },
      getIsFavourite() {
        return this.isFavourite
          ? this.isFavourite
          : this.onHover;
      },
      getReviews() {
        const { reviews } = this.getEliteReviews;
        return reviews
          ? reviews.map(review => ({ ...review, rating: Number(review.average) }))
          : [];
      },
      isFavourite() {
        const { id } = this.$router.currentRoute.params;
        const elite = this.getEliteFavorites.find(item => item.elite_id === id);
        return !!elite;
      },
    },

    async created() {
      const { id } = this.$router.currentRoute.params;
      await this.fetchEliteById({ id });
      this.fetchEliteFavorites();
      this.fetchEliteReviews({ id: this.getElite.id });
    },

    methods: {
      ...mapActions({
        fetchEliteById: 'elite/fetchEliteById',
        fetchEliteFavorites: 'elite/fetchEliteFavorites',
        fetchEliteReviews: 'elite/fetchEliteReviews',
        addEliteFavourite: 'elite/addEliteFavourite',
        removeEliteFavourite: 'elite/removeEliteFavourite',
      }),

      onBack() {
        this.$router.back();
      },

      getInitials(name) {
        return name.split(' ').map(n => n[0]).join('');
      },

      getFormattedDate(date) {
        return getZonedDate(date);
      },
      onReserve() {
        if (!this.isAuthenticated) {
          this.$root.$emit('on-show-login');
          return;
        }

        if (this.getElite.located_in_current_users_city) {
          this.$router.push(`/servicii?pro_id=${this.getElite.elite_id}`);
        } else {
          this.$toasts.toast({
            id: 'login-toast',
            intent: 'info',
            title: this.$t('toast.info_title'),
            message: this.$t('toast.wrong_service_address'),
          });
        }
      },
      async onAddFavourite() {
        if (!this.isAuthenticated) {
          this.$root.$emit('on-show-login');
          return;
        }
        await this.addEliteFavourite({ id: this.getElite.id });
        await this.fetchEliteFavorites();
      },
      async onRemoveFavourite() {
        await this.removeEliteFavourite({ id: this.getElite.id });
        await this.fetchEliteFavorites();
      },
    },
  });
</script>

<style type="text/css" scoped>
  i.icon_star {
    color: #fad055;
    font-size: 1.3rem;
  }

  .favourite-container {
    align-items: center;
    display: flex;
  }

  .favourite-container i {
    color: #d00078;
    font-size: 2rem;
  }

  .item-header {
    display: flex;
  }

  .item-logo {
    align-items: center;
    background: #e2e2e2;
    border-radius: 50%;
    color: #ffffff;
    display: flex;
    height: 35px;
    justify-content: center;
    width: 35px;
  }

  span {
    font-size: 1rem;
  }

  img.disabled {
    background-color: #000000;
    opacity: 0.4;
  }

  .unavailable {
    background: #e2e2e2;
  }
</style>
