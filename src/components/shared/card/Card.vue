<template>
  <div class="card">
    <div class="card-header" role="tab">
      <h5>
        <a
          data-toggle="collapse"
          :href="`#${id}`"
          aria-expanded="true"
          class="toggle"
        ><i class="indicator icon_plus" />{{ title }}</a>
      </h5>
    </div>

    <div :id="id" class="collapse" role="tabpanel" data-parent="#accordion_group">
      <div class="card-body">
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';

  export default Vue.extend({
    name: 'card',
    props: {
      title: {
        type: String,
        default: '',
      },
      id: {
        type: String,
        default: '',
      },
    },
  });
</script>
