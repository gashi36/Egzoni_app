using Egzoni_app.Checkout;
using Egzoni_app.Products;

public class OrderItem
{
    public int Id { get; set; }
    public int ProductId { get; set; }
    public int Quantity { get; set; }
    public decimal Price { get; set; } // Original price per item
    public decimal? DiscountedPrice { get; set; } // Discounted price if applicable
    public int OrderId { get; set; }
    public Order? Order { get; set; }
    public string? Code { get; internal set; }
    public Product? Product { get; set; }

    // Update to calculate total price based on DiscountedPrice if available
    public decimal GetTotalPrice()
    {
        // Use DiscountedPrice if available, otherwise use the original Price
        var finalPrice = DiscountedPrice.HasValue ? DiscountedPrice.Value : Price;
        return Quantity * finalPrice;
    }
}
