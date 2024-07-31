import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApolloQueryResult } from '@apollo/client/core';
import { Router } from '@angular/router';
import {
  GetProductsGQL,
  Product,
  GetBrandsGQL,
  Brand,
  GetCategoriesGQL,
  Category,
} from '../../generated/graphql';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
})
export class ShopComponent implements OnInit {
  categories: Category[] = [];
  filteredProducts: Product[] = [];
  brands: Brand[] = [];
  allProducts: Product[] = [];
  cursor: string | null = null;
  hasNextPage: boolean = false;
  isBrandsCollapsed: boolean = true;
  isCategoriesCollapsed: boolean = true;
  searchProductForm: FormGroup = new FormGroup({
    search: new FormControl(''),
  });
  baseImageUrl: string = 'http://localhost:5044/images/';

  filterForm = new FormGroup({
    brand: new FormControl(null),
    category: new FormControl(null),
    minPrice: new FormControl(null),
    maxPrice: new FormControl(null),
  });

  constructor(
    private router: Router,
    private getproducts: GetProductsGQL,
    private getbrands: GetBrandsGQL,
    private getcategories: GetCategoriesGQL
  ) {}

  ngOnInit(): void {
    this.getAllProducts();
    this.getAllBrands();
    this.getAllCategories();
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any): void {
    const scrollTop = event.target.scrollingElement.scrollTop;
    const scrollHeight = event.target.scrollingElement.scrollHeight;
    const clientHeight = event.target.scrollingElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight - 10) {
      // Trigger when near bottom
      this.loadMoreProducts();
    }
  }
  getProductThumbnailUrl(product: Product): string {
    // Assuming the first image is used as the thumbnail
    const thumbnailUrl =
      product.pictureUrls.length > 0
        ? product.pictureUrls[0]
        : 'default-thumbnail.jpg';
    return `${this.baseImageUrl}${product.id}/${thumbnailUrl}`;
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

  getAllProducts(first: number = 15): void {
    const { brand, category, minPrice, maxPrice } = this.filterForm.value;

    this.getproducts
      .watch({
        first,
        cursor: this.cursor,
        brandId: brand ? parseInt(brand, 10) : null,
        categoryId: category ? parseInt(category, 10) : null,
        minPrice: minPrice ? parseFloat(minPrice) : null,
        maxPrice: maxPrice ? parseFloat(maxPrice) : null,
      })
      .valueChanges.pipe(
        map((result: ApolloQueryResult<any>) => result.data.productsAsync)
      )
      .subscribe({
        next: (data) => {
          if (data && data.nodes) {
            this.allProducts = [...this.allProducts, ...data.nodes];
            this.filteredProducts = this.applyFilters(this.allProducts); // Apply filters to all products

            if (data.pageInfo) {
              this.cursor = data.pageInfo.endCursor ?? null;
              this.hasNextPage = data.pageInfo.hasNextPage;
            }
          }
        },
        error: (error) => {
          console.error('Error fetching products:', error);
        },
      });
  }

  applyFilters(products: Product[]): Product[] {
    const { brand, category, minPrice, maxPrice } = this.filterForm.value;

    return products.filter((product) => {
      const matchesBrand = !brand || product.brandId === parseInt(brand, 10);
      const matchesCategory =
        !category || product.categoryId === parseInt(category, 10);
      const matchesMinPrice =
        !minPrice || product.retailPrice >= parseFloat(minPrice);
      const matchesMaxPrice =
        !maxPrice || product.retailPrice <= parseFloat(maxPrice);

      return (
        matchesBrand && matchesCategory && matchesMinPrice && matchesMaxPrice
      );
    });
  }

  loadMoreProducts(): void {
    if (this.hasNextPage) {
      this.getAllProducts(15); // Load next chunk of products
    } else {
      console.log('No more products to load.');
    }
  }

  filterProducts(): void {
    const { brand, category, minPrice, maxPrice } = this.filterForm.value;
    console.log('Filtering products');

    // Reset the product list and cursor before applying filters
    this.allProducts = [];
    this.filteredProducts = [];
    this.cursor = null;

    this.getproducts
      .watch()
      .refetch({
        first: 15,
        brandId: brand ? parseInt(brand, 10) : null,
        categoryId: category ? parseInt(category, 10) : null,
        minPrice: minPrice ? parseFloat(minPrice) : null,
        maxPrice: maxPrice ? parseFloat(maxPrice) : null,
      })
      .then((data) => {
        if (data && data.data.productsAsync?.nodes) {
          console.log('Fetched products with filters:', {
            brand,
            category,
            minPrice,
            maxPrice,
          });
          console.log('Data received:', data.data.productsAsync?.nodes);

          this.allProducts = data.data.productsAsync.nodes;
          this.filteredProducts = this.applyFilters(this.allProducts); // Apply filters to all products

          if (data.data.productsAsync.pageInfo) {
            this.cursor = data.data.productsAsync.pageInfo.endCursor ?? null;
            this.hasNextPage = data.data.productsAsync.pageInfo.hasNextPage;
          }
        }
      });

    console.log('Filter values:', { brand, category, minPrice, maxPrice });
    this.filteredProducts = this.applyFilters(this.allProducts); // Apply filters to all products
  }

  toggleBrands(): void {
    this.isBrandsCollapsed = !this.isBrandsCollapsed;
  }

  toggleCategories(): void {
    this.isCategoriesCollapsed = !this.isCategoriesCollapsed;
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

  searchProduct(code: string): void {
    // Implement search product functionality if needed
  }

  navigateToProduct(productId: number): void {
    console.log(`Navigating to product with ID: ${productId}`);
    this.router.navigate(['/product', productId]);
  }
}
