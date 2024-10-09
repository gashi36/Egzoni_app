import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(): boolean {
    const token = localStorage.getItem('Bearer Token');
    if (token && !this.isTokenExpired(token)) {
      return true;
    } else {
      this.router.navigateByUrl('/admin');
      return false;
    }
  }

  isTokenExpired(token: string): boolean {
    try {
      const payload = this.parseJwt(token);
      const currentTime = Math.floor(Date.now() / 1000);  // Current time in seconds
      return payload.exp < currentTime;  // Token expired if 'exp' is less than current time
    } catch (error) {
      console.error('Error decoding token:', error);
      return true;  // Consider the token expired if there's an error
    }
  }


  // Function to decode the JWT manually
  parseJwt(token: string): any {
    const base64Url = token.split('.')[1]; // Get the payload part of the JWT
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
    return JSON.parse(jsonPayload); // Return the decoded payload as an object
  }

  logout(): void {
    localStorage.removeItem('Bearer Token');
    this.router.navigateByUrl('/admin');
  }
}
