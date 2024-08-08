using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Egzoni_app.Products;
using Egzoni_app.Admin;
using Microsoft.EntityFrameworkCore;
using Egzoni_app.Checkout;

namespace Egzoni_app.Database
{
    public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : DbContext(options)
    {
        public DbSet<Administrator> Admins { get; set; }
        public DbSet<Product> Products { get; set; } = default!;
        public DbSet<Brand> Brands { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Order> Orders { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Order>()
                .Property(o => o.TotalPrice)
                .HasPrecision(18, 2); // Precision of 18 and scale of 2
        }
    }
}