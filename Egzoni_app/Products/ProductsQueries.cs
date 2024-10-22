using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Egzoni_app.Database;
using HotChocolate;
using Microsoft.EntityFrameworkCore;
using HotChocolate.Data;

namespace Egzoni_app.Products
{
    [QueryType]
    public class ProductsQueries
    {
        private readonly IDbContextFactory<ApplicationDbContext> _dbContextFactory;

        public ProductsQueries(IDbContextFactory<ApplicationDbContext> dbContextFactory)
        {
            _dbContextFactory = dbContextFactory;
        }

        [UsePaging]
        [UseFiltering(typeof(ProductFilterInputType))]
        [UseSorting]
        public IQueryable<Product> GetProductsAsync(
    [Service] ApplicationDbContext context,
    int? brandId = null,
    int? categoryId = null,
    decimal? minPrice = null,
    decimal? maxPrice = null)
        {
            var query = context.Products
                .Include(p => p.Sales) // Include the Sales entity to access discount details
                .Where(p => !p.IsDeleted)
                .AsQueryable();

            // Apply brand, category, and price range filters
            if (brandId.HasValue)
            {
                query = query.Where(p => p.BrandId == brandId.Value);
            }

            if (categoryId.HasValue)
            {
                query = query.Where(p => p.CategoryId == categoryId.Value);
            }

            if (minPrice.HasValue)
            {
                query = query.Where(p => p.RetailPrice >= minPrice.Value);
            }

            if (maxPrice.HasValue)
            {
                query = query.Where(p => p.RetailPrice <= maxPrice.Value);
            }

            // Return the query with sales included
            return query;
        }



        public async Task<Product> GetProductByIdAsync(
       int id,
       [Service] ApplicationDbContext context,
       CancellationToken cancellationToken,
       [Service] IProductDataLoader productDataLoader)
        {
            // Fetch the product and include the Sales entity for discount details
            var product = await context.Products
                .Include(p => p.Sales) // Ensure Sales is included
                .FirstOrDefaultAsync(p => p.Id == id, cancellationToken);

            if (product == null)
            {
                throw new GraphQLException(new Error($"Product with ID {id} not found.", code: "PRODUCT_NOT_FOUND"));
            }

            return product;
        }


        [DataLoader]
        internal static async Task<IReadOnlyDictionary<int, Product>> GetProductAsync(
            IReadOnlyList<int> ids,
            [Service] ApplicationDbContext context,
            CancellationToken cancellationToken)
        {
            return await context.Products
                .Where(s => ids.Contains(s.Id))
                .Include(s => s.Sales)
                .ToDictionaryAsync(t => t.Id, cancellationToken);
        }

        // Query to get monthly statistics for retail prices, purchase prices, and profit for the current and last year
        public async Task<List<MonthlyProductStats>> GetMonthlyProductStatsForCurrentAndLastYearAsync(
      CancellationToken cancellationToken)
        {
            await using var context = _dbContextFactory.CreateDbContext();
            int currentYear = DateTime.Now.Year;
            int lastYear = currentYear - 1;
            var months = Enumerable.Range(1, 12); // All 12 months

            var monthlyProductStats = months.GroupJoin(
                context.Products
                    .Where(p => p.Quantity > 0)
                    .SelectMany(p => context.Orders
                        .Where(o => o.OrderItems.Any(oi => oi.Code == p.Code) &&
                                    (o.OrderDate.Year == currentYear || o.OrderDate.Year == lastYear))
                        .SelectMany(o => o.OrderItems, (o, oi) => new { o.OrderDate, p, oi })),
                m => m,
                x => x.OrderDate.Month,
                (m, groupedData) => new MonthlyProductStats
                {
                    Year = currentYear, // Adjust for correct year
                    Month = m,
                    TotalRetailPrice = (decimal)groupedData.Sum(x => x.p.RetailPrice * x.oi.Quantity),
                    TotalPurchasePrice = (decimal)groupedData.Sum(x => x.p.PurchasePrice * x.oi.Quantity),
                    TotalProfit = (decimal)groupedData.Sum(x => (x.p.RetailPrice - x.p.PurchasePrice) * x.oi.Quantity)
                }
            ).ToList();


            return monthlyProductStats;
        }
        // Example query to retrieve products with their discount percentage



        public class MonthlyProductStats
        {
            public int Year { get; set; }
            public int Month { get; set; }
            public decimal TotalRetailPrice { get; set; }
            public decimal TotalPurchasePrice { get; set; }
            public decimal TotalProfit { get; set; }
        }

    }
}
