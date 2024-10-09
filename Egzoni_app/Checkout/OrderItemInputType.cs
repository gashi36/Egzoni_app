using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Egzoni_app.Checkout
{

    public class OrderItemInputType : InputObjectType<OrderItemInput>
    {
        protected override void Configure(IInputObjectTypeDescriptor<OrderItemInput> descriptor)
        {
            descriptor.Name("OrderItemInput");
            descriptor.Field(x => x.ProductId).Type<NonNullType<IntType>>();
            descriptor.Field(x => x.Quantity).Type<NonNullType<IntType>>();
        }
    }
}