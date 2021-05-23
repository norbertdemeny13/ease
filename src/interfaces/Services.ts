export interface ComplementaryService {
  name?: string;
  price?: string;
  id?: string;
  selectedCount?: number;
  complementary_service?: any;
  uuid: string;
  is_four_hands?: boolean;
}

export interface MassageForm {
  duration: string;
  genre: string;
  form: string;
}

export interface TherapeuticForms {
  id: string;
}

export interface Service {
  complementary_services: ComplementaryService[];
  name: string;
  id: string;
  category?: string;
  uuid: string;
  massageForm: MassageForm;
  massageType?: string;
  serviceCategory: string;
  serviceType: string;
  tempServiceId: string;
  therapeutic_forms: TherapeuticForms[];
  type: string;
}

export interface Price {
  weekend: boolean;
  price: string;
}

export interface Time {
  date: Date;
  hour: number;
  time: string;
}
