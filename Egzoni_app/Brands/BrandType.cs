using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Egzoni_app.Database;

namespace Egzoni_app.Products
{
    public class BrandType : ObjectType<Brand>
    {
        protected override void Configure(IObjectTypeDescriptor<Brand> descriptor)
        {
            descriptor.Field(b => b.Products).ResolveWith<Resolvers>(r => r.GetProducts(default!, default!));
        }

        private class Resolvers
        {
            public IQueryable<Product> GetProducts(Brand brand, ApplicationDbContext context)
            {
                return context.Products.Where(p => p.BrandId == brand.Id);
            }
        }

    }
}