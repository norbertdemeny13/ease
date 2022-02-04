<template>
  <div class="es_client-dashboard-container bg_gray content">
    <div class="container ">
      <div class="row bg-white">
        <div class="col-md-3 border-right mt-4">
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
    computed: {
      getSidebarLinks(): Link[] {
        return SIDEBAR_LINKS.map((item: Link) => ({ ...item, id: nanoid() }));
      },
    },
  });
</script>
