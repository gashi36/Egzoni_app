import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  Brand,
  Category,
  GetBrandsGQL,
  GetCategoriesGQL,
  GetProductsGQL,
  Product,
} from '../../generated/graphql';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = []; // Filtered products for display
  baseImageUrl: string = 'http://localhost:5044/images/';
  brands: Brand[] = [];
  categories: Category[] = [];

  constructor(
    private router: Router,
    private getproducts: GetProductsGQL,
    private getbrands: GetBrandsGQL,
    private getcategories: GetCategoriesGQL
  ) {}

  ngOnInit(): void {
    this.getAllProducts(); // Fetch products when component initializes
  }

  getAllProducts(first: number = 15): void {
    this.getproducts
      .watch({ first })
      .valueChanges.pipe(map((result: any) => result.data.productsAsync))
      .subscribe({
        next: (data) => {
          if (data?.nodes) {
            // Take only the first 4 products
            this.filteredProducts = data.nodes.slice(0, 4);
          } else {
            console.error('No products found');
          }
        },
        error: (error) => {
          console.error('Error fetching products:', error);
        },
      });
  }

  getProductThumbnailUrl(product: Product): string {
    // Assuming the first image is used as the thumbnail
    const thumbnailUrl =
      product.pictureUrls.length > 0
        ? product.pictureUrls[0]
        : 'default-thumbnail.jpg';
    return `${this.baseImageUrl}${product.id}/${thumbnailUrl}`;
  }

  navigateToProduct(productId: number): void {
    this.router.navigate([`/products/${productId}`]);
  }
}
