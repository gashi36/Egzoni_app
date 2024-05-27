using Egzoni_app.Database;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;

namespace Egzoni_app.Products
{
    [MutationType]
    public class ProductsMutations
    {
        public async Task<Product> AddProductAsync(AddProductInput input, ApplicationDbContext context)
        {
            var newProduct = new Product
            {
                Kodi = input.Kodi,
                Tipi = input.Tipi,
                Masa = input.Masa,
                Sasia = input.Sasia,
                Ngjyra = input.Ngjyra,
                CmimiIBlerjes = input.CmimiIBlerjes,
                CmimiIShitjes = input.CmimiIShitjes
            };

            context.Products.Add(newProduct);
            await context.SaveChangesAsync();

            return newProduct;
        }

        public async Task<UpdateProductPayload> UpdateAsync(
            AddProductInput input,
            ApplicationDbContext context)
        {
            var product = await context.Products.FindAsync(input.Id);
            if (product == null)
            {
                throw new KeyNotFoundException($"Product with ID {input.Id} not found.");
            }

            product.Kodi = input.Kodi;
            product.Tipi = input.Tipi;
            product.Masa = input.Masa;
            product.Sasia = input.Sasia;
            product.Ngjyra = input.Ngjyra;
            product.CmimiIBlerjes = input.CmimiIBlerjes;
            product.CmimiIShitjes = input.CmimiIShitjes;

            context.Products.Update(product);
            await context.SaveChangesAsync();

            return new UpdateProductPayload(product);
        }

        public async Task<bool> RemoveProductsById(int id, ApplicationDbContext context)
        {
            var product = await context.Products.FindAsync(id);
            if (product == null)
            {
                return false;
            }

            context.Products.Remove(product);
            await context.SaveChangesAsync();

            return true;
        }
    }
}
