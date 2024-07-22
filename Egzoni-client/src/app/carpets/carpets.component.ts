import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Apollo } from 'apollo-angular';
import {
  AddProductssGQL,
  GetProductsGQL,
  // EditProductGQL,
  Product,
  DeleteProductGQL,
  SearchProductsGQL,
  AddBrandAsyncGQL,
  AddCategoryAsyncGQL,
  GetBrandsGQL,
  GetCategoriesGQL,
  Category,
  Brand,
  UpdateQuantityGQL,
} from '../../generated/graphql';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthGuard } from '../auth.guard';
import { map } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap/modal/modal';

@Component({
  selector: 'app-carpets',
  templateUrl: './carpets.component.html',
  styleUrls: ['./carpets.component.css'],
})
export class CarpetsComponent implements OnInit {
  @ViewChild('updateQuantityModal') updateQuantityModal!: TemplateRef<any>;
  products: Product[] = [];
  categories: Category[] = [];
  brands: Brand[] = [];
  imagePathLogo: string = 'assets/egzoni.png';
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
  isAddingBrand: boolean = false;
  isAddingCategory: boolean = false;

  searchProductForm: FormGroup = new FormGroup({
    search: new FormControl(''),
  });

  addProductForm = new FormGroup({
    id: new FormControl<number | undefined>(undefined),
    code: new FormControl(''),
    size: new FormControl(''),
    color: new FormControl(''),
    description: new FormControl(''),
    quantity: new FormControl(''),
    purchasePrice: new FormControl(''),
    retailPrice: new FormControl(''),
    categoryId: new FormControl<'' | undefined>(undefined),
    brandId: new FormControl<'' | undefined>(undefined),
    image: new FormControl<File | undefined>(undefined, [
      Validators.required,
      Validators.minLength(5),
    ]),
  });
  updateQuantityForm = new FormGroup({
    productId: new FormControl<number | undefined>(undefined),
    quantity: new FormControl('', Validators.required),
  });

  addBrandForm = new FormGroup({ addBrand: new FormControl('') });
  addCategoryForm = new FormGroup({ addCategory: new FormControl('') });

