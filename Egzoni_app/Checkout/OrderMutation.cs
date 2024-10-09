using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Threading;
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

                decimal totalPrice = 0;

                // Loop through items and add them to the order
                foreach (var itemInput in input.Items)
                {
                    var product = await context.Products
                        .Where(p => p.Id == itemInput.ProductId)
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
                        throw new GraphQLException($"Product with ID {itemInput.ProductId} not found.");
                    }

                    if (product.Quantity < itemInput.Quantity)
                    {
                        throw new GraphQLException($"Insufficient quantity for product with ID {itemInput.ProductId}.");
                    }

                    // Deduct product quantity
                    var productEntity = await context.Products.FindAsync(product.Id);
                    productEntity.Quantity -= itemInput.Quantity;

                    var orderItem = new OrderItem
                    {
                        ProductId = product.Id,
                        Code = product.Code, // Set ProductCode
                        Quantity = itemInput.Quantity,
                        Price = product.RetailPrice ?? 0 // Assuming RetailPrice is nullable
                    };

                    order.OrderItems.Add(orderItem);
                    totalPrice += orderItem.Price * orderItem.Quantity;
                }

                // Set the total price of the order
                order.TotalPrice = totalPrice;

                // Save the order to the database
                context.Orders.Add(order);
                await context.SaveChangesAsync(cancellationToken);

                // Generate email body
                var subject = "Konfirmimi i Porosisë";
                var body = GenerateEmailBody(order);

                // Send email to the customer
                await _emailService.SendEmailAsync(order.Email, subject, body);

                // // Send email to the admin
                // var adminSubject = "Njoftim i Ri për Porosi";
                // var adminBody = GenerateEmailBodyForAdmin(order);
                // await _emailService.SendEmailAsync(_adminEmail, adminSubject, adminBody);

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
                    background-color: #f4f4f4; /* Light grey background */
                    margin: 0;
                    padding: 0;
                }}
                .container {{
                    width: 600px;
                    margin: 20px auto;
                    background-color: #fff; /* White background */
                    color: #333; /* Dark text */
                    border: 1px solid #d4af37; /* Gold border */
                    border-radius: 8px; /* Rounded corners */
                    padding: 20px;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Subtle shadow */
                }}
                .header {{
                    background-color: #d4af37; /* Gold background */
                    color: #fff; /* White text */
                    padding: 20px;
                    border-radius: 8px 8px 0 0; /* Rounded top corners */
                    text-align: center;
                }}
                .header img {{
                    max-width: 150px; /* Adjust the width as needed */
                    height: auto;
                }}
                .header h1 {{
                    margin: 0;
                    font-size: 24px;
                }}
                .content {{
                    padding: 20px;
                }}
                .footer {{
                    background-color: #f9f9f9; /* Light grey background */
                    padding: 15px;
                    text-align: center;
                    border-radius: 0 0 8px 8px; /* Rounded bottom corners */
                    border-top: 1px solid #d4af37; /* Gold border */
                }}
                .item {{
                    border-bottom: 1px solid #d4af37; /* Gold border */
                    padding: 10px 0;
                }}
                .total {{
                    font-weight: bold;
                    font-size: 1.2em;
                    margin-top: 20px;
                }}
                h2 {{
                    border-bottom: 2px solid #d4af37; /* Gold underline */
                    padding-bottom: 5px;
                    font-size: 20px;
                    margin-top: 0;
                }}
                p {{
                    margin: 10px 0;
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
                    <img src='https://scontent.fprn9-1.fna.fbcdn.net/v/t1.6435-9/158629143_117592383709173_9199318107638377155_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=WODKBOJZ9uoQ7kNvgF7a_hE&_nc_ht=scontent.fprn9-1.fna&_nc_gid=AyIuMqO-npR6rVemyWlS7Wn&oh=00_AYD5sOl4e6M8DmoPdKy94uV9kqQVR3Rkxz4c0uxqsSIkng&oe=6707867B' alt='Your Company Logo' />
                    <h1>Konfirmimi i Porosisë</h1>
                </div>
                <div class='content'>
                    <p>Faleminderit për porosinë tuaj, <strong>{order.CostumerName}</strong>!</p>
                    <p><strong>Numri i Porosisë:</strong> {order.Id}</p>
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
                <strong>Kodi i Produktit:</strong> {item.Code} - <strong>Sasia:</strong> {item.Quantity} - <strong>Çmimi:</strong> ${item.Price}
            </li>";
            }

            body += $@"
                </ul>
                <p class='total'><strong>Çmimi Total:</strong> ${order.TotalPrice}</p>
            </div>
            <div class='footer'>
                <p>Faleminderit që blejti me ne!</p>
            </div>
        </div>
    </body>
    </html>";

            return body;
        }


        // private string GenerateEmailBodyForAdmin(Order order)
        // {
        //     var body = $@"
        //         <html>
        //         <body>
        //             <h1>Njoftim i Ri për Porosi</h1>
        //             <p>Ka ardhur një porosi e re nga {order.CostumerName}.</p>
        //             <p>Numri i Porosisë: {order.Id}</p>
        //             <p>Data e Porosisë: {order.OrderDate}</p>
        //             <p>Adresa e Dërgesës: {order.DeliveryAddress}</p>
        //             <p>Numri i Telefonit: {order.PhoneNumber}</p>
        //             <p>Mesazhi Shtesë: {order.AdditionalMessage}</p>
        //             <h2>Artikujt e Porosisë</h2>
        //             <ul>";

        //     foreach (var item in order.OrderItems)
        //     {
        //         body += $@"
        //             <li>
        //                 Kodi i Produktit: {item.Code} - Sasia: {item.Quantity} - Çmimi: ${item.Price}
        //             </li>";
        //     }

        //     body += $@"
        //             </ul>
        //             <p>Çmimi Total: ${order.TotalPrice}</p>
        //             <p>Ju lutem, kontrolloni porosinë në sistemin tuaj.</p>
        //         </body>
        //         </html>";

        //     return body;
        // }
    }

}
