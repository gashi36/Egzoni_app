using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
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
        public string ThumbnailUrl { get; set; }
        [Required]
        public int? BrandId { get; set; }
        public Brand? Brand { get; set; }

        [Required]
        public int? CategoryId { get; set; }
        public Category? Category { get; set; }
    }
}
