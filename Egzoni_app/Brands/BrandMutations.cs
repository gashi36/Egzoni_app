using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Egzoni_app.Database;
using Egzoni_app.Products;

namespace Egzoni_app.Brands
{
    [MutationType]
    public class BrandMutations
    {
        public async Task<Brand> AddBrandAsync(AddBrandInput brandInput, ApplicationDbContext context)
        {
            // Ensure brandInput.Logo is not null
            if (brandInput.Logo == null)
            {
                throw new ArgumentNullException(nameof(brandInput.Logo), "Logo cannot be null.");
            }

            // Initialize a new Brand instance with the provided input data
            var brand = new Brand
            {
                Name = brandInput.Name,
            };

            // Add the new brand to the database context
            context.Brands.Add(brand);
            await context.SaveChangesAsync(); // Save changes to generate the brand ID

            // Create a directory for the brand's logo using the brand ID
            var path = System.IO.Path.Combine("wwwroot", "logos", brand.Id.ToString());
            if (!Directory.Exists(path))
            {
                Directory.CreateDirectory(path);
            }

            // Process the uploaded logo image
            if (brandInput.Logo.Length > 0) // Ensure the file is of type IFormFile and not empty
            {
                // Generate a unique filename for the logo
                var logoName = $"Logo_{Guid.NewGuid()}{System.IO.Path.GetExtension(brandInput.Logo.Name)}"; // Use FileName for extension
                var logoPath = System.IO.Path.Combine(path, logoName);

                try
                {
                    // Save the file to the specified path
                    using (var stream = new FileStream(logoPath, FileMode.Create, FileAccess.Write))
                    {
                        await brandInput.Logo.CopyToAsync(stream);
                    }

                    // Set the logo path in the Brand entity
                    brand.LogoUrl = logoName; // Store the logo URL
                }
                catch (Exception ex)
                {
                    // Log the exception (you might need a logging mechanism here)
                    throw new InvalidOperationException($"Error saving logo {brandInput.Logo.Name}", ex);
                }
            }

            // Update the brand to include the logo URL
            context.Brands.Update(brand);
            await context.SaveChangesAsync(); // Save the changes to the database

            return brand;
        }

    }
}