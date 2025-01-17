import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import {
  AddProductssGQL,
  GetProductsGQL,
  Product,
  DeleteProductGQL,
  SearchProductsGQL,
  AddBrandAsyncGQL,
  AddCategoryAsyncGQL,
  GetBrandsGQL,
  GetCategoriesGQL,
  Category,
  Brand,
  EditProductGQL,
  SearchProductsQuery,
  AddOnSaleProductsGQL,
} from '../../generated/graphql';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthGuard } from '../auth.guard';
import { map } from 'rxjs/operators';
import bootstrap from 'bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-carpets',
  templateUrl: './carpets.component.html',
  styleUrls: ['./carpets.component.css'],
})
export class CarpetsComponent implements OnInit {
  products: Product[] = [];
  selectedProducts: number[] = [];
  categories: Category[] = [];
  brands: Brand[] = [];
  imagePathLogo: string = 'assets/egzoni.png';
  isEdit: boolean = false;
  cursor: string | null = null;
  hasNextPage: boolean = false;
  isLoadingProducts: boolean = false;
  isLoadingMoreProducts: boolean = false;
  isEditingProduct: boolean = false;
  isAddingProduct: boolean = false;
  isDeletingProduct: boolean = false;
  isSearchingProduct: boolean = false;
  isAddingBrand: boolean = false;
  isAddingCategory: boolean = false;
  selectedLogo: File | null = null;


  searchProductForm = new FormGroup({
    search: new FormControl(''),
  });

  addProductForm = new FormGroup({
    id: new FormControl<number | undefined>(undefined),
    code: new FormControl('', [Validators.required]),
    size: new FormControl('', [Validators.required]),
    color: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    quantity: new FormControl('', [Validators.required]),
    purchasePrice: new FormControl('', [Validators.required]),
    retailPrice: new FormControl('', [Validators.required]),
    categoryId: new FormControl<number | undefined>(undefined),
    brandId: new FormControl<number | undefined>(undefined),
    image: new FormControl<File[]>([], [Validators.required]),
    thumbnail: new FormControl<File | null>(null, [Validators.required]),
  });

  addBrandForm = new FormGroup({
    addBrand: new FormControl(''), // Brand name input
    addLogo: new FormControl(null), // Logo upload input (can be null)
  });


  addCategoryForm = new FormGroup({ addCategory: new FormControl('') });


  addSaleForm = new FormGroup({
    discountPercentage: new FormControl<number | undefined>(undefined, [
      Validators.required,
      Validators.min(0),
      Validators.max(100),
    ]),
    startDate: new FormControl<Date | null>(null, [Validators.required]),
    endDate: new FormControl<Date | null>(null, [Validators.required]),
  });


  constructor(
    private router: Router,
    private getproducts: GetProductsGQL,
    private editProd: EditProductGQL,
    private addpro: AddProductssGQL,
    private deleteprod: DeleteProductGQL,
    private searchprod: SearchProductsGQL,
    private addBrand: AddBrandAsyncGQL,
    private addCategory: AddCategoryAsyncGQL,
    private getbrands: GetBrandsGQL,
    private getcategories: GetCategoriesGQL,
    private authGuard: AuthGuard,
    private addOnSaleProducts: AddOnSaleProductsGQL
  ) { }

  ngOnInit(): void {
    this.getAllProducts();
    this.getAllBrands();
    this.getAllCategories();
  }

  toggleAllProducts(): void {
    if (this.selectedProducts.length === this.products.length) {
      this.selectedProducts = []; // Clear all selections
    } else {
      this.selectedProducts = this.products.map(p => p.id); // Select all products
    }
    console.log(this.selectedProducts);

  }
  toggleProductSelection(productId: number): void {
    const index = this.selectedProducts.indexOf(productId);
    if (index > -1) {
      this.selectedProducts.splice(index, 1); // Remove product if already selected
    } else {
      this.selectedProducts.push(productId); // Add product if not selected
    }
    console.log(this.selectedProducts);


  }

