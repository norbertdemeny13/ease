/* eslint-disable */
import { i18n } from '@/i18n';

export const FOOTER_LINKS = [
  {
    category: i18n.t('services_practitions_string'),
    list: [
      {
        label: i18n.t('generic.reserve'),
        to: '/servicii',
      },
      {
        label: i18n.t('generic.subscriptions'),
        to: '/abonamente',
       },
      {
        label: i18n.t('generic.gift_cards'),
        to: '/carduri-cadou',
      },
    ],
  },
  {
    category: i18n.t('generic.support'),
    list: [
      {
        label: i18n.t('generic.contact'),
        to: '/contact',
      },
      {
        label: i18n.t('views.faq_client.frequently_asked_questions'),
        to: '/intrebari-frecvente',
      },
    ],
  },
  {
    category: i18n.t('generic.pros'),
    list: [
      {
        label: i18n.t('generic.work_with_ease'),
        to: '/easepro',
      },
      {
        label: i18n.t('generic.applyNow'),
        to: '',
        id: 'apply-now',
      },
    ],
  },
  {
    category: i18n.t('generic.cities'),
    list: [
      {
        label: 'Bucuresti',
      },
      {
        label: 'Cluj',
      },
    ],
  },
];

export const PRO_FOOTER_LINKS = [
  {
    category: 'Ease',
    list: [
      {
        label: i18n.t('services_practitions_string'),
        to: '/servicii',
      },
    ],
  },
  {
    category: i18n.t('generic.support'),
    list: [
      {
        label: i18n.t('generic.contact'),
        to: '/contact',
      },
      {
        label: i18n.t('views.faq_client.frequently_asked_questions'),
        to: '/easepro/intrebari-frecvente',
      },
    ],
  },
  {
    category: i18n.t('generic.cities'),
    list: [
      {
        label: 'Bucuresti',
      },
      {
        label: 'Cluj',
      },
    ],
  },
];

export const FOOTER_ICONS = [
  { name: 'apple-music-ease' },
  { name: 'facebook-ease' },
  { name: 'pinterest-ease' },
  { name: 'insta-ease' },
  { name: 'youtube-ease' },
];
