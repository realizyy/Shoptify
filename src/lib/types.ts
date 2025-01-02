export interface User {
  id: string;
  username: string;
  fullname: string;
  role: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  imageurl: string;
  price: number;
}

export interface ProductCart {
  id: string;
  user_id: string;
  product_id: string;
  quantity: number;
  product_name: string;
  product_price: number;
  product_imageurl: string;
}
