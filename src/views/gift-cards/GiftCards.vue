<!-- eslint-disable -->
<template>
  <div class="es-gift-cards-container">
    <div class="container margin_30_40">
      <div class="main_title center">
        <h2>{{ $t('views.giftcards.title') }}</h2>
        <p>{{ $t('views.giftcards.title_description') }}</p>
      </div>
      <div class="row justify-content-center">
        <div class="tab-content pricing-tab-content" id="pricing-tab-content">
          <div
            v-for="category in getCategories"
            :key="category.id"
            role="tabpanel"
            :class="`tab-pane ${selectedType === category.id ? 'active': ''}`"
            :id="category.id"
            :aria-labelledby="`${category.id}-tab`"
          >
            <div class="row">
              <div
                v-for="card in category.gift_card_templates"
                :key="card.id"
                class="col-md-3 my-4 transition-3d-hover"
                @click.prevent="onClick(card)"
              >
                <img :src="card.absolute_image_url" width="100%" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { mapActions, mapGetters } from 'vuex';
  import { GiftCard } from '@/interfaces/GiftCards';

  export default Vue.extend({
    name: 'es-gift-cards',
    data: () => ({
      selectedType: 1,
    }),
    computed: {
      ...mapGetters({
        getGiftCards: 'giftCards/getGiftCards',
      }),
      getCategories(): GiftCard[] {
        return this.getGiftCards;
      },
    },

    created() {
      this.fetchGiftCards();
    },

    methods: {
      ...mapActions({
        setGiftCard: 'giftCards/setGiftCard',
        fetchGiftCards: 'giftCards/fetchGiftCards',
      }),
      onClick(card: GiftCard): void {
        this.setGiftCard(card);
        const route = `/carduri-cadou/${card.id}`;
        this.$router.push(route);
      },
    },
  });
</script>

<style type="text/css">
  .es-gift-cards-container img {
    cursor: pointer;
  }
</style>
