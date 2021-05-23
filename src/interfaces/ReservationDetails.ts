interface ServiceDetails {
  id: string;
}

interface Service {
  service: ServiceDetails;
  id: string;
}

interface ReservationService {
  beauty_service_reservations: Service[];
}

export interface ReservationDetails {
  id: string;
  reservation_service: ReservationService;
}
