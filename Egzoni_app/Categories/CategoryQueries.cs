using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Egzoni_app.Database;
using Egzoni_app.Products;
using Microsoft.EntityFrameworkCore;

namespace Egzoni_app.Categories
{
    [QueryType]
    public class CategoryQueryies
    {
        [UseFiltering(typeof(CategoryFilterInput))]
        public IQueryable<Category> GetCategories(ApplicationDbContext context)
        {
            return context.Categories;
        }
        [DataLoader]
        internal static async Task<IReadOnlyDictionary<int, Category>> GetCategoriesAsync(IReadOnlyList<int> ids, ApplicationDbContext context, CancellationToken cancellationToken) =>
 await context.Categories
.Where(s => ids.Contains(s.Id))
.ToDictionaryAsync(t => t.Id, cancellationToken);
    }
}
