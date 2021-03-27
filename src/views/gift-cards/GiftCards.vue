<!-- eslint-disable -->
<template>
  <div class="es-gift-cards-container">
    <div class="container margin_30_40">
      <div class="main_title center">
        <h2>Intodeauna Cadoul Perfect</h2>
        <p>Alege Design-ul Cardului Tau</p>
      </div>
      <div class="row justify-content-center">
        <ul class="nav nav-pills justify-content-center pricing-tab" id="pricing-tab" role="tablist">
          <li
            v-for="category in getCategories"
            :key="category.id"
            class="nav-item"
            @click="selectedType = category.id"
          >
            <a
              :class="`nav-link ${category.id === selectedType ? 'active' : ''}`"
              :id="`${category.id}-tab`"
              data-toggle="pill"
              :href="`#${category.id}`"
              role="tab"
              :aria-controls="category.id"
              aria-selected="true"
            >{{ category.name }}</a>
          </li>
        </ul>
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
                class="col-md-3 my-4"
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
  import { GIFT_CARD } from '@/interfaces/GiftCards';

  export default Vue.extend({
    name: 'es-gift-cards',
    data: () => ({
      selectedType: 1,
    }),
    computed: {
      ...mapGetters({
        getGiftCards: 'giftCards/getGiftCards',
      }),
      getCategories(): GIFT_CARD[] {
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
      onClick(card: GIFT_CARD): void {
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
