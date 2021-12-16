interface City {
  name: string;
  id: string;
}

export interface Address {
  apartment_number: string;
  address_type: string;
  city: City;
  equipment: { id: number }[];
  floor: string;
  id: string;
  lng: string;
  lat: string;
  main: boolean;
  notes: string;
  parking: string;
  pets: string;
  street_name: string;
  street_number: string;
  postcode: string;
}
