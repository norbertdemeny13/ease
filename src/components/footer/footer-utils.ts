export const acceptedLinksWithIdForClientWave = (routeParamId: String) => {
  console.log(`/user/reset-password?token=${routeParamId}`);
  return [
    `/servicii/single/${routeParamId}/rezerva`,
    `/servicii/single/${routeParamId}/rezerva/plata`,
    `/servicii/couple/${routeParamId}/rezerva`,
    `/servicii/couple/${routeParamId}/rezerva/plata`,
    `/servicii/nails/${routeParamId}`,
    `/servicii/nails/${routeParamId}/rezerva`,
    `/servicii/nails/${routeParamId}/rezerva/plata`,
    `/servicii/eyelashes/${routeParamId}`,
    `/servicii/eyelashes/${routeParamId}/rezerva`,
    `/servicii/eyelashes/${routeParamId}/rezerva/plata`,
    `/servicii/eyebrows/${routeParamId}`,
    `/servicii/eyebrows/${routeParamId}/rezerva`,
    `/servicii/eyebrows/${routeParamId}/rezerva/plata`,
    `/carduri-cadou/${routeParamId}`,
    `/carduri-cadou/${routeParamId}/plata`,
    `/servicii/men_hair_removal/${routeParamId}`,
    `/servicii/men_hair_removal/${routeParamId}/rezerva`,
    `/servicii/men_hair_removal/${routeParamId}/rezerva/plata`,
    `/servicii/men_nails/${routeParamId}`,
    `/servicii/men_nails/${routeParamId}/rezerva`,
    `/servicii/men_nails/${routeParamId}/rezerva/plata`,
    `/servicii/men_hair/${routeParamId}`,
    `/servicii/men_hair/${routeParamId}/rezerva`,
    `/servicii/men_hair/${routeParamId}/rezerva/plata`,
    `/servicii/fitness/${routeParamId}`,
    `/pro/${routeParamId}`,
    `/user/reset-password?token=${routeParamId}`,
    ]
  }

  export const acceptedLinksForClientWave = [
    'pro/',
    '/servicii/masaj?type=single',
    '/servicii/masaj?type=couple',
    '/new/servicii/masaj?type=couple',
    '/abonamente/massage?tip=monthly', 
    '/abonamente/rezerva',
    '/client/cont',
    '/contact'
  ];