  addProductsOnSale(): void {
    // Check if no products are selected or if the form is invalid
    if (this.selectedProducts.length === 0 || this.addSaleForm.invalid) {
      window.alert('Please select products and fill out the sale form.');
      return;
    }

    // Extract the form values
    const saleFormValues = this.addSaleForm.value;

    // Execute the mutation to add products to sale
    this.addOnSaleProducts.mutate({
      discountPercentage: saleFormValues.discountPercentage!,
      productIds: this.selectedProducts,
      startDate: saleFormValues.startDate!,
      endDate: saleFormValues.endDate!,
    }).subscribe({
      next: (response) => {
        console.log('Products added on sale:', response);
        window.alert('Products successfully added on sale.');
        this.selectedProducts = [];
        this.addSaleForm.reset();
      },
      error: (error) => {
        console.error('Error adding products to sale:', error);
        window.alert(`Error adding products to sale: ${error.message || error}`);
      },
    });

  }
  confirmAddProductsOnSale(): void {
    // Validate the selection and form before proceeding
    if (!this.areProductsSelected() || this.isFormInvalid()) {
      this.showAlert('Please select products and fill out the sale form.');
      return;
    }

    // Gather the form values
    const saleFormValues = this.getSaleFormValues();

    // Add products to sale
    this.executeAddProductsOnSale(saleFormValues);
  }

  private areProductsSelected(): boolean {
    return this.selectedProducts.length > 0;
  }

  private isFormInvalid(): boolean {
    return this.addSaleForm.invalid;
  }

  private showAlert(message: string): void {
    window.alert(message);
  }

  private getSaleFormValues(): any {
    return this.addSaleForm.value;
  }

  private executeAddProductsOnSale(saleFormValues: any): void {
    // Execute the mutation to add products to sale
    this.addProductsOnSale();
  }


  getAllCategories(): void {
    this.getcategories
      .watch()
      .valueChanges.pipe(map((result: any) => result.data.categories))
      .subscribe({
        next: (data) => {
          this.categories = data || [];
          if (!data.length) console.error('No categories found');
        },
        error: (error) => console.error('Error fetching categories:', error),
      });
  }

