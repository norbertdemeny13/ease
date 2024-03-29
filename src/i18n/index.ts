// (c) 2020 Cofense Inc.
import Vue from 'vue';
import VueI18n, { LocaleMessages } from 'vue-i18n';

Vue.use(VueI18n);

function loadLocaleMessages(): LocaleMessages {
  const locales = require.context('./locales', true, /[A-Za-z0-9-_,\s]+\.json$/i);
  const messages: LocaleMessages = {};
  locales.keys().forEach((key) => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i);
    if (matched && matched.length > 1) {
      const locale = matched[1];
      messages[locale] = locales(key);
    }
  });
  return messages;
}
const i18n = new VueI18n({
  locale: process.env.VUE_APP_I18N_LOCALE || 'ro',
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'ro',
  messages: loadLocaleMessages(),
  silentTranslationWarn: true,
});

export { i18n };
