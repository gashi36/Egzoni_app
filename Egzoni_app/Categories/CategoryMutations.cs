using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Egzoni_app.Database;
using Egzoni_app.Products;

namespace Egzoni_app.Categories
{
    [MutationType]
    public class CategoryMutations
    {
        public async Task<Category> AddCategoryAsync(AddCategoryInput categoryInput, ApplicationDbContext context)
        {
            var category = new Category
            {
                Name = categoryInput.Name
            };

            context.Categories.Add(category);
            await context.SaveChangesAsync();
            return category;
        }
    }
}