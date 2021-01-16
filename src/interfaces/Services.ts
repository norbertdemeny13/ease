export interface ComplementaryService {
  name: string;
  price: string;
  id: string;
  selectedCount: number;
  complementary_service: any;
}

export interface Service {
  complementary_services: ComplementaryService[];
  name: string;
  id: string;
  category?: string;
}

export interface Price {
  weekend: boolean;
  price: string;
}

export interface Time {
  date: Date;
  hour: number;
}
