<template>
  <div class="es_pro-dashboard-container bg_gray content">
    <div class="container margin_30_20">
      <div class="row bg-white">
        <div class="col-md-2 border-right mt-4">
          <div v-for="link in getSidebarLinks" :key="link.id" class="p-1 m-1">
            <router-link :to="link.to">{{ link.label }}</router-link>
          </div>
        </div>
        <div class="col-md-10 mt-4">
          <router-view class="p-1 m-1" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { PRO_SIDEBAR_LINKS } from '@/constants/sidebar-links';
  import { Link } from '@/interfaces/Link';
  import { nanoid } from 'nanoid';

  export default Vue.extend({
    name: 'es-pro-dashboard',
    computed: {
      getSidebarLinks(): Link[] {
        return PRO_SIDEBAR_LINKS.map((item: Link) => ({ ...item, id: nanoid() }));
      },
    },

    created() {
      (this as any).$zendesk.load('4591939b-c8e2-4d8c-b9db-bb9e1b531846');
    },
  });
</script>
