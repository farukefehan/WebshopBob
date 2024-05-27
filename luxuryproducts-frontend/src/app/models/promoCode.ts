import { DiscountType } from "./enume/DiscountType";
import { Product } from "./product.model";

export class Promocode {
    public id: number;
    public code: string;
    public discountType: DiscountType;
    public discountValue: number;
    public validFrom: Date;
    public validUntil: Date;
    public maxUsage: number;
    public currentUsage: number;
    public product: Product;
  }