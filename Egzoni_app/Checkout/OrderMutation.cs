using System;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Egzoni_app.Database;
using Egzoni_app.Checkout;
using Egzoni_app.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Egzoni_app.Checkouts
{
    [MutationType]
    public class OrderMutation
    {
        private readonly ApplicationDbContext _context;
        private readonly IEmailService _emailService;
        private readonly string _imageBaseUrl;

        public OrderMutation(ApplicationDbContext context, IEmailService emailService, string imageBaseUrl)
        {
            _context = context;
            _emailService = emailService;
            _imageBaseUrl = imageBaseUrl;
        }

        public async Task<Order> PlaceOrderAsync(OrderInput input)
        {
            if (!input.ProductId.HasValue || !input.Quantity.HasValue)
            {
                throw new GraphQLException("ProductId and Quantity are required.");
            }

            var product = await _context.Products
                .Where(p => p.Id == input.ProductId)
                .Select(p => new
                {
                    p.Id,
                    p.Code,
                    p.RetailPrice,
                    p.Quantity,
                    ThumbnailUrl = p.ThumbnailUrl // Get the thumbnail URL
                })
                .FirstOrDefaultAsync();

            if (product == null)
            {
                throw new Exception("Product not found.");
            }

            if (product.Quantity < input.Quantity.Value)
            {
                throw new GraphQLException("Insufficient product quantity available.");
            }

            var updatedQuantity = product.Quantity - input.Quantity.Value;

            var productEntity = await _context.Products.FindAsync(product.Id);
            if (productEntity == null)
            {
                throw new Exception("Product not found.");
            }

            productEntity.Quantity = updatedQuantity;

            var order = new Order
            {
                ProductId = product.Id,
                Quantity = input.Quantity.Value,
                DeliveryAddress = input.DeliveryAddress ?? string.Empty,
                CostumerName = input.CostumerName ?? string.Empty,
                Email = input.Email ?? string.Empty,
                PhoneNumber = input.PhoneNumber ?? string.Empty,
                OrderDate = DateTime.UtcNow,
                AdditionalMessage = input.AdditionalMessage ?? string.Empty,
                TotalPrice = product.RetailPrice.HasValue ? product.RetailPrice.Value * input.Quantity.Value : 0,
                ProductThumbnailUrl = product.ThumbnailUrl ?? "default-thumbnail-url.jpg"
            };

            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            // Prepare product image URL for emails
            var imageUrl = $"{_imageBaseUrl}/{order.ProductThumbnailUrl}";
            var base64Image = await GetBase64StringFromImageUrl(imageUrl);

            // Prepare email HTML
            var adminSubject = "New Order Received";
            var adminBody = $@"
<html>
<head>
    <style>
        body {{ font-family: Arial, sans-serif; color: #333; }}
        .container {{ max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; }}
        h1 {{ color: #e74c3c; }}
        h2 {{ color: #2c3e50; }}
        p {{ margin: 8px 0; }}
        .footer {{ margin-top: 20px; font-size: 12px; color: #aaa; }}
    </style>
</head>
<body>
    <div class='container'>
        <h1>Order Details</h1>
        <p><strong>Customer Name:</strong> {order.CostumerName}</p>
        <p><strong>Delivery Address:</strong> {order.DeliveryAddress}</p>
        <p><strong>Phone Number:</strong> {order.PhoneNumber}</p>
        <p><strong>Email:</strong> {order.Email}</p>
        <p><strong>Order Date:</strong> {order.OrderDate}</p>
        <p><strong>Additional Message:</strong> {order.AdditionalMessage}</p>
        <p><strong>Total Price:</strong> {order.TotalPrice:C}</p>
        <h2>Product Details</h2>
        <p><strong>Product Code:</strong> {product.Code}</p>
        <p><strong>Quantity:</strong> {order.Quantity}</p>
        <p><strong>Product Image:</strong></p>
        <img src='data:image/jpeg;base64,{base64Image}' alt='Product Image' style='width: 200px;' />
        <div class='footer'>
            <p>Thank you for your business.</p>
            <p>Egzoni Center</p>
        </div>
    </div>
</body>
</html>
";

            await _emailService.SendEmailAsync("egzonicenter@gmail.com", adminSubject, adminBody);

            var customerSubject = "Order Confirmation";
            var customerBody = $@"
<html>
<head>
    <style>
        body {{ font-family: Arial, sans-serif; color: #333; }}
        .container {{ max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; }}
        h1 {{ color: #2ecc71; }}
        h2 {{ color: #34495e; }}
        p {{ margin: 8px 0; }}
        .footer {{ margin-top: 20px; font-size: 12px; color: #aaa; }}
    </style>
</head>
<body>
    <div class='container'>
        <h1>Thank You for Your Order!</h1>
        <p><strong>Customer Name:</strong> {order.CostumerName}</p>
        <p><strong>Delivery Address:</strong> {order.DeliveryAddress}</p>
        <p><strong>Phone Number:</strong> {order.PhoneNumber}</p>
        <p><strong>Email:</strong> {order.Email}</p>
        <p><strong>Order Date:</strong> {order.OrderDate}</p>
        <p><strong>Additional Message:</strong> {order.AdditionalMessage}</p>
        <p><strong>Total Price:</strong> {order.TotalPrice:C}</p>
        <h2>Product Details</h2>
        <p><strong>Product Code:</strong> {product.Code}</p>
        <p><strong>Quantity:</strong> {order.Quantity}</p>
        <p><strong>Product Image:</strong></p>
        <img src='data:image/jpeg;base64,{base64Image}' alt='Product Image' style='width: 200px;' />
        <div class='footer'>
            <p>We appreciate your business and hope to serve you again soon!</p>
            <p>Egzoni Center</p>
        </div>
    </div>
</body>
</html>
";

            await _emailService.SendEmailAsync(order.Email, customerSubject, customerBody);

            return order;
        }

        private async Task<string> GetBase64StringFromImageUrl(string imageUrl)
        {
            if (string.IsNullOrWhiteSpace(imageUrl) || !Uri.IsWellFormedUriString(imageUrl, UriKind.Absolute))
            {
                throw new ArgumentException("The provided image URL is invalid.", nameof(imageUrl));
            }

            using (var httpClient = new HttpClient())
            {
                try
                {
                    var response = await httpClient.GetAsync(imageUrl);
                    if (response.IsSuccessStatusCode)
                    {
                        var imageBytes = await response.Content.ReadAsByteArrayAsync();
                        return Convert.ToBase64String(imageBytes);
                    }
                    else
                    {
                        throw new Exception("Failed to retrieve image. Status code: " + response.StatusCode);
                    }
                }
                catch (Exception ex)
                {
                    throw new Exception("An error occurred while retrieving the image.", ex);
                }
            }
        }
    }
}
