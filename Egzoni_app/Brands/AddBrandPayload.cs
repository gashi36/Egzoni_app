using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Egzoni_app.Products;

namespace Egzoni_app.Brands
{
    public class AddBrandPayload : BrandPayloadBase
    {
        public AddBrandPayload(Brand brand)
           : base(brand)
        {
        }

        public AddBrandPayload(IReadOnlyList<UserError> errors)
            : base(errors)
        {
        }
    }
}