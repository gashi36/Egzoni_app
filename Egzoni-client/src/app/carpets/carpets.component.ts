import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import {
  AddProductssGQL,
  GetProductsGQL,
  EditProductGQL,
  Product,
  DeleteProductGQL,
  SearchProductsGQL,
} from '../../generated/graphql';
import { Subject } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthGuard } from '../auth.guard';
@Component({
  selector: 'app-carpets',
  templateUrl: './carpets.component.html',
  styleUrls: ['./carpets.component.css'],
})
export class CarpetsComponent implements OnInit {
  [x: string]: any;
  products: Product[] = [];
  imagePath: string = 'assets/egzoni.png';
  isEdit: boolean = false;
  cursor: string | null = null;
  hasNextPage: boolean = false;
  private authSecretKey = 'Bearer Token';

  isLoadingProducts: boolean = false;
  isLoadingMoreProducts: boolean = false;
  isEditingProduct: boolean = false;
  isAddingProduct: boolean = false;
  isDeletingProduct: boolean = false;
  isSearchingProduct: boolean = false;

  searchProductForm: FormGroup = new FormGroup({
    search: new FormControl(''),
  });

  addProductForm = new FormGroup({
    id: new FormControl<number | undefined>(undefined),
    kodi: new FormControl(''),
    masa: new FormControl(''),
    ngjyra: new FormControl(''),
    sasia: new FormControl(''),
    tipi: new FormControl(''),
    cmimiIBlerjes: new FormControl(''),
    cmimiIShitjes: new FormControl(''),
  });

  constructor(
    private router: Router,
    private getproducts: GetProductsGQL,
    private editProd: EditProductGQL,
    private addpro: AddProductssGQL,
    private deleteprod: DeleteProductGQL,
    private searchprod: SearchProductsGQL,
    private authGuard: AuthGuard
  ) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts(first: number = 15): void {
    this.isLoadingProducts = true;
    setTimeout(() => {
      this.getproducts
        .watch({ first, cursor: this.cursor })
        .valueChanges.pipe(map((result: any) => result.data.productsAsync))
        .subscribe({
          next: (data) => {
            this.isLoadingProducts = false;
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
            this.isLoadingProducts = false;
            console.error('Error fetching products:', error);
          },
        });
    }, 500);
  }

  loadMoreProducts(): void {
    if (this.hasNextPage) {
      this.isLoadingMoreProducts = true;
      setTimeout(() => {
        this.getAllProducts();
        this.isLoadingMoreProducts = false;
      }, 500);
    }
  }

  editProduct(id: number): void {
    const product = this.products.find((p) => p.id === id);

    if (!product) {
      window.alert('Product not found');
      return;
    }

    this.isEdit = true;

    this.addProductForm.controls.id.setValue(id);
    this.addProductForm.controls.kodi.setValue(product.kodi!);
    this.addProductForm.controls.masa.setValue(product.masa!);
    this.addProductForm.controls.ngjyra.setValue(product.ngjyra!);
    this.addProductForm.controls.sasia.setValue(product.sasia);
    this.addProductForm.controls.tipi.setValue(product.tipi!);
    this.addProductForm.controls.cmimiIBlerjes.setValue(product.cmimiIBlerjes);
    this.addProductForm.controls.cmimiIShitjes.setValue(product.cmimiIShitjes);
  }

  addProductsAsync(): void {
    if (this.addProductForm.valid) {
      this.isAddingProduct = true;
      setTimeout(() => {
        if (this.isEdit) {
          this.editProd
            .mutate({
              id: this.addProductForm.controls.id.value,
              kodi: this.addProductForm.controls.kodi.value ?? '',
              masa: this.addProductForm.controls.masa.value ?? '',
              ngjyra: this.addProductForm.controls.ngjyra.value ?? '',
              sasia:
                parseFloat(this.addProductForm.controls.sasia.value ?? '') || 0,
              tipi: this.addProductForm.controls.tipi.value ?? '',
              cmimiIBlerjes:
                parseFloat(
                  this.addProductForm.controls.cmimiIBlerjes.value ?? ''
                ) || 0,
              cmimiIShitjes:
                parseFloat(
                  this.addProductForm.controls.cmimiIShitjes.value ?? ''
                ) || 0,
            })
            .subscribe({
              next: ({ data }) => {
                console.log('EDIT Done');
                this.isEdit = false;
                this.isAddingProduct = false;
                window.location.reload();
              },
              error: (error) => {
                this.isEdit = false;
                this.isAddingProduct = false;
                console.log(error);
              },
            });
        } else {
          this.addpro
            .mutate({
              kodi: this.addProductForm.controls.kodi.value ?? '',
              masa: this.addProductForm.controls.masa.value ?? '',
              ngjyra: this.addProductForm.controls.ngjyra.value ?? '',
              sasia:
                parseFloat(this.addProductForm.controls.sasia.value ?? '') || 0,
              tipi: this.addProductForm.controls.tipi.value ?? '',
              cmimiIBlerjes:
                parseFloat(
                  this.addProductForm.controls.cmimiIBlerjes.value ?? ''
                ) || 0,
              cmimiIShitjes:
                parseFloat(
                  this.addProductForm.controls.cmimiIShitjes.value ?? ''
                ) || 0,
            })
            .subscribe({
              next: ({ data }) => {
                console.log('Mutation Done');
                this.isAddingProduct = false;
                window.location.reload();
              },
              error: (error) => {
                this.isAddingProduct = false;
                console.log(error);
              },
            });
        }
      }, 500);
    }
  }

  deleteProduct(id: number): void {
    this.isDeletingProduct = true;
    setTimeout(() => {
      this.deleteprod
        .mutate({
          id: id,
        })
        .subscribe({
          next: ({ data }) => {
            console.log('Product removed');
            this.isDeletingProduct = false;
            window.location.reload();
          },
          error: (error) => {
            this.isDeletingProduct = false;
            console.log(error);
          },
        });
    }, 500);
  }

  searchProduct(kodi: string): void {
    this.isSearchingProduct = true;
    setTimeout(() => {
      this.searchprod
        .fetch({
          kodi: kodi,
        })
        .subscribe({
          next: ({ data }) => {
            console.log(data?.productsAsync);
            this.isSearchingProduct = false;
            if (data?.productsAsync) {
              this.products = data.productsAsync.edges?.map(
                (x) => x.node
              ) as Product[];
            }
          },
          error: (error) => {
            this.isSearchingProduct = false;
            console.error('Error searching products:', error);
          },
        });
    }, 500);
  }

  cancelSearch(): void {
    window.location.reload();
  }

  logout(): void {
    this.authGuard.logout();
  }
}
