<template>
  <div class="row justify-content-center">
    <div class="col-lg-8 col-md-10">
      <div class="main_title center">
        <h3>{{ list.title }}</h3>
      </div>

      <div id="accordion_group" role="tablist" class="add_bottom_15 accordion">
        <div v-for="item in list.questions" :key="item.category" class="card">
          <div class="card-header" role="tab">
            <h5>
              <a
                data-toggle="collapse"
                :href="`#${item.category}`"
                aria-expanded="true"
                class="toggle"
              ><i class="indicator icon_plus" />{{ item.question }}</a>
            </h5>
          </div>

          <div :id="item.category" class="collapse" role="tabpanel" data-parent="#accordion_group">
            <div class="card-body">
              <p v-html="item.answer" />
            </div>
          </div>
        </div>
        <!-- /card -->
      </div>
      <!-- /accordion group -->
    </div>
    <!-- /col -->
  </div>
  <!-- /bg_gray -->
</template>

<script lang="ts">
  import Vue from 'vue';

  export default Vue.extend({
    name: 'es-faq-list',

    props: {
      list: {
        type: Object,
        required: true,
      },
    },
  });
</script>
