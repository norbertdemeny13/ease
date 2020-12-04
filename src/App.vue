<template>
  <div>
    <es-header />
    <div class="content">
      <transition name="app_a-fade" mode="out-in">
        <router-view :key="$route.path" />
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { EsHeader } from '@/components/header';

  export default Vue.extend({
    name: 'ease-app',

    components: {
      'es-header': EsHeader,
    },
  });
</script>
