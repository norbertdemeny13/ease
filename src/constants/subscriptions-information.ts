export const SUBSCRIPTION_FILTERS = [
  {
    type: 'massage',
    title: 'Masaj',
    description: 'Alege durata pentru sedinta ta de masaj lunara',
    choices: [
      {
        label: '60',
        key: 'duration',
        value: 60,
      },
      {
        label: '90',
        key: 'duration',
        value: 90,
      },
      {
        label: '120',
        key: 'duration',
        value: 120,
      },
    ],
  },
];
export const SUBSCRIPTIONS_INFORMATION = [
  {
    value: 'monthly',
    filterKey: 'lunar',
    label: 'Lunar',
    subscriptionList: [
      {
        type: 'masaj',
        label: 'Masaj',
        price: '200',
        discount: '20',
        priceBeforeDiscount: '240 Ron',
        benefits: [
          'Plata lunara pentru o sedinta de masaj',
          'Poti anula abonamentul gratuit, oricand',
          'Ceva text aici',
        ],
      },
      {
        type: 'beauty',
        label: 'Beauty',
        price: '200',
        discount: '20',
        priceBeforeDiscount: '240 Ron',
        benefits: [
          'Plata lunara pentru o sedinta de masaj',
          'Poti anula abonamentul gratuit, oricand',
          'Ceva text aici',
        ],
      },
      {
        type: 'fitness',
        label: 'Fitness',
        price: '200',
        discount: '20',
        priceBeforeDiscount: '240 Ron',
        benefits: [
          'Plata lunara pentru o sedinta de masaj',
          'Poti anula abonamentul gratuit, oricand',
          'Ceva text aici',
        ],
      },
    ],
  },
  {
    value: 'yearly',
    label: 'Anual',
    filterKey: 'anual',
    subscriptionList: [
      {
        type: 'masaj',
        label: 'Masaj',
        price: '2000',
        discount: '20',
        priceBeforeDiscount: '2400 Ron',
        benefits: [
          'Plata anuala pentru o sedinta de masaj',
          'Poti anula abonamentul gratuit, oricand',
          'Ceva text aici',
        ],
      },
      {
        type: 'beauty',
        label: 'Beauty',
        price: '2000',
        discount: '20',
        priceBeforeDiscount: '2400 Ron',
        benefits: [
          'Plata anuala pentru o sedinta de masaj',
          'Poti anula abonamentul gratuit, oricand',
          'Ceva text aici',
        ],
      },
    ],
  },
];

export const BENEFITS = [
  'Plata anuala pentru o sedinta de masaj',
  'Poti anula abonamentul gratuit, oricand',
  'Poti anula abonamentul gratuit, oricand',
  'Poti anula abonamentul gratuit, oricand',
  'Poti anula abonamentul gratuit, oricand',
  'Poti anula abonamentul gratuit, oricand',
  'Poti anula abonamentul gratuit, oricand',
  'Ceva text aici',
];
