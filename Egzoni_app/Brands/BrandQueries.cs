using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Egzoni_app.Database;
using Egzoni_app.Products;
using HotChocolate;
using HotChocolate.Types;
using Microsoft.EntityFrameworkCore;

namespace Egzoni_app.Brands
{
    [QueryType]
    public class BrandQueries
    {
        [UseSorting]
        [UseFiltering(typeof(BrandFilterInputType))]
        public IQueryable<Brand> GetBrands(ApplicationDbContext context)
        {
            return context.Brands;
        }

        [DataLoader]
        internal static async Task<IReadOnlyDictionary<int, Brand>> GetBrandsAsync(IReadOnlyList<int> ids, ApplicationDbContext context, CancellationToken cancellationToken) =>
            await context.Brands
            .Where(s => ids.Contains(s.Id))
            .ToDictionaryAsync(t => t.Id, cancellationToken);
    }
}