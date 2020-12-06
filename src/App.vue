<template>
  <div>
    <es-header />
    <div class="content">
      <transition name="app_a-fade" mode="out-in">
        <router-view :key="$route.path" />
      </transition>
    </div>
    <es-footer />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { EsHeader } from '@/components/header';
  import { EsFooter } from '@/components/footer';

  export default Vue.extend({
    name: 'ease-app',

    components: {
      'es-header': EsHeader,
      'es-footer': EsFooter,
    },
  });
</script>
