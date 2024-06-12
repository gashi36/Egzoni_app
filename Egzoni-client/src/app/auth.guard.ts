import {
  CanActivate,
  CanActivateChild,
  CanActivateFn,
  CanDeactivate,
  CanLoad,
  Router,
} from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { inject } from '@angular/core';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const localData = localStorage.getItem('Bearer Token');
    console.log(localData);
    if (localData != null) {
      return true;
    } else {
      this.router.navigateByUrl('/admin');
      return false;
    }
  }
  logout(): void {
    localStorage.removeItem('Bearer Token');
    this.router.navigateByUrl('/admin');
    console.log('logging out...');
  }
}
