using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Egzoni_app.Checkout
{
  public record OrderInput
 (
   int? ProductId,
 int? Quantity,
 string? DeliveryAddress,
 string? CostumerName,
 string? Email,
 string? PhoneNumber,
 string? AdditionalMessage

 );
}
