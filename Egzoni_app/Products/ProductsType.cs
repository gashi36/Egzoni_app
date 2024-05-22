using System;
using Egzoni_app.Database;
using HotChocolate.Types;

namespace Egzoni_app.Products
{
    public class ProductsType : ObjectType<Product>
    {
        protected override void Configure(IObjectTypeDescriptor<Product> descriptor)
        {
            descriptor.BindFieldsImplicitly();
        }

    }
}