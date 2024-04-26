import { Component, OnInit } from '@angular/core';
import { CurrencyPipe, NgFor } from '@angular/common';

import { CartService } from '../services/cart.service';
import { Product } from '../models/product.model';
import { TokenService } from '../services/token.service';
import { OrderService } from '../services/order.service';
import { Order } from '../models/order.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe, NgFor],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  public products_in_cart: Product[];
  public order: Order = new Order();

  constructor(private cartService: CartService, private tokenService: TokenService, private orderService: OrderService) { }

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
    this.order.totalPrice = this.getTotalPrice();
    this.order.items = this.products_in_cart;
    console.log(this.products_in_cart);

    this.orderService.addOrder(this.order).subscribe(() => {});
    this.clearCart();
  }
}
