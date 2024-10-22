using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Egzoni_app.Database;
using Egzoni_app.Products;
using HotChocolate;
using Microsoft.EntityFrameworkCore;

namespace Egzoni_app.OnSale
{
    [MutationType]
    public class OnSaleMutation
    {
        // Mutation to add multiple products on sale
        public async Task<List<Sales>> AddProductOnSaleAsync(
            OnSaleInput input,  // Using the record as input
            [Service] ApplicationDbContext context)
        {
            // Retrieve products by their IDs
            var products = await context.Products
                                        .Where(p => input.ProductIds.Contains(p.Id))
                                        .Include(p => p.Sales)
                                        .ToListAsync();

            if (!products.Any())
            {
                throw new GraphQLException("No products found for the given IDs.");
            }

            // Validate sale period
            if (input.StartDate >= input.EndDate)
            {
                throw new GraphQLException("The start date must be earlier than the end date.");
            }

            // Create OnSale entries for each product
            var onSaleEntries = new List<Sales>();
            foreach (var product in products)
            {
                var hasActiveSale = product.Sales.Any(sale =>
           sale.StartDate < input.EndDate &&
           sale.EndDate > input.StartDate); // Overlapping check

                if (hasActiveSale)
                {
                    throw new GraphQLException($"Product {product.Id} already has an active sale during the specified period.");
                }

                var onSale = new Sales
                {
                    Product = product,
                    DiscountPercentage = input.DiscountPercentage,
                    StartDate = input.StartDate,
                    EndDate = input.EndDate
                };

                // Add to list and context
                onSaleEntries.Add(onSale);
                context.Sales.Add(onSale);
            }

            // Save all changes to the database
            await context.SaveChangesAsync();

            return onSaleEntries;
        }

        // Mutation to remove expired sale entries
        public async Task<bool> RemoveExpiredSalesAsync([Service] ApplicationDbContext context)
        {
            // Get the current date
            var currentDate = DateTime.UtcNow;

            // Retrieve all expired sales
            var expiredSales = await context.Sales
                .Where(s => s.EndDate < currentDate)
                .ToListAsync();

            // If there are expired sales, remove them
            if (expiredSales.Any())
            {
                context.Sales.RemoveRange(expiredSales);
                await context.SaveChangesAsync();
            }

            return true;
        }

        // Mutation to remove a specific sale entry
        public async Task<bool> RemoveProductFromSaleAsync(
            int onSaleId,
            [Service] ApplicationDbContext context)
        {
            var onSale = await context.Sales.FindAsync(onSaleId);
            if (onSale == null)
            {
                throw new GraphQLException("Sale entry not found.");
            }

            context.Sales.Remove(onSale);
            await context.SaveChangesAsync();

            return true;
        }
    }
}
