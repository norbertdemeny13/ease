import { i18n } from '@/i18n';

export const FILTERS = [
  {
    value: 'servicii',
    label: i18n.t('services_practitions_string'),
    list: [
      {
        value: 'rezervari-anterioare',
        label: i18n.t('generic.previous_reservations'),
      },
      {
        value: 'profesionisti-salvati',
        label: i18n.t('generic.saved_elites'),
      },
    ],
  },
  { value: 'masaj', label: i18n.t('massage') },
  { value: 'beauty', label: i18n.t('generic.beauty') },
  { value: 'fitness', label: i18n.t('generic.fitness') },
];
