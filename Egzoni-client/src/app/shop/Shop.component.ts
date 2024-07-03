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
  SearchProductsGQL,
} from '../../generated/graphql';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-Shop',
  templateUrl: './Shop.component.html',
  styleUrls: ['./Shop.component.css'],
})
export class ShopComponent implements OnInit {
  categories: Category[] = [];
  brands: Brand[] = [];
  products: Product[] = [];
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
            console.error('No brands found');
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
    this.getproducts
      .watch({ first, cursor: this.cursor })
      .valueChanges.pipe(
        map((result: ApolloQueryResult<any>) => result.data.productsAsync)
      )
      .subscribe({
        next: (data) => {
          if (data && data.nodes) {
            this.products = data.nodes;
            if (data.pageInfo) {
              this.cursor = data.pageInfo.endCursor ?? null;
              this.hasNextPage = data.pageInfo.hasNextPage;
            }
          } else {
            console.error('No products found');
          }
        },
        error: (error) => {
          console.error('Error fetching products:', error);
        },
      });
  }

  loadMoreProducts(): void {
    if (this.hasNextPage) {
      const currentLength = this.products.length;
      this.getAllProducts(currentLength + 15);
    }
  }

  toggleBrands(): void {
    this.isBrandsCollapsed = !this.isBrandsCollapsed;
  }
  toggleCategories(): void {
    this.isCategoriesCollapsed = !this.isCategoriesCollapsed;
  }

  filterProductsByBrand(brandId: number): void {
    // Example: Filter products based on the selected brand ID
    this.products = this.products.filter(
      (product) => product.brandId === brandId
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

  filterProductsByCategory(categoryId: number): void {
    // Example: Filter products based on the selected brand ID
    this.products = this.products.filter(
      (product) => product.categoryId === categoryId
    );
  }
  searchProduct(code: string): void {
    // Implement search product functionality if needed
  }

  cancelSearch(): void {
    // Implement cancel search functionality if needed
  }
}
