import { Routes } from '@angular/router';

import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { Component } from '@angular/core';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { AddPromoCodeComponent } from './promoCodes/add-promo-code/add-promo-code.component';
import { ListPromoCodeComponent } from './promoCodes/list-promo-code/list-promo-code.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'cart', component: CartComponent },
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/register', component: RegisterComponent},
  { path: 'products/:id', component: ProductDetailComponent },
  { path: 'promoCodes',component:ListPromoCodeComponent},
  { path: 'addPromoCode',component:AddPromoCodeComponent}
  // { path: 'orders', component: OrdersComponent}
  
];
