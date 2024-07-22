import { Component, OnInit } from '@angular/core';
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
  selector: 'app-Shop',
  templateUrl: './Shop.component.html',
  styleUrls: ['./Shop.component.css'],
})
export class ShopComponent implements OnInit {
  categories: Category[] = [];
  filteredProducts: Product[] = [];
  brands: Brand[] = [];
  products: Product[] = [];
  allProducts: Product[] = [];
  cursor: string | null = null;
  hasNextPage: boolean = false;
  isBrandsCollapsed: boolean = true;
  isCategoriesCollapsed: boolean = true;
  searchProductForm: FormGroup = new FormGroup({
    search: new FormControl(''),
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

  loadMoreProducts(): void {
    if (this.hasNextPage) {
      const currentLength = this.allProducts.length;
      console.log('Current length:', currentLength);
      this.getAllProducts(currentLength + 10);
    } else {
      console.log('No more products to load.');
    }
  }

  getAllProducts(first: number = 15): void {
    this.getproducts
      .watch({ first, cursor: this.cursor })
      .valueChanges.pipe(
        map((result: ApolloQueryResult<any>) => result.data.productsAsync)
      )
      .subscribe({
        next: (data) => {
          if (data && data.nodes) {
            const newProducts = data.nodes.map((product: Product) => ({
              ...product,
              showFullDescription: false,
            }));
            this.allProducts = [...this.allProducts, ...newProducts];
            this.products = [...this.allProducts];
            this.filteredProducts = [...this.allProducts];
            if (data.pageInfo) {
              this.cursor = data.pageInfo.endCursor ?? null;
              this.hasNextPage = data.pageInfo.hasNextPage;
              console.log('Cursor:', this.cursor);
              console.log('Has next page:', this.hasNextPage);
            }
          } else {
            console.error('No products found.');
          }
        },
        error: (error) => {
          console.error('Error fetching products:', error);
        },
      });
  }

  toggleBrands(): void {
    this.isBrandsCollapsed = !this.isBrandsCollapsed;
  }

  toggleCategories(): void {
    this.isCategoriesCollapsed = !this.isCategoriesCollapsed;
  }

  filterProductsByBrand(brandId: number): void {
    this.filteredProducts = this.allProducts.filter(
      (product) => product.brandId === brandId
    );
    this.products = [...this.filteredProducts]; // Update products array
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

  filterProductsByCategory(categoryId: number): void {
    this.filteredProducts = this.allProducts.filter(
      (product) => product.categoryId === categoryId
    );
    this.products = [...this.filteredProducts]; // Update products array
  }

  searchProduct(code: string): void {
    // Implement search product functionality if needed
  }

  navigateToProduct(productId: number): void {
    this.router.navigate(['/product', productId]);
  }
}
