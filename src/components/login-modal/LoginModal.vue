<!-- eslint-disable -->
<template>
  <!-- Sign In Modal -->
  <div id="sign-in-dialog" class="zoom-anim-dialog mfp-hide">
    <div class="modal_header">
      <h3>Sign In</h3>
    </div>
    <form>
      <div v-if="isSignIn" class="sign-in-wrapper">
        <a href="" class="social_bt facebook">Autentifica-te cu Facebook</a>
        <div class="divider"><span>Sau</span></div>
        <div class="form-group">
          <label>Email</label>
          <input type="email" class="form-control" name="email" id="email" v-model="email">
          <i class="icon_mail_alt" />
        </div>
        <div class="form-group">
            <label>Parola</label>
            <input type="password" class="form-control" name="password" id="password" v-model="password">
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
            <input @click.prevent="onSubmit()" type="submit" value="Logheaza-te" class="btn_1 full-width mb_5">
            Inca nu ai cont?
            <a @click.prevent="isSignIn = false" href="">
              Inregistreaza-te
            </a>
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
      <div v-else class="sign-up-wrapper">
        <a href="" class="social_bt facebook">Autentifica-te cu Facebook</a>
        <div class="divider"><span>Sau</span></div>
        <div class="form-group">
          <label>Email</label>
          <input type="email" class="form-control" name="email" id="email" v-model="email">
          <i class="icon_mail_alt" />
        </div>
        <div class="form-group">
          <label>Prenume</label>
          <input type="email" class="form-control" name="firstName" id="firstName" v-model="firstName">
        </div>
        <div class="form-group">
          <label>Nume</label>
          <input type="email" class="form-control" name="lastName" id="lastName" v-model="lastName">
        </div>
        <div class="form-group">
          <label>Parola</label>
          <input type="password" class="form-control" name="password" id="password" v-model="password">
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
            <input @click.prevent="onSubmit()" type="submit" value="Logheaza-te" class="btn_1 full-width mb_5">
            Inca nu ai cont?
            <a
              href=""
              @click.prevent="isSignIn = true"
            >
              Logheaza-te
            </a>
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
  import { mapActions } from 'vuex';

  export default Vue.extend({
    name: 'es-login-modal',

    data: () => ({
      email: 'a@b.com',
      password: 'Password1!',
      isSignIn: true,
      firstName: '',
      lastName: '',
    }),

    methods: {
      ...mapActions({
        login: 'login',
      }),
      onSubmit() {
        this.login(this.$data);
      },
    },
  });
</script>
