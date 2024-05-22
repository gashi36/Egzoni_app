import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import {
  AddProductssGQL,
  GetProductsGQL,
  Product,
} from '../../generated/graphql';
import { Subject } from 'rxjs';
import {
  FormControl,
  FormGroup,
  Validators,
  FormsModule,
} from '@angular/forms';
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
  carpets: any[] = [];
  error: any;

  constructor(
    private getproducts: GetProductsGQL,
    private addpro: AddProductssGQL
  ) {}

  ngOnInit(): void {
    this.getAllProducts();
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
}
