<template>
  <div class="faq-container bg_gray">
    <div class="container margin_30_40">
      <div class="main_title center">
        <h2>{{ $t('views.faq_pro.frequently_asked_questions') }}</h2>
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

<script>
  import Vue from 'vue';
  import { PROFAQ } from '@/constants/faq';
  import FaqList from '@/views/faq/FaqList.vue';

  export default Vue.extend({
    name: 'es-pro-faq',

    components: {
      'es-faq-list': FaqList,
    },

    data: () => ({
      faq: PROFAQ,
      selectedCategory: '',
    }),

    computed: {
      getFaqList() {
        return this.faq.filter(item => item.category === this.selectedCategory)[0];
      },
    },

    created() {
      window.initAccordion();
      this.$zendesk.load('4591939b-c8e2-4d8c-b9db-bb9e1b531846');
    },

    methods: {
      getFaqListByCategory(category) {
        return this.faq.filter(item => item.category === category)[0];
      },
      setCategory(category) {
        this.selectedCategory = category;
      },
    },
  });
</script>
