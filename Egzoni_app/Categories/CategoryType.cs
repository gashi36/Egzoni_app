using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Egzoni_app.Database;

namespace Egzoni_app.Products
{
    public class CategoryType : ObjectType<Category>
    {
        protected override void Configure(IObjectTypeDescriptor<Category> descriptor)
        {
            descriptor.Field(c => c.Products).ResolveWith<Resolvers>(r => r.GetProducts(default!, default!));
        }

        private class Resolvers
        {
            public IQueryable<Product> GetProducts(Category category, ApplicationDbContext context)
            {
                return context.Products.Where(p => p.CategoryId == category.Id);
            }
        }
    }
}