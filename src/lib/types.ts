export interface User {
  id: string;
  username: string;
  fullname: string;
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
  name: string;
  price: number;
  quantity: number;
  product_name: string;
  product_price: number;
  product_imageurl: string;
}
