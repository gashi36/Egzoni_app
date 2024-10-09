import { Component, OnInit } from '@angular/core';
import { GetAllOrdersGQL, SearchByCostumerNameGQL } from '../../generated/graphql'; // Adjust path if needed
import { ApolloQueryResult } from '@apollo/client/core';
import { FormControl, FormGroup } from '@angular/forms';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {

  orders: any[] = [];
  isLoading: boolean = false;
  endCursor: string | null = null;
  startCursor: string | null = null;
  hasNextPage: boolean = false;
  hasPreviousPage: boolean = false;
  totalOrdersCount: number = 0; // New property to store total orders count
  currentPage: number = 0; // Add currentPage property
  itemsPerPage: number = 10; // Add itemsPerPage property (or adjust based on your pagination)

  searchCostumerForm = new FormGroup({
    search: new FormControl(''),
  });

  constructor(private getAllOrdersGQL: GetAllOrdersGQL, private searchByCostumerName: SearchByCostumerNameGQL) { }

  ngOnInit() {
    this.fetchOrders(); // Fetch orders initially
  }

  // Fetch all orders (with pagination support)
  fetchOrders(cursor: { before?: string; after?: string } = {}): void {
    this.isLoading = true;

    this.getAllOrdersGQL
      .watch({
        ...cursor  // Spread the cursor to include `before` and `after`
      })
      .valueChanges
      .pipe(
        map((result: ApolloQueryResult<any>) => result.data.allOrders)
      )
      .subscribe({
        next: (data: any) => {
          this.isLoading = false;
          this.orders = data.nodes || [];
          this.endCursor = data.pageInfo.endCursor;
          this.startCursor = data.pageInfo.startCursor;
          this.hasNextPage = data.pageInfo.hasNextPage;
          this.hasPreviousPage = data.pageInfo.hasPreviousPage;
          this.totalOrdersCount = data.totalCount; // Update total orders count

          // Adjust currentPage based on pagination
          if (cursor.after) {
            this.currentPage += 1; // Increment currentPage for 'next'
          } else if (cursor.before) {
            this.currentPage -= 1; // Decrement currentPage for 'previous'
          }

          if (!this.orders.length) {
            console.error('No orders found');
          }
        },
        error: (error: any) => {
          this.isLoading = false;
          console.error('Error fetching orders:', error);
        }
      });
  }


  // Search by customer name function
  searchCostumerName(): void {
    const customerName = this.searchCostumerForm.controls.search.value?.trim(); // Get the search input
    if (customerName) {
      this.isLoading = true; // Start loading indicator
      this.searchByCostumerName.fetch({ customerNameSearch: customerName }).subscribe({
        next: ({ data }) => {
          this.isLoading = false; // Stop loading indicator
          this.orders = data?.allOrders?.nodes || []; // Set orders from the search results
          if (!this.orders.length) {
            console.error('No customers found with that name');
          }
        },
        error: (error) => {
          this.isLoading = false; // Stop loading indicator on error
          console.error('Error searching customers:', error);
        }
      });
    } else {
      // If search input is cleared or empty, fetch all orders again
      this.fetchOrders();
    }
  }

  // Clear search results and reset the form
  cancelSearch(): void {
    this.searchCostumerForm.reset(); // Reset the form
    this.fetchOrders(); // Fetch all orders again when the search is canceled
  }
  fetchNext(): void {
    if (this.hasNextPage && this.endCursor) {
      this.fetchOrders({ after: this.endCursor });
    }
  }

  // Fetch previous set of orders using the 'startCursor'
  fetchPrevious(): void {
    if (this.hasPreviousPage && this.startCursor) {
      this.fetchOrders({ before: this.startCursor });
    }
  }
}
