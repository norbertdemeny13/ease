/* eslint-disable */

export const NAVBAR_LINKS = [
  { label: 'Servicii', to: '/servicii' },
  { label: 'Abonamente', to: '/abonamente' },
  { label: 'Carduri Cadou', to: '/carduri-cadou' },
  { label: 'Gestioneaza contul', to: '/client/cont', requiresAuth: true },
  { label: 'Rezervari', to: '/client/rezervarile-mele', requiresAuth: true },
  { label: 'Adauga credit', to: '/client/credit-ease', requiresAuth: true },
  { label: 'Metode de plata', to: '/client/metode-de-plata', requiresAuth: true },
];

export const PRO_NAVBAR_LINKS = [
  { label: 'Help Center', to: '/pro/intrebari-frecvente' },
  { label: 'Gestioneaza contul', to: '/pro/cont', requiresAuth: true },
];
