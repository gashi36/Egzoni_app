using Egzoni_app.Database;
using Microsoft.EntityFrameworkCore;

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
             int id,
             string? kodi,
             string? tipi,
             string? masa,
             decimal? sasia,
             string? ngjyra,
             decimal? cmimiIBlerjes,
             decimal? cmimiIShitjes,
     ApplicationDbContext context)
        {
            var product = await context.Products.FindAsync(id);
            if (product == null)
            {

                throw new KeyNotFoundException($"Product with ID {id} not found.");
            }

            product.Kodi = kodi;
            product.Tipi = tipi;
            product.Masa = masa;
            product.Sasia = sasia;
            product.Ngjyra = ngjyra;
            product.CmimiIBlerjes = cmimiIBlerjes;
            product.CmimiIShitjes = cmimiIShitjes;

            context.Products.Update(product);
            await context.SaveChangesAsync();


            return new UpdateProductPayload(product);
        }
    }
}