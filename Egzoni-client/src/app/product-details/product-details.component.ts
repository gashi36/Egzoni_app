// product-details.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import {
  Brand,
  Category,
  GetBrandsGQL,
  GetCategoriesGQL,
} from '../../generated/graphql';

const GET_PRODUCT_BY_ID = gql`
  query GetProductById($id: Int!) {
    productById(id: $id) {
      id
      code
      color
      description
      pictureUrls
      profit
      purchasePrice
      quantity
      retailPrice
      size
      brandId
      categoryId
    }
  }
`;

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  product$: Observable<any> | undefined;
  images: { src: string; thumb: string }[] = [];
  selectedImage: string | undefined;
  brands: Brand[] = [];
  categories: Category[] = [];

  constructor(
    private route: ActivatedRoute,
    private apollo: Apollo,
    private router: Router,
    private getbrands: GetBrandsGQL,
    private getcategories: GetCategoriesGQL
  ) {}

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
    this.product$ = this.apollo
      .watchQuery({
        query: GET_PRODUCT_BY_ID,
        variables: { id },
      })
      .valueChanges.pipe(
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

          return product;
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
  }

  goBack(): void {
    this.router.navigate(['/shop']);
  }

  addToCart(productId: number): void {
    try {
      console.log('Adding to cart:', productId);

      // Retrieve current cart from localStorage
      const cartJson = localStorage.getItem('cart') || '{}';
      const cart = JSON.parse(cartJson);
      const sessionId = localStorage.getItem('sessionId') || 'guest';

      // Log retrieved cart and sessionId
      console.log('Cart JSON:', cartJson);
      console.log('Parsed Cart:', cart);
      console.log('Session ID:', sessionId);

      // Ensure the cart array exists for the current session
      if (!cart[sessionId]) {
        cart[sessionId] = [];
      }

      // Find the product in the cart
      const existingProduct = cart[sessionId].find(
        (item: any) => item.id === productId
      );

      if (existingProduct) {
        // If product exists, increment its quantity by 1
        existingProduct.quantity = (existingProduct.quantity || 0) + 1;
        console.log(
          'Product found in cart. Updated quantity:',
          existingProduct.quantity
        );
      } else {
        // If product does not exist, add it with quantity 1
        cart[sessionId].push({ id: productId, quantity: 1 });
        console.log(
          'Product not found in cart. Added new product with quantity 1.'
        );
      }

      // Save updated cart back to localStorage
      localStorage.setItem('cart', JSON.stringify(cart));
      console.log('Updated Cart:', cart);

      // Update cart badge (assuming you have this method)
      this.updateCartBadge();
    } catch (error) {
      // Log any errors
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
}
