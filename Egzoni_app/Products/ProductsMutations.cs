using Egzoni_app.Database;
using HotChocolate.Authorization;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace Egzoni_app.Products
{
    [MutationType]
    public class ProductsMutations
    {
        public async Task<Product> AddProductAsync(AddProductInput input, ApplicationDbContext context)
        {
            // Ensure input.Image is not null or empty
            if (input.Image == null || input.Image.Count == 0)
            {
                throw new ArgumentNullException(nameof(input.Image), "Images cannot be null.");
            }

            // Initialize a new Product instance with the provided input data
            var newProduct = new Product
            {
                Code = input.Code,
                Size = input.Size,
                Quantity = input.Quantity,
                Color = input.Color,
                Description = input.Description,
                PurchasePrice = input.PurchasePrice,
                RetailPrice = input.RetailPrice,
                BrandId = input.BrandId,
                CategoryId = input.CategoryId,
                PictureUrls = new List<string>() // Initialize PictureUrls list
            };

            // Add the new product to the database context
            context.Products.Add(newProduct);
            await context.SaveChangesAsync(); // Save changes to generate the product ID

            // Create a directory for the product's images using the product ID
            var path = System.IO.Path.Combine("wwwroot", "images", newProduct.Id.ToString());
            if (!Directory.Exists(path))
            {
                Directory.CreateDirectory(path);
            }

            // Process each uploaded image
            foreach (var image in input.Image)
            {
                if (image.Length > 0) // Ensure the file is of type IFormFile and not empty
                {
                    // Generate a unique filename for the image
                    var imageName = $"Image_{Guid.NewGuid()}{System.IO.Path.GetExtension(image.Name)}";
                    var imagePath = System.IO.Path.Combine(path, imageName);

                    try
                    {
                        // Save the file to the specified path
                        using (var stream = new FileStream(imagePath, FileMode.Create, FileAccess.Write))
                        {
                            await image.CopyToAsync(stream);
                        }

                        // Add the image name to the PictureUrls list
                        newProduct.PictureUrls.Add(imageName);
                    }
                    catch (Exception ex)
                    {
                        // Log the exception (you might need a logging mechanism here)
                        // Log.Error($"Error saving image {formFile.FileName}: {ex.Message}");
                        throw new InvalidOperationException($"Error saving image {image.Name}", ex);
                    }
                }
            }

            // Update the product to include the list of PictureUrls
            context.Products.Update(newProduct);
            await context.SaveChangesAsync(); // Save the changes to the database

            return newProduct;
        }
        public async Task<UpdateProductPayload> UpdateAsync(AddProductInput input, ApplicationDbContext context)
        {
            var product = await context.Products.FindAsync(input.Id);
            if (product == null)
            {
                throw new KeyNotFoundException($"Product with ID {input.Id} not found.");
            }

            product.Quantity = input.Quantity;
            // Update other fields if needed
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