  getAllBrands(): void {
    this.getbrands
      .watch()
      .valueChanges.pipe(map((result: any) => result.data.brands))
      .subscribe({
        next: (data) => {
          this.brands = data || [];
          if (!data.length) console.error('No brands found');
        },
        error: (error) => console.error('Error fetching brands:', error),
      });
  }
  addBrandAsync(): void {
    const brandName = this.addBrandForm.controls.addBrand.value?.trim();
    const logo = this.selectedLogo; // Get the selected logo file

    if (brandName) {
      const brandInput: any = {
        name: brandName,
      };

      // Add logo only if it exists
      if (logo) {
        brandInput.logo = logo; // Include logo in the input if available
      }

      this.addBrand.mutate(brandInput, {
        context: {
          useMultipart: true,
        }
      }).subscribe({
        next: (data) => {
          console.log('Brand added:', data);
          this.getAllBrands(); // Refresh the brands list

          // Show success message with Swal
          Swal.fire({
            icon: 'success',
            title: 'Brendi u shtua',
            text: `${brandName} eshte shtuar me sukses`,
            confirmButtonColor: '#3085d6',
          });

          // Reset the form after successful submission
          this.addBrandForm.reset();
          this.selectedLogo = null; // Clear the selected file
        },
        error: (error) => {
          console.log('Error adding brand:', error);

          // Show error message with Swal
          Swal.fire({
            icon: 'error',
            title: 'Gabim',
            text: 'Gabim ne shtimin e brendit!',
            confirmButtonColor: '#d33',
          });
        },
      });
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Kërkohet informacion',
        text: 'Ju lutem plotësoni emrin e brendit!',
        confirmButtonColor: '#3085d6',
      });
    }
  }


  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedLogo = input.files[0]; // Get the first selected file
    } else {
      this.selectedLogo = null; // Reset if no file is selected
    }
  }
  addCategoryAsync(): void {
    const categoryName = this.addCategoryForm.controls.addCategory.value?.trim();
    if (categoryName) {
      this.addCategory.mutate({ name: categoryName }).subscribe({
        next: (data) => {
          console.log('Category added:', data);
          this.getAllCategories(); // Refresh the categories list

          // Show success message with Swal
          Swal.fire({
            icon: 'success',
            title: 'Kategoria u shtua',
            text: `${categoryName} eshte shtuar me sukses`,
            confirmButtonColor: '#3085d6',
          });
        },
        error: (error) => {
          console.log('Error adding category:', error);

          // Show error message with Swal
          Swal.fire({
            icon: 'error',
            title: 'Gabim',
            text: 'Gabim ne shtimin e kategorise',
            confirmButtonColor: '#d33',
          });
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
          if (data?.nodes) {
            this.products = data.nodes.map((product: any) => {
              // Check if there are sales and assign values if they exist
              if (product.sales) {
                const sale = product.sales; // sales is not an array, it's an object

                // Log the sales information
                console.log(`Product ID: ${product.id}`);
                console.log(`Discounted Price: ${sale.discountedPrice}`);
                console.log(`Discount Percentage: ${sale.discountPercentage}%`);
                console.log(`Sale End Date: ${sale.endDate}`);

                return {
                  ...product,
                  discountedPrice: sale.discountedPrice,
                  discountPercentage: sale.discountPercentage,
                  endDate: sale.endDate,
                };
              } else {
                // If no sales, just return the original product
                return {
                  ...product,
                  discountedPrice: null, // or keep undefined
                  discountPercentage: null, // or keep undefined
                  endDate: null, // or keep undefined
                };
              }
            });

            this.cursor = data.pageInfo.endCursor ?? null;
            this.hasNextPage = data.pageInfo.hasNextPage;
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
  editProduct(id: number): void {
    const product = this.products.find((p) => p.id === id);
    if (!product) {
      Swal.fire({
        icon: 'error',
        title: 'Product Not Found',
        text: `The product with ID ${id} was not found.`,
        confirmButtonColor: '#d33',
      });
      return;
    }

    this.isEdit = true;
    this.addProductForm.patchValue({
      id,
      code: product.code,
      size: product.size,
      color: product.color,
      description: product.description || '',
      quantity: product.quantity,
      purchasePrice: product.purchasePrice,
      retailPrice: product.retailPrice,
      categoryId: product.categoryId,
      brandId: product.brandId,
    });
  }

  addProductsAsync(): void {
    if (this.addProductForm.invalid) return;

    const formValues = this.addProductForm.value;
    const files = formValues.image as File[];
    const thumbnail = formValues.thumbnail as File;
    const brandId = Number(formValues.brandId); // Convert to number
    const categoryId = Number(formValues.categoryId); // Convert to number

    if (!files.length || !thumbnail) {
      Swal.fire({
        icon: 'error',
        title: 'Missing Files',
        text: 'Please upload both images and a thumbnail.',
        confirmButtonColor: '#d33',
      });
      return;
    }

    const handleMutation = async () => {
      this.isAddingProduct = true;

      try {
        if (this.isEdit) {
          await this.editProd
            .mutate({
              id: this.addProductForm.controls.id.value!,
              quantity: parseFloat(formValues.quantity ?? '') || 0,
            })
            .toPromise();
          Swal.fire({
            icon: 'success',
            title: 'Produkti eshte ndryshuar',
            text: 'Produkti eshte ndryshuar me sukses!',
            confirmButtonColor: '#3085d6',
          });
        } else {
          await this.addpro
            .mutate(
              {
                code: formValues.code ?? '',
                size: formValues.size ?? '',
                color: formValues.color ?? '',
                description: formValues.description ?? '',
                quantity: parseFloat(formValues.quantity ?? '') || 0,
                purchasePrice: parseFloat(formValues.purchasePrice ?? '') || 0,
                retailPrice: parseFloat(formValues.retailPrice ?? '') || 0,
                categoryId: categoryId!,
                brandId: brandId!,
                image: files, // Pass files directly
                thumbnail: thumbnail, // Pass thumbnail directly
              },
              {
                context: {
                  useMultipart: true,
                },
              }
            )
            .toPromise();
          Swal.fire({
            icon: 'success',
            title: 'Produkti eshte regjistruar',
            text: 'Produkti eshte regjistruar me sukses',
            confirmButtonColor: '#3085d6',
          });
        }

        // Check and add brand or category if needed
        if (formValues.brandId) {
          const existingBrand = this.brands.find((b) => b.id === brandId);
          if (!existingBrand) this.addBrandAsync();
        }

        if (formValues.categoryId) {
          const existingCategory = this.categories.find(
            (c) => c.id === categoryId
          );
          if (!existingCategory) this.addCategoryAsync();
        }

        this.getAllProducts(); // Refresh products list
      } catch (error) {
        console.error('Error during product operation:', error);
      } finally {
        this.isAddingProduct = false;
        this.addProductForm.reset(); // Reset form after adding
      }
    };

    handleMutation();
  }

  get image() {
    return this.addProductForm.controls.image;
  }

  setFile(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const files = Array.from(input.files); // Convert FileList to Array
      this.addProductForm.controls['image'].setValue(files); // Update the form control
    }
  }

  setThumbnail(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.addProductForm.controls['thumbnail'].setValue(input.files[0]); // Update the form control
    }
  }

  deleteProduct(id: number): void {
    // Show SweetAlert confirmation
    Swal.fire({
      title: 'A jeni të sigurt?',
      text: 'Ky veprim nuk mund të anulohet. A dëshironi të fshini këtë produkt?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Po, fshi!',
      cancelButtonText: 'Anulo',
    }).then((result) => {
      if (result.isConfirmed) {
        // Set deleting state
        this.isDeletingProduct = true;

        // Optionally remove the product from the local list immediately (optimistic UI)
        const previousProducts = [...this.products]; // Backup for rollback in case of failure
        this.products = this.products.filter((p) => p.id !== id);

        // Call GraphQL mutation to delete the product
        this.deleteprod.mutate({ productId: id }).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: 'Fshirë!',
              text: 'Produkti është fshirë me sukses.',
              confirmButtonColor: '#3085d6',
            });
            this.isDeletingProduct = false;
            this.getAllProducts(); // Refresh the product list from server
          },
          error: (error) => {
            this.isDeletingProduct = false;
            console.error('Gabim gjatë fshirjes së produktit:', error);

            // Rollback optimistic update in case of failure
            this.products = previousProducts;

            Swal.fire({
              icon: 'error',
              title: 'Gabim!',
              text: 'Ka ndodhur një gabim gjatë fshirjes së produktit. Ju lutem provoni përsëri.',
              confirmButtonColor: '#d33',
            });
          },
        });
      }
    });
  }


  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const files = Array.from(input.files);
      this.addProductForm.controls['image'].setValue(files);
    }
  }

  searchProduct(code: string): void {
    this.isSearchingProduct = true;
    setTimeout(() => {
      this.searchprod.fetch({ code }).subscribe({
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
    this.searchProductForm.reset();
    this.getAllProducts(); // Refresh products list
  }

  logout(): void {
    this.authGuard.logout();
  }

  getThumbnailUrl(productId: number): string {
    const product = this.products.find(p => p.id === productId);
    const baseUrl = 'http://localhost:5044/images/';
    return product && product.thumbnailUrl ? `${baseUrl}${productId}/${product.thumbnailUrl}` : 'assets/default-thumbnail.png';
  }
}
