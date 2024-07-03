using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Egzoni_app.Database;
using Egzoni_app.Products;

namespace Egzoni_app.Brands
{
    public class BrandResolver(ApplicationDbContext dbContext)
    {
        private readonly ApplicationDbContext _dbContext = dbContext;

        public IEnumerable<Brand> GetProducts()
        {
            return _dbContext.Brands;
        }
    }
}