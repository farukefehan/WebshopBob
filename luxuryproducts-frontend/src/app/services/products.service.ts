import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Product } from '../models/product.model';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})

export class ProductsService {
  private baseUrl: string = environment.base_url + "/products";

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  private getHeaders(): HttpHeaders {
    // Retrieve token from TokenService
    const token = this.tokenService.loadToken();

    // Set up headers with authorization token if token exists
    if (token) {
      return new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
    } else {
      // Return headers without Authorization header if token is not available
      return new HttpHeaders();
    }
  }

  public getProducts(): Observable<Product[]> {
    const headers = this.getHeaders();
    return this.http.get<Product[]>(this.baseUrl, { headers: headers });
  }

  public addProduct(product: Product): Observable<Product> {
    const headers = this.getHeaders();
    return this.http.post<Product>(this.baseUrl, product, { headers: headers });
  }

  public getProductByIndex(id: number): Observable<Product> {
    const headers = this.getHeaders();
    return this.http.get<Product>(`${this.baseUrl}/${id}`, { headers: headers });
  }

  public updateProductByIndex(id: number, product: Product): Observable<Product> {
    const headers = this.getHeaders();
    return this.http.put<Product>(`${this.baseUrl}/${id}`, product, { headers: headers });
  }
}