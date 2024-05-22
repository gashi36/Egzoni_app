using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Egzoni_app.Products;
using Microsoft.EntityFrameworkCore;

namespace Egzoni_app.Database
{
    public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : DbContext(options)
    {
        public DbSet<Product> Products { get; set; } = default!;
    }
}