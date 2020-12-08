<!-- eslint-disable -->
<template>
  <div class="row">
    <div
      v-for="filter in filters"
      :key="filter.value"
    >
      <div v-if="filter.list && filter.list.length">
        <button
          class="btn btn-pill btn-sm btn-pink m-2 px-5 closed"
          data-toggle="collapse"
          :href="`#${filter.value}`"
        >
          <i class="icon_profile" />{{ filter.label }}
        </button>
        <ul class="collapse" :id="filter.value">
          <li v-for="item in filter.list" :key="item.value">{{ item.label }}</li>
        </ul>
      </div>
      <button
        v-else
        class="btn btn-pill btn-sm btn-pink m-2 px-5"
      >
        {{ filter.label }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { FILTERS } from '@/constants/filters';

  export default Vue.extend({
    name: 'es-filter-bar',

    data: () => ({
      filters: FILTERS,
    }),
  });
</script>
