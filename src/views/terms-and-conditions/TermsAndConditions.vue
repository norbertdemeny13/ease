<template>
  <div class="terms-and-conditions-page">
    <div class="bg_gray">
      <div class="container margin_60_40">
        <h1>{{ $t('terms_and_conditions_title') }}</h1>
        <p>{{ $t('terms_and_conditions_body') }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';

  export default Vue.extend({
    name: 'es-terms-and-conditions',
  });
</script>

<style scoped>
h1,
p {
  color: #222222;
  font-family: 'SofiaProSemibold', sans-serif;
  font-weight: 500;
}

h1 {
  font-size: 36px;
}

p {
  font-size: 16px;
}
</style>
