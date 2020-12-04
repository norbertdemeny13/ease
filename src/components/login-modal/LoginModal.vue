<!-- eslint-disable -->
<template>
  <!-- Sign In Modal -->
  <div id="sign-in-dialog" class="zoom-anim-dialog mfp-hide">
    <div class="modal_header">
      <h3>Sign In</h3>
    </div>
    <form>
      <div class="sign-in-wrapper">
        <a href="" class="social_bt facebook">Autentifica-te cu Facebook</a>
        <div class="divider"><span>Sau</span></div>
        <div class="form-group">
          <label>Email</label>
          <input type="email" class="form-control" name="email" id="email">
          <i class="icon_mail_alt" />
        </div>
        <div class="form-group">
            <label>Parola</label>
            <input type="password" class="form-control" name="password" id="password" value="">
            <i class="icon_lock_alt" />
        </div>
        <div class="clearfix add_bottom_15">
          <div class="checkboxes float-left">
            <label class="container_check">Tine-ma minte
              <input type="checkbox">
              <span class="checkmark"></span>
            </label>
          </div>
          <div class="float-right"><a id="forgot" href="javascript:void(0);">Ai uitat parola??</a></div>
          </div>
          <div class="text-center">
            <input @click.prevent="$emit('on-login')" type="submit" value="Logheaza-te" class="btn_1 full-width mb_5">
            Inca nu ai cont?
            <router-link
              to="/signup"
            >
              Inregistreaza-te
            </router-link>
          </div>
        <div id="forgot_pw">
          <div class="form-group">
            <label>Te rog sa confirmi emailul de logare</label>
            <input type="email" class="form-control" name="email_forgot" id="email_forgot">
            <i class="icon_mail_alt" />
          </div>
          <p>Vei primi un mail care va contine un link unde o sa iti pot seta parola dorita.</p>
          <div class="text-center"><input type="submit" value="Reset Password" class="btn_1"></div>
        </div>
      </div>
    </form>
    <!--form -->
  </div>
  <!-- /Sign In Modal -->
</template>

<script lang="ts">
  import Vue from 'vue';

  export default Vue.extend({
    name: 'es-login-modal',
  });
</script>
