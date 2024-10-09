using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Egzoni_app.Products;

namespace Egzoni_app.Checkout
{
    public class OrderItem
    {
        public int Id { get; set; } // Unique identifier for each OrderItem
        public int ProductId { get; set; } // ID of the product being ordered
        public int Quantity { get; set; } // Quantity of the product in the order
        public decimal Price { get; set; } // Price per item at the time of the order

        // Foreign key to link this OrderItem to the Order
        public int OrderId { get; set; }
        public Order? Order { get; set; } // Navigation property to the Order
        public string? Code { get; internal set; }
        public Product? Product { get; set; }
    }
}