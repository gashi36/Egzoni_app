using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Egzoni_app.Products;

namespace Egzoni_app.Checkout
{
    public class Order
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public string CostumerName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
        public string DeliveryAddress { get; set; } = string.Empty;
        public DateTime OrderDate { get; set; }
        public string AdditionalMessage { get; set; } = string.Empty;
        public decimal TotalPrice { get; set; }
        public int Quantity { get; set; }
        public string ProductThumbnailUrl { get; set; }
        public Product Product { get; set; } // Navigation property
    }
}
