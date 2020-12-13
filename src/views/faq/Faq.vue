<template>
  <div class="faq-container bg_gray">
    <div class="container margin_30_40">
      <div class="main_title center">
        <h2>Intrebari frecvente</h2>
      </div>

      <div class="large-view">
        <div class="row">
          <div v-for="c in faq" :key="c.category" class="col-lg-4 col-md-6">
            <a class="box_topic" href="" @click.prevent="setCategory(c.category)">
              <span><i :class="c.icon" /></span>
              <h3>{{ c.title }}</h3>
            </a>
          </div>
        </div>
        <es-faq-list v-if="selectedCategory" :list="getFaqList" />
      </div>

      <div class="row mobile-view">
        <div v-for="c in faq" :key="c.category" class="col-lg-4 col-md-6">
          <a class="box_topic" href="" @click.prevent="setCategory(c.category)">
            <span><i :class="c.icon" /></span>
            <h3>{{ c.title }}</h3>
          </a>
          <es-faq-list v-if="selectedCategory === c.category" :list="getFaqListByCategory(c.category)" />
        </div>
      </div>
    </div>
    <!-- /container -->
  </div>
  <!-- /bg_gray -->
</template>

<script lang="ts">
  import Vue from 'vue';
  import { FAQ } from '@/constants/faq';
  import FaqList from './FaqList.vue';

  export default Vue.extend({
    name: 'es-faq',

    components: {
      'es-faq-list': FaqList,
    },

    data: () => ({
      faq: FAQ,
      selectedCategory: '',
    }),

    computed: {
      getFaqList() {
        return this.faq.filter(item => item.category === this.selectedCategory)[0];
      },
    },

    created() {
      (window as any).initAccordion();
    },

    methods: {
      getFaqListByCategory(category: string) {
        return this.faq.filter(item => item.category === category)[0];
      },
      setCategory(category: string) {
        this.selectedCategory = category;
      },
    },
  });
</script>
