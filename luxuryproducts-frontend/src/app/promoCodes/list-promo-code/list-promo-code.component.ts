import { Component } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { CouponService } from '../../services/coupon.service';
import { Router } from '@angular/router';
import { Promocode } from '../../models/promoCode';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-promo-code',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-promo-code.component.html',
  styleUrl: './list-promo-code.component.scss'
})
export class ListPromoCodeComponent {
  constructor(private productService:ProductsService,private couponService:CouponService,private r:Router) {}
  ngOnInit(){
   this.getAllPromoCodes();
  }
  promocodes:Promocode[];
  getAllPromoCodes(){
    this.couponService.getAllCoupons().subscribe((data)=>{this.promocodes=data,console.log(data)});
  }
  navigatetoAddPromo(){
    this.r.navigate(['/addPromoCode'])
  }
}
