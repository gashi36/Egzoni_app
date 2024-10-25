import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApolloQueryResult } from '@apollo/client/core';
import { Brand, Category, GetBrandsGQL, GetCategoriesGQL, GetProductsGQL, Product } from '../../generated/graphql';
import { map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr'; // Import ToastrService

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  brands: Brand[] = [];
  categories: Category[] = [];
  baseImageUrl: string = 'http://localhost:5044/images/';
  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: '768px',
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: '480px',
      numVisible: 1,
      numScroll: 1,
    },
  ];

  constructor(
    private router: Router,
    private getProductsGQL: GetProductsGQL,
    private getBrandsGQL: GetBrandsGQL,
    private getCategoriesGQL: GetCategoriesGQL,
    private toastr: ToastrService // Inject ToastrService
  ) { }

  ngOnInit(): void {
    this.getLatestProducts();
    this.getAllCategories();
    this.getAllBrands();
  }

  getLastThreeBrands(): Brand[] {
    return this.brands.slice(-4); // Adjust as needed
  }
  navigateToShopWithFilters(type: string, id: number): void {
    const queryParams: any = {};

    if (type === 'brand') {
      queryParams.brand = id;
    } else if (type === 'category') {
      queryParams.category = id;
    }

    // Navigate to shop with query parameters
    this.router.navigate(['/shop'], { queryParams });
  }

  getProductsForBrand(brandId: number): Product[] {
    return this.products
      .filter(product => product.brandId === brandId)
      .slice(0, 4); // Return only the first four products
  }
  getLatestProducts(first: number = 10): void {
    this.getProductsGQL
      .watch({ first })
      .valueChanges.pipe(
        map((result: ApolloQueryResult<any>) => result.data?.productsAsync?.nodes || [])
      )
      .subscribe({
        next: (data: Product[]) => {
          console.log('Fetched Products:', data);
          this.products = data;
        },
        error: (error) => {
          console.error('Error fetching products:', error);
        },
      });
  }

  getProductThumbnailUrl(product: Product): string {
    const thumbnailUrl =
      Array.isArray(product.pictureUrls) && product.pictureUrls.length > 0
        ? product.pictureUrls[0]
        : 'default-thumbnail.jpg';
    return `${this.baseImageUrl}${product.id}/${thumbnailUrl}`;
  }

  navigateToProduct(productId: number): void {
    this.router.navigate(['/product', productId]);
  }

  addToCart(productId: number): void {
    try {
      console.log('Adding to cart:', productId);

      // Retrieve current cart from localStorage
      const cartJson = localStorage.getItem('cart') || '{}';
      const cart = JSON.parse(cartJson);
      const sessionId = localStorage.getItem('sessionId') || 'guest';

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
        console.log('Product found in cart. Updated quantity:', existingProduct.quantity);
      } else {
        // If product does not exist, add it with quantity 1
        cart[sessionId].push({ id: productId, quantity: 1 });
        console.log('Product not found in cart. Added new product with quantity 1.');
      }

      // Save updated cart back to localStorage
      localStorage.setItem('cart', JSON.stringify(cart));
      console.log('Updated Cart:', cart);

      // Update cart badge
      this.updateCartBadge();

      // Show toast notification
      this.toastr.success('Produkti u shtua me sukses!'); // Show toastr notification
      console.log('Toastr notification should now be displayed.');
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

  getAllCategories(): void {
    this.getCategoriesGQL
      .watch()
      .valueChanges.pipe(map((result: any) => result.data.categories))
      .subscribe({
        next: (data) => {
          this.categories = data || [];
        },
        error: (error) => {
          console.error('Error fetching categories:', error);
        },
      });
  }
  getAllBrands(): void {
    this.getBrandsGQL
      .watch()
      .valueChanges.pipe(map((result: any) => result.data.brands))
      .subscribe({
        next: (data) => {
          this.brands = data.map((brand: any) => ({
            id: brand.id,
            name: brand.name,
            logoUrl: `http://localhost:5044/logos/${brand.id}/${brand.logoUrl}`,
            products: brand.products || [], // Ensure products are included
          })) || [];

          console.log('Fetched Brands:', this.brands);
        },
        error: (error) => {
          console.error('Error fetching brands:', error);
        },
      });
  }

  removeImage(event: Event) {
    // If the image cannot be loaded, hide the image element
    (event.target as HTMLImageElement).style.display = 'none';
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
}
