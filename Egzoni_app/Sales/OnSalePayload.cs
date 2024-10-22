using Egzoni_app.Products;
using System.Collections.Generic;
using Egzoni_app.Checkout;

namespace Egzoni_app.OnSale
{
    public class OnSalePayload : PayloadBase
    {
        public Sales? Sales { get; set; }
        public OnSalePayload(Sales? sales, bool success, List<string>? errors = null) : base(success, errors) { Sales = sales; }
    }
}
