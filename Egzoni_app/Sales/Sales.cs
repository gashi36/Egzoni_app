using System;
using Egzoni_app.Products;

namespace Egzoni_app.OnSale
{
    public class Sales
    {
        public int Id { get; set; }
        public double DiscountPercentage { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

        // Foreign key to relate sale to product
        public int ProductId { get; set; }
        public Product? Product { get; set; }

        // Calculated property for the discounted price}
        public decimal? DiscountedPrice => Product?.RetailPrice.HasValue == true
                    ? Product.RetailPrice.Value - (Product.RetailPrice.Value * (decimal)(DiscountPercentage / 100))
                    : null;

        public bool IsValidSalePeriod()
        {
            return StartDate < EndDate && StartDate <= DateTime.UtcNow && EndDate >= DateTime.UtcNow;
        }


    }
}
