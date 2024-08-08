import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  userInfo: { name: string; email: string } = { name: '', email: '' };
  cartItems: { id: number; quantity: number }[] = [];
  products: any[] = []; // Adjust type as needed
  totalPrice: number = 0;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadCartItems();
    this.calculateTotalPrice();
  }

  loadCartItems(): void {
    try {
      const cartJson = localStorage.getItem('cart') || '{}';
      const cart = JSON.parse(cartJson);
      const sessionId = localStorage.getItem('sessionId') || 'guest';
      this.cartItems = cart[sessionId] || [];

      // Fetch product details from backend or local data
      // Example: this.products = fetchProducts(this.cartItems.map(item => item.id));
    } catch (error) {
      console.error('Error loading cart items:', error);
    }
  }

  incrementQuantity(itemId: number): void {
    const item = this.cartItems.find((i) => i.id === itemId);
    if (item) {
      item.quantity += 1;
      this.saveCart();
      this.calculateTotalPrice();
    }
  }

  decrementQuantity(itemId: number): void {
    const item = this.cartItems.find((i) => i.id === itemId);
    if (item && item.quantity > 1) {
      item.quantity -= 1;
      this.saveCart();
      this.calculateTotalPrice();
    }
  }

  saveCart(): void {
    try {
      const sessionId = localStorage.getItem('sessionId') || 'guest';
      const cart = localStorage.getItem('cart') || '{}';
      const updatedCart = JSON.parse(cart);
      updatedCart[sessionId] = this.cartItems;
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    } catch (error) {
      console.error('Error saving cart:', error);
    }
  }

  calculateTotalPrice(): void {
    // Assuming `this.products` has the product details with prices
    this.totalPrice = this.cartItems.reduce((total, item) => {
      const product = this.products.find((p) => p.id === item.id);
      return product ? total + product.retailPrice * item.quantity : total;
    }, 0);
  }

  submitOrder(): void {
    // Handle form submission and send email
    console.log('Order submitted', this.userInfo, this.cartItems);
    // Example: sendEmail(this.userInfo, this.cartItems);
  }

  goBack(): void {
    this.router.navigate(['/shop']);
  }
}
