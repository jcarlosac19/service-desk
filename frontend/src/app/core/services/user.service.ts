import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';
import { ApiService, JwtService } from './';
import { map, distinctUntilChanged } from 'rxjs/operators';
import { GetAllUserResponse, GetUserResponse, UserResponse } from '../interfaces/user.interface';
import * as helper from '../helpers';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class UserService {
  private currentUserSubject = new BehaviorSubject<UserResponse>(
    {} as UserResponse
  );
  public currentUser = this.currentUserSubject
    .asObservable()
    .pipe(distinctUntilChanged());

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(
    private apiService: ApiService<GetUserResponse>,
    private postApiService: ApiService<UserResponse>,
    private getAllApiService: ApiService<GetAllUserResponse>,
    private jwtService: JwtService,
  ) {}

  // Verify JWT in localstorage with server & load user's info.
  // This runs once on application startup.
  populate() {
    // If JWT detected, attempt to get & store user's info
    const token = this.jwtService.getToken() ?? '';
    const userInfo = this.jwtService.getUserInfo() ?? '{}';
    const user:UserResponse = JSON.parse(userInfo) ?? '{}';
    if (!helper.isFullObject(user)) {
      this.purgeAuth();
      return;
    }
    if (!helper.isNullOrWhitespace(token) && helper.isFullObject(user)) {
      const params = new HttpParams().set('email', user.userInfo.email);
      this.apiService.get(`/get-user-by-email`, params).subscribe({
        next: (data) => {
          this.setAuth(data.user);
        },
        error: (err) => this.purgeAuth(),
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
    isAdministrator: boolean,
    isUser: boolean
  ): Observable<UserResponse> {
    const route = type === 'register' ? '/register' : '';
    const request = {
      nombres: names,
      apellidos: lastNames,
      email,
      password: credentials,
      isAdministrator,
      isUser,
    };

    return this.postApiService.post(route, request).pipe(
      map((data) => {
        this.setAuth(data);
        return data;
      })
    );
  }

  setAuth(user: UserResponse) {
    // Save JWT sent from server in localstorage
    this.jwtService.saveToken(user.token!);
    this.jwtService.saveUserInfo(user);
    this.jwtService.saveAuthenticated(true);
    // Set current user data into observable
    this.currentUserSubject.next(user);
    // Set isAuthenticated to true
    this.isAuthenticatedSubject.next(true);
  }

  purgeAuth() {
    // Remove JWT from localstorage
    this.jwtService.destroyAuthetication();
    // Set current user to an empty object
    this.currentUserSubject.next({} as UserResponse);
    // Set auth status to false
    this.isAuthenticatedSubject.next(false);
  }

  attemptAuth(
    type: string,
    credentials: string,
    email: string
  ): Observable<UserResponse> {
    const route = type === 'login' ? '/login' : '';
    return this.postApiService
      .post(`${route}`, { password: credentials, email })
      .pipe(
        map((data) => {
          this.setAuth(data);
          return data;
        })
      );
  }

  getCurrentUser(): UserResponse {
    return this.currentUserSubject.value;
  }

  // Update the user on the server (email, pass, etc)
  update(user: any): Observable<UserResponse> {
    return this.apiService.put('/user', { user }).pipe(
      map((data) => {
        // Update the currentUser observable
        this.currentUserSubject.next(data.user);
        return data.user;
      })
    );
  }

  getAllUsers(): Observable<GetAllUserResponse[]> {
    return this.getAllApiService.getAll('/get-all-users');
  }
}
