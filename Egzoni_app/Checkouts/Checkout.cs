// using System;
// using System.Collections.Generic;
// using System.ComponentModel.DataAnnotations;

// namespace Egzoni_app.Checkouts
// {
//     public class Checkout
//     {
//         public int Id { get; set; }

//         [Required]
//         public int UserId { get; set; }
//         public User User { get; set; }

//         public List<CheckoutItem> CheckoutItems { get; set; } = new List<CheckoutItem>();

//         [Required]
//         public DateTime CheckoutDate { get; set; } = DateTime.UtcNow;

//         [Required]
//         public decimal TotalAmount { get; set; }

//         public string? PaymentMethod { get; set; }
//         public string? ShippingAddress { get; set; }
//     }
// }