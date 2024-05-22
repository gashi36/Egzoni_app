import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import {
  AddProductssGQL,
  GetProductsGQL,
  Product,
  UpdateAllGQL,
  // UpdateAllGQL,
} from '../../generated/graphql';
import { Subject } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { GET_CARPETS } from './graphql.operations';

@Component({
  selector: 'app-carpets',
  templateUrl: './carpets.component.html',
  styleUrl: './carpets.component.css',
})
export class CarpetsComponent implements OnInit {
  products: Subject<Product[]> = new Subject();
  imagePath: string = 'assets/egzoni.png';

  addProductForm = new FormGroup({
    kodi: new FormControl(''),
    masa: new FormControl(''),
    ngjyra: new FormControl(''),
    sasia: new FormControl(''),
    tipi: new FormControl(''),
    cmimiIBlerjes: new FormControl(''),
    cmimiIShitjes: new FormControl(''),
  });
  updateProductForm = new FormGroup({
    id: new FormControl(),
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
    private addpro: AddProductssGQL,
    private updateAll: UpdateAllGQL
  ) {}

  ngOnInit(): void {
    this.getAllProducts();
    // this.addProductsAsync();
    this.UpdateProductsAsync();
  }
  getAllProducts(): void {
    this.getproducts.watch().valueChanges.subscribe({
      next: ({ data }) => {
        this.products.next(data.productsAsync as Product[]);
        console.log('Query Done');
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  addProductsAsync(): void {
    if (this.addProductForm.valid) {
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
          },
          error: (error) => {
            console.log(error);
          },
        });
    }
  }

  UpdateProductsAsync(): void {
    console.log(this.updateProductForm.value);
    console.log(this.updateProductForm.errors);
    if (this.updateProductForm?.valid) {
      this.updateAll
        .mutate({
          id: parseInt(this.updateProductForm.controls.id.value ?? Number),
          kodi: this.updateProductForm.controls.kodi.value ?? '',
          masa: this.updateProductForm.controls.masa.value ?? '',
          ngjyra: this.updateProductForm.controls.ngjyra.value ?? '',
          sasia:
            parseFloat(this.updateProductForm.controls.sasia.value ?? '') || 0,
          tipi: this.updateProductForm.controls.tipi.value ?? '',
          cmimiIBlerjes:
            parseFloat(
              this.updateProductForm.controls.cmimiIBlerjes.value ?? ''
            ) || 0,
          cmimiIShitjes:
            parseFloat(
              this.updateProductForm.controls.cmimiIShitjes.value ?? ''
            ) || 0,
        })
        .subscribe({
          next: ({ data }) => {
            console.log(data);
            console.log('Mutation Done');
          },
          error: (error) => {
            const errorMessage = `Error adding product: ${error.message}`;
            console.error(errorMessage);
          },
        });
    }
  }
}
