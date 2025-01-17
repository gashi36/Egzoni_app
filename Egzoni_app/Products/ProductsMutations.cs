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

            // Ensure input.Thumbnail is not null
            if (input.Thumbnail == null)
            {
                throw new ArgumentNullException(nameof(input.Thumbnail), "Thumbnail cannot be null.");
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
                PictureUrls = new List<string>(), // Initialize PictureUrls list
                ThumbnailUrl = string.Empty // Initialize ThumbnailUrl
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

            // Process the thumbnail image
            var thumbnailName = $"Thumbnail_{Guid.NewGuid()}{System.IO.Path.GetExtension(input.Thumbnail.Name)}";
            var thumbnailPath = System.IO.Path.Combine(path, thumbnailName);

            try
            {
                // Save the thumbnail file to the specified path
                using (var stream = new FileStream(thumbnailPath, FileMode.Create, FileAccess.Write))
                {
                    await input.Thumbnail.CopyToAsync(stream);
                }

                // Set the ThumbnailUrl
                newProduct.ThumbnailUrl = thumbnailName;
            }
            catch (Exception ex)
            {
                // Log the exception (you might need a logging mechanism here)
                throw new InvalidOperationException($"Error saving thumbnail {input.Thumbnail.Name}", ex);
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
                        throw new InvalidOperationException($"Error saving image {image.Name}", ex);
                    }
                }
            }

            // Update the product to include the list of PictureUrls and ThumbnailUrl
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

        public async Task<bool> RemoveProductsById(
         int productId,
         [Service] ApplicationDbContext context)
        {
            // Check if the product exists
            var product = await context.Products.FindAsync(productId);

            if (product == null)
            {
                throw new GraphQLException($"Product with ID {productId} not found.");
            }

            // Check if the product is already marked as deleted
            if (product.IsDeleted)
            {
                throw new GraphQLException($"Product with ID {productId} is already deleted.");
            }

            // Mark the product as deleted (soft delete)
            product.IsDeleted = true;

            // Save the changes
            await context.SaveChangesAsync();
            return true; // Indicate successful deletion
        }

    }
}