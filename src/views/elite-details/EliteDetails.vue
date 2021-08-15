<template>
  <div class="es_elite-details-container bg_gray content">
    <div class="container margin_30_20">
      <div class="row bg-white p-4">
        <div class="col-md-6">
          <a class="back-button" href="" @click.prevent="onBack()">
            Inapoi
          </a>
          <div class="row mt-2">
            <div class="col-md-3">
              <figure class="mb-0">
                <img
                  v-if="getElite.avatar_path"
                  class="radius-50 m-1"
                  :src="getElite.avatar_path"
                  alt=""
                  width="120px"
                  height="120px"
                >
                <img
                  v-else
                  class="radius-50 m-1"
                  src="@/assets/svg/pro-placeholder.svg"
                  alt=""
                  width="120px"
                  height="120px"
                >
              </figure>
            </div>
            <div class="col-md-6">
              <div class="favourite-container">
                <h3 class="mr-3 mb-0">{{ getEliteName }}</h3>
                <i
                  v-if="getIsFavourite"
                  class="icon_heart"
                  @click="onAddFavourite"
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
              <div class="d-flex align-items-center">
                <i class="icon_star" /><span class="mt-1 ml-2">{{ Number(getElite.rating) > 0 ? getElite.rating : 'Momentan nu exista nicio recenzie.' }}</span>
              </div>
              <div class="d-flex justify-content-start">
                <button
                  class="btn btn-sm btn-pink btn-pill my-4 px-6"
                  @click.prevent="onReserve"
                >
                  Rezerva
                </button>
              </div>
            </div>
          </div>
          <div class="row my-2">
            <div class="col-md-12 d-flex justify-content-between">
              <div class="d-flex experience">
                <figure class="mb-0">
                  <img
                    src="@/assets/svg/experience.svg"
                    alt=""
                    width="30px"
                  >
                </figure>
                <div class="ml-2">
                  <h6 class="mb-0">Experienta</h6>
                  <p>16 ani</p>
                </div>
              </div>
              <div class="d-flex language">
                <figure class="mb-0">
                  <img
                    src="@/assets/svg/language.svg"
                    alt=""
                    width="30px"
                  >
                </figure>
                <div class="ml-2">
                  <h6 class="mb-0">Limbi vorbite</h6>
                  <p>Romana, Franceza</p>
                </div>
              </div>
              <div class="d-flex certificate">
                <figure class="mb-0">
                  <img
                    src="@/assets/svg/certificate.svg"
                    alt=""
                    width="30px"
                  >
                </figure>
                <div class="ml-2">
                  <h6 class="mb-0">Certificat</h6>
                  <p>100%</p>
                </div>
              </div>
            </div>
          </div>
          <div v-if="getReviews.length" class="row">
            <div class="col-md-12">
              <h6>Recenzii</h6>
              <p>Rating {{ getElite.rating }} din 5 ({{ getReviews.length }})</p>
              <div class="es_reviews-container">
                <div v-for="review in getReviews" :key="review.id" class="es_reviews-container__item">
                  <div class="item-header">
                    <div class="item-logo">{{ getInitials(review.reviewer_name) }}</div>
                    <div class="item-info ml-2">
                      <p class="mb-0">{{ review.reviewer_name }}</p>
                      <p class="mb-0">{{ getFormattedDate(review.created_at) }}</p>
                    </div>
                  </div>
                  <div class="start-rating">
                    <es-star-rating
                      v-model="review.rating"
                      :read-only="true"
                      :show-rating="false"
                      :star-size="20"
                    />
                  </div>
                  <p class="mt-2">{{ review.review }}</p>
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
  import { getZonedDateTime } from '@/utils/date-helpers';

  export default Vue.extend({
    name: 'es-elite-details',

    data: () => ({
      isFavourite: false,
      onHover: false,
      rating: 2,
    }),

    computed: {
      ...mapGetters({
        getElite: 'elite/getElite',
        getEliteFavorites: 'elite/getEliteFavorites',
        getEliteReviews: 'elite/getEliteReviews',
      }),
      getEliteName() {
        const firstName = this.getElite?.first_name;
        const lastName = this.getElite?.last_name;
        return firstName ? `${firstName} ${lastName?.substr(0, 1)}.` : '';
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
    },

    created() {
      const { id } = this.$router.currentRoute.params;
      this.fetchElite({ id });
      this.fetchEliteFavorites();
      this.fetchEliteReviews({ id });
    },

    methods: {
      ...mapActions({
        fetchElite: 'elite/fetchElite',
        fetchEliteFavorites: 'elite/fetchEliteFavorites',
        fetchEliteReviews: 'elite/fetchEliteReviews',
        addEliteFavourite: 'elite/addEliteFavourite',
        removeEliteFavourite: 'elite/removeEliteFavourite',
      }),

      onBack() {
        this.$router.push('/client/rezervarile-mele');
      },

      getInitials(name) {
        return name.split(' ').map(n => n[0]).join('');
      },

      getFormattedDate(date) {
        return getZonedDateTime(date);
      },
      onReserve() {
        this.$router.push(`/servicii?elite_id=${this.getElite.id}`);
      },
      onAddFavourite() {
        this.addEliteFavourite({ id: this.getElite.id });
      },
      onRemoveFavourite() {
        this.removeEliteFavourite({ id: this.getElite.id });
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
    display: flex;
    align-items: center;
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
    color: #ffffff;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    height: 35px;
    width: 35px;
  }

  span {
   font-size: 1rem;
  }
</style>
