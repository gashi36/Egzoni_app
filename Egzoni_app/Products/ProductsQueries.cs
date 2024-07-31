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
            var query = context.Products.AsQueryable();

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

            return query;
        }

        public async Task<Product> GetProductByIdAsync(
            int id,
            [Service] ApplicationDbContext context,
            CancellationToken cancellationToken,
            [Service] IProductDataLoader productDataLoader)
        {
            var product = await productDataLoader.LoadAsync(id, cancellationToken);
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
                .ToDictionaryAsync(t => t.Id, cancellationToken);
        }
    }
}
