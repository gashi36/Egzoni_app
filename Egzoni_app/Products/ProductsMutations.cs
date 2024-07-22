using Egzoni_app.Database;
using HotChocolate.Authorization;
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
            var name = input.Image?.Name;
            if (string.IsNullOrEmpty(name))
            {
                throw new ArgumentNullException(nameof(input.Image), "Image cannot be null.");
            }

            var imageName = $"Image.{name[(name.LastIndexOf('.') + 1)..]}";
            var newProduct = new Product
            {
                Code = input.Code,
                Size = input.Size,
                Quantity = input.Quantity,
                Color = input.Color,
                Description = input.Description,
                PurchasePrice = input.PurchasePrice,
                RetailPrice = input.RetailPrice,
                PictureUrl = imageName,
                BrandId = input.BrandId,
                CategoryId = input.CategoryId

            };

            context.Products.Add(newProduct);
            await context.SaveChangesAsync();
            using var stream = new MemoryStream();

            if (input.Image != null)
            {

                await input.Image.CopyToAsync(stream);
            }
            else
            {
                throw new ArgumentNullException(nameof(input.Image), "Image cannot be null.");
            }

            var path = System.IO.Path.Combine("wwwroot", "images", newProduct.Id.ToString());
            if (!Directory.Exists(path))
            {
                Directory.CreateDirectory(path);
            }

            path = System.IO.Path.Combine(path, imageName);

            await File.WriteAllBytesAsync(path, stream.ToArray());


            return newProduct;
        }
        public async Task<Product> UpdateQuantityAsync(int id, decimal newQuantity, ApplicationDbContext context)
        {
            var product = await context.Products.FindAsync(id);
            if (product == null)
            {
                throw new KeyNotFoundException($"Product with ID {id} not found.");
            }

            product.Quantity = newQuantity;

            context.Products.Update(product);
            await context.SaveChangesAsync();

            return product;
        }
        //     public async Task<UpdateProductPayload> UpdateAsync(
        //   AddProductInput input,
        //   ApplicationDbContext context)
        //     {
        //         var product = await context.Products.FindAsync(input.Id);

        //         if (product == null)
        //         {
        //             throw new KeyNotFoundException($"Product with ID {input.Id} not found.");
        //         }

        //         // Update product details
        //         product.Code = input.Code;
        //         product.Size = input.Size;
        //         product.Quantity = input.Quantity;
        //         product.Color = input.Color;
        //         product.Description = input.Description;
        //         product.PurchasePrice = input.PurchasePrice;
        //         product.RetailPrice = input.RetailPrice;
        //         product.BrandId = input.BrandId;
        //         product.CategoryId = input.CategoryId;

        //         if (input.Image != null)
        //         {
        //             var name = input.Image?.Name;
        //             if (string.IsNullOrEmpty(name))
        //             {
        //                 throw new ArgumentNullException(nameof(input.Image), "Image cannot be null.");
        //             }

        //             var imageName = $"Image.{name[(name.LastIndexOf('.') + 1)..]}";
        //             var path = System.IO.Path.Combine("wwwroot", "images", product.Id.ToString());

        //             // Ensure the directory exists
        //             if (!Directory.Exists(path))
        //             {
        //                 Directory.CreateDirectory(path);
        //             }

        //             // Remove the old image if it exists
        //             var oldImagePath = System.IO.Path.Combine(path, product.PictureUrl);
        //             if (File.Exists(oldImagePath))
        //             {
        //                 File.Delete(oldImagePath);
        //             }

        //             // Save the new image
        //             using var stream = new MemoryStream();
        //             await input.Image.CopyToAsync(stream);
        //             var newImagePath = System.IO.Path.Combine(path, imageName);
        //             await File.WriteAllBytesAsync(newImagePath, stream.ToArray());

        //             // Update product's image URL
        //             product.PictureUrl = imageName;
        //         }

        //         context.Products.Update(product);
        //         await context.SaveChangesAsync();

        //         return new UpdateProductPayload(product);
        //     }
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
