import { Product } from "./product.model";

export class Order{
    public id: number;
    public email: String | null;
    public totalPrice: number;
    public items: Product[]
}