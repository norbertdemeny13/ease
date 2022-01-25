/* eslint-disable */
import { i18n } from '@/i18n';

export const NAVBAR_LINKS = [
  { label: i18n.t('generic.services'), to: '/servicii' },
  { label: i18n.t('generic.subscriptions'), to: '/abonamente' },
  { label: i18n.t('generic.gift_cards'), to: '/carduri-cadou' },
  { label: i18n.t('generic.manage_account'), to: '/client/cont', requiresAuth: true },
  { label: i18n.t('generic.my_reservations'), to: '/client/rezervarile-mele', requiresAuth: true },
  { label: i18n.t('generic.add_credit'), to: '/client/credit-ease', requiresAuth: true },
  { label: i18n.t('generic.payment_method'), to: '/client/metode-de-plata', requiresAuth: true },
];

export const PRO_NAVBAR_LINKS = [
  { label: 'Help Center', to: '/easepro/intrebari-frecvente' },
  { label: i18n.t('generic.manage_account'), to: '/easepro/cont', requiresAuth: true },
];
