using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Egzoni_app.OnSale
{
    public record OnSaleInput(
        int[] ProductIds,
        float DiscountPercentage,
        DateTime StartDate,
        DateTime EndDate
    );
}