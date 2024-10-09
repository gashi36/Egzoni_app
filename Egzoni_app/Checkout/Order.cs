using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Egzoni_app.Checkout
{
    public class Order
    {
        public int Id { get; set; }
        public string DeliveryAddress { get; set; }
        public string CostumerName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string AdditionalMessage { get; set; }
        public DateTime OrderDate { get; set; } // Date and time when the order was placed
        public decimal TotalPrice { get; set; }
        public ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();
    }
}