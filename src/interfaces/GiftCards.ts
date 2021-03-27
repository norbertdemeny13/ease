export interface GIFT_CARD_TEMPLATE {
  id: string;
  name: string;
  absolute_image_url: string;
}

export interface GIFT_CARD {
  id: string;
  name: string;
  gift_card_tempaltes: GIFT_CARD_TEMPLATE[];
}
