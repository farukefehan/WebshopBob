import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponse } from '../models/auth-response.model';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AuthRequest } from '../models/auth-request.model';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _loginEndpoint: string = 'http://s1142864.student.inf-hsleiden.nl:22864/api/auth/login';
  private _registerEndpoint: string = 'http://s1142864.student.inf-hsleiden.nl:22864/api/auth/register';

  // private _loginEndpoint: string = 'http://localhost:8080/api/auth/login';
  // private _registerEndpoint: string = 'http://localhost:8080/api/auth/register';
  
  public $userIsLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private tokenService: TokenService) {
    if(this.tokenService.isValid()){
      this.$userIsLoggedIn.next(true);
    }
  }


  public login(authRequest: AuthRequest): Observable<AuthResponse>{
    return this.http
      .post<AuthResponse>(this._loginEndpoint, authRequest)
      .pipe(
        tap((authResponse: AuthResponse) => {
          this.tokenService.storeToken(authResponse.token);
          this.tokenService.storeEmail(authResponse.email);
          this.$userIsLoggedIn.next(true);
        })
      );
  }

  public register(authRequest: AuthRequest): Observable<AuthResponse>{ 
    return this.http
    .post<AuthResponse>(this._registerEndpoint, authRequest)
    .pipe(
      tap((authResponse: AuthResponse) => {
        this.tokenService.storeToken(authResponse.token);
        this.tokenService.storeEmail(authResponse.email);
        this.$userIsLoggedIn.next(true);
      })
    );
  }

  public logOut(): void{
    this.tokenService.removeToken();
    this.$userIsLoggedIn.next(false);
  }
}