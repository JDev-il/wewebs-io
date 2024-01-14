import { Injectable } from '@angular/core';
import decode from 'jwt-decode';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

 async decodeToken(){
    const token = localStorage.getItem('token') || "";
    const tokenPayload = decode(token);
  }

  isLoggedIn() {
    this.decodeToken()
    //! From here
 /*    if (tokenPayload) {
      return true;
    } */
    return true;
  }
}
