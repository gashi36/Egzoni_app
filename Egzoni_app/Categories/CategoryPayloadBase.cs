using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Egzoni_app.Products;

namespace Egzoni_app.Brands
{
    public class CategoryPayloadBase : Payload
    {
        protected CategoryPayloadBase(Category category)
        {
            Category = category;
        }
        protected CategoryPayloadBase(IReadOnlyList<UserError> errors) : base(errors)
        {

        }
        public Category? Category { get; }
    }
}