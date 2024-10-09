using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Egzoni_app.Checkout
{
    public record OrderInput(
    string DeliveryAddress,
    string CostumerName,
    string Email,
    string PhoneNumber,
    string AdditionalMessage,
    List<OrderItemInput> Items
    );

    public record OrderItemInput(
        int ProductId,
        int Quantity
    );


}