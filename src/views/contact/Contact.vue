<!-- eslint-disable -->
<template>
  <div class="contact-page">
    <!-- /container -->
    <div class="bg_gray">
      <div class="container margin_60_40">
        <h4>{{ $t('views.contact.contact_us') }}</h4>
        <h5 class="my-4">{{ $t('views.contact.ease_app') }}</h5>
        <div class="row justify-content-center">
          <div class="col-lg-3">
            <div class="box-contacts">
              <i class="icon_headphones" />
              <!-- &#xe027 &#xe027 &#xe00a &#xe0ef -->
              <h2>{{ $t('views.contact.clients') }}</h2>
              <span><i class="icon_phone mr-2" />{{ $t('views.contact.clients_phone') }}</span><br>
              <span><i class="icon_mail mr-2" />{{ $t('views.contact.clients_email') }}</span>
              <small>{{ $t('views.contact.clients_hours') }}</small>
            </div>
          </div>
          <div class="col-lg-3">
            <div class="box-contacts">
              <i class="icon_headphones" />
              <h2>{{ $t('views.contact.pros') }}</h2>
              <span><i class="icon_phone mr-2" />{{ $t('views.contact.pros_phone') }}</span><br>
              <span><i class="icon_mail mr-2" />{{ $t('views.contact.pros_email') }}</span>
              <small>{{ $t('views.contact.pros_hours') }}</small>
            </div>
          </div>
          <div class="col-lg-3">
            <div class="box-contacts">
              <!-- &#xe00a; -->
              <i class=""/>
              <h2>{{ $t('views.contact.marketing') }}</h2>
              <span><i class="icon_mail mr-2" />{{ $t('views.contact.marketing_email') }}</span>
            </div>
          </div>
          <div class="col-lg-3">
            <div class="box-contacts">
              <i class="icon_building" />
              <h2>{{ $t('views.contact.business') }}</h2>
              <span><i class="icon_mail mr-2" />{{ $t('views.contact.business_email') }}</span>
            </div>
          </div>
        </div>
        <!-- /row -->
      </div>
      <!-- /container -->
    </div>
    <!-- /bg_gray -->
  </div>
</template>

<script>
  import Vue from 'vue';

  export default Vue.extend({
    name: 'es-not-found',
    created() {
      this.$zendesk.load('4591939b-c8e2-4d8c-b9db-bb9e1b531846');
    },
  });
</script>
