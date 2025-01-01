export interface User {
  username: string;
  fullname: string;
}

export interface Survey {
  id: string;
  name: string;
  description: string;
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
  qty: number;
  image: string;

}


export interface Answer {
  id: number;
  answer: string;
}

export interface QuestionRaw {
  question: string;
  answers: string[];
}

export interface Question {
  question: string;
  answers: Answer[];
}
