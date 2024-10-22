public class Order
{
    public int Id { get; set; }
    public string? DeliveryAddress { get; set; }
    public string? CostumerName { get; set; }
    public string? Email { get; set; }
    public string? PhoneNumber { get; set; }
    public string? AdditionalMessage { get; set; }
    public DateTime OrderDate { get; set; }
    public decimal TotalPrice { get; set; }
    public ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();

    public void CalculateTotalPrice()
    {
        TotalPrice = OrderItems.Sum(item => item.GetTotalPrice());
    }
}
