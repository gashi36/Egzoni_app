using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Egzoni_app.Database;
using Microsoft.EntityFrameworkCore;
using HotChocolate;
using System.Globalization;
using Egzoni_app.Checkout;

namespace Egzoni_app.Checkouts
{
    [QueryType]
    public class OrderQuery
    {
        private readonly IDbContextFactory<ApplicationDbContext> _dbContextFactory;

        public OrderQuery(IDbContextFactory<ApplicationDbContext> dbContextFactory)
        {
            _dbContextFactory = dbContextFactory;
        }

        [UsePaging]
        [UseFiltering(typeof(OrderFilterInput))]
        [UseSorting]// Query to get all orders
        public async Task<List<Order>> GetAllOrdersAsync(CancellationToken cancellationToken)
        {
            await using var context = _dbContextFactory.CreateDbContext();
            return await context.Orders
                .Include(o => o.OrderItems)
                .ToListAsync(cancellationToken);
        }

        // Query to get a specific order by ID
        public async Task<Order?> GetOrderByIdAsync(int id, CancellationToken cancellationToken)
        {
            await using var context = _dbContextFactory.CreateDbContext();
            var order = await context.Orders
                .Include(o => o.OrderItems)
                .FirstOrDefaultAsync(o => o.Id == id, cancellationToken);

            if (order == null)
            {
                throw new GraphQLException($"Order with ID {id} not found.");
            }

            return order;
        }

        // Combined query to get statistics for two years
        public async Task<List<OrderStats>> GetOrdersAndStatsForYearAsync(int year, CancellationToken cancellationToken)
        {
            await using var context = _dbContextFactory.CreateDbContext();
            var startDate = new DateTime(year, 1, 1);
            var endDate = new DateTime(year, 12, 31);

            // Retrieve and group order statistics for the specified year
            var monthlyOrders = await context.Orders
                .Where(o => o.OrderDate >= startDate && o.OrderDate <= endDate)
                .SelectMany(o => o.OrderItems, (o, oi) => new { o.OrderDate, oi })
                .GroupBy(x => new { x.OrderDate.Year, x.OrderDate.Month, x.oi.Code })
                .Select(g => new
                {
                    g.Key.Year,
                    g.Key.Month,
                    TotalOrders = g.Count(),
                    ProductCode = g.Key.Code,
                    QuantitySold = g.Sum(x => x.oi.Quantity)
                })
                .ToListAsync(cancellationToken);

            // Build the statistics list for each month
            var orderStatsList = new List<OrderStats>();

            for (int month = 1; month <= 12; month++)
            {
                var monthlyData = monthlyOrders
                    .Where(m => m.Year == year && m.Month == month)
                    .ToList();

                orderStatsList.Add(new OrderStats
                {
                    Year = year,
                    Month = month,
                    MonthName = CultureInfo.CurrentCulture.DateTimeFormat.GetMonthName(month),
                    TotalOrders = monthlyData.Sum(x => x.TotalOrders),
                    MostSoldProductCode = monthlyData.OrderByDescending(x => x.QuantitySold).FirstOrDefault()?.ProductCode
                });
            }

            return orderStatsList; // Return only the stats for the specified year
        }

