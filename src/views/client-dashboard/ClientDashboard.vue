<template>
  <div class="es_client-dashboard-container bg_gray content">
    <div class="container margin_30_20">
      <div class="row bg-white">
        <div v-show="clientSize > 767 ? false : true" class="col-6 mt-4">
          <div v-for="(link, index) in getSidebarLinks" :key="link.id" class="p-1 m-1" v-show="index < 6">
            <router-link :to="link.to">{{ link.label }}</router-link>
          </div>
        </div>
        <div v-show="clientSize > 767 ? false : true" class="col-6 mt-4">
          <div v-for="(link, index) in getSidebarLinks" :key="link.id" class="p-1 m-1" v-show="index + 6 >= getSidebarLinks.length">
            <router-link :to="link.to">{{ link.label }}</router-link>
          </div>
        </div>
        <hr v-show="clientSize > 767 ? false : true" class="w-100">
        <div v-show="clientSize < 767 ? false : true" class="col-md-3 border-right mt-4">
          <div v-for="link in getSidebarLinks" :key="link.id" class="p-1 m-1">
            <router-link :to="link.to">{{ link.label }}</router-link>
          </div>
        </div>
        <div class="col-md-9 mt-4">
          <router-view class="p-1 m-1" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { SIDEBAR_LINKS } from '@/constants/sidebar-links';
  import { Link } from '@/interfaces/Link';
  import { nanoid } from 'nanoid';

  export default Vue.extend({
    name: 'es-client-dashboard',
    data: () => ({
      clientSize: window.innerWidth,
    }),
    computed: {
      getSidebarLinks(): Link[] {
        return SIDEBAR_LINKS.map((item: Link) => ({ ...item, id: nanoid() }));
      },
    },
    created() {
      (this as any).$zendesk.load('4591939b-c8e2-4d8c-b9db-bb9e1b531846');
      window.addEventListener('resize', this.checkSize);
      this.checkSize();
    },
    methods: {
      checkSize() {
        this.clientSize = window.innerWidth;
      },
    },
  });
</script>
