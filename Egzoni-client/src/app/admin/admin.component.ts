import { Component } from '@angular/core';
import { LoginGQL } from '../../generated/graphql';
import { Router } from '@angular/router';

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
  constructor(private login: LoginGQL, private router: Router) {
    this.isAuthenticated = !!localStorage.getItem(this.authSecretKey);
  }

  onSubmit(): void {
    // Reset error flags
    this.usernameInvalid = false;
    this.passwordInvalid = false;
    this.errorMessage = '';

    // Check if either username or password is empty
    if (!this.username.trim()) {
      this.usernameInvalid = true;
    }
    if (!this.password.trim()) {
      this.passwordInvalid = true;
    }

    // If either field is invalid, display an error
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
            // Login successful, navigate to the carpets route
            this.router.navigateByUrl('carpets');
            console.log('login successful', data);
          } else {
            // Login failed, display an error message
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
    localStorage.removeItem(this.authSecretKey);
    this.isAuthenticated = false;
  }
}
