using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Egzoni_app.OnSale;
using Microsoft.EntityFrameworkCore;

namespace Egzoni_app.Products
{
    public class Product
    {
        public int Id { get; set; }
        public string? Code { get; set; }
        public string? Description { get; set; }
        public string? Size { get; set; }

        [Precision(10, 2)]
        public decimal? Quantity { get; set; }

        public string? Color { get; set; }

        [Precision(10, 2)]
        public decimal? PurchasePrice { get; set; }

        [Precision(10, 2)]
        public decimal? RetailPrice { get; set; }

        public decimal? Profit()
        {
            return RetailPrice - PurchasePrice;
        }

        // Change from string? to List<string>
        public List<string> PictureUrls { get; set; } = new List<string>();
        public string? ThumbnailUrl { get; set; }
        [Required]
        public int? BrandId { get; set; }
        public Brand? Brand { get; set; }

        [Required]
        public int? CategoryId { get; set; }
        public Category? Category { get; set; }

        public bool IsDeleted { get; set; } // Soft delete flag
        public ICollection<Sales> Sales { get; set; } = new List<Sales>();

        // Computed property for getting the discounted price from the Sales entity
        public decimal? DiscountedPrice
        {
            get
            {
                // Get the first valid sale if exists
                var validSale = Sales.FirstOrDefault(sale => sale.IsValidSalePeriod());
                // If there's a valid sale, calculate the discounted price
                if (validSale != null)
                {
                    return validSale.DiscountedPrice;
                }
                return RetailPrice; // If no valid sale, return retail price
            }
        }
    }

}