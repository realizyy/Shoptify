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

export interface Order {
  id: string;
  user_id: string;
  total: number;
  status: string;
  payment_method: string;
  payment_status: string;
  order_date: Date;
}

export interface OrderItem {
    id: string;
    order_id: string;
    product_id: string;
    quantity: number;
    product_name: string;
    product_price: number;
    product_imageurl: string;
}