        public async Task<List<MostSoldProduct>> GetTenMostSoldProductsAsync(CancellationToken cancellationToken)
        {
            await using var context = _dbContextFactory.CreateDbContext();
            int currentYear = DateTime.Now.Year;
            var startDate = new DateTime(currentYear, 1, 1);
            var endDate = DateTime.Now;

            var mostSoldProducts = await context.Orders
                .Where(o => o.OrderDate >= startDate && o.OrderDate <= endDate)
                .SelectMany(o => o.OrderItems)
                .GroupBy(oi => oi.Code)
                .Select(g => new
                {
                    ProductCode = g.Key,
                    QuantitySold = g.Sum(oi => oi.Quantity),
                    Category = context.Products
                        .Where(p => p.Code == g.Key)
                        .Select(p => p.Category.Name)
                        .FirstOrDefault(),
                    Brand = context.Products
                        .Where(p => p.Code == g.Key)
                        .Select(p => p.Brand.Name)
                        .FirstOrDefault(),
                    ProductId = context.Products // Include the ProductId here
                        .Where(p => p.Code == g.Key)
                        .Select(p => p.Id) // Fetch the ProductId
                        .FirstOrDefault() // Get the first or default ProductId
                })
                .OrderByDescending(msp => msp.QuantitySold)
                .Take(10)
                .ToListAsync(cancellationToken);

            return mostSoldProducts.Select(msp => new MostSoldProduct
            {
                ProductId = msp.ProductId, // Map the ProductId
                ProductCode = msp.ProductCode,
                QuantitySold = msp.QuantitySold,
                Category = msp.Category,
                Brand = msp.Brand
            }).ToList();
        }
        public async Task<List<OrderPriceStats>> GetMonthlyPricesAndStatsForYearAsync(int year, CancellationToken cancellationToken)
        {
            await using var context = _dbContextFactory.CreateDbContext();
            var startDate = new DateTime(year, 1, 1);
            var endDate = new DateTime(year, 12, 31);

            // Retrieve order items with the relevant details
            var monthlyOrders = await context.Orders
                .Where(o => o.OrderDate >= startDate && o.OrderDate <= endDate)
                .SelectMany(o => o.OrderItems, (o, oi) => new { o.OrderDate, oi.Quantity, oi.Code })
                .Join(context.Products, oi => oi.Code, p => p.Code, (oi, p) => new { oi.OrderDate, oi.Quantity, p.PurchasePrice, p.RetailPrice, oi.Code })
                .GroupBy(x => new { x.OrderDate.Year, x.OrderDate.Month, x.Code })
                .Select(g => new
                {
                    g.Key.Year,
                    g.Key.Month,
                    ProductCode = g.Key.Code,
                    TotalOrders = g.Count(),
                    QuantitySold = g.Sum(x => x.Quantity),
                    TotalRetailPrice = g.Sum(x => x.Quantity * x.RetailPrice),  // Sum the retail prices for sold products
                    TotalPurchasePrice = g.Sum(x => x.Quantity * x.PurchasePrice) // Use the purchase price from the time they were added
                })
                .ToListAsync(cancellationToken);

            // Build the statistics list for each month
            var orderPriceStatsList = new List<OrderPriceStats>();

            for (int month = 1; month <= 12; month++)
            {
                var monthlyData = monthlyOrders
                    .Where(m => m.Year == year && m.Month == month)
                    .ToList();

                orderPriceStatsList.Add(new OrderPriceStats
                {
                    Year = year,
                    Month = month,
                    MonthName = CultureInfo.CurrentCulture.DateTimeFormat.GetMonthName(month),
                    TotalOrders = monthlyData.Sum(x => x.TotalOrders),
                    MostSoldProductCode = monthlyData.OrderByDescending(x => x.QuantitySold).FirstOrDefault()?.ProductCode,
                    TotalRetailPrice = (decimal)monthlyData.Sum(x => x.TotalRetailPrice),
                    TotalPurchasePrice = (decimal)monthlyData.Sum(x => x.TotalPurchasePrice)
                });
            }

            return orderPriceStatsList; // Return only the stats for the specified year
        }

    }
    public class OrderPriceStats
    {
        public int Year { get; set; }
        public int Month { get; set; }
        public string MonthName { get; set; }
        public int TotalOrders { get; set; }
        public string? MostSoldProductCode { get; set; }
        public decimal TotalRetailPrice { get; set; }
        public decimal TotalPurchasePrice { get; set; }
    }


    public class OrderStats
    {
        public int Year { get; set; }
        public int Month { get; set; }
        public string MonthName { get; set; }
        public int TotalOrders { get; set; }
        public string? MostSoldProductCode { get; set; }
    }

    public class MostSoldProduct
    {
        public int ProductId { get; set; }
        public string? ProductCode { get; set; }
        public int QuantitySold { get; set; }
        public string? Category { get; set; }
        public string? Brand { get; set; }
    }
}
