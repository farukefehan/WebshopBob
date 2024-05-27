import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { CartService } from '../services/cart.service';
import { Product } from '../models/product.model';
import { dropdownDirective } from '../shared/dropdown.directive';
import { TokenService } from '../services/token.service';
import { RoleType } from '../models/enume/RoleType';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterModule,CommonModule  ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent implements OnInit {
  public title: string = 'Best Ski Shop';

  public amountOfProducts: number = 0;

  constructor(private cartService: CartService,private tokenService:TokenService,private r:Router) { }
  role:string | null;
  token:string| null;
  ngOnInit() {
    this.cartService.$productInCart.subscribe((products: Product[]) => {
      this.amountOfProducts = products.length;
    })
    this.role=this.tokenService.loadRole();
    this.token=this.tokenService.loadToken();
    console.log(this.role);
  }
  logout(){
     this.tokenService.clear();
     window.location.href = '/';  }
}
