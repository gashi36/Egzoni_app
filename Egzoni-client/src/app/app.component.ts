import { Component, OnInit } from '@angular/core';
import { Product, SearchProductsGQL } from '../generated/graphql';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  isDropdownOpen: boolean = false; // State to manage dropdown visibility
  isSearchingProduct: boolean = false;
  products: Product[] = [];


  searchProductForm = new FormGroup({
    search: new FormControl(''),
  });

  constructor(
    private searchprod: SearchProductsGQL,
  ) { }

  ngOnInit(): void {
    this.updateCartBadge();
  }


  searchProduct(code: string): void {
    this.isSearchingProduct = true;
    setTimeout(() => {
      this.searchprod.fetch({ code }).subscribe({
        next: ({ data }) => {
          console.log(data?.productsAsync);
          this.isSearchingProduct = false;
          if (data?.productsAsync) {
            this.products = data.productsAsync.edges?.map(
              (x) => x.node
            ) as Product[];
          }
        },
        error: (error) => {
          this.isSearchingProduct = false;
          console.error('Error searching products:', error);
        },
      });
    }, 500);
  }
  updateCartBadge(): void {
    try {
      const badgeElement = document.querySelector('.cart-badge');
      if (badgeElement) {
        const cartJson = localStorage.getItem('cart') || '{}';
        const cart = JSON.parse(cartJson);
        const sessionId = localStorage.getItem('sessionId') || 'guest';
        const cartItems = cart[sessionId] || [];

        // Calculate total items in the cart
        const totalItems = cartItems.reduce(
          (sum: number, item: any) => sum + (item.quantity || 0),
          0
        );

        badgeElement.textContent = totalItems.toString();
        console.log('Badge updated with total items:', totalItems);
      } else {
        console.error('Badge element not found.');
      }
    } catch (error) {
      console.error('Error updating cart badge:', error);
    }
  }

  // Method to toggle dropdown visibility
  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  // Method to close dropdown
  closeDropdown(): void {
    this.isDropdownOpen = false;
  }
}
