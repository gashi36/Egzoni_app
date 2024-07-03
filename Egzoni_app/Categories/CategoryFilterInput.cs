using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Egzoni_app.Products;
using HotChocolate.Data.Filters;

namespace Egzoni_app.Categories
{
    public class CategoryFilterInput : FilterInputType<Category>
    {
        protected override void Configure(IFilterInputTypeDescriptor<Category> descriptor)
        {
            descriptor.BindFieldsImplicitly().
            Field(n => n.Id);
        }

    }
}