using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Egzoni_app.Database;
using HotChocolate;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using HotChocolate.Data;
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
        public Task<Product> GetProductsByIdAsync(
          [ID(nameof(Product))] int id,
          ProductByIdDataLoader dataLoader,
          CancellationToken cancellationToken) =>
          dataLoader.LoadAsync(id, cancellationToken);
    }
}