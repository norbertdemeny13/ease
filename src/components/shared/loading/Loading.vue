<template>
  <div class="spinner-container">
    <div class="spinner-border" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';

  export default Vue.extend({
    name: 'es-loading',
  });
</script>

<style scoped>
  .spinner-container {
    align-items: center;
    color: #d00078;
    display: flex;
    justify-content: center;
    margin-bottom: 128px;
    margin-top: 128px;
  }
</style>
