<!-- eslint-disable -->
<template>
  <portal to="modal">
    <es-modal
      id="modal"
      size="sm"
      :on-dismiss="() => $emit('is-open', false)"
    >
      <div class="container es-login-modal mt-12">
        <!-- Sign In Modal -->
        <div id="es-modal-dialog">
          <div class="modal_header">
            <h3>{{ isSignIn ? 'Logheaza-te' : 'Inregistreaza-te' }}</h3>
            <button type="button" class="mfp-close" @click.prevent="$emit('is-open', false)"></button>
          </div>
          <form>
            <div v-if="isSignIn" class="sign-in-wrapper">
              <a href="" class="social_bt facebook">Autentifica-te cu Facebook</a>
              <div class="divider"><span>Sau</span></div>
              <div class="form-group">
                <label>Email</label>
                <input type="email" class="form-control" name="email" id="email" v-model="form.email">
                <i class="icon_mail_alt" />
              </div>
              <div class="form-group">
                  <label>Parola</label>
                  <input
                    :type="type"
                    class="form-control"
                    name="password"
                    id="password"
                    v-model="form.password"
                  >
                  <span v-if="type === 'password'" class="show-password-btn" @click.prevent="type = 'text'">Arata</span>
                  <span v-if="type === 'text'" class="show-password-btn" @click.prevent="type = 'password'">Ascunde</span>
                  <i class="icon_lock_alt" />
              </div>
              <div class="clearfix add_bottom_15">
                <div class="checkboxes float-left">
                  <label class="container_check">Tine-ma minte
                    <input type="checkbox">
                    <span class="checkmark"></span>
                  </label>
                </div>
                <div class="float-right">
                  <a id="forgot" href="" @click.prevent="onForgotPassword">Ai uitat parola??</a>
                </div>
                </div>
                <div class="text-center">
                  <input @click.prevent="onSubmit()" type="submit" value="Logheaza-te" class="btn_1 full-width mb_5">
                  Inca nu ai cont?
                  <a @click.prevent="isSignIn = false" href="">
                    Inregistreaza-te
                  </a>
                </div>
            </div>
            <div v-else class="sign-up-wrapper">
              <es-loading v-if="isFetchingUser" />
              <div v-else>
                <a href="" class="social_bt facebook">Autentifica-te cu Facebook</a>
                <div class="divider"><span>Sau</span></div>
                <div class="form-group">
                  <label>Email</label>
                  <input type="email" required class="form-control" name="email" id="email" v-model="form.email">
                  <i class="icon_mail_alt" />
                </div>
                <div class="form-group">
                  <label>Prenume</label>
                  <input type="email" class="form-control" name="firstName" id="firstName" v-model="form.first_name">
                </div>
                <div class="form-group">
                  <label>Nume</label>
                  <input type="email" class="form-control" name="lastName" id="lastName" v-model="form.last_name">
                </div>
                <div class="form-group">
                  <label>Parola</label>
                  <input
                    :type="type"
                    class="form-control"
                    name="password"
                    id="password"
                    v-model="form.password"
                  >
                    <span v-if="type === 'password'" class="show-password-btn" @click.prevent="type = 'text'">Arata</span>
                    <span v-if="type === 'text'" class="show-password-btn" @click.prevent="type = 'password'">Ascunde</span>
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
                  <div class="text-center">
                    <input @click.prevent="onSubmit()" type="submit" value="Inregistreaza-te" class="btn_1 full-width mb_5">
                    Ai deja cont?
                    <a
                      href=""
                      @click.prevent="isSignIn = true"
                    >
                      Logheaza-te
                    </a>
                  </div>
                </div>
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
      </div>
    </es-modal>
  </portal>
</template>

<script lang="ts">
  /* eslint-disable */
  import Vue, { PropType } from 'vue';
  import { mapGetters, mapActions } from 'vuex';
  import { nanoid } from 'nanoid';
  import { Loading } from '@/components/shared/loading';

  export default Vue.extend({
    name: 'es-login-modal',

    components: {
      'es-loading': Loading,
    },

    model: {
      prop: 'is-open',
      event: 'is-open',
    }, // model

    props: {
      isOpen: {
        required: true,
        type: Boolean as PropType<boolean>,
      },
    },

    data: () => ({
      showPassword: false,
      type: 'password',
      form: {
        email: 'norbert.demeny13@gmail.com',
        first_name: '',
        last_name: '',
        password: 'testtest',
      },
      isSignIn: true,
    }),

    computed: {
      ...mapGetters({
        getUser: 'getUser',
        getToken: 'getToken',
        isFetchingUser: 'isFetchingUser',
      }),
    },

    watch: {
      getToken(newVal) {
        if (newVal) {
          (this as any).$toasts.toasts.push({
            id: nanoid(),
            intent: 'success',
            title: 'Felicitari!',
            message: 'Crearea contului s-a realizat cu success!',
          });
        }
      },
      getUser(newVal) {
        if (!newVal.phone_number_confirmed) {
          this.$emit('show-validate-phone-modal', true);
        }
        this.$emit('is-open', false);
      },
    },

    methods: {
      ...mapActions({
        login: 'login',
        signUp: 'signUp',
      }),

      async onSubmit() {
        if (this.isSignIn) {
          await this.login(this.form);
        } else {
          await this.signUp(this.form);
        }
      },

      onForgotPassword() {
        this.$emit('show-forgot-password-modal', true);
      },
    },
  });
</script>
