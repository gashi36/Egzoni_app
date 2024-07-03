using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Egzoni_app.Database;
using Egzoni_app.Products;

namespace Egzoni_app.Brands
{
    [MutationType]
    public class BrandMutations
    {
        public async Task<Brand> AddBrandAsync(AddBrandInput brandInput, ApplicationDbContext context)
        {
            var brand = new Brand
            {
                Name = brandInput.Name
            };

            context.Brands.Add(brand);
            await context.SaveChangesAsync();
            return brand;
        }

    }
}