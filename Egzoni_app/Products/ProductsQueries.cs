using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Egzoni_app.Database;
using HotChocolate;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using HotChocolate.Data;
using HotChocolate.Authorization;
namespace Egzoni_app.Products
{

    [QueryType]

    public class ProductsQueries
    {

        [UsePaging]
        [UseFiltering(typeof(ProductFilterInputType))]
        [UseSorting]
        public IQueryable<Product> GetProductsAsync(ApplicationDbContext context) =>
                     context.Products;
        public async Task<Product> GetProductByIdAsync(int id, ApplicationDbContext context, CancellationToken cancellationToken, IProductDataLoader productDataLoader)
        {
            var product = await productDataLoader.LoadAsync(id, cancellationToken);
            return product;
        }

        [DataLoader]
        internal static async Task<IReadOnlyDictionary<int, Product>> GetProductAsync(IReadOnlyList<int> ids, ApplicationDbContext context, CancellationToken cancellationToken) =>
   await context.Products
  .Where(s => ids.Contains(s.Id))
  .ToDictionaryAsync(t => t.Id, cancellationToken);

    }

}