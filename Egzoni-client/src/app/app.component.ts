import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Brand, Category, GetBrandsGQL, GetCategoriesGQL, Product, SearchProductsByBrandGQL } from '../generated/graphql';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent implements OnInit {
  isDropdownOpen: boolean = false; // State to manage dropdown visibility
  isSearchingProduct: boolean = false;
  products: Product[] = [];
  brands: Brand[] = [];
  categories: Category[] = [];
  productControl = new FormControl('');
  filteredProducts: any[] = [];
  baseImageUrl: string = 'http://localhost:5044/images/';

  searchProductForm = new FormGroup({
    search: new FormControl(''),
  });

  constructor(
    private searchBrand: SearchProductsByBrandGQL,
    private router: Router,
    private getBrandsGQL: GetBrandsGQL,
    private getCategoriesGQL: GetCategoriesGQL
  ) { }

  ngOnInit(): void {
    this.getAllCategories();
    this.getAllBrands();
    this.productControl.valueChanges
      .pipe(
        debounceTime(300), // Optional debounce for better UX
        distinctUntilChanged() // Prevent unnecessary API calls
      )
      .subscribe((value: string | null) => {
        // Ensure the value is a string and handle null
        this.searchProducts(value || '');
      });
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
  goToShop(): void {
    if (this.filteredProducts && this.filteredProducts.length > 0) {
      const productIds = this.filteredProducts.map((product) => product.id).join(',');

      console.log('Navigating to shop with the following product IDs:', productIds);

      this.router.navigate(['/shop'], { queryParams: { products: productIds } }).then(
        () => console.log('Navigation to /shop successful.'),
        (error) => console.error('Navigation to /shop failed:', error)
      );
    } else {
      console.warn('No products to display. Ensure filteredProducts is populated.');
    }

    // Debugging logs for additional clarity
    console.log('Current filteredProducts:', this.filteredProducts);
  }

  getProductThumbnailUrl(productId: number): string {
    const product = this.filteredProducts.find((p) => p.id === productId);
    if (product && product.imageUrl) {
      return `${this.baseImageUrl}${productId}/${product.imageUrl}`;
    }
    return `${this.baseImageUrl}default-thumbnai
    l.jpg`;
  }
  getAllBrands(): void {
    this.getBrandsGQL
      .watch()
      .valueChanges.pipe(map((result: any) => result.data.brands))
      .subscribe({
        next: (data) => {
          this.brands = data || [];
        },
        error: (error) => {
          console.error('Error fetching brands:', error);
        },
      });
  }


  getBrandName(brandId: number): string {
    const brand = this.brands.find((brand) => brand.id === brandId);
    return brand?.name || 'Brand i panjohur';
  }

  getCategoryName(categoryId: number): string {
    const category = this.categories.find(
      (category) => category.id === categoryId
    );
    return category?.name || 'Kategori e pa njohur';
  }

  searchProducts(searchTerm: string): void {
    if (searchTerm.length >= 1) {
      this.searchBrand
        .fetch({
          brandName: searchTerm,  // Search by brand
          categoryName: searchTerm // Search by category
        })
        .toPromise()
        .then((result) => {
          const edges = result?.data?.productsAsync?.edges || [];
          this.filteredProducts = edges.map((edge) => ({
            id: edge.node.id,
            brandId: edge.node.brandId,
            categoryId: edge.node.categoryId,
            description: edge.node.description,
            code: edge.node.code,
            imageUrl: edge.node.thumbnailUrl,
          }));
        })
        .catch((error) => {
          console.error('Error fetching products:', error);
          this.filteredProducts = [];
        });
    } else {
      this.filteredProducts = [];
    }
  }




  // This method is called when an option is selected
  onOptionSelected(event: any): void {
    const selectedProduct = this.filteredProducts.find(
      (product) => product.id === event.option.value.id
    );
    if (selectedProduct) {
      console.log('Selected product:', selectedProduct);
      // Navigate to product details page with product id
      this.router.navigate(['/product', selectedProduct.id]).then(() => {
        // Clear the search bar after navigation
        this.productControl.setValue('');
      });
    }
  }
  highlightText(text: string | undefined): string {
    if (!text) return ''; // Return empty string if no text
    const searchTerm = this.productControl.value || '';
    if (!searchTerm) return text; // If no search term, return the original text

    // Escape special characters in searchTerm for regex
    const escapedTerm = searchTerm.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
    const regex = new RegExp(`(${escapedTerm})`, 'gi');

    // Highlight the matching part of the text
    return text.replace(regex, '<b>$1</b>');
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
