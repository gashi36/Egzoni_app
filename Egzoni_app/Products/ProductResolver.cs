using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Egzoni_app.Database;

namespace Egzoni_app.Products
{
    public class ProductResolver(ApplicationDbContext dbContext)
    {
        private readonly ApplicationDbContext _dbContext = dbContext;

        public IEnumerable<Product> GetProducts()
        {
            return _dbContext.Products;
        }
    }
}