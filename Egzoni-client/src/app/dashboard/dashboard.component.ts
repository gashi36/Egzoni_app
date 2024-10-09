import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  GetOrdersAndStatsForYearGQL,
  GetOrdersAndStatsForYearQuery,
  GetSalesForYearGQL,
  GetSalesForYearQuery,
  TenMostSoldProductsGQL,
  TenMostSoldProductsQuery
} from '../../generated/graphql';
import { map } from 'rxjs/operators';
import { ApolloQueryResult } from '@apollo/client/core';
import { Color, ScaleType } from '@swimlane/ngx-charts';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  monthlyProductStats: GetOrdersAndStatsForYearQuery['ordersAndStatsForYear'] = [];
  mostSoldProducts: TenMostSoldProductsQuery['tenMostSoldProducts'] = [];
  orderPriceStats: GetSalesForYearQuery['monthlyPricesAndStatsForYear'] = [];
  isLoading: boolean = true;
  chartData: any[] = [];
  saleChartData: any[] = [];
  pieChartData: any[] = [];
  view: [number, number] = [700, 400];
  pieView: [number, number] = [700, 400];
  currentYear: number;
  inputYear: number;
  inputYearForSales: number;
  colorScheme: Color = {
    name: 'custom',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: [
      '#1E90FF', // January - Blue
      '#ADD8E6', // February - Light Blue
      '#98FB98', // March - Light Green
      '#32CD32', // April - Green
      '#FFD700', // May - Yellow
      '#FFA500', // June - Orange
      '#FF4500', // July - Red
      '#B22222', // August - Dark Red
      '#D2B48C', // September - Light Brown
      '#8B4513', // October - Brown
      '#A9A9A9', // November - Dark Gray
      '#1E90FF'  // December - Blue (again)
    ]
  };


  pieColorScheme: Color = {
    name: 'custom-pie',
    selectable: true,
    group: ScaleType.Ordinal, // Use ScaleType.Ordinal
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA', '#FF8C00']
  };
  saleColorScheme: Color = {
    name: 'custom',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#A10A28', '#5AA454'] // Red for Purchase, Green for Retail
  };

  constructor(
    private router: Router,
    private ordersAndStatsForYearGQL: GetOrdersAndStatsForYearGQL,
    private tenMostSoldProductsGQL: TenMostSoldProductsGQL,
    private salesForYear: GetSalesForYearGQL
  ) {
    const today = new Date();
    this.currentYear = today.getFullYear();
    this.inputYear = this.currentYear;
    this.inputYearForSales = this.currentYear;
  }

  ngOnInit(): void {
    this.getMonthlyProductStats(this.currentYear);
    this.getMostSoldProducts();
    this.getSalesForYear(this.currentYear);
  }

  getMonthlyProductStats(year: number): void {
    this.isLoading = true;

    this.ordersAndStatsForYearGQL
      .watch({ year })
      .valueChanges.pipe(
        map((result: ApolloQueryResult<GetOrdersAndStatsForYearQuery>) =>
          result.data.ordersAndStatsForYear
        )
      )
      .subscribe({
        next: (data) => {
          this.isLoading = false;
          this.monthlyProductStats = data || [];
          this.prepareChartData();
        },
        error: (error) => {
          this.isLoading = false;
          console.error('Error fetching monthly product statistics:', error);
        },
      });
  }
  getSalesForYear(year: number): void {
    this.isLoading = true;

    this.salesForYear
      .watch({ year })
      .valueChanges.pipe(
        map((result: ApolloQueryResult<GetSalesForYearQuery>) =>
          result.data.monthlyPricesAndStatsForYear
        )
      )
      .subscribe({
        next: (data) => {
          this.isLoading = false;
          console.log('Sales data:', data); // Log the data
          this.orderPriceStats = data || [];
          this.prepareSaleChartData();
        },
        error: (error) => {
          this.isLoading = false;
          console.error('Error fetching monthly sales statistics:', error);
        },
      });
  }

  getMostSoldProducts(): void {
    this.tenMostSoldProductsGQL
      .watch()
      .valueChanges.pipe(
        map((result: ApolloQueryResult<TenMostSoldProductsQuery>) =>
          result.data.tenMostSoldProducts
        )
      )
      .subscribe({
        next: (data) => {
          this.mostSoldProducts = data || [];
          this.preparePieChartData();
        },
        error: (error) => {
          console.error('Error fetching most sold products:', error);
        },
      });
  }

  prepareChartData(): void {
    if (this.monthlyProductStats.length === 0) {
      this.chartData = [];
      return;
    }
    this.chartData = this.monthlyProductStats.map((stats) => ({
      name: stats.monthName,  // Ensure monthName is defined
      value: stats.totalOrders, // Ensure totalOrders is defined and numeric
    }));
  }

  prepareSaleChartData(): void {
    if (this.orderPriceStats.length === 0) {
      this.saleChartData = [];
      return;
    }

    this.saleChartData = this.orderPriceStats.map((stats) => ({
      name: stats.monthName,
      series: [
        {
          name: 'Purchase Price',
          value: Number(stats.totalPurchasePrice) || 0,
          color: '#A10A28',
        },
        {
          name: 'Retail Price',
          value: Number(stats.totalRetailPrice) || 0,
          color: '#5AA454',
        },
      ],
    }));
  }



  preparePieChartData(): void {
    if (this.mostSoldProducts.length === 0) {
      this.pieChartData = [];
      return;
    }

    this.pieChartData = this.mostSoldProducts
      .filter(product => product.productCode && product.quantitySold != null)
      .map((product) => ({
        name: product.productCode,  // Ensure productCode is defined
        value: product.quantitySold, // Ensure quantitySold is defined and numeric
      }));
  }

  onYearSubmit(): void {
    if (this.inputYear < 2000) {
      alert("Please enter a year greater than or equal to 2000.");
      return;
    }
    this.currentYear = this.inputYear;
    this.getMonthlyProductStats(this.currentYear);
  }

  onSelect(event: any): void {
    const selectedProduct = this.pieChartData.find(product => product.name === event.name);
    if (selectedProduct) {
      const productId = selectedProduct.productId;
      this.navigateToProduct(productId);
    }
  }

  navigateToProduct(productId: number): void {
    this.router.navigate(['/product', productId]);
  }
}
