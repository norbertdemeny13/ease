import { i18n } from '@/i18n';

export const MASSAGE_FILTERS_SINGLE = [
  {
    label: i18n.t('massage.massageDuration'),
    key: 'duration',
    choices: [
      {
        label: '60 min',
        value: '60',
      },
      {
        label: '90 min',
        value: '90',
      },
      {
        label: '120 min',
        value: '120',
      },
    ],
  },
  {
    label: i18n.t('massage.gender'),
    key: 'genre',
    choices: [
      {
        label: i18n.t('massage.genderF'),
        value: 'feminin',
      },
      {
        label: i18n.t('massage.genderAny'),
        value: 'oricare',
      },
      {
        label: i18n.t('massage.genderM'),
        value: 'masculin',
      },
    ],
  },
  {
    label: i18n.t('massage.form'),
    key: 'form',
    choices: [
      {
        label: i18n.t('form.classic'),
        value: 'classic',
      },
      {
        label: i18n.t('form.aromatherapeutic'),
        value: 'aromaterapeutic',
      },
    ],
  },
];

export const MASSAGE_FILTERS_COUPLE = [
  {
    label: i18n.t('generic.therapist_number'),
    key: 'terapeut',
    choices: [
      {
        label: i18n.t('generic.one_therapist'),
        value: 'single',
      },
      {
        label: i18n.t('generic.two_therapists'),
        value: 'double',
      },
    ],
  },
  {
    label: i18n.t('massage.gender'),
    key: 'genre',
    choices: [
      {
        label: i18n.t('massage.genderF'),
        value: 'feminin',
      },
      {
        label: i18n.t('massage.genderAny'),
        value: 'oricare',
      },
      {
        label: i18n.t('massage.genderM'),
        value: 'masculin',
      },
    ],
  },
  {
    label: i18n.t('massage.massageDuration'),
    key: 'duration',
    choices: [
      {
        label: '60 min',
        value: '60',
      },
      {
        label: '90 min',
        value: '90',
      },
      {
        label: '120 min',
        value: '120',
      },
    ],
  },
];
