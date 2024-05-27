// import { Category } from "./category.model";

import { Promocode } from "./promoCode";

export class Product {
  public id: number;
  public name: string;
  public brand: string;
  public description: string;
  public price: number;
  public img: string;
  public promocodes:Promocode[]=[];
  // public category: Category;
}
