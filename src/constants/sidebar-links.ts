import { i18n } from '@/i18n';

export const SIDEBAR_LINKS = [
  { label: i18n.t('generic.account').toString(), to: 'cont', role: 'client' },
  { label: i18n.t('generic.password').toString(), to: 'parola', role: 'client' },
  { label: i18n.t('generic.phone').toString(), to: 'telefon', role: 'client' },
  { label: i18n.t('generic.recommend').toString(), to: 'recomandare', role: 'client' },
  { label: i18n.t('generic.address').toString(), to: 'adrese', role: 'client' },
  { label: i18n.t('generic.payment_method').toString(), to: 'metode-de-plata', role: 'client' },
  { label: i18n.t('generic.my_reservations').toString(), to: 'rezervarile-mele', role: 'client' },
  { label: i18n.t('generic.my_orders').toString(), to: 'comenzile-mele', role: 'client' },
  { label: i18n.t('generic.saved_elites').toString(), to: 'profesionisti-salvati', role: 'client' },
  { label: i18n.t('generic.subscriptions').toString(), to: 'abonamente', role: 'client' },
  { label: i18n.t('generic.ease_credit').toString(), to: 'credit-ease', role: 'client' },
  { label: i18n.t('views.client_dashboard.preferences.title').toString(), to: 'preferinte', role: 'client' },
];

export const PRO_SIDEBAR_LINKS = [
  { label: i18n.t('generic.account').toString(), to: 'cont', role: 'pro' },
  { label: i18n.t('generic.password').toString(), to: 'parola', role: 'pro' },
  { label: i18n.t('generic.phone').toString(), to: 'telefon', role: 'pro' },
  { label: i18n.t('generic.address').toString(), to: 'adrese', role: 'pro' },
  { label: i18n.t('generic.califications').toString(), to: 'calificari', role: 'pro' },
  { label: i18n.t('generic.documents').toString(), to: 'documente', role: 'pro' },
  { label: i18n.t('generic.promote').toString(), to: 'promoveaza', role: 'pro' },
];
