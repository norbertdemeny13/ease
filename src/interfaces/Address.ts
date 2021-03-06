interface City {
  name: string;
}

export interface Address {
  street_name: string;
  street_number: string;
  city: City;
  id: string;
}
