<!-- eslint-disable -->
<template>
  <portal to="modal">
    <es-modal
      id="modal"
      size="xs"
      :on-dismiss="() => $emit('is-open', false)"
    >
      <div class="container es-login-modal mt-12">
        <!-- Sign In Modal -->
        <div id="es-modal-dialog">
          <div class="modal_header">
            <h3>{{ isSignIn ? $t('generic.login') : $t('generic.sign_up') }}</h3>
            <button type="button" class="mfp-close" @click.prevent="$emit('is-open', false)"></button>
          </div>
          <div class="form-group radio_c_group">
            <label @click="userType = 'client'" class="container_radio">{{ $t('generic.client') }}
              <input type="radio" value="checkbox" name="user-type" :checked="`${userType === 'client' ? 'checked' : ''}`">
              <span class="checkmark"></span>
            </label>
            <label @click="userType = 'elite'" class="container_radio">{{ $t('generic.pro') }}
              <input type="radio" value="checkbox" name="user-type" :checked="`${userType !== 'client' ? 'checked' : ''}`">
              <span class="checkmark"></span>
            </label>
          </div>
          <form>
            <div v-if="isSignIn" class="sign-in-wrapper">
              <div class="form-group">
                <label>{{ $t('generic.email') }}</label>
                <input type="email" class="form-control" name="email" id="email" v-model="form.email" :placeholder="$t('auth.emailPlaceholder')">
              </div>
              <div class="form-group">
                  <label>{{ $t('generic.password') }}</label>
                  <input
                    :type="passwordType"
                    class="form-control"
                    name="password"
                    id="password"
                    :placeholder="$t('auth.passwordPlaceholder')"
                    v-model="form.password"
                  >
                  <span v-if="passwordType === 'password'" class="show-password-btn" @click.prevent="passwordType = 'text'">{{ $t('generic.password_show') }}</span>
                  <span v-if="passwordType === 'text'" class="show-password-btn" @click.prevent="passwordType = 'password'">{{ $t('generic.password_hide') }}</span>
              </div>
              <div class="clearfix add_bottom_15">
                <div class="checkboxes float-left">
                  <label class="container_check">{{ $t('generic.remember_me') }}
                    <input type="checkbox">
                    <span class="checkmark"></span>
                  </label>
                </div>
                <div class="float-right">
                  <a id="forgot" href="" @click.prevent="onForgotPassword">{{ $t('generic.forgot_password_question') }}</a>
                </div>
                </div>
                <div class="text-center">
                  <input @click.prevent="onSubmit()" type="submit" :value="$t('lbl_login')" class="btn_1 full-width my-2">
                  {{ $t('generic.no_account_yet') }}
                  <a @click.prevent="isSignIn = false" href="" class="text-pink">
                    {{ $t('generic.sign_up') }}
                  </a>
                </div>
            </div>
            <div v-else class="sign-up-wrapper">
              <div>
                <div class="form-group">
                  <label>{{ $t('generic.email') }}</label>
                  <input type="email" required class="form-control" name="email" id="email" v-model="form.email" :placeholder="$t('auth.emailPlaceholder')">
                </div>
                <div class="form-group">
                  <label>{{ $t('generic.first_name') }}</label>
                  <input type="email" class="form-control" name="firstName" id="firstName" v-model="form.first_name" :placeholder="$t('auth.firstNamePlaceholder')">
                </div>
                <div class="form-group">
                  <label>{{ $t('generic.last_name') }}</label>
                  <input type="email" class="form-control" name="lastName" id="lastName" v-model="form.last_name" :placeholder="$t('auth.lastNamePlaceholder')">
                </div>
                <div class="form-group">
                  <label>{{ $t('generic.password') }}</label>
                  <input
                    :type="passwordType"
                    class="form-control"
                    name="password"
                    id="password"
                    :placeholder="$t('auth.passwordPlaceholder')"
                    v-model="form.password"
                  >
                    <span v-if="passwordType === 'password'" class="show-password-btn" @click.prevent="passwordType = 'text'">{{ $t('generic.password_show') }}</span>
                    <span v-if="passwordType === 'text'" class="show-password-btn" @click.prevent="passwordType = 'password'">{{ $t('generic.password_hide') }}</span>
                </div>
                <div v-if="userType !== 'elite'">
                  <label>{{ $t('generic.are') }}</label>
                  <div class="form-group radio_c_group ml-1 mb-0">
                    <label @click="form.gender = 'female'" class="container_radio">{{ $t('generic.female') }}
                      <input type="radio" value="checkbox" name="gender" :checked="`${form.gender  === 'female' ? 'checked' : ''}`">
                      <span class="checkmark"></span>
                    </label>
                    <label @click="form.gender = 'male'" class="container_radio">{{ $t('generic.male') }}

                      <input type="radio" value="checkbox" name="gender" :checked="`${form.gender !== 'female' ? 'checked' : ''}`">
                      <span class="checkmark"></span>
                    </label>
                  </div>
                </div>
                <div class="form-group radio_c_group ml-1">
                  <div class="checkboxes float-left">
                    <label class="container_check" @click.prevent="terms_and_conditions = !terms_and_conditions">{{ $t('generic.terms_and_conditions_agreement') }}
                      <input type="checkbox" :checked="terms_and_conditions ? 'checked': ''">
                      <span class="checkmark"></span>
                    </label>
                  </div>
                </div>
                <div class="form-group radio_c_group ml-1">
                  <div class="checkboxes float-left">
                    <label class="container_check" @click.prevent="form.subscribe_to_marketing_emails_list = !form.subscribe_to_marketing_emails_list">{{ $t('generic.subscribe_to_marketing') }}
                      <input type="checkbox" :checked="form.subscribe_to_marketing_emails_list ? 'checked': ''">
                      <span class="checkmark"></span>
                    </label>
                  </div>
                  <div v-if="form.subscribe_to_marketing_emails_list && userType === 'elite'" class="ml-4 mt-2 custom-marketing">
                    <label @click.prevent="form.massage_marketing = !form.massage_marketing" class="container_check">{{ $t('generic.massage') }}
                      <input type="checkbox" value="checkbox" name="user-type" :checked="`${form.massage_marketing ? 'checked' : ''}`">
                      <span class="checkmark"></span>
                    </label>
                    <label @click.prevent="form.beauty_marketing = !form.beauty_marketing" class="container_check">{{ $t('generic.beauty') }}
                      <input type="checkbox" value="checkbox" name="user-type" :checked="`${form.beauty_marketing ? 'checked' : ''}`">
                      <span class="checkmark"></span>
                    </label>
                    <label @click.prevent="form.fitness_marketing = !form.fitness_marketing" class="container_check">{{ $t('generic.fitness') }}
                      <input type="checkbox" value="checkbox" name="user-type" :checked="`${form.fitness_marketing ? 'checked' : ''}`">
                      <span class="checkmark"></span>
                    </label>
                  </div>
                </div>
                <div class="clearfix add_bottom_15">
                  <div class="text-center">
                    <button @click.prevent="onSubmit()" type="submit" class="position-relative btn_1 full-width my-2">
                      <span
                        v-if="isFetchingUser"
                        class="position-absolute loading"
                        :style="loadingStyle"
                      >
                        <i class="icon_loading" />
                      </span>
                      {{ $t('generic.sign_up') }}
                    </button>
                    {{ $t('generic.already_have_an_account') }}
                    <a
                      href=""
                      @click.prevent="isSignIn = true"
                    >
                      {{ $t('generic.login') }}
                    </a>
                  </div>
                </div>
              </div>
              <div id="forgot_pw">
                <div class="form-group">
                  <label>{{ $t('generic.please_confirm_your_email') }}</label>
                  <input type="email" class="form-control" name="email_forgot" id="email_forgot" :placeholder="$t('auth.emailPlaceholder')">
                  <i class="icon_mail_alt" />
                </div>
                <p>{{ $t('reset_password_email_sent') }}</p>
                <div class="text-center"><input type="submit" value="Reset Password" class="btn_1" :placeholder="$t('auth.passwordPlaceholder')"></div>
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
  import { startCase } from 'lodash-es';

  export default Vue.extend({
    name: 'es-login-modal',

    model: {
      prop: 'is-open',
      event: 'is-open',
    }, // model

    props: {
      isOpen: {
        required: true,
        type: Boolean as PropType<boolean>,
      },
      modalType: {
        default: 'login',
        type: String as PropType<string>,
      },
      type: {
        default: 'client',
        type: String as PropType<string>,
      },
    },

    data: () => ({
      userType: '',
      showPassword: false,
      passwordType: 'password',
      form: {
        email: '',
        first_name: '',
        last_name: '',
        password: '',
        phone_number: null,
        massage_marketing: true,
        beauty_marketing: true,
        fitness_marketing: true,
        gender: 'female',
        subscribe_to_marketing_emails_list: false,
      },
      terms_and_conditions: false,
      isSignIn: true,
    }),

    computed: {
      ...mapGetters({
        getUser: 'session/getUser',
        isFetchingUser: 'session/isFetchingUser',
      }),
      loadingStyle() {
        const lang = localStorage.getItem('lang');

        return ({
          left: lang === 'en' ? '32%' : '24%',
         });
      },
    },

    watch: {
      getUser(newVal) {
        this.$emit('is-open', false);
        if (!newVal.phone_number_confirmed) {
          this.$emit('show-validate-phone-modal', true);
        }
      },
      userType(newVal, oldVal) {
        if (newVal !== oldVal) {
          this.$emit('on-type-change', newVal);
        }
      },
    },

    created() {
      this.userType = this.$router.currentRoute.path.includes('easepro') ? 'elite' : 'client';
      this.isSignIn = this.modalType !== 'register';
      this.userType = this.type;
    },

    methods: {
      ...mapActions({
        login: 'session/login',
        signUp: 'session/signUp',
      }),

      async onSubmit() {
        if (!this.terms_and_conditions && !this.isSignIn) {
          (this as any).$toasts.toast({
            id: 'warning-toast',
            intent: 'warning',
            message: this.$t('toast.accept_terms_and_conditions'),
            title: this.$t('toast.warning_title'),
          });

          return;
        }

        const { name } = this.$router.currentRoute;
        const { form, userType } = this;

        if (this.isSignIn) {
          await this.login({
            credentials: form,
            type: userType,
          });
        } else {
          const formData = {
            ...form,
            first_name: startCase(form.first_name.toLowerCase()),
            last_name: startCase(form.last_name.toLowerCase()),
          }

          await this.signUp({
            credentials: formData,
            type: userType,
          });
          if (name === 'Home' && userType !== 'elite') {
            this.$router.push('/servicii');
          }
        }
      },

      onForgotPassword() {
        this.$emit('is-open', false);
        this.$emit('show-forgot-password-modal', true);
      },
    },
  });
</script>

<style>
  .loading {
    animation-name: spin;
    animation-duration: 2000ms;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
    height: 22px;
    width: 22px;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(360deg);
    }
  }
</style>
