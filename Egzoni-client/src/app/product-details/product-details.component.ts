import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import {
  Brand,
  Category,
  GetProductByIdGQL,
  GetBrandsGQL,
  GetCategoriesGQL,
} from '../../generated/graphql';
import { ToastrService } from 'ngx-toastr';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  product$: Observable<any> | undefined;
  images: { src: string; thumb: string }[] = [];
  selectedImage: string | undefined;
  currentIndex: number = 0;
  brands: Brand[] = [];
  categories: Category[] = [];

  constructor(
    private route: ActivatedRoute,
    private apollo: Apollo,
    private router: Router,
    private getbrands: GetBrandsGQL,
    private getcategories: GetCategoriesGQL,
    private getProductByIdGQL: GetProductByIdGQL,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getAllCategories();
    this.getAllBrands();
    this.route.paramMap.subscribe((params) => {
      const id = parseInt(params.get('id') || '0', 10);
      if (id) {
        this.getProductById(id);
      }
    });
  }
  buyNow(productId: number): void {
    try {
      console.log('Buying now with productId:', productId);

      // Fetch the cart from localStorage
      const cartJson = localStorage.getItem('cart') || '{}';
      const cart = JSON.parse(cartJson);
      const sessionId = localStorage.getItem('sessionId') || 'guest';

      if (!cart[sessionId]) {
        cart[sessionId] = [];
      }

      // Check if the product already exists in the cart
      const existingProduct = cart[sessionId].find(
        (item: any) => item.id === productId
      );

      if (existingProduct) {
        // Update quantity if the product is already in the cart
        existingProduct.quantity = (existingProduct.quantity || 0) + 1;
        console.log('Product found in cart. Updated quantity:', existingProduct.quantity);
      } else {
        // Add the product to the cart
        cart[sessionId].push({ id: productId, quantity: 1 });
        console.log('Product not found in cart. Added new product with quantity 1.');
      }

      // Save the updated cart to localStorage
      localStorage.setItem('cart', JSON.stringify(cart));
      console.log('Updated Cart:', cart);

      // Navigate to the checkout component
      this.router.navigate(['/checkout'], { queryParams: { productId } });
    } catch (error) {
      console.error('Error in buyNow:', error);
    }
  }

  getAllCategories(): void {
    this.getcategories
      .watch()
      .valueChanges.pipe(map((result: any) => result.data.categories))
      .subscribe({
        next: (data) => {
          if (data && data.length > 0) {
            this.categories = data;
          } else {
            console.error('No categories found');
          }
        },
        error: (error) => {
          console.error('Error fetching categories:', error);
        },
      });
  }

  getAllBrands(): void {
    this.getbrands
      .watch()
      .valueChanges.pipe(map((result: any) => result.data.brands))
      .subscribe({
        next: (data) => {
          if (data && data.length > 0) {
            this.brands = data;
          } else {
            console.error('No brands found');
          }
        },
        error: (error) => {
          console.error('Error fetching brands:', error);
        },
      });
  }
  getProductById(id: number): void {
    this.product$ = this.getProductByIdGQL.fetch({ id }).pipe(
      map((result: any) => {
        const product = result.data.productById;
        const baseUrl = 'http://localhost:5044/images';

        if (product) {
          console.log('Product fetched:', product);
          this.images = (product.pictureUrls || []).map((url: string) => ({
            src: `${baseUrl}/${product.id}/${encodeURIComponent(url)}`,
            thumb: `${baseUrl}/${product.id}/${encodeURIComponent(url)}`,
          }));

          console.log('Constructed image URLs:', this.images);

          if (this.images.length > 0) {
            this.selectedImage = this.images[0].src;
          } else {
            console.warn('No images found for the product.');
          }
        } else {
          console.warn('No product found with the given ID.');
        }
        const validSale = product.sales?.find((sale: any) => sale.isValidSalePeriod);

        return {
          ...product,
          discountedPrice: product.sales?.[0]?.discountedPrice || null,
          discountPercentage: product.sales?.[0]?.discountPercentage || null,
          endDate: product.sales?.[0]?.endDate || null,
          saleId: validSale ? validSale.id : null,
        };

      }),
      catchError((error) => {
        console.error('Error fetching product with id:', error);
        return of({});
      })
    );
  }

  getBrandName(brandId: number): string | undefined {
    const brand = this.brands.find((brand) => brand.id === brandId);
    return brand?.name!;
  }

  getCategoryName(categoryId: number): string | undefined {
    const category = this.categories.find(
      (category) => category.id === categoryId
    );
    return category?.name!;
  }

  selectImage(imageSrc: string): void {
    this.selectedImage = imageSrc;
    this.currentIndex = this.images.findIndex(image => image.src === imageSrc);
  }

  openModal(): void {
    const modalElement = document.getElementById('imageModal');
    if (modalElement) {
      const modal = new Modal(modalElement);
      modal.show();
    }
  }

  closeModal(): void {
    const modalElement = document.getElementById('imageModal');
    if (modalElement) {
      const modal = Modal.getInstance(modalElement);
      modal?.hide();
    }
  }

  nextImage(): void {
    this.currentIndex = (this.currentIndex + 1) % this.images.length; // Loop to the start
    this.selectedImage = this.images[this.currentIndex].src;
  }

  prevImage(): void {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length; // Loop to the end
    this.selectedImage = this.images[this.currentIndex].src;
  }



  goBack(): void {
    this.router.navigate(['/shop']);
  }

  addToCart(productId: number): void {
    try {
      console.log('Adding to cart:', productId);
      const cartJson = localStorage.getItem('cart') || '{}';
      const cart = JSON.parse(cartJson);
      const sessionId = localStorage.getItem('sessionId') || 'guest';

      if (!cart[sessionId]) {
        cart[sessionId] = [];
      }

      const existingProduct = cart[sessionId].find(
        (item: any) => item.id === productId
      );

      if (existingProduct) {
        existingProduct.quantity = (existingProduct.quantity || 0) + 1;
        console.log('Product found in cart. Updated quantity:', existingProduct.quantity);
      } else {
        cart[sessionId].push({ id: productId, quantity: 1 });
        console.log('Product not found in cart. Added new product with quantity 1.');
      }

      localStorage.setItem('cart', JSON.stringify(cart));
      console.log('Updated Cart:', cart);
      this.updateCartBadge();
      this.toastr.success('Produkti u shtua me sukses!');
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  }

  updateCartBadge(): void {
    try {
      const badgeElement = document.querySelector('.cart-badge');
      if (badgeElement) {
        const cartJson = localStorage.getItem('cart') || '{}';
        const cart = JSON.parse(cartJson);
        const sessionId = localStorage.getItem('sessionId') || 'guest';
        const cartItems = cart[sessionId] || [];

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

}
