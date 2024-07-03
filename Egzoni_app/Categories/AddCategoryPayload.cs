using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Egzoni_app.Products;

namespace Egzoni_app.Brands
{
    public class AddCategoryPayload : CategoryPayloadBase
    {
        public AddCategoryPayload(Category category)
           : base(category)
        {
        }

        public AddCategoryPayload(IReadOnlyList<UserError> errors)
            : base(errors)
        {
        }
    }
}