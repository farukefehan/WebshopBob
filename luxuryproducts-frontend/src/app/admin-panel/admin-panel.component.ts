import { Component, OnInit } from '@angular/core';
import { CouponService } from '../services/coupon.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  creatingCoupon: boolean = false;
  coupons: any[] = [];
  coupon: any = {
    code: '',
    discountAmount: null,
    discountPercentage: null
  };

  constructor(private couponService: CouponService) { }

  ngOnInit(): void {
    this.loadCoupons();
  }

  showCreateCouponForm(): void {
    this.creatingCoupon = true;
  }

  createCoupon(): void {
    this.couponService.createCoupon(this.coupon).subscribe(
      (response) => {
        this.creatingCoupon = false;
        this.coupons.push(response);
        this.coupon = { code: '', discountAmount: null, discountPercentage: null };
      },
      (error) => {
        console.error('Error creating coupon:', error);
      }
    );
  }

  loadCoupons(): void {
    this.couponService.getAllCoupons().subscribe(
      (response) => {
        this.coupons = response;
      },
      (error) => {
        console.error('Error loading coupons:', error);
      }
    );
  }
}
