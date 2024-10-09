import { Component } from '@angular/core';
import { LoginGQL } from '../../generated/graphql';
import { Router } from '@angular/router';
import { AuthGuard } from '../auth.guard';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent {
  username: string = '';
  password: string = '';
  usernameInvalid: boolean = false;
  passwordInvalid: boolean = false;
  errorMessage: string = '';
  private isAuthenticated = false;
  private authSecretKey = 'Bearer Token';

  constructor(
    private login: LoginGQL,
    private router: Router,
    private authGuard: AuthGuard // Inject AuthGuard here
  ) {
    this.isAuthenticated = !!localStorage.getItem(this.authSecretKey);
  }

  onSubmit(): void {
    this.usernameInvalid = false;
    this.passwordInvalid = false;
    this.errorMessage = '';

    if (!this.username.trim()) {
      this.usernameInvalid = true;
    }
    if (!this.password.trim()) {
      this.passwordInvalid = true;
    }

    if (this.usernameInvalid || this.passwordInvalid) {
      this.errorMessage = 'Please enter a valid username and password.';
      return;
    }

    this.userLogin();
  }

  userLogin(): void {
    this.login
      .mutate({
        username: this.username,
        password: this.password,
      })
      .subscribe({
        next: ({ data }) => {
          const token = data?.login?.administrator?.token;
          if (token) {
            console.log('Login successful. Token:', token);
            localStorage.setItem(this.authSecretKey, token);
            this.router.navigateByUrl('dashboard');
          } else {
            console.log('Login failed. No token received.');
            this.errorMessage = 'Invalid username or password.';
          }
        },
        error: (error) => {
          console.log('Login error:', error);
          this.errorMessage = 'An error occurred during login.';
        },
      });
  }

  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }

  logout(): void {
    this.authGuard.logout(); // Call AuthGuard's logout function
    this.isAuthenticated = false;
  }
}
