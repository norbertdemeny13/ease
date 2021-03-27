export interface GiftCardTemplate {
  id: string;
  name: string;
  absolute_image_url: string;
}

export interface GiftCard {
  id: string;
  name: string;
  gift_card_tempaltes: GiftCardTemplate[];
}
