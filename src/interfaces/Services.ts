export interface ComplementaryService {
  name?: string;
  price?: string;
  id?: string;
  selectedCount?: number;
  complementary_service?: any;
  uuid: string;
  is_four_hands?: boolean;
}

export interface Service {
  complementary_services: ComplementaryService[];
  name: string;
  id: string;
  category?: string;
  uuid: string;
  massageType?: string;
}

export interface Price {
  weekend: boolean;
  price: string;
}

export interface Time {
  date: Date;
  hour: number;
}
