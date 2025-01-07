import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApolloQueryResult } from '@apollo/client/core';
import { Brand, Category, GetBrandsGQL, GetCategoriesGQL, GetProductsGQL, Product, GetMostSoldProductsWithDetailsGQL } from '../../generated/graphql'; // Import the query
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
  isLoading: boolean = true;
  selectedBrands: Brand[] = [];
  mostSoldProducts: any[] = []; // Add a new property to store most sold products

  constructor(
    private router: Router,
    private getProductsGQL: GetProductsGQL,
    private getBrandsGQL: GetBrandsGQL,
    private getCategoriesGQL: GetCategoriesGQL,
    private toastr: ToastrService, // Inject ToastrService
    private getMostSoldProductsWithDetailsGQL: GetMostSoldProductsWithDetailsGQL // Inject the query
  ) { }

  ngOnInit(): void {
    this.getLatestProducts();
    this.getAllCategories();
    this.getAllBrands();
    this.getMostSoldProducts(); // Call the new method
  }

  getLastBrands(count: number): Brand[] {
    return this.brands.slice(-count);
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
    const productsForBrand = this.products
      .filter(product => product.brandId === brandId)
      .slice(0, 4); // Return only the first four products

    console.log(`Products for brand ${brandId}:`, productsForBrand); // Debugging log
    return productsForBrand;
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
          this.products = data.map((product: any) => {
            // Check if there are sales and assign values if they exist
            if (product.sales && product.sales.length > 0) {
              const sale = product.sales[0]; // sales is an array, take the first element

              // Log the sales information
              console.log(`Product ID: ${product.id}`);
              console.log(`Discounted Price: ${sale.discountedPrice}`);
              console.log(`Discount Percentage: ${sale.discountPercentage}%`);
              console.log(`Sale End Date: ${sale.endDate}`);

              return {
                ...product,
                discountedPrice: sale.discountedPrice,
                discountPercentage: sale.discountPercentage,
                endDate: sale.endDate,
                isOutOfStock: product.quantity === 0,
              };
            } else {
              // If no sales, just return the original product
              return {
                ...product,
                discountedPrice: null, // or keep undefined
                discountPercentage: null, // or keep undefined
                endDate: null, // or keep undefined
                isOutOfStock: product.quantity === 0,
              };
            }
          });

          console.log('Processed Products:', this.products); // Debugging log
        },
        error: (error) => {
          console.error('Error fetching products:', error);
        },
      });
  }

  getProductThumbnailUrl(product: any): string {
    const thumbnailUrl = product.thumbnailUrl || 'default-thumbnail.jpg';
    return `${this.baseImageUrl}${product.id}/${thumbnailUrl}`;
  }
  getProductThumbnailUrlBestSelles(product: any): string {
    const thumbnailUrl = product.thumbnailUrl || 'default-thumbnail.jpg';
    return `${this.baseImageUrl}${product.productId}/${thumbnailUrl}`;
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

          console.log('Fetched Brands:', this.brands); // Debugging log
          this.selectedBrands = this.getLastBrands(3); // Get the last 3 brands
        },
        error: (error) => {
          console.error('Error fetching brands:', error);
        },
      });
  }

  getMostSoldProducts(): void {
    this.getMostSoldProductsWithDetailsGQL
      .watch()
      .valueChanges.pipe(
        map((result: ApolloQueryResult<any>) => result.data?.mostSoldProductsWithDetails || [])
      )
      .subscribe({
        next: (data: any[]) => {
          this.mostSoldProducts = data.slice(0, 5).map(product => {
            return {
              ...product,
              discountedPrice: product.discountedPrice || null,
              discountPercentage: product.discountPercentage || null,
            };
          });
          console.log('Most Sold Products:', this.mostSoldProducts); // Debugging log
        },
        error: (error) => {
          console.error('Error fetching most sold products:', error);
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

  isProductOutOfStock(product: Product): boolean {
    return product.quantity === 0;
  }
}
