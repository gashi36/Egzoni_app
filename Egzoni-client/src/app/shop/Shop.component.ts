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
  isFilterVisible = false;
  screenSmall = window.innerWidth < 768;

  filterForm = new FormGroup({
    brand: new FormControl("all"),
    category: new FormControl("all"),
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
      const productIds = params['products'];

      console.log('Received product IDs in query params:', productIds);

      if (productIds) {
        const productIdArray = productIds.split(',').map((id: string) => id.trim());
        console.log('Parsed product IDs array:', productIdArray);

        // Filter products based on received IDs
        this.filteredProducts = this.allProducts.filter((product) =>
          productIdArray.includes(product.id.toString())
        );

        console.log('Filtered products:', this.filteredProducts);
      } else {
        console.warn('No product IDs provided. Displaying all products.');
        this.filteredProducts = this.allProducts;
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

  refetchProducts(): void {
    this.cursor = null;
    this.hasNextPage = false;
    this.allProducts = [];
    this.filteredProducts = [];
    this.getAllProductss();
  }

  // Ensure correct import statements and structure as per your application's design
  getAllProductss(first: number = 15): void {
    let { brand, category, minPrice, maxPrice } = this.filterForm.value;

    // Set brand and category to null if "all" is selected
    brand = brand === 'all' ? null : brand;
    category = category === 'all' ? null : category;

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
    let { brand, category, minPrice, maxPrice } = this.filterForm.value;

    // Set brand and category to null if "all" is selected
    brand = brand === 'all' ? null : brand;
    category = category === 'all' ? null : category;

    return products.filter((product) => {
      const matchesBrand = !brand || product.brandId === parseInt(brand, 10);
      const matchesCategory = !category || product.categoryId === parseInt(category, 10);
      const matchesMinPrice = !minPrice || product.retailPrice >= parseFloat(minPrice);
      const matchesMaxPrice = !maxPrice || product.retailPrice <= parseFloat(maxPrice);

      return matchesBrand && matchesCategory && matchesMinPrice && matchesMaxPrice;
    }).map((product) => {
      const validSale = product.sales?.find((sale: any) => sale.isValidSalePeriod);
      return {
        ...product,
        discountedPrice: validSale?.discountedPrice ?? null,
        discountPercentage: validSale?.discountPercentage ?? 0,
        saleId: validSale?.id ?? null,
      };
    });
  }

  loadMoreProducts(): void {
    if (this.hasNextPage) {
      const { brand, category, minPrice, maxPrice } = this.filterForm.value;

      this.getProductsGQL
        .watch({
          first: 15,
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
              const newProducts = data.nodes.map((product: any) => {
                const validSale = product.sales?.find((sale: any) => sale.isValidSalePeriod);

                return {
                  ...product,
                  discountedPrice: validSale?.discountedPrice ?? null,
                  discountPercentage: validSale?.discountPercentage ?? 0,
                  saleId: validSale?.id ?? null,
                };
              });

              // Ensure only unique products are added
              const uniqueProducts = newProducts.filter(
                (newProduct: { id: number; }) => !this.allProducts.some((existingProduct) => existingProduct.id === newProduct.id)
              );

              this.allProducts = [...this.allProducts, ...uniqueProducts];
              this.filteredProducts = this.applyFilters(this.allProducts);

              if (data.pageInfo) {
                this.cursor = data.pageInfo.endCursor ?? null;
                this.hasNextPage = data.pageInfo.hasNextPage;
              }
            }
          },
          error: (error) => {
            console.error('Error fetching more products:', error);
          },
        });
    } else {
      console.log('No more products to load.');
    }
  }

  filterProducts(searchTerm?: string): void {
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
            this.allProducts = data.nodes.map((product: any) => {
              const validSale = product.sales?.find((sale: any) => sale.isValidSalePeriod);
              return {
                ...product,
                discountedPrice: validSale?.discountedPrice ?? null,
                discountPercentage: validSale?.discountPercentage ? Math.round(validSale.discountPercentage) : 0,
                saleId: validSale?.id ?? null,
              };
            });

            this.filteredProducts = this.applyFilters(this.allProducts);

            if (data.pageInfo) {
              this.cursor = data.pageInfo.endCursor ?? null;
              this.hasNextPage = data.pageInfo.hasNextPage;
            }

            console.log('Filtered Products:', this.filteredProducts);
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

  toggleFilterVisibility() {
    this.isFilterVisible = !this.isFilterVisible;
  }

  navigateToProduct(productId: number): void {
    console.log(`Navigating to product with ID: ${productId}`);
    this.router.navigate(['/product', productId]);
  }

  isProductOutOfStock(product: Product): boolean {
    return product.quantity === 0;
  }

  priceFormatter(value: number): string {
    return `${value} €`;
  }
}
