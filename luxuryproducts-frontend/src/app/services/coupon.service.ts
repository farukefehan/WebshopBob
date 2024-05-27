import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class CouponService {

  private baseUrl = 'http://localhost:8080/api/promocode';

  constructor(private http: HttpClient, private tokenService: TokenService ) {}

  private getHeaders(): HttpHeaders {
    const token = this.tokenService.loadToken();

    if (token) {
      return new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
    } else {
      return new HttpHeaders();
    }
  }

  getAllCoupons(): Observable<any[]> {
    const headers = this.getHeaders();
    return this.http.get<any[]>(`${this.baseUrl}`+'/getAll', {headers: headers});
  }

  createCoupon(promoCode: any,idProduct:number): Observable<string> {
    const headers = this.getHeaders();
    return this.http.post<any>(`${this.baseUrl}`+'/add?idProduct='+`${idProduct}`, promoCode, {headers: headers});
  }
  applyPromoCode(code: string, products: any[]): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post<any>(`${this.baseUrl}`+'/apply?code='+`${code}`, products,{headers: headers});
  }
  createPromoCodeForAllProducts(promoCode: any){
    const headers = this.getHeaders();
    return this.http.post<any>(`${this.baseUrl}`+'/addForAll',promoCode,{headers: headers});

  }
}
