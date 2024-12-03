using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Egzoni_app.Database;
using Microsoft.EntityFrameworkCore;
using HotChocolate;
using Egzoni_app.Checkout;
using Egzoni_app.Interfaces;

namespace Egzoni_app.Checkouts
{
    [MutationType]
    public class OrderMutation
    {
        private readonly IDbContextFactory<ApplicationDbContext> _dbContextFactory;
        private readonly IEmailService _emailService;
        private readonly string _adminEmail;

        public OrderMutation(IDbContextFactory<ApplicationDbContext> dbContextFactory, IEmailService emailService, string adminEmail)
        {
            _dbContextFactory = dbContextFactory;
            _emailService = emailService;
            _adminEmail = adminEmail;
        }
        public async Task<Order> PlaceOrderAsync(OrderInput input, CancellationToken cancellationToken)
        {
            if (input.Items == null || !input.Items.Any())
            {
                throw new GraphQLException("At least one item is required.");
            }

            using (var context = _dbContextFactory.CreateDbContext())
            {
                // Create the order
                var order = new Order
                {
                    DeliveryAddress = input.DeliveryAddress,
                    CostumerName = input.CostumerName,
                    Email = input.Email,
                    PhoneNumber = input.PhoneNumber,
                    AdditionalMessage = input.AdditionalMessage,
                    OrderDate = DateTime.UtcNow, // Set the current date and time
                    OrderItems = new List<OrderItem>()
                };

                // Loop through items and add them to the order
                foreach (var itemInput in input.Items)
                {
                    // Fetch product while checking for soft deletion
                    var product = await context.Products
                        .Where(p => p.Id == itemInput.ProductId && !p.IsDeleted) // Check for IsDeleted
                        .Select(p => new
                        {
                            p.Id,
                            p.RetailPrice,
                            p.Quantity,
                            p.Code // Ensure ProductCode is available
                        })
                        .FirstOrDefaultAsync(cancellationToken);

                    if (product == null)
                    {
                        throw new GraphQLException($"Product with ID {itemInput.ProductId} not found or deleted.");
                    }

                    if (product.Quantity < itemInput.Quantity)
                    {
                        throw new GraphQLException($"Insufficient quantity for product with ID {itemInput.ProductId}.");
                    }

                    // Check for active sale
                    var sale = await context.Sales
                        .Where(s => s.ProductId == product.Id && s.StartDate <= DateTime.UtcNow && s.EndDate >= DateTime.UtcNow)
                        .FirstOrDefaultAsync(cancellationToken);

                    // Calculate the discounted price if there is an active sale
                    decimal price = product.RetailPrice ?? 0;
                    decimal discountedPrice = sale != null
                        ? price - (price * (decimal)(sale.DiscountPercentage / 100))
                        : price;

                    // Deduct product quantity
                    var productEntity = await context.Products.FindAsync(product.Id);
                    productEntity.Quantity -= itemInput.Quantity;

                    var orderItem = new OrderItem
                    {
                        ProductId = product.Id,
                        Code = product.Code, // Set ProductCode
                        Quantity = itemInput.Quantity,
                        Price = price, // Original price
                        DiscountedPrice = discountedPrice // Discounted price if available
                    };

                    order.OrderItems.Add(orderItem);
                }

                // Calculate the total price of the order after all items have been added
                order.CalculateTotalPrice();

                // Save the order to the database
                context.Orders.Add(order);
                await context.SaveChangesAsync(cancellationToken);

                // Generate email body
                var subject = "Konfirmimi i Porosisë";
                var body = GenerateEmailBody(order);

                // Send email to the customer
                await _emailService.SendEmailAsync(order.Email, subject, body);

                return order;
            }
        }


        private string GenerateEmailBody(Order order)
        {
            var body = $@"
    <html>
    <head>
        <style>
            body {{
                font-family: 'Arial', sans-serif;
                background-color: #1e1e1e;
                margin: 0;
                padding: 0;
            }}
            .container {{
                width: 600px;
                margin: 20px auto;
                background-color: #2c2c2c;
                color: #f4f4f4;
                border: 1px solid #d32f2f;
                border-radius: 8px;
                padding: 20px;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
            }}
            .header {{
                text-align: center;
                padding-bottom: 20px;
            }}
            .header img {{
                max-width: 150px;
                height: auto;
                border-radius: 8px;
            }}
            .header h1 {{
                margin: 10px 0;
                font-size: 24px;
                color: #d32f2f;
            }}
            .content {{
                padding: 20px;
            }}
            .footer {{
                background-color: #333;
                padding: 15px;
                text-align: center;
                border-radius: 0 0 8px 8px;
                border-top: 1px solid #d32f2f;
            }}
            .item {{
                border-bottom: 1px solid #444;
                padding: 10px 0;
            }}
            .total {{
                font-weight: bold;
                font-size: 1.2em;
                margin-top: 20px;
                color: #d32f2f;
            }}
            h2 {{
                border-bottom: 2px solid #d32f2f;
                padding-bottom: 5px;
                font-size: 20px;
                color: #d32f2f;
                margin-top: 0;
            }}
            p {{
                margin: 10px 0;
                color:white;
            }}
            ul {{
                list-style: none;
                padding: 0;
                margin: 0;
            }}
            li {{
                padding: 5px 0;
            }}
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <img src='https://i.imgur.com/xBaYlBN.png' alt='Company Logo' />
                <h1>Konfirmimi i Porosisë</h1>
            </div>
            <div class='content'>
                <p>Faleminderit për porosinë tuaj, <strong>{order.CostumerName}</strong>!</p>
                <p><strong>Numri i Porosisë:</strong> 001{order.Id}</p>
                <p><strong>Data e Porosisë:</strong> {order.OrderDate}</p>
                <p><strong>Adresa e Dërgesës:</strong> {order.DeliveryAddress}</p>
                <p><strong>Numri i Telefonit:</strong> {order.PhoneNumber}</p>
                <p><strong>Mesazhi Shtesë:</strong> {order.AdditionalMessage}</p>
                <h2>Artikujt e Porosisë</h2>
                <ul>";

            foreach (var item in order.OrderItems)
            {
                body += $@"
            <li class='item'>
                <strong>Produkti:</strong> {item.Code} <br />
                <strong>Sasia:</strong> {item.Quantity} <br />
                <strong>Çmimi:</strong> €{item.Price} <br />
                <strong>Çmimi me zbritje:</strong> €{item.DiscountedPrice}
            </li>";
            }

            body += $@"
                </ul>
                <p class='total'><strong>Çmimi Total:</strong> €{order.TotalPrice}</p>
            </div>
            <div class='footer'>
                <p>Faleminderit na besuat!</p>
            </div>
        </div>
    </body>
    </html>";

            return body;
        }

    }
}
