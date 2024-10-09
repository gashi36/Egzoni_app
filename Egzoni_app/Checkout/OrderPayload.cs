using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Egzoni_app.Checkout
{
    public class OrderPayload : PayloadBase
    {
        public Order? Order { get; set; }

        public OrderPayload(Order? order, bool success, List<string>? errors = null)
            : base(success, errors)
        {
            Order = order;
        }
    }

}