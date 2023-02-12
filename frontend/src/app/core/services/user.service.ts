import { Injectable } from '@angular/core';
import { Observable ,  BehaviorSubject ,  ReplaySubject } from 'rxjs';
import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { map ,  distinctUntilChanged } from 'rxjs/operators';
import { GetUserResponse, UserResponse, User } from '../interfaces/user.interface';


@Injectable()
export class UserService {
  baseUrl: string = 'localhost:3005/api/v1'
  private currentUserSubject = new BehaviorSubject<User>({} as User);
  public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor (
    private apiService: ApiService<GetUserResponse>,
    private postApiService: ApiService<User>,
    private jwtService: JwtService
  ) {}

  // Verify JWT in localstorage with server & load user's info.
  // This runs once on application startup.
  populate() {
    // If JWT detected, attempt to get & store user's info
    const token = this.jwtService.getToken()
    if (token) {
      this.apiService.get(`${this.baseUrl}/user`)
      .subscribe({
        next: data => {debugger;
          this.setAuth(data.user)},
        error: err => this.purgeAuth()
      });
    } else {
      // Remove any potential remnants of previous auth states
      this.purgeAuth();
    }
  }

  registerNewUser(
    type: string, 
    credentials: string, 
    email: string, 
    names: string, 
    lastNames: string,
    isAdministrator: boolean
  ): Observable<User>{
    const route = type === 'register' ? '/register' : ''; debugger;
    const request = {
      nombres: names,
      apellidos: lastNames,
      email,
      password: credentials,
      isAdministrator
    }

    return this.postApiService.post(route, request).pipe(map(
      data => {
        this.setAuth(data);
        return data;
      }
    ));
  }

  setAuth(user: User) {debugger;
    // Save JWT sent from server in localstorage
    this.jwtService.saveToken(user.token!);
    // Set current user data into observable
    this.currentUserSubject.next(user);
    // Set isAuthenticated to true
    this.isAuthenticatedSubject.next(true);
  }

  purgeAuth() {
    // Remove JWT from localstorage
    this.jwtService.destroyToken();
    // Set current user to an empty object
    this.currentUserSubject.next({} as User);
    // Set auth status to false
    this.isAuthenticatedSubject.next(false);
  }

  attemptAuth(type: string, credentials: string, email: string): Observable<User> {
    const route = (type === 'login') ? '/login' : '';
    return this.postApiService.post(`${route}`, {password: credentials, email})
      .pipe(map(
      data => {debugger;
        this.setAuth(data);
        return data;
      }
    ));
  }

  getCurrentUser(): User {
    return this.currentUserSubject.value;
  }

  // Update the user on the server (email, pass, etc)
  update(user: any): Observable<User> {
    return this.apiService
    .put('/user', { user })
    .pipe(map(data => {
      // Update the currentUser observable
      this.currentUserSubject.next(data.user);
      return data.user;
    }));
  }

}