import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from './token.service';
import { Order } from '../models/order.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private baseUrl: string = environment.base_url + "/orders";
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

  public addOrder(order: Order): Observable<Order> {
    const headers = this.getHeaders();
    return this.http.post<Order>(this.baseUrl, order, {headers: headers});
  }
}
