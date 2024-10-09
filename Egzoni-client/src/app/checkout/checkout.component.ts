import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { PlaceOrderGQL, GetProductByIdGQL, Product } from '../../generated/graphql';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  userInfo: { name: string; email: string } = { name: '', email: '' };
  cartItems: { id: number; quantity: number }[] = [];
  products: Product[] = [];
  totalPrice: number = 0;
  orderForm: FormGroup;
  orderPlaced = false;
  baseImageUrl: string = 'http://localhost:5044/images/';
  loading = false;
  errorMessage: string | null = null;

  constructor(
    private router: Router,
    private makeOrder: PlaceOrderGQL,
    private fb: FormBuilder,
    private getProductById: GetProductByIdGQL,
    private cdr: ChangeDetectorRef
  ) {
    this.orderForm = this.fb.group({
      additionalMessage: [''],
      name: ['', [Validators.required]],
      deliveryAddress: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.loadCartItems();
  }

  async loadCartItems(): Promise<void> {
    try {
      const cartJson = localStorage.getItem('cart') || '{}';
      const cart = JSON.parse(cartJson);
      const sessionId = localStorage.getItem('sessionId') || 'guest';
      this.cartItems = cart[sessionId] || [];

      if (this.cartItems.length > 0) {
        const productIds = this.cartItems.map((item) => item.id);
        this.products = await this.fetchProducts(productIds);
        this.calculateTotalPrice();
      }
    } catch (error) {
      console.error('Error loading cart items:', error);
      this.errorMessage = 'Dështoi të ngarkonte artikujt e karrocës. Ju lutem provoni përsëri.';
    }
  }

  async fetchProducts(productIds: number[]): Promise<Product[]> {
    const products: Product[] = [];
    for (const id of productIds) {
      try {
        const result = await this.getProductById.fetch({ id }).toPromise();
        if (result?.data?.productById) {
          const product = result.data.productById;
          products.push({
            ...product,
            thumbnailUrl: product.thumbnailUrl || 'default-thumbnail.jpg',
          });
        } else {
          console.warn(`Product with ID ${id} not found.`);
        }
      } catch (error) {
        console.error(`Error fetching product with ID ${id}:`, error);
        this.errorMessage = `Dështoi të ngarkonte produktin me ID ${id}.`;
      }
    }
    return products;
  }

  getProductCode(productId: number): any {
    const product = this.products.find((p) => p.id === productId);
    return product ? product.code : 'Produkt i panjohur';
  }

  getProductPrice(productId: number): number {
    const product = this.products.find((p) => p.id === productId);
    return product ? product.retailPrice : 0;
  }

  getProductThumbnailUrl(productId: number): string {
    const product = this.products.find((p) => p.id === productId);
    if (product && product.thumbnailUrl) {
      return `${this.baseImageUrl}${productId}/${product.thumbnailUrl}`;
    }
    return `${this.baseImageUrl}default-thumbnail.jpg`;
  }
  incrementQuantity(itemId: number): void {
    const item = this.cartItems.find((i) => i.id === itemId);
    if (item) {
      item.quantity += 1;
      this.saveCart();
      this.calculateTotalPrice();
      this.cdr.detectChanges();
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

  removeItem(itemId: number): void {
    this.cartItems = this.cartItems.filter((item) => item.id !== itemId);
    this.saveCart();
    this.calculateTotalPrice();
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
    this.totalPrice = this.cartItems.reduce((total, item) => {
      const product = this.products.find((p) => p.id === item.id);
      return product ? total + product.retailPrice * item.quantity : total;
    }, 0);
  }

  async submitOrder(): Promise<void> {
    if (this.orderForm.valid) {
      this.loading = true; // Show loading state

      // Disable the submit button and add a delay
      const submitButton = document.querySelector('button[type="submit"]') as HTMLButtonElement;
      if (submitButton) {
        submitButton.disabled = true;
        setTimeout(() => {
          submitButton.disabled = false;
        }, 2000); // 2-second delay
      }

      const orderInputs = this.cartItems.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      }));

      const orderInput = {
        additionalMessage: this.orderForm.value.additionalMessage,
        costumerName: this.orderForm.value.name,
        deliveryAddress: this.orderForm.value.deliveryAddress,
        email: this.orderForm.value.email,
        phoneNumber: this.orderForm.value.phoneNumber,
        items: orderInputs,
      };

      try {
        const result = await this.makeOrder.mutate({ input: orderInput }).toPromise();
        console.log('Order placed successfully', result);
        this.orderPlaced = true;
        this.clearCart();
        this.loading = false;

        // Use SweetAlert here
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Porosia u vendos me sukses!',
          showConfirmButton: false,
          timer: 2000,
        });
        this.router.navigate(['/success']);
      } catch (error) {
        console.error('Error placing order:', error);
        this.errorMessage = 'Dështoi të vendoste porosinë. Ju lutem provoni përsëri.';
        this.loading = false;

        // Use SweetAlert for error message
        Swal.fire({
          icon: 'error',
          title: 'Dështoi',
          text: 'Dështoi të vendoste porosinë. Ju lutem provoni përsëri.',
        });
      }
    } else {
      console.error('Order form is invalid');
      this.errorMessage = 'Ju lutem plotësoni të gjitha fushat e kërkuara.';

      // Use SweetAlert for validation message
      Swal.fire({
        icon: 'warning',
        title: 'Kujdes',
        text: 'Ju lutem plotësoni të gjitha fushat e kërkuara.',
      });
    }
  }

  clearCart(): void {
    const sessionId = localStorage.getItem('sessionId') || 'guest';
    const cart = JSON.parse(localStorage.getItem('cart') || '{}');
    delete cart[sessionId];
    localStorage.setItem('cart', JSON.stringify(cart));
    this.cartItems = [];
    this.products = [];
    this.totalPrice = 0;
  }

  goBack(): void {
    this.router.navigate(['/shop']);
  }
}
