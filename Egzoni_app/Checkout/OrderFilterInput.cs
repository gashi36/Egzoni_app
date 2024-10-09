using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HotChocolate.Data.Filters;

namespace Egzoni_app.Checkout
{
    public class OrderFilterInput : FilterInputType<Order>
    {
        protected override void Configure(IFilterInputTypeDescriptor<Order> descriptor)
        {
            descriptor.BindFieldsImplicitly().Field(k => k.CostumerName);
        }
    }
}