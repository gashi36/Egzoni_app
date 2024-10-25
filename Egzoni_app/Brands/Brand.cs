using System.Collections.Generic;

namespace Egzoni_app.Products
{
    public class Brand
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? LogoUrl { get; set; } // Changed to store a single logo URL
        public ICollection<Product>? Products { get; set; } = new List<Product>();
    }
}
