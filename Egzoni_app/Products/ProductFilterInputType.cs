using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HotChocolate.Data.Filters;

namespace Egzoni_app.Products
{
    public class ProductFilterInputType : FilterInputType<Product>
    {
        protected override void Configure(IFilterInputTypeDescriptor<Product> descriptor)
        {
            descriptor.BindFieldsImplicitly().Field(k => k.Code);
        }
    }
}