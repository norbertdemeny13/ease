/* eslint-disable */
export const NAVBAR_LINKS = [
  { label: 'generic.services', to: '/servicii' },
  { label: 'generic.subscriptions', to: '/abonamente' },
  { label: 'generic.gift_cards', to: '/carduri-cadou' },
  { label: 'generic.manage_account', to: '/client/cont', requiresAuth: true },
  { label: 'generic.my_reservations', to: '/client/rezervarile-mele', requiresAuth: true },
  { label: 'generic.add_credit', to: '/client/credit-ease', requiresAuth: true },
  { label: 'generic.payment_method', to: '/client/metode-de-plata', requiresAuth: true },
];

export const PRO_NAVBAR_LINKS = [
  { label: 'Help Center', to: '/easepro/intrebari-frecvente' },
  { label: 'generic.manage_account', to: '/easepro/cont', requiresAuth: true },
];
