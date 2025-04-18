export interface ListingItem {
  title: string; //Name of the item
  price: number; //Price of the item
  imageURL: string; //Filename of item image
  description: string; //String description of item
  id: number | null; //Unique ID for item
  in_stock: number; //Number of item in stock
}

export interface OrderRecord {
  order_id: number | null;
  purchaser_email: string;
  product_id: number;
}
