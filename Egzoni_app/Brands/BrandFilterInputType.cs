using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Egzoni_app.Products;
using HotChocolate.Data.Filters;

namespace Egzoni_app.Brands
{
    public class BrandFilterInputType : FilterInputType<Brand>
    {
        protected override void Configure(IFilterInputTypeDescriptor<Brand> descriptor)
        {
            descriptor.BindFieldsImplicitly();
        }

    }
}