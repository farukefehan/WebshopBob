import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';
import { CouponService } from '../../services/coupon.service';
import { Promocode } from '../../models/promoCode';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-promo-code',
  standalone: true,
  imports: [FormsModule,CommonModule ],
  templateUrl: './add-promo-code.component.html',
  styleUrl: './add-promo-code.component.scss'
})
export class AddPromoCodeComponent {
   constructor(private productService:ProductsService,private couponService:CouponService,private r:Router) {}
   productId:number;
   promocode:Promocode;
   applyTo: string = 'ALL_PRODUCTS';     // Default value
   addPromo(form: NgForm) {
    this.promocode=new Promocode();
    this.promocode.code=form.controls['code'].value;
    this.promocode.discountType=form.controls['discountType'].value;
    this.promocode.discountValue=form.controls['discountValue'].value;
    this.promocode.maxUsage=form.controls['maxUsage'].value;
    this.promocode.validFrom=form.controls['validFrom'].value;
    this.promocode.validUntil=form.controls['validUntil'].value;
      this.productId=form.controls['product'].value;    
      this.couponService.createCoupon(this.promocode,this.productId).subscribe( response => {
        // Handle success
        console.log('Promo code added successfully:', response);
        Swal.fire('Success', 'Promo code added successfully', 'success').then(() => {
          this.r.navigate(['/promoCodes']);
        });
      },
      error => {
        // Handle error
        console.error('Error adding promo code:', error);
        Swal.fire('Error', 'Failed to adding promo code.', 'error');
      }
    );
    
   
  }

   ngOnInit(){
    this.getProducts();
   }

  products:Product[];
  getProducts(){
    this.productService.getProducts().subscribe((data)=>{this.products=data,console.log(data)});
  }
}
