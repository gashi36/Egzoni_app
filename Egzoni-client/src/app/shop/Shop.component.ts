import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApolloQueryResult } from '@apollo/client/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private activatedRoute: ActivatedRoute, // ActivatedRoute to read query params
    private router: Router,
    private getProductsGQL: GetProductsGQL,
    private getBrandsGQL: GetBrandsGQL,
    private getCategoriesGQL: GetCategoriesGQL
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      const brandId = params['brand'];
      const categoryId = params['category'];

      // Patch the form with undefined instead of null for empty values
      this.filterForm.patchValue({
        brand: brandId ? brandId : undefined,   // Keep as string or undefined if empty
        category: categoryId ? categoryId : undefined,  // Keep as string or undefined if empty
      });



      // If there's a brand or category filter, apply it
      if (brandId || categoryId) {
        this.filterProducts(); // Apply filters based on query params
      } else {
        this.getAllProductss(); // Load all products if no filters
      }
    });


    this.getAllProductss();
    this.getAllBrands();
    this.getAllCategories();
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any): void {
    const scrollTop = event.target.scrollingElement.scrollTop;
    const scrollHeight = event.target.scrollingElement.scrollHeight;
    const clientHeight = event.target.scrollingElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight - 10) {
      this.loadMoreProducts();
    }
  }

  getProductThumbnailUrl(product: Product): string {
    const thumbnailUrl = product.thumbnailUrl || 'default-thumbnail.jpg';
    return `${this.baseImageUrl}${product.id}/${thumbnailUrl}`;
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
          this.brands = data || [];
        },
        error: (error) => {
          console.error('Error fetching brands:', error);
        },
      });
  }

  // Ensure correct import statements and structure as per your application's design
  getAllProductss(first: number = 15): void {
    const { brand, category, minPrice, maxPrice } = this.filterForm.value;

    this.getProductsGQL
      .watch({
        first,
        cursor: this.cursor,
        brandId: brand ? parseInt(brand, 10) : null,
        categoryId: category ? parseInt(category, 10) : null,
        minPrice: minPrice ? parseFloat(minPrice) : null,
        maxPrice: maxPrice ? parseFloat(maxPrice) : null,
      })
      .valueChanges
      .pipe(
        map((result: ApolloQueryResult<any>) => result.data.productsAsync)
      )
      .subscribe({
        next: (data) => {
          if (data?.nodes) {
            this.allProducts = data.nodes.map((product: any) => {
              // Check for a valid sale period
              const validSale = product.sales?.find((sale: any) => sale.isValidSalePeriod);

              return {
                ...product,
                discountedPrice: validSale?.discountedPrice ?? null, // Assign discountedPrice or null
                discountPercentage: validSale?.discountPercentage ?? 0, // Default to 0 if not found
                saleId: validSale?.id ?? null, // Add additional sale info if needed
              };
            });

            this.filteredProducts = this.applyFilters(this.allProducts);

            // Update pagination information
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
      this.getAllProductss(15);
    } else {
      console.log('No more products to load.');
    }
  }

  filterProducts(): void {
    const { brand, category, minPrice, maxPrice } = this.filterForm.value;

    this.allProducts = [];
    this.filteredProducts = [];
    this.cursor = null;

    this.getProductsGQL
      .watch({
        first: 15,
        cursor: null,
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
            this.allProducts = data.nodes;
            this.filteredProducts = this.applyFilters(this.allProducts);

            if (data.pageInfo) {
              this.cursor = data.pageInfo.endCursor ?? null;
              this.hasNextPage = data.pageInfo.hasNextPage;
            }
          }
        },
        error: (error) => {
          console.error('Error fetching products with filters:', error);
        },
      });
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
