import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { dropdownDirective } from './shared/dropdown.directive';
// import { AppComponent } from './app.component';
// import { ProductsComponent } from './products/products.component';
// import { ProductDetailComponent } from './products/product-detail/product-detail.component';
// import { ProductThumbnailComponent } from './products/product-thumbnail/product-thumbnail.component';
import { NavigationComponent } from './navigation/navigation.component';
// import { HomeComponent } from './home/home.component';
// import { CartComponent } from './cart/cart.component';
// import { LoginComponent } from './auth/login/login.component';
// import { RegisterComponent } from './auth/register/register.component';



@NgModule({
  declarations: [
    dropdownDirective
//     ProductsComponent,
//     ProductThumbnailComponent,
//     RegisterComponent
  ],
  imports: [
    CommonModule,
    NavigationComponent
//     HomeComponent,
//     CartComponent,
//     LoginComponent,
//     ProductDetailComponent,
//     AppComponent
  ]
})
export class AppModule { }
