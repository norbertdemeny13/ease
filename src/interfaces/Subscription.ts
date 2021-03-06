export interface Subscription {
  [key: string]: string | any;
  price: {
    price: string;
  };
  name: string;
  uses: number;
}
