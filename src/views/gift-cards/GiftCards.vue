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
            :key="category.value"
            class="nav-item"
            @click="selectedType = category.value"
          >
            <a
              :class="`nav-link ${category.value === selectedType ? 'active' : ''}`"
              :id="`${category.value}-tab`"
              data-toggle="pill"
              :href="`#${category.value}`"
              role="tab"
              :aria-controls="category.value"
              aria-selected="true"
            >{{ category.label }}</a>
          </li>
        </ul>
        <div class="tab-content pricing-tab-content" id="pricing-tab-content">
          <div
            v-for="category in getCategories"
            :key="category.value"
            role="tabpanel"
            :class="`tab-pane ${selectedType === category.value ? 'active': ''}`"
            :id="category.value"
            :aria-labelledby="`${category.value}-tab`"
          >
            <div class="row">
              <div
                v-for="card in category.cards"
                :key="card.id"
                class="col-md-3 my-4"
                @click.prevent="onClick(card.id)"
              >
                <img :src="card.src" width="100%" />
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
  import { nanoid } from 'nanoid';

  export default Vue.extend({
    name: 'es-gift-cards',
    data: () => ({
      selectedType: 'thank_you',
    }),
    computed: {
      getCategories() {
        return [
          {
            value: 'thank_you',
            label: 'Multumesc',
            /* eslint-disable global-require */
            cards: [
              { src: require('@/assets/jpg/Birthday-Gift-Card.jpg'), id: nanoid() },
              { src: require('@/assets/jpg/Birthday-Gift-Card.jpg'), id: nanoid() },
              { src: require('@/assets/jpg/Birthday-Gift-Card.jpg'), id: nanoid() },
              { src: require('@/assets/jpg/Birthday-Gift-Card.jpg'), id: nanoid() },
              { src: require('@/assets/jpg/Birthday-Gift-Card.jpg'), id: nanoid() },
              { src: require('@/assets/jpg/Birthday-Gift-Card.jpg'), id: nanoid() },
              { src: require('@/assets/jpg/Birthday-Gift-Card.jpg'), id: nanoid() },
              { src: require('@/assets/jpg/Birthday-Gift-Card.jpg'), id: nanoid() },
              { src: require('@/assets/jpg/Birthday-Gift-Card.jpg'), id: nanoid() },
            ],
          },
          {
            value: 'birthday',
            label: 'La multi ani',
            cards: [
              { src: require('@/assets/jpg/Birthday-Gift-Card.jpg'), id: nanoid() },
              { src: require('@/assets/jpg/Birthday-Gift-Card.jpg'), id: nanoid() },
              { src: require('@/assets/jpg/Birthday-Gift-Card.jpg'), id: nanoid() },
            ],
          },
          {
            value: 'congrats',
            label: 'Felicitari',
            cards: [
              { src: require('@/assets/jpg/Birthday-Gift-Card.jpg'), id: nanoid() },
              { src: require('@/assets/jpg/Birthday-Gift-Card.jpg'), id: nanoid() },
              { src: require('@/assets/jpg/Birthday-Gift-Card.jpg'), id: nanoid() },
            ],
          },
          {
            value: 'appreciate',
            label: 'Apreciere',
            cards: [
              { src: require('@/assets/jpg/Birthday-Gift-Card.jpg'), id: nanoid() },
              { src: require('@/assets/jpg/Birthday-Gift-Card.jpg'), id: nanoid() },
              { src: require('@/assets/jpg/Birthday-Gift-Card.jpg'), id: nanoid() },
            ],
          },
          {
            value: 'support',
            label: 'Incurajare',
            cards: [
              { src: require('@/assets/jpg/Birthday-Gift-Card.jpg'), id: nanoid() },
              { src: require('@/assets/jpg/Birthday-Gift-Card.jpg'), id: nanoid() },
              { src: require('@/assets/jpg/Birthday-Gift-Card.jpg'), id: nanoid() },
            ],
          },
          {
            value: 'others',
            label: 'Orice Ocazie',
            cards: [
              { src: require('@/assets/jpg/Birthday-Gift-Card.jpg'), id: nanoid() },
              { src: require('@/assets/jpg/Birthday-Gift-Card.jpg'), id: nanoid() },
              { src: require('@/assets/jpg/Birthday-Gift-Card.jpg'), id: nanoid() },
            ],
          },
        ];
      },
    },
    methods: {
      onClick(id: string) {
        const route = `/carduri-cadou/${id}`;
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