  constructor(
    private router: Router,
    private getproducts: GetProductsGQL,
    // private editProd: EditProductGQL,
    private addpro: AddProductssGQL,
    private deleteprod: DeleteProductGQL,
    private searchprod: SearchProductsGQL,
    private addBrand: AddBrandAsyncGQL,
    private addCategory: AddCategoryAsyncGQL,
    private getbrands: GetBrandsGQL,
    private getcategories: GetCategoriesGQL,
    private authGuard: AuthGuard,
    private updateQuantityGQL: UpdateQuantityGQL,
    private modalService: NgbModal
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
  updateProductQuantity(productId: number, newQuantity: number): void {
    this.updateQuantityGQL
      .mutate({ id: productId, newQuantity: newQuantity })
      .subscribe({
        next: () => {
          // You may want to refresh the product list or update the specific product in the local state
          this.getAllProducts();
        },
        error: (error) => {
          console.error('Error updating quantity:', error);
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

  addBrandAsync(): void {
    const brandName = this.addBrandForm.controls.addBrand.value ?? '';
    if (brandName) {
      this.addBrand.mutate({ name: brandName }).subscribe({
        next: (data) => {
          console.log('Brand added:', data);
          this.getAllBrands(); // Refresh the brands list
        },
        error: (error) => {
          console.log('Error adding brand:', error);
        },
      });
    }
  }

  addCategoryAsync(): void {
    const categoryName = this.addCategoryForm.controls.addCategory.value ?? '';
    if (categoryName) {
      this.addCategory.mutate({ name: categoryName }).subscribe({
        next: (data) => {
          console.log('Category added:', data);
          this.getAllCategories(); // Refresh the categories list
        },
        error: (error) => {
          console.log('Error adding category:', error);
        },
      });
    }
  }

  getAllProducts(first: number = 15): void {
    this.isLoadingProducts = true;
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
  }

  loadMoreProducts(): void {
    if (this.hasNextPage) {
      this.isLoadingMoreProducts = true;
      this.getAllProducts();
      this.isLoadingMoreProducts = false;
    }
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
  openUpdateQuantityModal(productId: number): void {
    this.updateQuantityForm.patchValue({ productId });
    this.modalService.open(this.updateQuantityModal);
  }

  updateQuantity(): void {
    if (this.updateQuantityForm.invalid) {
      return;
    }
  }
  // editProduct(id: number): void {
  //   const product = this.products.find((p) => p.id === id);

  //   if (!product) {
  //     window.alert('Product not found');
  //     return;
  //   }

  //   this.isEdit = true;

  //   this.addProductForm.controls.id.setValue(id);
  //   this.addProductForm.controls.code.setValue(product.code!);
  //   this.addProductForm.controls.size.setValue(product.size!);
  //   this.addProductForm.controls.color.setValue(product.color!);
  //   this.addProductForm.controls.quantity.setValue(product.quantity);
  //   this.addProductForm.controls.purchasePrice.setValue(product.purchasePrice);
  //   this.addProductForm.controls.retailPrice.setValue(product.retailPrice);

  //   if (product.description) {
  //     this.addProductForm.controls.description.setValue(product.description);
  //   } else {
  //     this.addProductForm.controls.description.setValue('');
  //   }
  // }
  // addProductsAsync(): void {
  //   const formValues = this.addProductForm.value;
  //   const image = formValues.image;
  //   const brandId = parseInt(
  //     this.addProductForm.controls.brandId.value ?? '',
  //     10
  //   );
  //   const categoryId = parseInt(
  //     this.addProductForm.controls.categoryId.value ?? '',
  //     10
  //   );

  //   if (this.addProductForm.valid) {
  //     this.isAddingProduct = true;
  //     setTimeout(() => {
  //       if (this.isEdit) {
  //         this.editProd
  //           .mutate({
  //             id: this.addProductForm.controls.id.value,
  //             code: formValues.code ?? '',
  //             size: formValues.size ?? '',
  //             color: formValues.color ?? '',
  //             description: formValues.description ?? '',
  //             quantity: parseFloat(formValues.quantity ?? '') || 0,
  //             purchasePrice: parseFloat(formValues.purchasePrice ?? '') || 0,
  //             retailPrice: parseFloat(formValues.retailPrice ?? '') || 0,
  //             categoryId: categoryId,
  //             brandId: brandId,
  //             image,
  //           })
  //           .subscribe({
  //             next: ({ data }) => {
  //               console.log('EDIT Done');
  //               this.isEdit = false;
  //               this.isAddingProduct = false;
  //               window.location.reload();
  //             },
  //             error: (error) => {
  //               this.isEdit = false;
  //               this.isAddingProduct = false;
  //               console.log(error);
  //             },
  //           });
  //       } else {
  //         this.addpro
  //           .mutate(
  //             {
  //               code: formValues.code ?? '',
  //               size: formValues.size ?? '',
  //               color: formValues.color ?? '',
  //               description: formValues.description ?? '',
  //               quantity: parseFloat(formValues.quantity ?? '') || 0,
  //               purchasePrice: parseFloat(formValues.purchasePrice ?? '') || 0,
  //               retailPrice: parseFloat(formValues.retailPrice ?? '') || 0,
  //               categoryId: categoryId,
  //               brandId: brandId,
  //               image,
  //             },
  //             {
  //               context: {
  //                 useMultipart: true,
  //               },
  //             }
  //           )
  //           .subscribe({
  //             next: ({ data }) => {
  //               console.log('Mutation Done');

  //               // Check and add brand if provided
  //               if (formValues.brandId) {
  //                 const existingBrand = this.brands.find(
  //                   (b) => b.id === parseInt(formValues.brandId ?? '', 10)
  //                 );
  //                 if (!existingBrand) {
  //                   // If brand doesn't exist in the list, add it
  //                   this.addBrandAsync();
  //                 }
  //               }

  //               // Check and add category if provided
  //               if (formValues.categoryId) {
  //                 const existingCategory = this.categories.find(
  //                   (c) => c.id === parseInt(formValues.categoryId ?? '', 10)
  //                 );
  //                 if (!existingCategory) {
  //                   // If category doesn't exist in the list, add it
  //                   this.addCategoryAsync();
  //                 }
  //               }

  //               this.isAddingProduct = false;
  //               window.location.reload(); // Refresh page or update products list
  //             },
  //             error: (error) => {
  //               this.isAddingProduct = false;
  //               console.error('ApolloError:', error);
  //               if (error.graphQLErrors) {
  //                 console.error('[[GraphQL Errors:]]', error.graphQLErrors);
  //               }
  //               if (error.networkError) {
  //                 console.error('Network Error:', error.networkError);
  //               }
  //               if (error.clientErrors) {
  //                 console.error('Client Errors:', error.clientErrors);
  //               }
  //               if (error.protocolErrors) {
  //                 console.error('Protocol Errors:', error.protocolErrors);
  //               }
  //               if (!this.image) {
  //                 console.error('Image is missing');
  //                 return;
  //               }
  //             },
  //           });
  //       }
  //     }, 500);
  //   }
  // }
  addProductsAsync(): void {
    const formValues = this.addProductForm.value;
    const image = formValues.image;
    const brandId = parseInt(
      this.addProductForm.controls.brandId.value ?? '',
      10
    );
    const categoryId = parseInt(
      this.addProductForm.controls.categoryId.value ?? '',
      10
    );

    if (this.addProductForm.valid) {
      this.isAddingProduct = true;
      setTimeout(() => {
        this.addpro
          .mutate(
            {
              code: formValues.code ?? '',
              size: formValues.size ?? '',
              color: formValues.color ?? '',
              description: formValues.description ?? '',
              quantity: parseFloat(formValues.quantity ?? '') || 0,
              purchasePrice: parseFloat(formValues.purchasePrice ?? '') || 0,
              retailPrice: parseFloat(formValues.retailPrice ?? '') || 0,
              categoryId: categoryId,
              brandId: brandId,
              image,
            },
            {
              context: {
                useMultipart: true,
              },
            }
          )
          .subscribe({
            next: ({ data }) => {
              console.log('Mutation Done');

              // Check and add brand if provided
              if (formValues.brandId) {
                const existingBrand = this.brands.find(
                  (b) => b.id === parseInt(formValues.brandId ?? '', 10)
                );
                if (!existingBrand) {
                  // If brand doesn't exist in the list, add it
                  this.addBrandAsync();
                }
              }

              // Check and add category if provided
              if (formValues.categoryId) {
                const existingCategory = this.categories.find(
                  (c) => c.id === parseInt(formValues.categoryId ?? '', 10)
                );
                if (!existingCategory) {
                  // If category doesn't exist in the list, add it
                  this.addCategoryAsync();
                }
              }

              this.isAddingProduct = false;
              window.location.reload(); // Refresh page or update products list
            },
            error: (error) => {
              this.isAddingProduct = false;
              console.error('ApolloError:', error);
              if (error.graphQLErrors) {
                console.error('[[GraphQL Errors:]]', error.graphQLErrors);
              }
              if (error.networkError) {
                console.error('Network Error:', error.networkError);
              }
              if (error.clientErrors) {
                console.error('Client Errors:', error.clientErrors);
              }
              if (error.protocolErrors) {
                console.error('Protocol Errors:', error.protocolErrors);
              }
              if (!this.image) {
                console.error('Image is missing');
                return;
              }
            },
          });
      }, 500);
    }
  }

  get image() {
    return this.addProductForm.controls?.image;
  }
  setFile(event: any): void {
    this.image.setValue(event.target.files[0]);
  }

  deleteProduct(id: number): void {
    this.isDeletingProduct = true;
    this.deleteprod.mutate({ id }).subscribe({
      next: () => {
        console.log('Product removed');
        this.isDeletingProduct = false;
        window.location.reload();
      },
      error: (error: any) => {
        this.isDeletingProduct = false;
        console.error('Error deleting product:', error);
      },
    });
  }
  searchProduct(code: string): void {
    this.isSearchingProduct = true;
    setTimeout(() => {
      this.searchprod
        .fetch({
          code: code,
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
