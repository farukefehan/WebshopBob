import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe, NgFor } from '@angular/common';

import { CartService } from '../services/cart.service';
import { Product } from '../models/product.model';
import { TokenService } from '../services/token.service';
import { OrderService } from '../services/order.service';
import { Order } from '../models/order.model';
import { CouponService } from '../services/coupon.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe, CommonModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  public products_in_cart: Product[];
  public order: Order = new Order();

  constructor(private couponService:CouponService,private cartService: CartService, private tokenService: TokenService, private orderService: OrderService) { }

  ngOnInit() {
    this.products_in_cart = this.cartService.allProductsInCart();
    this.cartService.$productInCart.subscribe((products: Product[]) => {
      this.products_in_cart = products;
    })
  }

  public removeProductFromCart(product_index: number) {
    this.cartService.removeProductFromCart(product_index);
  }

  public getTotalPrice(): number {
    return this.products_in_cart.reduce((total, product) => total + product.price, 0);
  }

  getProductsWithCounts() {
    const productMap = new Map();
    this.products_in_cart.forEach(product => {
      const name = product.name;
      if (productMap.has(name)) {
        productMap.get(name).count++;
      } else {
        productMap.set(name, { product: product, count: 1 });
      }
    });
    return Array.from(productMap.values());
  }
  
  public clearCart() {
    this.cartService.clearCart();
  }

  public placeOrder() {
    this.order.email = this.tokenService.loadEmail();
    if (this.discountedPrice !== null && this.discountedPrice !== this.getTotalPrice()){
        this.order.totalPrice = this.discountedPrice;
      this.orderService.addOrderwithCoupon(this.order,this.promoCode).subscribe(() => {});
    }
    else{
      this.order.totalPrice = this.getTotalPrice();
      this.orderService.addOrderwithOutCoupon(this.order).subscribe(() => {});

    }
    this.order.items = this.products_in_cart;
    console.log(this.products_in_cart);

    this.clearCart();
  }
  promoCode: string = '';
  discountedPrice: number ;

  applyPromoCode() {
    console.log(this.products_in_cart)
    if (this.promoCode) {
      this.couponService.applyPromoCode(this.promoCode,this.products_in_cart).subscribe(
        (response: any) => {
          // Assuming response contains the discount amount or discounted total price
          const discount = response.discount; // Adjust this based on your actual response
          this.discountedPrice = this.getTotalPrice() - discount;
        },
        (error) => {
          console.error('Invalid promo code', error);
          alert('Invalid promo code');
        }
      );
    }
  }
}
