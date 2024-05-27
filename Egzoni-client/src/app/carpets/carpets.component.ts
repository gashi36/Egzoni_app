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
import {
  FormControl,
  FormGroup,
  Validators,
  FormsModule,
} from '@angular/forms';
import { query } from 'express';
import { subscribe } from '@parcel/watcher';
// import { GET_CARPETS } from './graphql.operations';

@Component({
  selector: 'app-carpets',
  templateUrl: './carpets.component.html',
  styleUrl: './carpets.component.css',
})
export class CarpetsComponent implements OnInit {
  products: Product[] = [];
  imagePath: string = 'assets/egzoni.png';
  isEdit: boolean = false;

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
  carpets: any[] = [];
  error: any;

  constructor(
    private getproducts: GetProductsGQL,
    private editProd: EditProductGQL,
    private addpro: AddProductssGQL,
    private deleteprod: DeleteProductGQL,
    private searchprod: SearchProductsGQL
  ) {}

  ngOnInit(): void {
    this.getAllProducts();
  }
  getAllProducts(): void {
    this.getproducts.watch().valueChanges.subscribe({
      next: ({ data }) => {
        this.products = data.productsAsync as Product[];
        console.log('Query Done');
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  editProduct(id: number) {
    var product = this.products.find((p) => p.id === id);

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
              window.location.reload();
            },
            error: (error) => {
              this.isEdit = false;
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
              window.location.reload();
            },
            error: (error) => {
              console.log(error);
            },
          });
      }
    }
  }
  deleteProduct(id: number): void {
    this.deleteprod
      .mutate({
        id: id,
      })
      .subscribe({
        next: ({ data }) => {
          console.log('product removed');
          window.location.reload();
        },
        error: (error) => {
          console.log(error);
        },
      });
  }
  searchProduct(kodi: string): void {
    this.searchprod
      .fetch({
        kodi: kodi,
      })
      .subscribe({
        next: ({ data }) => {
          this.products = data.productsAsync as Product[];
          console.log('Search result:', this.products);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }
  cancelSearch(): void {
    window.location.reload();
  }
}
