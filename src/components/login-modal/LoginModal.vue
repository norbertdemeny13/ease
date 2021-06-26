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
            <h3>{{ isSignIn ? 'Logheaza-te' : 'Inregistreaza-te' }}</h3>
            <button type="button" class="mfp-close" @click.prevent="$emit('is-open', false)"></button>
          </div>
          <div class="form-group radio_c_group">
            <label @click="userType = 'client'" class="container_radio">Client
              <input type="radio" value="checkbox" name="user-type" :checked="`${userType === 'client' ? 'checked' : ''}`">
              <span class="checkmark"></span>
            </label>
            <label @click="userType = 'elite'" class="container_radio">Profesional
              <input type="radio" value="checkbox" name="user-type" :checked="`${userType !== 'client' ? 'checked' : ''}`">
              <span class="checkmark"></span>
            </label>
          </div>
          <form>
            <div v-if="isSignIn" class="sign-in-wrapper">
              <div class="form-group">
                <label>Email</label>
                <input type="email" class="form-control" name="email" id="email" v-model="form.email">
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
              <div>
                <div class="form-group">
                  <label>Email</label>
                  <input type="email" required class="form-control" name="email" id="email" v-model="form.email">
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
                </div>
                <div v-if="userType === 'elite'">
                  <div class="form-group radio_c_group">
                    <div class="checkboxes float-left">
                      <label class="container_check" @click.prevent="terms_and_conditions = !terms_and_conditions">Accept Termenii si Conditiile si Politica de Confidentialitate
                        <input type="checkbox" :checked="terms_and_conditions ? 'checked': ''">
                        <span class="checkmark"></span>
                      </label>
                    </div>
                    <div class="checkboxes float-left">
                      <label class="container_check" @click.prevent="subscribe_to_marketing_emails_list = !subscribe_to_marketing_emails_list">Doresc sa primesc informatii utile prin email
                        <input type="checkbox" :checked="subscribe_to_marketing_emails_list ? 'checked': ''">
                        <span class="checkmark"></span>
                      </label>
                    </div>
                    <div v-if="subscribe_to_marketing_emails_list" class="ml-4 mt-2">
                      <label @click.prevent="form.massage_marketing = !form.massage_marketing" class="container_check">Masaj
                        <input type="checkbox" value="checkbox" name="user-type" :checked="`${form.massage_marketing ? 'checked' : ''}`">
                        <span class="checkmark"></span>
                      </label>
                      <label @click.prevent="form.beauty_marketing = !form.beauty_marketing" class="container_check">Beauty
                        <input type="checkbox" value="checkbox" name="user-type" :checked="`${form.beauty_marketing ? 'checked' : ''}`">
                        <span class="checkmark"></span>
                      </label>
                      <label @click.prevent="form.fitness_marketing = !form.beauty_marketing" class="container_check">Fitness
                        <input type="checkbox" value="checkbox" name="user-type" :checked="`${form.fitness_marketing ? 'checked' : ''}`">
                        <span class="checkmark"></span>
                      </label>
                    </div>
                  </div>
                </div>
                <div class="clearfix add_bottom_15">
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
    },

    data: () => ({
      userType: 'client',
      showPassword: false,
      type: 'password',
      form: {
        email: '123norbert.demeny13@mailinator.com',
        first_name: 'test',
        last_name: 'test',
        password: 'testtest',
        phone_number: null,
        massage_marketing: true,
        beauty_marketing: true,
        fitness_marketing: true,
      },
      subscribe_to_marketing_emails_list: false,
      terms_and_conditions: false,
      isSignIn: true,
    }),

    computed: {
      ...mapGetters({
        getUser: 'session/getUser',
        isFetchingUser: 'session/isFetchingUser',
      }),
    },

    watch: {
      getUser(newVal) {
        this.$emit('is-open', false);
        if (!newVal.phone_number_confirmed) {
          this.$emit('show-validate-phone-modal', true);
        }
      },
    },

    created() {
      this.userType = this.$router.currentRoute.path.includes('pro') ? 'elite' : 'client';
      this.isSignIn = this.modalType !== 'register';
    },

    methods: {
      ...mapActions({
        login: 'session/login',
        signUp: 'session/signUp',
      }),

      async onSubmit() {
        if (this.userType === 'elite' && !this.terms_and_conditions && !this.isSignIn) {
          (this as any).$toasts.toast({
            id: 'warning-toast',
            intent: 'warning',
            message: 'Te rugam sa accepti termenii si conditiile pentru a continua',
            title: 'Atentie',
          });

          return;
        }

        const { name } = this.$router.currentRoute;
        const { form, userType, subscribe_to_marketing_emails_list } = this;

        if (this.isSignIn) {
          await this.login({
            credentials: form,
            type: userType,
          });
          if (name === 'Home') {
            this.$router.push('/servicii');
          }
        } else {
          await this.signUp({
            credentials: form,
            subscribe_to_marketing_emails_list,
            type: userType,
          });
          if (name === 'Home') {
            this.$router.push('/servicii');
          }
        }
      },

      onForgotPassword() {
        this.$emit('show-forgot-password-modal', true);
        this.$emit('is-open', false);
      },
    },
  });
</script>
