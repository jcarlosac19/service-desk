import { Injectable } from '@angular/core';
import { UserResponse } from '../interfaces/user.interface';


@Injectable()
export class JwtService {

  getToken(): String {
    return window.localStorage['jwtToken'];
  }

  saveToken(token: String) {
    window.localStorage['jwtToken'] = token;
  }
  saveUserInfo(userInfo: UserResponse) {
    window.localStorage['userInfo'] = JSON.stringify(userInfo);
  }

  getUserInfo(): string {
    return window.localStorage['userInfo'];
  }

  destroyToken() {
    window.localStorage.removeItem('jwtToken');
  }

  saveAuthenticated(authenticated: boolean){
    window.localStorage['authenticated'] = authenticated;
  }

  getAuthenticated(){
    return window.localStorage['authenticated']
  }
}