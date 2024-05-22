using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Egzoni_app.Database;
using Microsoft.EntityFrameworkCore;

namespace Egzoni_app.Products
{
    public class ProductByIdDataLoader : BatchDataLoader<int, Product>
    {
        private readonly IDbContextFactory<ApplicationDbContext> _dbContextFactory;

        public ProductByIdDataLoader(
            IBatchScheduler batchScheduler,
            IDbContextFactory<ApplicationDbContext> dbContextFactory)
            : base(batchScheduler)
        {
            _dbContextFactory = dbContextFactory ??
                throw new ArgumentNullException(nameof(dbContextFactory));
        }

        protected override async Task<IReadOnlyDictionary<int, Product>> LoadBatchAsync(
            IReadOnlyList<int> keys,
            CancellationToken cancellationToken)
        {
            await using ApplicationDbContext dbContext =
                _dbContextFactory.CreateDbContext();

            return await dbContext.Products
                .Where(s => keys.Contains(s.Id))
                .ToDictionaryAsync(t => t.Id, cancellationToken);
        }
    }
}