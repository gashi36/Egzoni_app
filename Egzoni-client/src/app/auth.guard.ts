import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('Bearer Token');
    console.log('AuthGuard checking token:', token);
    if (token) {
      return true;
    } else {
      this.router.navigateByUrl('/admin');
      return false;
    }
  }

  logout(): void {
    localStorage.removeItem('Bearer Token');
    console.log('logging out...');
    this.router.navigateByUrl('/admin');
  }
}
