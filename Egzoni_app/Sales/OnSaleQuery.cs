using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Egzoni_app.Database;
using Egzoni_app.Products;
using HotChocolate;
using Microsoft.EntityFrameworkCore;

namespace Egzoni_app.OnSale
{
    [QueryType]
    public class OnSaleQuery
    {
        // Query to get all sales
        public async Task<List<Sales>> GetAllSalesAsync(
            [Service] ApplicationDbContext context)
        {
            // Fetch all sales with related products
            return await context.Sales
                .Include(s => s.Product) // Include the related product
                .ToListAsync();
        }

        // Query to get sales by product ID
        public async Task<List<Sales>> GetSalesByProductIdAsync(
            int productId,
            [Service] ApplicationDbContext context)
        {
            // Fetch sales for a specific product
            return await context.Sales
                .Include(s => s.Product) // Include the related product
                .Where(s => s.ProductId == productId)
                .ToListAsync();
        }
    }
}
